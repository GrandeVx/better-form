/**
 * better-form-plugin-google-places - Address Parser
 *
 * Utility to parse Google Place results into structured address data
 */

import type { AddressData } from '../types';

/**
 * Component type mappings from Google Places API
 */
const COMPONENT_TYPES = {
  STREET_NUMBER: 'street_number',
  ROUTE: 'route',
  LOCALITY: 'locality', // City
  ADMINISTRATIVE_AREA_1: 'administrative_area_level_1', // State/Region
  ADMINISTRATIVE_AREA_2: 'administrative_area_level_2', // Province
  ADMINISTRATIVE_AREA_3: 'administrative_area_level_3', // Sub-locality
  POSTAL_CODE: 'postal_code',
  COUNTRY: 'country',
  SUBLOCALITY: 'sublocality',
  SUBLOCALITY_1: 'sublocality_level_1',
  PREMISE: 'premise',
  SUBPREMISE: 'subpremise',
} as const;

/**
 * Get a component value from address_components array
 */
function getComponent(
  components: google.maps.GeocoderAddressComponent[] | undefined,
  type: string,
  useShortName = false
): string {
  if (!components) return '';

  const component = components.find((c) => c.types.includes(type));
  if (!component) return '';

  return useShortName ? component.short_name : component.long_name;
}

/**
 * Parse a Google Place result into AddressData
 */
export function parseGooglePlaceResult(place: google.maps.places.PlaceResult): AddressData {
  const components = place.address_components;
  const geometry = place.geometry;

  // Get street number
  const streetNumber = getComponent(components, COMPONENT_TYPES.STREET_NUMBER);

  // Get route (street name)
  const route = getComponent(components, COMPONENT_TYPES.ROUTE);

  // Build street (route + number for Italian format)
  const street = route || '';
  const number = streetNumber || '';

  // Get city - try multiple component types
  const city =
    getComponent(components, COMPONENT_TYPES.LOCALITY) ||
    getComponent(components, COMPONENT_TYPES.ADMINISTRATIVE_AREA_3) ||
    getComponent(components, COMPONENT_TYPES.SUBLOCALITY) ||
    getComponent(components, COMPONENT_TYPES.SUBLOCALITY_1) ||
    '';

  // Get province (administrative_area_level_2 in Italy)
  const province = getComponent(
    components,
    COMPONENT_TYPES.ADMINISTRATIVE_AREA_2,
    true // Use short name for province code (e.g., "MI" instead of "Milano")
  );

  // Get region (administrative_area_level_1)
  const region = getComponent(components, COMPONENT_TYPES.ADMINISTRATIVE_AREA_1);

  // Get postal code
  const postalCode = getComponent(components, COMPONENT_TYPES.POSTAL_CODE);

  // Get country
  const country = getComponent(components, COMPONENT_TYPES.COUNTRY);
  const countryCode = getComponent(components, COMPONENT_TYPES.COUNTRY, true);

  // Get coordinates
  const latitude = geometry?.location?.lat();
  const longitude = geometry?.location?.lng();

  return {
    formattedAddress: place.formatted_address || '',
    street,
    number,
    city,
    province,
    region,
    postalCode,
    country,
    countryCode,
    latitude,
    longitude,
    placeId: place.place_id,
  };
}

/**
 * Parse geocoding result into AddressData
 */
export function parseGeocoderResult(result: google.maps.GeocoderResult): AddressData {
  const components = result.address_components;
  const geometry = result.geometry;

  const streetNumber = getComponent(components, COMPONENT_TYPES.STREET_NUMBER);
  const route = getComponent(components, COMPONENT_TYPES.ROUTE);

  const street = route || '';
  const number = streetNumber || '';

  const city =
    getComponent(components, COMPONENT_TYPES.LOCALITY) ||
    getComponent(components, COMPONENT_TYPES.ADMINISTRATIVE_AREA_3) ||
    getComponent(components, COMPONENT_TYPES.SUBLOCALITY) ||
    '';

  const province = getComponent(components, COMPONENT_TYPES.ADMINISTRATIVE_AREA_2, true);

  const region = getComponent(components, COMPONENT_TYPES.ADMINISTRATIVE_AREA_1);

  const postalCode = getComponent(components, COMPONENT_TYPES.POSTAL_CODE);

  const country = getComponent(components, COMPONENT_TYPES.COUNTRY);
  const countryCode = getComponent(components, COMPONENT_TYPES.COUNTRY, true);

  const latitude = geometry?.location?.lat();
  const longitude = geometry?.location?.lng();

  return {
    formattedAddress: result.formatted_address || '',
    street,
    number,
    city,
    province,
    region,
    postalCode,
    country,
    countryCode,
    latitude,
    longitude,
    placeId: result.place_id,
  };
}

/**
 * Create an empty AddressData object
 */
export function createEmptyAddress(): AddressData {
  return {
    formattedAddress: '',
    street: '',
    number: '',
    city: '',
    province: '',
    region: '',
    postalCode: '',
    country: '',
    countryCode: '',
    latitude: undefined,
    longitude: undefined,
    placeId: undefined,
  };
}

/**
 * Check if an AddressData object has meaningful data
 */
export function isAddressEmpty(address: AddressData | null): boolean {
  if (!address) return true;

  return !address.street && !address.city && !address.postalCode && !address.formattedAddress;
}

/**
 * Format address components into a single line
 */
export function formatAddressLine(address: AddressData): string {
  const parts: string[] = [];

  if (address.street) {
    parts.push(address.number ? `${address.street}, ${address.number}` : address.street);
  }

  if (address.postalCode || address.city) {
    const cityPart = [address.postalCode, address.city].filter(Boolean).join(' ');
    if (cityPart) parts.push(cityPart);
  }

  if (address.province) {
    parts.push(address.province);
  }

  if (address.country) {
    parts.push(address.country);
  }

  return parts.join(', ');
}
