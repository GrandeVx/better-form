'use client';

import { GridBackground } from '@/components/GridBackground';
import { LiveExample } from '@/components/LiveExample';
import {
  addressAutocompleteCode,
  addressAutocompleteConfig,
} from '@/examples/address-autocomplete';
import Link from 'next/link';

export default function AddressAutocompletePage() {
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
              Search for addresses and auto-populate all related fields including street, city,
              postal code, and GPS coordinates. Integrates with address lookup APIs.
            </p>
          </div>

          {/* Key Features */}
          <div className="mb-8 rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Key Features</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  1
                </span>
                <div>
                  <span className="font-medium">Searchable Select</span>
                  <p className="text-sm text-muted-foreground">
                    Type to filter addresses from API or local database
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  2
                </span>
                <div>
                  <span className="font-medium">Multi-field Auto-fill</span>
                  <p className="text-sm text-muted-foreground">
                    One selection populates street, city, postal code, region
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  3
                </span>
                <div>
                  <span className="font-medium">GPS Coordinates</span>
                  <p className="text-sm text-muted-foreground">
                    Extract and display latitude/longitude for mapping
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  4
                </span>
                <div>
                  <span className="font-medium">Editable Results</span>
                  <p className="text-sm text-muted-foreground">
                    Auto-filled fields remain editable for corrections
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Live Example */}
          <LiveExample
            title="Delivery Address with Autocomplete"
            description="Select an address from the dropdown to see all fields auto-populate"
            config={addressAutocompleteConfig}
            configCode={addressAutocompleteCode}
            highlightLines={[10, 11, 12, 13, 14, 15, 16, 17, 18]}
          />

          {/* Integration Note */}
          <div className="mt-8 rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Integration Options</h2>
            <div className="prose prose-sm prose-invert max-w-none">
              <p className="text-muted-foreground">
                This demo uses mock data. In production, you can integrate with:
              </p>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li>
                  <strong>Google Places API</strong> - Comprehensive address autocomplete
                </li>
                <li>
                  <strong>Mapbox Geocoding</strong> - Alternative geocoding service
                </li>
                <li>
                  <strong>OpenStreetMap Nominatim</strong> - Free, open-source option
                </li>
                <li>
                  <strong>Custom Database</strong> - Your own address database
                </li>
              </ul>
              <p className="mt-4 text-muted-foreground">
                The <code className="rounded bg-muted px-1 text-foreground">onChange</code> handler
                pattern remains the same regardless of the data source.
              </p>
            </div>
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
