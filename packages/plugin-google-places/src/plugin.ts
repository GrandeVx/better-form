/**
 * @better-form/plugin-google-places - Plugin Factory
 *
 * Creates a better-form plugin instance for Google Places address fields
 */

import type { BetterFormPlugin } from 'better-form';
import { AddressField } from './components/AddressField';
import { setPluginConfig } from './config';
import type { GooglePlacesPluginConfig } from './types';
import { loadGoogleMapsScript } from './utils/script-loader';

/**
 * Create a Google Places plugin instance
 *
 * @param config - Plugin configuration including API key
 * @returns A BetterFormPlugin that can be used with better-form
 *
 * @example
 * ```typescript
 * import { WizardProvider, defaultFieldComponents } from 'better-form';
 * import { googlePlacesPlugin } from '@better-form/plugin-google-places';
 *
 * const googlePlaces = googlePlacesPlugin({
 *   apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
 *   defaultCountryRestrictions: ['IT'],
 *   defaultLanguage: 'it',
 * });
 *
 * const fieldComponents = {
 *   ...defaultFieldComponents,
 *   ...googlePlaces.fieldComponents,
 * };
 *
 * <WizardProvider config={wizardConfig} fieldComponents={fieldComponents}>
 *   ...
 * </WizardProvider>
 * ```
 */
export function googlePlacesPlugin(config: GooglePlacesPluginConfig): BetterFormPlugin {
  // Validate config
  if (!config.apiKey) {
    throw new Error(
      '[@better-form/plugin-google-places] API key is required. ' +
        'Please provide a valid Google Maps API key.'
    );
  }

  // Store config in module scope for components to access
  setPluginConfig(config);

  return {
    name: '@better-form/plugin-google-places',
    version: '0.1.0',

    // Field components provided by this plugin
    // Multiple type aliases for flexibility
    fieldComponents: {
      address: AddressField,
      'google-address': AddressField,
      'address-autocomplete': AddressField,
    },

    // Field types added by this plugin
    fieldTypes: ['address', 'google-address', 'address-autocomplete'],

    // Initialize the plugin (pre-load Google Maps script)
    init: async () => {
      try {
        await loadGoogleMapsScript();
        console.log('[@better-form/plugin-google-places] Google Maps loaded successfully');
      } catch (error) {
        console.error('[@better-form/plugin-google-places] Failed to load Google Maps:', error);
        throw error;
      }
    },
  };
}

export default googlePlacesPlugin;
