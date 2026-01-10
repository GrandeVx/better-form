/**
 * @better-form/plugin-google-places - Script Loader
 *
 * Utility to load the Google Maps JavaScript API
 */

import { Loader } from '@googlemaps/js-api-loader';
import { getApiKey, getDefaultLanguage } from '../config';

let loader: Loader | null = null;
let mapsLibrary: google.maps.MapsLibrary | null = null;
let placesLibrary: google.maps.PlacesLibrary | null = null;
let geocodingLibrary: google.maps.GeocodingLibrary | null = null;
let isLoading = false;
let loadError: Error | null = null;

/**
 * Get or create the Google Maps loader
 */
function getLoader(): Loader {
  if (!loader) {
    loader = new Loader({
      apiKey: getApiKey(),
      version: 'weekly',
      language: getDefaultLanguage(),
    });
  }
  return loader;
}

/**
 * Load the Google Maps JavaScript API with all required libraries
 * Returns a promise that resolves when all libraries are ready
 */
export async function loadGoogleMapsScript(): Promise<void> {
  // Return early if already loaded
  if (mapsLibrary && placesLibrary) {
    return;
  }

  // Return cached error if loading failed
  if (loadError) {
    throw loadError;
  }

  // Prevent concurrent loading
  if (isLoading) {
    // Wait for loading to complete
    while (isLoading) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    if (loadError) throw loadError;
    return;
  }

  isLoading = true;

  try {
    const loaderInstance = getLoader();

    // Load all required libraries using importLibrary
    const [maps, places, geocoding] = await Promise.all([
      loaderInstance.importLibrary('maps') as Promise<google.maps.MapsLibrary>,
      loaderInstance.importLibrary('places') as Promise<google.maps.PlacesLibrary>,
      loaderInstance.importLibrary('geocoding') as Promise<google.maps.GeocodingLibrary>,
    ]);

    mapsLibrary = maps;
    placesLibrary = places;
    geocodingLibrary = geocoding;
  } catch (error) {
    loadError = error as Error;
    throw error;
  } finally {
    isLoading = false;
  }
}

/**
 * Check if Google Maps API is already loaded
 */
export function isGoogleMapsLoaded(): boolean {
  return mapsLibrary !== null && placesLibrary !== null;
}

/**
 * Get the Maps library (throws if not loaded)
 */
export function getMapsLibrary(): google.maps.MapsLibrary {
  if (!mapsLibrary) {
    throw new Error(
      '[@better-form/plugin-google-places] Google Maps library not loaded. ' +
        'Call loadGoogleMapsScript() first or wait for the component to mount.'
    );
  }
  return mapsLibrary;
}

/**
 * Get the Places library (throws if not loaded)
 */
export function getPlacesLibrary(): google.maps.PlacesLibrary {
  if (!placesLibrary) {
    throw new Error(
      '[@better-form/plugin-google-places] Google Places library not loaded. ' +
        'Call loadGoogleMapsScript() first or wait for the component to mount.'
    );
  }
  return placesLibrary;
}

/**
 * Get the Geocoding library (throws if not loaded)
 */
export function getGeocodingLibrary(): google.maps.GeocodingLibrary {
  if (!geocodingLibrary) {
    throw new Error(
      '[@better-form/plugin-google-places] Google Geocoding library not loaded. ' +
        'Call loadGoogleMapsScript() first or wait for the component to mount.'
    );
  }
  return geocodingLibrary;
}

/**
 * Create AutocompleteService instance
 */
export function createAutocompleteService(): google.maps.places.AutocompleteService {
  const places = getPlacesLibrary();
  return new places.AutocompleteService();
}

/**
 * Create PlacesService instance
 * Requires a HTMLDivElement to attach to
 */
export function createPlacesService(
  container: HTMLDivElement
): google.maps.places.PlacesService {
  const places = getPlacesLibrary();
  return new places.PlacesService(container);
}

/**
 * Create Geocoder instance
 */
export function createGeocoder(): google.maps.Geocoder {
  const geocoding = getGeocodingLibrary();
  return new geocoding.Geocoder();
}

/**
 * Create a Map instance
 */
export function createMap(
  container: HTMLElement,
  options: google.maps.MapOptions
): google.maps.Map {
  const maps = getMapsLibrary();
  return new maps.Map(container, options);
}

/**
 * Create a Marker instance
 */
export function createMarker(
  options: google.maps.MarkerOptions
): google.maps.Marker {
  // Marker is still on google.maps namespace
  if (typeof google === 'undefined' || !google.maps?.Marker) {
    throw new Error(
      '[@better-form/plugin-google-places] Google Maps Marker not available.'
    );
  }
  return new google.maps.Marker(options);
}

// Legacy export for backwards compatibility
export function getGoogleMaps(): typeof google.maps {
  if (typeof google === 'undefined' || !google.maps) {
    throw new Error(
      '[@better-form/plugin-google-places] Google Maps API not loaded.'
    );
  }
  return google.maps;
}
