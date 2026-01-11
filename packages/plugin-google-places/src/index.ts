/**
 * better-form-plugin-google-places
 *
 * Google Places address autocomplete plugin for better-form
 *
 * @example
 * ```typescript
 * import { googlePlacesPlugin } from 'better-form-plugin-google-places';
 * import type { AddressData } from 'better-form-plugin-google-places';
 *
 * const plugin = googlePlacesPlugin({
 *   apiKey: 'your-api-key',
 *   defaultCountryRestrictions: ['IT'],
 * });
 *
 * // Use in WizardProvider
 * <WizardProvider
 *   config={config}
 *   fieldComponents={{
 *     ...defaultFieldComponents,
 *     ...plugin.fieldComponents,
 *   }}
 * >
 *   ...
 * </WizardProvider>
 *
 * // In your wizard config
 * const config = {
 *   steps: [{
 *     fieldGroups: [{
 *       fields: [{
 *         id: 'address',
 *         name: 'address',
 *         type: 'address', // Uses plugin component
 *         showDetailFields: true,
 *         showMapPicker: true,
 *       }],
 *     }],
 *   }],
 * };
 * ```
 *
 * @packageDocumentation
 */

// Main plugin export
export { googlePlacesPlugin, default } from './plugin';

// Types
export type {
  AddressData,
  AddressFieldOptions,
  AddressWizardField,
  GooglePlacesPluginConfig,
  PlacePrediction,
  AddressFieldState,
} from './types';

// Components (for advanced usage)
export {
  AddressField,
  AddressAutocomplete,
  AddressDetailFields,
  GoogleMapPicker,
  type AddressAutocompleteProps,
  type AddressDetailFieldsProps,
  type GoogleMapPickerProps,
} from './components';

// Hooks (for advanced usage)
export { useGoogleMaps } from './hooks/useGoogleMaps';

// Utilities (for advanced usage)
export {
  parseGooglePlaceResult,
  parseGeocoderResult,
  createEmptyAddress,
  isAddressEmpty,
  formatAddressLine,
} from './utils/address-parser';

export {
  loadGoogleMapsScript,
  isGoogleMapsLoaded,
  getGoogleMaps,
  getMapsLibrary,
  getPlacesLibrary,
  getGeocodingLibrary,
  createMap,
  createMarker,
} from './utils/script-loader';
