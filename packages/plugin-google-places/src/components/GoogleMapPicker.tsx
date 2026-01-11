/**
 * better-form-plugin-google-places - GoogleMapPicker
 *
 * Interactive map component for location selection
 *
 * Features:
 * - Draggable marker
 * - Click to place marker
 * - Reverse geocoding
 * - Zoom controls
 */

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { getDefaultMapCenter, getDefaultMapZoom } from '../config';
import { useGoogleMaps } from '../hooks/useGoogleMaps';
import type { AddressData } from '../types';
import { createMap, createMarker } from '../utils/script-loader';

export interface GoogleMapPickerProps {
  /** Current latitude */
  latitude?: number;

  /** Current longitude */
  longitude?: number;

  /** Called when location is selected */
  onLocationSelect: (address: AddressData) => void;

  /** Map height in pixels */
  height?: number;

  /** Initial zoom level */
  zoom?: number;

  /** Is the picker disabled */
  disabled?: boolean;

  /** Custom class name */
  className?: string;
}

export function GoogleMapPicker({
  latitude,
  longitude,
  onLocationSelect,
  height = 300,
  zoom,
  disabled = false,
  className,
}: GoogleMapPickerProps) {
  const { isLoaded, reverseGeocode } = useGoogleMaps();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  const [isGeocoding, setIsGeocoding] = useState(false);

  // Handle location change with reverse geocoding
  const handleLocationChange = useCallback(
    async (lat: number, lng: number) => {
      setIsGeocoding(true);

      try {
        const address = await reverseGeocode(lat, lng);
        if (address) {
          onLocationSelect(address);
        } else {
          // Return basic location without address
          onLocationSelect({
            formattedAddress: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
            street: '',
            number: '',
            city: '',
            latitude: lat,
            longitude: lng,
          });
        }
      } finally {
        setIsGeocoding(false);
      }
    },
    [reverseGeocode, onLocationSelect]
  );

  // Initialize map (only runs once when loaded - deps intentionally minimal)
  // biome-ignore lint/correctness/useExhaustiveDependencies: Map should only initialize once on mount
  useEffect(() => {
    if (!isLoaded || !mapContainerRef.current || mapRef.current) return;

    const defaultCenter = getDefaultMapCenter();
    const defaultZoom = getDefaultMapZoom();

    const center =
      latitude !== undefined && longitude !== undefined
        ? { lat: latitude, lng: longitude }
        : { lat: defaultCenter[0], lng: defaultCenter[1] };

    try {
      const map = createMap(mapContainerRef.current, {
        center,
        zoom: zoom ?? defaultZoom,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        gestureHandling: disabled ? 'none' : 'greedy',
      });

      mapRef.current = map;

      // Create marker if we have coordinates
      if (latitude !== undefined && longitude !== undefined) {
        const marker = createMarker({
          position: center,
          map,
          draggable: !disabled,
          animation: google.maps.Animation.DROP,
        });

        markerRef.current = marker;

        // Handle marker drag end
        marker.addListener('dragend', async () => {
          const position = marker.getPosition();
          if (position) {
            handleLocationChange(position.lat(), position.lng());
          }
        });
      }

      // Handle map click
      if (!disabled) {
        map.addListener('click', async (event: google.maps.MapMouseEvent) => {
          if (event.latLng) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();

            // Update or create marker
            if (markerRef.current) {
              markerRef.current.setPosition(event.latLng);
            } else {
              const marker = createMarker({
                position: event.latLng,
                map,
                draggable: true,
                animation: google.maps.Animation.DROP,
              });

              markerRef.current = marker;

              marker.addListener('dragend', async () => {
                const position = marker.getPosition();
                if (position) {
                  handleLocationChange(position.lat(), position.lng());
                }
              });
            }

            handleLocationChange(lat, lng);
          }
        });
      }
    } catch (error) {
      console.error('[better-form-plugin-google-places] Failed to create map:', error);
    }

    return () => {
      // Cleanup
      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }
      mapRef.current = null;
    };
  }, [isLoaded]);

  // Update marker position when props change
  // biome-ignore lint/correctness/useExhaustiveDependencies: Only update on coordinate changes
  useEffect(() => {
    if (!mapRef.current || !isLoaded) return;

    if (latitude !== undefined && longitude !== undefined) {
      const position = { lat: latitude, lng: longitude };

      if (markerRef.current) {
        markerRef.current.setPosition(position);
      } else {
        try {
          const marker = createMarker({
            position,
            map: mapRef.current,
            draggable: !disabled,
            animation: google.maps.Animation.DROP,
          });

          markerRef.current = marker;

          if (!disabled) {
            marker.addListener('dragend', async () => {
              const pos = marker.getPosition();
              if (pos) {
                handleLocationChange(pos.lat(), pos.lng());
              }
            });
          }
        } catch (error) {
          console.error('[better-form-plugin-google-places] Failed to create marker:', error);
        }
      }

      mapRef.current.panTo(position);
    }
  }, [latitude, longitude, isLoaded]);

  if (!isLoaded) {
    return (
      <div className={`bfp-map-picker-loading ${className || ''}`} style={{ height }}>
        <div className="bfp-map-loading-text">Loading map...</div>
      </div>
    );
  }

  return (
    <div className={`bfp-map-picker ${className || ''}`}>
      <div ref={mapContainerRef} className="bfp-map-container" style={{ height }} />

      {isGeocoding && (
        <div className="bfp-map-geocoding-overlay">
          <span>Loading address...</span>
        </div>
      )}

      {!disabled && (
        <div className="bfp-map-instructions">
          Click on the map or drag the marker to select a location
        </div>
      )}
    </div>
  );
}
