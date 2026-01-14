<p align="center">
  <img src="https://raw.githubusercontent.com/GrandeVx/better-form/main/banner.png" alt="Better Form Logo"/>
  <h2 align="center">
    @better_form/plugin-google-places
  </h2>

  <p align="center">
    Google Places address autocomplete plugin for Better Form
    <br />
    <a href="https://better-form.eu"><strong>Learn more</strong></a>
    <br />
    <br />
    <a href="https://better-form.eu">Website</a>
    ·
    <a href="https://docs.better-form.eu">Documentation</a>
    ·
    <a href="https://github.com/GrandeVx/better-form/issues">Issues</a>
  </p>

[![npm version](https://img.shields.io/npm/v/@better_form/plugin-google-places.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/@better_form/plugin-google-places)
</p>

## About

This plugin adds Google Places address autocomplete functionality to Better Form. It provides a complete address input experience with autocomplete suggestions, structured address parsing, optional detail fields editing, and an interactive map picker.

## Installation

```bash
npm install @better_form/core @better_form/plugin-google-places
```

```bash
yarn add @better_form/core @better_form/plugin-google-places
```

```bash
pnpm add @better_form/core @better_form/plugin-google-places
```

## Requirements

- A [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key) with the following APIs enabled:
  - Maps JavaScript API
  - Places API
  - Geocoding API

## Quick Start

```tsx
import { WizardProvider, defaultFieldComponents, type WizardConfig } from '@better_form/core';
import { googlePlacesPlugin } from '@better_form/plugin-google-places';
import '@better_form/core/styles';
import '@better_form/plugin-google-places/styles';

// Create the plugin instance
const googlePlaces = googlePlacesPlugin({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  defaultCountryRestrictions: ['IT'],
  defaultLanguage: 'it',
});

// Merge field components
const fieldComponents = {
  ...defaultFieldComponents,
  ...googlePlaces.fieldComponents,
};

// Define your form config
const config: WizardConfig = {
  id: 'address-form',
  steps: [
    {
      id: 'location',
      title: 'Your Address',
      fields: [
        {
          id: 'address',
          type: 'address', // Uses the plugin component
          label: 'Address',
          required: true,
          showDetailFields: true,
          showMapPicker: true,
        },
      ],
    },
  ],
};

function MyForm() {
  return (
    <WizardProvider config={config} fieldComponents={fieldComponents}>
      {/* Your form content */}
    </WizardProvider>
  );
}
```

## Plugin Configuration

```typescript
const plugin = googlePlacesPlugin({
  // Required: Your Google Maps API key
  apiKey: 'your-api-key',

  // Optional: Restrict results to specific countries (ISO 3166-1 alpha-2)
  defaultCountryRestrictions: ['IT', 'FR', 'DE'],

  // Optional: Language for results
  defaultLanguage: 'en',

  // Optional: Default map center [lat, lng]
  defaultMapCenter: [41.9028, 12.4964], // Rome

  // Optional: Default map zoom level
  defaultMapZoom: 12,

  // Optional: Default map height in pixels
  defaultMapHeight: 300,

  // Optional: Show editable detail fields by default
  defaultShowDetailFields: true,

  // Optional: Show map picker by default
  defaultShowMapPicker: false,

  // Optional: Loading timeout in milliseconds
  loadingTimeout: 10000,
});
```

## Field Configuration

The plugin adds the `address` field type (also available as `google-address` or `address-autocomplete`):

```typescript
{
  id: 'address',
  type: 'address',
  label: 'Address',
  required: true,

  // Show editable fields for street, city, postal code, etc.
  showDetailFields: true,

  // Show interactive map picker
  showMapPicker: true,

  // Override country restrictions for this field
  countryRestrictions: ['US', 'CA'],

  // Override language for this field
  language: 'en',

  // Map customization
  mapHeight: 400,
  mapZoom: 15,
  mapCenter: [40.7128, -74.0060], // New York

  // Callbacks
  onAddressSelected: (addressData, formData) => {
    console.log('Selected:', addressData);
  },
  onAddressDetailChange: (addressData, formData) => {
    console.log('Detail changed:', addressData);
  },
}
```

## Address Data Structure

When an address is selected, the field value contains structured data:

```typescript
interface AddressData {
  formattedAddress: string; // Full formatted address
  street: string;           // Street name
  number: string;           // Street/house number
  city: string;             // City name
  province?: string;        // Province/state code
  region?: string;          // Region/state name
  postalCode?: string;      // Postal/ZIP code
  country?: string;         // Country name
  countryCode?: string;     // ISO country code
  latitude?: number;        // Latitude
  longitude?: number;       // Longitude
  placeId?: string;         // Google Place ID
}
```

## Advanced Usage

### Using Hooks

```typescript
import { useGoogleMaps } from '@better_form/plugin-google-places';

function MyComponent() {
  const { isLoaded, loadError } = useGoogleMaps();

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return <div>Maps ready!</div>;
}
```

### Using Utilities

```typescript
import {
  parseGooglePlaceResult,
  createEmptyAddress,
  isAddressEmpty,
  formatAddressLine,
} from '@better_form/plugin-google-places';

// Parse a Google Place result
const addressData = parseGooglePlaceResult(placeResult);

// Create an empty address object
const empty = createEmptyAddress();

// Check if address is empty
if (isAddressEmpty(addressData)) {
  console.log('No address selected');
}

// Format address as a single line
const line = formatAddressLine(addressData);
```

## Documentation

Visit [docs.better-form.eu](https://docs.better-form.eu) for full documentation and guides.

## License

MIT
