import type { WizardConfig } from '@better_form/core';
import type { AddressData } from '@better_form/plugin-google-places';

/**
 * Address Autocomplete with Google Places Plugin
 *
 * This example demonstrates how to use the @better_form/plugin-google-places
 * to add address autocomplete functionality.
 *
 * To use this example with real Google Places API:
 * 1. Get a Google Maps API key from Google Cloud Console
 * 2. Enable "Places API" and "Maps JavaScript API"
 * 3. Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local
 */

export const addressAutocompleteConfig: WizardConfig = {
  id: 'address-autocomplete-demo',
  title: 'Delivery Address',
  steps: [
    {
      id: 'address-lookup',
      title: 'Find Address',
      fieldGroups: [
        {
          id: 'search',
          title: 'Address Search',
          description: 'Start typing to search for an address using Google Places',
          fields: [
            {
              id: 'deliveryAddress',
              name: 'deliveryAddress',
              label: 'Delivery Address',
              type: 'address', // Uses the plugin component
              required: true,
              placeholder: 'Start typing an address...',

              // Plugin-specific options (typed via AddressFieldOptions)
              showDetailFields: true,
              showMapPicker: true,
              countryRestrictions: ['IT'], // Restrict to Italy

              // Callback when address is selected from autocomplete
              // Can return additional field values to update
              onAddressSelected: (address: AddressData, _formData: Record<string, unknown>) => {
                console.log('Address selected:', address);
                // Return values to update other fields if needed
                return {
                  deliveryCity: address.city,
                  deliveryProvince: address.province,
                  deliveryPostalCode: address.postalCode,
                  deliveryLatitude: address.latitude?.toString() ?? '',
                  deliveryLongitude: address.longitude?.toString() ?? '',
                };
              },
            } as unknown as WizardConfig['steps'][0]['fieldGroups'][0]['fields'][0],
          ],
        },
        {
          id: 'address-summary',
          title: 'Extracted Address Data',
          description: 'These fields are auto-filled when you select an address',
          fields: [
            {
              id: 'deliveryCity',
              name: 'deliveryCity',
              label: 'City',
              type: 'text',
              disabled: true,
              placeholder: 'Auto-filled from address',
            },
            {
              id: 'deliveryProvince',
              name: 'deliveryProvince',
              label: 'Province',
              type: 'text',
              disabled: true,
              placeholder: 'Auto-filled from address',
            },
            {
              id: 'deliveryPostalCode',
              name: 'deliveryPostalCode',
              label: 'Postal Code',
              type: 'text',
              disabled: true,
              placeholder: 'Auto-filled from address',
            },
            {
              id: 'deliveryLatitude',
              name: 'deliveryLatitude',
              label: 'Latitude',
              type: 'text',
              disabled: true,
              placeholder: 'GPS coordinate',
            },
            {
              id: 'deliveryLongitude',
              name: 'deliveryLongitude',
              label: 'Longitude',
              type: 'text',
              disabled: true,
              placeholder: 'GPS coordinate',
            },
          ],
        },
      ],
    },
    {
      id: 'delivery-options',
      title: 'Delivery',
      fieldGroups: [
        {
          id: 'delivery-prefs',
          title: 'Delivery Preferences',
          fields: [
            {
              id: 'deliveryType',
              name: 'deliveryType',
              label: 'Delivery Speed',
              type: 'radio',
              required: true,
              options: [
                { label: 'Standard (3-5 days)', value: 'standard', description: 'Free' },
                { label: 'Express (1-2 days)', value: 'express', description: '€9.99' },
                { label: 'Same Day', value: 'same-day', description: '€19.99' },
              ],
              layout: 'vertical',
            },
            {
              id: 'deliveryNotes',
              name: 'deliveryNotes',
              label: 'Delivery Notes',
              type: 'textarea',
              placeholder: 'E.g., "Leave at door", "Call on arrival"',
            },
          ],
        },
      ],
    },
    {
      id: 'confirmation',
      title: 'Confirm',
      fieldGroups: [
        {
          id: 'confirm',
          fields: [
            {
              id: 'acceptTerms',
              name: 'acceptTerms',
              label: 'Terms',
              type: 'single-checkbox',
              checkboxLabel: 'I confirm the delivery address is correct',
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

export const addressAutocompleteCode = `import { WizardProvider, defaultFieldComponents } from '@better_form/core';
import { googlePlacesPlugin } from '@better_form/plugin-google-places';
import '@better_form/plugin-google-places/styles';

// Create the plugin instance with your API key
const googlePlaces = googlePlacesPlugin({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  defaultCountryRestrictions: ['IT'],
  defaultLanguage: 'it',
});

// Merge plugin components with default components
const fieldComponents = {
  ...defaultFieldComponents,
  ...googlePlaces.fieldComponents,
};

// Configure your wizard with address field
const config: WizardConfig = {
  id: 'delivery-form',
  steps: [{
    id: 'address-step',
    fieldGroups: [{
      id: 'address-group',
      fields: [{
        id: 'deliveryAddress',
        name: 'deliveryAddress',
        type: 'address', // Uses plugin component
        label: 'Delivery Address',
        required: true,

        // Plugin-specific options
        showDetailFields: true,
        showMapPicker: true,
        countryRestrictions: ['IT'],

        // Callback when address is selected
        onAddressSelected: (address, formData) => {
          console.log('Selected:', address);
          // Return field values to auto-fill
          return {
            city: address.city,
            postalCode: address.postalCode,
            latitude: address.latitude,
            longitude: address.longitude,
          };
        },
      }],
    }],
  }],
};

// Use in your component
<WizardProvider
  config={config}
  fieldComponents={fieldComponents}
>
  {/* ... */}
</WizardProvider>`;
