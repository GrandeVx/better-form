/**
 * @better-form/plugin-google-places - useGoogleMaps Hook
 *
 * React hook for loading and using Google Maps API
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { isPluginConfigured } from '../config';
import {
  createAutocompleteService,
  createGeocoder,
  createPlacesService,
  isGoogleMapsLoaded,
  loadGoogleMapsScript,
  getPlacesLibrary,
} from '../utils/script-loader';
import { parseGeocoderResult, parseGooglePlaceResult } from '../utils/address-parser';
import type { AddressData, PlacePrediction } from '../types';

interface UseGoogleMapsReturn {
  /** Is the Google Maps API loaded and ready */
  isLoaded: boolean;

  /** Error during loading */
  error: Error | null;

  /** Search for address predictions */
  searchPredictions: (input: string, countryRestrictions?: string[]) => Promise<PlacePrediction[]>;

  /** Get place details by place ID */
  getPlaceDetails: (placeId: string) => Promise<AddressData | null>;

  /** Reverse geocode coordinates to address */
  reverseGeocode: (lat: number, lng: number) => Promise<AddressData | null>;
}

/**
 * Hook to use Google Maps services
 */
export function useGoogleMaps(): UseGoogleMapsReturn {
  const [isLoaded, setIsLoaded] = useState(() => isGoogleMapsLoaded());
  const [error, setError] = useState<Error | null>(null);

  // Refs for services (created once after loading)
  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);
  const placesContainerRef = useRef<HTMLDivElement | null>(null);

  // Request ID for race condition prevention
  const requestIdRef = useRef(0);

  // Load Google Maps API
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (!isPluginConfigured()) {
        if (mounted) {
          setError(
            new Error('Google Places plugin not configured. Call googlePlacesPlugin() first.')
          );
        }
        return;
      }

      if (isGoogleMapsLoaded()) {
        if (mounted) setIsLoaded(true);
        return;
      }

      try {
        await loadGoogleMapsScript();
        if (mounted) setIsLoaded(true);
      } catch (err) {
        console.error('[@better-form/plugin-google-places] Failed to load Google Maps:', err);
        if (mounted) setError(err as Error);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  // Initialize services when loaded
  useEffect(() => {
    if (!isLoaded) return;

    try {
      autocompleteServiceRef.current = createAutocompleteService();
      geocoderRef.current = createGeocoder();

      // Create hidden container for PlacesService
      if (!placesContainerRef.current) {
        placesContainerRef.current = document.createElement('div');
        placesContainerRef.current.style.display = 'none';
        document.body.appendChild(placesContainerRef.current);
      }
      placesServiceRef.current = createPlacesService(placesContainerRef.current);
    } catch (err) {
      console.error('[@better-form/plugin-google-places] Failed to initialize services:', err);
      setError(err as Error);
    }

    return () => {
      // Cleanup
      if (placesContainerRef.current) {
        placesContainerRef.current.remove();
        placesContainerRef.current = null;
      }
    };
  }, [isLoaded]);

  // Search for predictions
  const searchPredictions = useCallback(
    async (input: string, countryRestrictions?: string[]): Promise<PlacePrediction[]> => {
      if (!autocompleteServiceRef.current) {
        console.warn('[@better-form/plugin-google-places] AutocompleteService not ready');
        return [];
      }

      if (!input.trim()) {
        return [];
      }

      const currentRequestId = ++requestIdRef.current;

      try {
        const response = await autocompleteServiceRef.current.getPlacePredictions({
          input,
          componentRestrictions: countryRestrictions?.length
            ? { country: countryRestrictions }
            : undefined,
        });

        // Check for race condition
        if (currentRequestId !== requestIdRef.current) {
          return [];
        }

        return (response.predictions || []).map((prediction) => ({
          placeId: prediction.place_id,
          mainText: prediction.structured_formatting?.main_text ?? '',
          secondaryText: prediction.structured_formatting?.secondary_text ?? '',
          description: prediction.description,
        }));
      } catch (err) {
        // Ignore zero results error
        const error = err as { code?: string };
        if (error?.code === 'ZERO_RESULTS') {
          return [];
        }
        console.error('[@better-form/plugin-google-places] Prediction error:', err);
        return [];
      }
    },
    []
  );

  // Get place details
  const getPlaceDetails = useCallback(async (placeId: string): Promise<AddressData | null> => {
    if (!placesServiceRef.current) {
      console.warn('[@better-form/plugin-google-places] PlacesService not ready');
      return null;
    }

    try {
      const PlacesService = getPlacesLibrary();

      const result = await new Promise<google.maps.places.PlaceResult | null>((resolve, reject) => {
        placesServiceRef.current!.getDetails(
          {
            placeId,
            fields: ['address_components', 'formatted_address', 'geometry', 'place_id', 'name'],
          },
          (result, status) => {
            if (status === PlacesService.PlacesServiceStatus.OK && result) {
              resolve(result);
            } else {
              reject(new Error(`PlacesService error: ${status}`));
            }
          }
        );
      });

      if (!result) return null;

      return parseGooglePlaceResult(result);
    } catch (err) {
      console.error('[@better-form/plugin-google-places] Place details error:', err);
      return null;
    }
  }, []);

  // Reverse geocode
  const reverseGeocode = useCallback(
    async (lat: number, lng: number): Promise<AddressData | null> => {
      if (!geocoderRef.current) {
        console.warn('[@better-form/plugin-google-places] Geocoder not ready');
        return null;
      }

      try {
        const result = await geocoderRef.current.geocode({
          location: { lat, lng },
        });

        if (result.results && result.results.length > 0) {
          return parseGeocoderResult(result.results[0]);
        }

        return null;
      } catch (err) {
        console.error('[@better-form/plugin-google-places] Reverse geocode error:', err);
        return null;
      }
    },
    []
  );

  return {
    isLoaded,
    error,
    searchPredictions,
    getPlaceDetails,
    reverseGeocode,
  };
}
