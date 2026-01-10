/**
 * @better-form/plugin-google-places - Types
 */

import type { WizardField } from 'better-form';

/**
 * Structured address data from Google Places
 */
export interface AddressData {
  /** Full formatted address string */
  formattedAddress: string;

  /** Street name */
  street: string;

  /** Street/house number */
  number: string;

  /** City name */
  city: string;

  /** Province/state code */
  province?: string;

  /** Region/state name */
  region?: string;

  /** Postal/ZIP code */
  postalCode?: string;

  /** Country name */
  country?: string;

  /** Country code (ISO 3166-1 alpha-2) */
  countryCode?: string;

  /** Latitude coordinate */
  latitude?: number;

  /** Longitude coordinate */
  longitude?: number;

  /** Google Place ID */
  placeId?: string;
}

/**
 * Address field specific configuration
 */
export interface AddressFieldOptions {
  /** Show editable detail fields after selection */
  showDetailFields?: boolean;

  /** Show map picker */
  showMapPicker?: boolean;

  /** Country restrictions (ISO 3166-1 alpha-2 codes) */
  countryRestrictions?: string[];

  /** Language for results */
  language?: string;

  /** Map height in pixels */
  mapHeight?: number;

  /** Initial map zoom level */
  mapZoom?: number;

  /** Initial map center [lat, lng] */
  mapCenter?: [number, number];

  /** Callback when address is selected from autocomplete */
  onAddressSelected?: (
    address: AddressData,
    formData: Record<string, unknown>
  ) => undefined | Record<string, unknown> | Promise<undefined | Record<string, unknown>>;

  /** Callback when detail fields are edited manually */
  onAddressDetailChange?: (
    address: AddressData,
    formData: Record<string, unknown>
  ) => undefined | Record<string, unknown> | Promise<undefined | Record<string, unknown>>;
}

/**
 * Extended WizardField for address type
 */
export interface AddressWizardField extends WizardField, AddressFieldOptions {
  type: 'address' | 'google-address' | 'address-autocomplete';
}

/**
 * Google Places plugin configuration
 */
export interface GooglePlacesPluginConfig {
  /** Google Maps API key (required) */
  apiKey: string;

  /** Default country restrictions */
  defaultCountryRestrictions?: string[];

  /** Default language for results */
  defaultLanguage?: string;

  /** Default map center [lat, lng] */
  defaultMapCenter?: [number, number];

  /** Default map zoom level */
  defaultMapZoom?: number;

  /** Default map height in pixels */
  defaultMapHeight?: number;

  /** Default show detail fields */
  defaultShowDetailFields?: boolean;

  /** Default show map picker */
  defaultShowMapPicker?: boolean;

  /** Loading timeout in milliseconds */
  loadingTimeout?: number;
}

/**
 * Google Places prediction result
 */
export interface PlacePrediction {
  /** Google Place ID */
  placeId: string;

  /** Main text (street name and number) */
  mainText: string;

  /** Secondary text (city, country) */
  secondaryText: string;

  /** Full description */
  description: string;
}

/**
 * Internal state for address field
 */
export interface AddressFieldState {
  /** Current input value */
  inputValue: string;

  /** Current predictions */
  predictions: PlacePrediction[];

  /** Is loading predictions */
  isLoadingPredictions: boolean;

  /** Is loading place details */
  isLoadingDetails: boolean;

  /** Selected address data */
  selectedAddress: AddressData | null;

  /** Is dropdown open */
  isOpen: boolean;

  /** Highlighted index in dropdown */
  highlightedIndex: number;

  /** Error message */
  error: string | null;
}
