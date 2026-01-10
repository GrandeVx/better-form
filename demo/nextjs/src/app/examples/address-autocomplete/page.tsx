'use client';

import { GridBackground } from '@/components/GridBackground';
import { LiveExample } from '@/components/LiveExample';
import {
  addressAutocompleteCode,
  addressAutocompleteConfig,
} from '@/examples/address-autocomplete';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { defaultFieldComponents, type FieldComponentsMap } from 'better-form';

// Import plugin styles
import '@better-form/plugin-google-places/styles';

export default function AddressAutocompletePage() {
  const [hasApiKey, setHasApiKey] = useState(false);
  const [fieldComponents, setFieldComponents] = useState<FieldComponentsMap | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  // Check for API key and initialize plugin on client side
  useEffect(() => {
    const initPlugin = async () => {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

      if (apiKey) {
        try {
          // Dynamic import to avoid SSR issues
          const { googlePlacesPlugin } = await import('@better-form/plugin-google-places');

          const plugin = googlePlacesPlugin({
            apiKey,
            defaultCountryRestrictions: ['IT'],
            defaultLanguage: 'it',
          });

          setFieldComponents({
            ...defaultFieldComponents,
            ...plugin.fieldComponents,
          });
          setHasApiKey(true);
        } catch (error) {
          console.error('Failed to initialize Google Places plugin:', error);
        }
      }
      setIsLoading(false);
    };

    initPlugin();
  }, []);

  return (
    <GridBackground>
      <main className="min-h-screen py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/examples" className="hover:text-foreground">
                  Examples
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground">Address Autocomplete</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-4 text-4xl font-bold">Address Autocomplete</h1>
            <p className="max-w-3xl text-lg text-muted-foreground">
              Search for addresses using Google Places API and auto-populate all related fields
              including street, city, postal code, and GPS coordinates. Uses the{' '}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                @better-form/plugin-google-places
              </code>{' '}
              plugin.
            </p>
          </div>

          {/* API Key Warning */}
          {!isLoading && !hasApiKey && (
            <div className="mb-8 rounded-xl border border-yellow-500/50 bg-yellow-500/10 p-6">
              <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-yellow-500">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                Google Maps API Key Required
              </h2>
              <p className="text-sm text-muted-foreground">
                To see the live demo, add your Google Maps API key to{' '}
                <code className="rounded bg-muted px-1 text-foreground">.env.local</code>:
              </p>
              <pre className="mt-3 rounded-lg bg-muted p-3 text-sm">
                NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
              </pre>
              <p className="mt-3 text-sm text-muted-foreground">
                Get your API key from{' '}
                <a
                  href="https://console.cloud.google.com/apis/credentials"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google Cloud Console
                </a>
                . Enable &quot;Places API&quot; and &quot;Maps JavaScript API&quot;.
              </p>
            </div>
          )}

          {/* Key Features */}
          <div className="mb-8 rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Plugin Features</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  1
                </span>
                <div>
                  <span className="font-medium">Google Places Autocomplete</span>
                  <p className="text-sm text-muted-foreground">
                    Real-time address predictions from Google Places API
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  2
                </span>
                <div>
                  <span className="font-medium">Interactive Map Picker</span>
                  <p className="text-sm text-muted-foreground">
                    Click or drag marker to select location with reverse geocoding
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  3
                </span>
                <div>
                  <span className="font-medium">Editable Detail Fields</span>
                  <p className="text-sm text-muted-foreground">
                    Auto-filled address parts that remain editable
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  4
                </span>
                <div>
                  <span className="font-medium">Callbacks for Auto-fill</span>
                  <p className="text-sm text-muted-foreground">
                    onAddressSelected callback to populate other form fields
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Live Example */}
          {isLoading ? (
            <div className="flex h-64 items-center justify-center rounded-xl border border-border bg-card">
              <p className="text-muted-foreground">Loading plugin...</p>
            </div>
          ) : (
            <LiveExample
              title="Delivery Address with Google Places"
              description={
                hasApiKey
                  ? 'Start typing an address to see Google Places suggestions'
                  : 'Demo mode: Configure API key to see live autocomplete'
              }
              config={addressAutocompleteConfig}
              configCode={addressAutocompleteCode}
              fieldComponents={fieldComponents}
              highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
            />
          )}

          {/* Installation */}
          <div className="mt-8 rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Installation</h2>
            <pre className="rounded-lg bg-muted p-4 text-sm overflow-x-auto">
              <code>{`# Install the plugin
npm install @better-form/plugin-google-places

# Or with pnpm
pnpm add @better-form/plugin-google-places`}</code>
            </pre>
          </div>

          {/* Usage */}
          <div className="mt-8 rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Usage</h2>
            <pre className="rounded-lg bg-muted p-4 text-sm overflow-x-auto">
              <code>{`import { googlePlacesPlugin } from '@better-form/plugin-google-places';
import '@better-form/plugin-google-places/styles';

// Create plugin instance
const googlePlaces = googlePlacesPlugin({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  defaultCountryRestrictions: ['IT'],
  defaultLanguage: 'it',
});

// Merge with default components
const fieldComponents = {
  ...defaultFieldComponents,
  ...googlePlaces.fieldComponents,
};

// Use in WizardProvider/WizardContainer
<WizardContainer config={config} fieldComponents={fieldComponents}>
  ...
</WizardContainer>`}</code>
            </pre>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Link
              href="/examples/step-callbacks"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Step Callbacks
            </Link>
            <Link
              href="/examples"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              All Examples
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    </GridBackground>
  );
}
