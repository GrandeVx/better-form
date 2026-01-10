/**
 * @better-form/plugin-google-places - AddressField
 *
 * Main address field component for better-form
 *
 * Features:
 * - Google Places autocomplete
 * - Interactive map picker (optional)
 * - Editable detail fields (optional)
 * - Stores structured data via onChange
 */

'use client';

import React, { useCallback, useState } from 'react';
import type { FieldComponentProps } from 'better-form';
import { AddressAutocomplete } from './AddressAutocomplete';
import { AddressDetailFields } from './AddressDetailFields';
import { GoogleMapPicker } from './GoogleMapPicker';
import { createEmptyAddress, formatAddressLine, isAddressEmpty } from '../utils/address-parser';
import {
  getDefaultMapHeight,
  getDefaultShowDetailFields,
  getDefaultShowMapPicker,
  getDefaultCountryRestrictions,
} from '../config';
import type { AddressData, AddressFieldOptions } from '../types';

/**
 * AddressField - Integrates with better-form as a custom field component
 *
 * The field stores the formatted address in the main field value,
 * and structured data can be accessed via callbacks.
 */
export function AddressField({
  field,
  value,
  onChange,
  error,
  disabled,
  formData,
}: FieldComponentProps) {
  // Extract address-specific options from field config
  const options = field as unknown as AddressFieldOptions;
  const showDetailFields = options.showDetailFields ?? getDefaultShowDetailFields();
  const showMapPicker = options.showMapPicker ?? getDefaultShowMapPicker();
  const countryRestrictions = options.countryRestrictions ?? getDefaultCountryRestrictions();
  const mapHeight = options.mapHeight ?? getDefaultMapHeight();

  // Internal state for address data
  const [addressData, setAddressData] = useState<AddressData>(() => {
    // Try to parse existing value as address
    if (typeof value === 'object' && value !== null) {
      return value as AddressData;
    }
    // Create empty address with formatted address from value
    const empty = createEmptyAddress();
    if (typeof value === 'string' && value) {
      empty.formattedAddress = value;
    }
    return empty;
  });

  // Handle address selection from autocomplete
  const handleAddressSelect = useCallback(
    async (address: AddressData) => {
      setAddressData(address);

      // Call the main onChange with formatted address
      onChange(address.formattedAddress);

      // Call the onAddressSelected callback if provided
      if (options.onAddressSelected) {
        const updates = await options.onAddressSelected(address, formData);
        // Note: The callback can return field updates that will be handled
        // by better-form's WizardField component
        if (updates && typeof updates === 'object') {
          // Return updates to be processed by WizardField
          // This is handled by the field's onChange mechanism in better-form
          console.log('[plugin-google-places] onAddressSelected returned:', updates);
        }
      }
    },
    [onChange, options, formData]
  );

  // Handle detail fields change
  const handleDetailChange = useCallback(
    async (address: AddressData, clearedCoordinates: boolean) => {
      setAddressData(address);

      // Update the formatted address based on detail fields
      const formattedAddress = formatAddressLine(address);
      onChange(formattedAddress);

      // Call the onAddressDetailChange callback if provided
      if (options.onAddressDetailChange) {
        const updates = await options.onAddressDetailChange(address, formData);
        if (updates && typeof updates === 'object') {
          console.log('[plugin-google-places] onAddressDetailChange returned:', updates);
        }
      }
    },
    [onChange, options, formData]
  );

  // Handle map location selection
  const handleMapLocationSelect = useCallback(
    async (address: AddressData) => {
      setAddressData(address);
      onChange(address.formattedAddress);

      // Call the onAddressSelected callback for map selections too
      if (options.onAddressSelected) {
        await options.onAddressSelected(address, formData);
      }
    },
    [onChange, options, formData]
  );

  // Handle input value change (for typing without selection)
  const handleInputChange = useCallback(
    (inputValue: string) => {
      // Only update if significantly different to avoid loops
      if (inputValue !== addressData.formattedAddress) {
        // Don't update form data on every keystroke
        // Only update when a selection is made
      }
    },
    [addressData.formattedAddress]
  );

  return (
    <div className={`bfp-address-field ${error ? 'has-error' : ''}`}>
      {/* Autocomplete Input */}
      <AddressAutocomplete
        id={field.id}
        value={addressData.formattedAddress}
        onSelect={handleAddressSelect}
        onInputChange={handleInputChange}
        placeholder={field.placeholder || 'Search for an address...'}
        disabled={disabled}
        countryRestrictions={countryRestrictions}
        hasError={!!error}
      />

      {/* Detail Fields */}
      {showDetailFields && !isAddressEmpty(addressData) && (
        <div className="bfp-address-details">
          <AddressDetailFields
            address={addressData}
            onChange={handleDetailChange}
            disabled={disabled}
          />
        </div>
      )}

      {/* Map Picker */}
      {showMapPicker && (
        <div className="bfp-address-map">
          <GoogleMapPicker
            latitude={addressData.latitude}
            longitude={addressData.longitude}
            onLocationSelect={handleMapLocationSelect}
            height={mapHeight}
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
}

export default AddressField;
