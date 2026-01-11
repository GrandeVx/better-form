/**
 * better-form-plugin-google-places - AddressAutocomplete
 *
 * Google Places Autocomplete input component
 *
 * Features:
 * - Debounced predictions (300ms)
 * - Keyboard navigation
 * - Race condition prevention
 * - Country/language restrictions
 */

'use client';

import { type KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useGoogleMaps } from '../hooks/useGoogleMaps';
import type { AddressData, PlacePrediction } from '../types';

export interface AddressAutocompleteProps {
  /** Current value (formatted address) */
  value: string;

  /** Called when user selects an address */
  onSelect: (address: AddressData) => void;

  /** Called when input value changes */
  onInputChange?: (value: string) => void;

  /** Placeholder text */
  placeholder?: string;

  /** Is the field disabled */
  disabled?: boolean;

  /** Country restrictions */
  countryRestrictions?: string[];

  /** Field ID for accessibility */
  id?: string;

  /** Custom class name */
  className?: string;

  /** Error state */
  hasError?: boolean;
}

const DEBOUNCE_DELAY = 300;

export function AddressAutocomplete({
  value,
  onSelect,
  onInputChange,
  placeholder = 'Start typing an address...',
  disabled = false,
  countryRestrictions,
  id,
  className,
  hasError,
}: AddressAutocompleteProps) {
  const { isLoaded, searchPredictions, getPlaceDetails } = useGoogleMaps();

  const [inputValue, setInputValue] = useState(value);
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync external value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Search predictions with debounce
  const handleInputChange = useCallback(
    (newValue: string) => {
      setInputValue(newValue);
      onInputChange?.(newValue);

      // Clear previous timer
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      if (!newValue.trim()) {
        setPredictions([]);
        setIsOpen(false);
        return;
      }

      debounceRef.current = setTimeout(async () => {
        if (!isLoaded) return;

        setIsLoading(true);
        try {
          const results = await searchPredictions(newValue, countryRestrictions);
          setPredictions(results);
          setIsOpen(results.length > 0);
          setHighlightedIndex(-1);
        } finally {
          setIsLoading(false);
        }
      }, DEBOUNCE_DELAY);
    },
    [isLoaded, searchPredictions, countryRestrictions, onInputChange]
  );

  // Handle prediction selection
  const handleSelect = useCallback(
    async (prediction: PlacePrediction) => {
      setIsLoading(true);
      setIsOpen(false);
      setPredictions([]);

      try {
        const address = await getPlaceDetails(prediction.placeId);
        if (address) {
          setInputValue(address.formattedAddress);
          onSelect(address);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [getPlaceDetails, onSelect]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen || predictions.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) => (prev < predictions.length - 1 ? prev + 1 : 0));
          break;

        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : predictions.length - 1));
          break;

        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0 && predictions[highlightedIndex]) {
            handleSelect(predictions[highlightedIndex]);
          }
          break;

        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          setPredictions([]);
          break;

        case 'Tab':
          setIsOpen(false);
          break;
      }
    },
    [isOpen, predictions, highlightedIndex, handleSelect]
  );

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement;
      if (item) {
        item.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        listRef.current &&
        !listRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup debounce timer
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div className={`bfp-address-autocomplete ${className || ''}`}>
      <div className="bfp-autocomplete-input-wrapper">
        <input
          ref={inputRef}
          id={id}
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (predictions.length > 0) setIsOpen(true);
          }}
          placeholder={placeholder}
          disabled={disabled || !isLoaded}
          className={`bfp-autocomplete-input ${hasError ? 'has-error' : ''}`}
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          role="combobox"
        />

        {isLoading && (
          <div className="bfp-autocomplete-spinner" aria-hidden="true">
            <svg className="bfp-spinner" viewBox="0 0 24 24">
              <circle
                className="bfp-spinner-circle"
                cx="12"
                cy="12"
                r="10"
                fill="none"
                strokeWidth="3"
              />
            </svg>
          </div>
        )}
      </div>

      {isOpen && predictions.length > 0 && (
        <ul ref={listRef} className="bfp-autocomplete-list" aria-label="Address suggestions">
          {predictions.map((prediction, index) => (
            <li
              key={prediction.placeId}
              aria-selected={index === highlightedIndex}
              className={`bfp-autocomplete-item ${index === highlightedIndex ? 'highlighted' : ''}`}
              onClick={() => handleSelect(prediction)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <span className="bfp-autocomplete-main">{prediction.mainText}</span>
              <span className="bfp-autocomplete-secondary">{prediction.secondaryText}</span>
            </li>
          ))}
        </ul>
      )}

      {!isLoaded && <div className="bfp-autocomplete-loading-text">Loading Google Maps...</div>}
    </div>
  );
}
