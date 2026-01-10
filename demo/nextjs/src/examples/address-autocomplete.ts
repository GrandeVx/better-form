import type { WizardConfig } from 'better-form';

// Simulated address database for demo purposes
// In production, this would come from Google Places API or similar
const mockAddresses = [
  {
    formatted: 'Via Roma, 1, 20121 Milano MI, Italy',
    street: 'Via Roma, 1',
    city: 'Milano',
    province: 'MI',
    region: 'Lombardia',
    postalCode: '20121',
    country: 'Italy',
    lat: 45.4642,
    lng: 9.19,
  },
  {
    formatted: 'Piazza del Duomo, 20122 Milano MI, Italy',
    street: 'Piazza del Duomo',
    city: 'Milano',
    province: 'MI',
    region: 'Lombardia',
    postalCode: '20122',
    country: 'Italy',
    lat: 45.4641,
    lng: 9.1919,
  },
  {
    formatted: 'Via dei Fori Imperiali, 00186 Roma RM, Italy',
    street: 'Via dei Fori Imperiali',
    city: 'Roma',
    province: 'RM',
    region: 'Lazio',
    postalCode: '00186',
    country: 'Italy',
    lat: 41.8925,
    lng: 12.4853,
  },
  {
    formatted: 'Piazza Navona, 00186 Roma RM, Italy',
    street: 'Piazza Navona',
    city: 'Roma',
    province: 'RM',
    region: 'Lazio',
    postalCode: '00186',
    country: 'Italy',
    lat: 41.8992,
    lng: 12.4731,
  },
  {
    formatted: 'Via Toledo, 80134 Napoli NA, Italy',
    street: 'Via Toledo',
    city: 'Napoli',
    province: 'NA',
    region: 'Campania',
    postalCode: '80134',
    country: 'Italy',
    lat: 40.8388,
    lng: 14.2488,
  },
];

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
          description: 'Start typing to search for an address',
          fields: [
            {
              id: 'addressSearch',
              name: 'addressSearch',
              label: 'Search Address',
              type: 'select',
              placeholder: 'Type to search (e.g., "Via Roma Milano")',
              options: mockAddresses.map((addr) => ({
                label: addr.formatted,
                value: addr.formatted,
              })),
              // When an address is selected, auto-fill all detail fields
              // Return an object with field names and values to update
              onChange: (value) => {
                const selectedAddress = mockAddresses.find((addr) => addr.formatted === value);
                if (selectedAddress) {
                  return {
                    street: selectedAddress.street,
                    city: selectedAddress.city,
                    province: selectedAddress.province,
                    region: selectedAddress.region,
                    postalCode: selectedAddress.postalCode,
                    country: selectedAddress.country,
                    latitude: selectedAddress.lat.toString(),
                    longitude: selectedAddress.lng.toString(),
                  };
                }
                return undefined;
              },
            },
          ],
        },
        {
          id: 'address-details',
          title: 'Address Details',
          description: 'Auto-filled from address selection (editable)',
          fields: [
            {
              id: 'street',
              name: 'street',
              label: 'Street Address',
              type: 'text',
              required: true,
              placeholder: 'Street name and number',
            },
            {
              id: 'city',
              name: 'city',
              label: 'City',
              type: 'text',
              required: true,
              placeholder: 'City name',
            },
            {
              id: 'province',
              name: 'province',
              label: 'Province',
              type: 'text',
              required: true,
              placeholder: 'Province code',
            },
            {
              id: 'region',
              name: 'region',
              label: 'Region',
              type: 'text',
              required: true,
              placeholder: 'Region name',
            },
            {
              id: 'postalCode',
              name: 'postalCode',
              label: 'Postal Code',
              type: 'text',
              required: true,
              placeholder: '00000',
              validations: [
                {
                  type: 'pattern',
                  value: '^\\d{5}$',
                  message: 'Enter a valid 5-digit postal code',
                },
              ],
            },
            {
              id: 'country',
              name: 'country',
              label: 'Country',
              type: 'text',
              required: true,
              placeholder: 'Country',
            },
          ],
        },
        {
          id: 'coordinates',
          title: 'GPS Coordinates',
          description: 'Auto-filled from address (useful for delivery services)',
          fields: [
            {
              id: 'latitude',
              name: 'latitude',
              label: 'Latitude',
              type: 'text',
              disabled: true,
              placeholder: 'Auto-filled',
            },
            {
              id: 'longitude',
              name: 'longitude',
              label: 'Longitude',
              type: 'text',
              disabled: true,
              placeholder: 'Auto-filled',
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

export const addressAutocompleteCode = `const config: WizardConfig = {
  id: 'delivery-address',
  steps: [{
    id: 'address-lookup',
    title: 'Find Address',
    fieldGroups: [{
      id: 'search',
      fields: [{
        id: 'addressSearch',
        name: 'addressSearch',
        label: 'Search Address',
        type: 'select',
        placeholder: 'Start typing...',
        options: addressOptions, // From API
        // Auto-fill all detail fields on selection
        // Return an object with field values to update
        onChange: (value) => {
          const address = findAddress(value);
          if (address) {
            return {
              street: address.street,
              city: address.city,
              province: address.province,
              postalCode: address.postalCode,
              latitude: address.lat,
              longitude: address.lng,
            };
          }
          return undefined;
        },
      }],
    }, {
      id: 'details',
      title: 'Address Details',
      fields: [
        { id: 'street', name: 'street', label: 'Street', type: 'text' },
        { id: 'city', name: 'city', label: 'City', type: 'text' },
        // ... more auto-filled fields
      ],
    }],
  }],
};`;
