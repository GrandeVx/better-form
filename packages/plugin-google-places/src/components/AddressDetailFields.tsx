/**
 * @better-form/plugin-google-places - AddressDetailFields
 *
 * Editable address detail fields
 *
 * Fields:
 * - Street (Indirizzo)
 * - Number (Numero Civico)
 * - Postal Code (CAP)
 * - City (Citta)
 *
 * Notes:
 * - Debounced onChange (500ms)
 * - Clears coordinates when edited manually
 */

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { AddressData } from '../types';

export interface AddressDetailFieldsProps {
  /** Current address data */
  address: AddressData;

  /** Called when any field changes */
  onChange: (address: AddressData, clearedCoordinates: boolean) => void;

  /** Is the field disabled */
  disabled?: boolean;

  /** Custom class name */
  className?: string;

  /** Labels for fields (for i18n) */
  labels?: {
    street?: string;
    number?: string;
    postalCode?: string;
    city?: string;
  };

  /** Placeholders for fields */
  placeholders?: {
    street?: string;
    number?: string;
    postalCode?: string;
    city?: string;
  };
}

const DEBOUNCE_DELAY = 500;

const defaultLabels = {
  street: 'Street',
  number: 'Number',
  postalCode: 'Postal Code',
  city: 'City',
};

const defaultPlaceholders = {
  street: 'Enter street name',
  number: 'No.',
  postalCode: 'ZIP/CAP',
  city: 'Enter city',
};

export function AddressDetailFields({
  address,
  onChange,
  disabled = false,
  className,
  labels = defaultLabels,
  placeholders = defaultPlaceholders,
}: AddressDetailFieldsProps) {
  const [localAddress, setLocalAddress] = useState<AddressData>(address);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);

  // Sync with external address changes
  useEffect(() => {
    // Skip first render to avoid overwriting initial values
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setLocalAddress(address);
  }, [address]);

  // Handle field change
  const handleFieldChange = useCallback(
    (field: keyof AddressData, value: string) => {
      const updatedAddress = {
        ...localAddress,
        [field]: value,
        // Clear coordinates when user manually edits address
        latitude: undefined,
        longitude: undefined,
      };

      setLocalAddress(updatedAddress);

      // Clear previous timer
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      // Debounce the callback
      debounceRef.current = setTimeout(() => {
        onChange(updatedAddress, true); // true = coordinates were cleared
      }, DEBOUNCE_DELAY);
    },
    [localAddress, onChange]
  );

  // Cleanup debounce timer
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const mergedLabels = { ...defaultLabels, ...labels };
  const mergedPlaceholders = { ...defaultPlaceholders, ...placeholders };

  return (
    <div className={`bfp-detail-fields ${className || ''}`}>
      <div className="bfp-detail-row">
        <div className="bfp-detail-field bfp-detail-field-street">
          <label className="bfp-detail-label">{mergedLabels.street}</label>
          <input
            type="text"
            value={localAddress.street || ''}
            onChange={(e) => handleFieldChange('street', e.target.value)}
            placeholder={mergedPlaceholders.street}
            disabled={disabled}
            className="bfp-detail-input"
          />
        </div>

        <div className="bfp-detail-field bfp-detail-field-number">
          <label className="bfp-detail-label">{mergedLabels.number}</label>
          <input
            type="text"
            value={localAddress.number || ''}
            onChange={(e) => handleFieldChange('number', e.target.value)}
            placeholder={mergedPlaceholders.number}
            disabled={disabled}
            className="bfp-detail-input"
          />
        </div>
      </div>

      <div className="bfp-detail-row">
        <div className="bfp-detail-field bfp-detail-field-postal">
          <label className="bfp-detail-label">{mergedLabels.postalCode}</label>
          <input
            type="text"
            value={localAddress.postalCode || ''}
            onChange={(e) => handleFieldChange('postalCode', e.target.value)}
            placeholder={mergedPlaceholders.postalCode}
            disabled={disabled}
            className="bfp-detail-input"
          />
        </div>

        <div className="bfp-detail-field bfp-detail-field-city">
          <label className="bfp-detail-label">{mergedLabels.city}</label>
          <input
            type="text"
            value={localAddress.city || ''}
            onChange={(e) => handleFieldChange('city', e.target.value)}
            placeholder={mergedPlaceholders.city}
            disabled={disabled}
            className="bfp-detail-input"
          />
        </div>
      </div>
    </div>
  );
}
