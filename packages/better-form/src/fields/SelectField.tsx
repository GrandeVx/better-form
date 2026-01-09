/**
 * Better Form - SelectField
 * Dropdown select field
 */

'use client';

import React from 'react';
import type { FieldComponentProps } from '../components/WizardField';

export function SelectField({
  field,
  value,
  onChange,
  error,
  disabled,
}: FieldComponentProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    // Convert back to original type if needed
    const option = field.options?.find((o) => String(o.value) === selectedValue);
    onChange(option ? option.value : selectedValue);
  };

  return (
    <select
      id={field.id}
      name={field.id}
      className={`better-form-select ${error ? 'error' : ''}`}
      value={value !== undefined && value !== null ? String(value) : ''}
      onChange={handleChange}
      disabled={disabled}
      aria-invalid={!!error}
      aria-describedby={error ? `${field.id}-error` : undefined}
    >
      {/* Placeholder option */}
      <option value="" disabled={field.required}>
        {field.placeholder || 'Seleziona...'}
      </option>

      {/* Options */}
      {field.options?.map((option) => (
        <option
          key={String(option.value)}
          value={String(option.value)}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}

/**
 * MultiSelectField - Multiple selection dropdown
 */
export function MultiSelectField({
  field,
  value,
  onChange,
  error,
  disabled,
}: FieldComponentProps) {
  const selectedValues = Array.isArray(value) ? value : [];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selected: unknown[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        const option = field.options?.find((o) => String(o.value) === options[i].value);
        selected.push(option ? option.value : options[i].value);
      }
    }
    onChange(selected);
  };

  return (
    <select
      id={field.id}
      name={field.id}
      className={`better-form-select better-form-multiselect ${error ? 'error' : ''}`}
      value={selectedValues.map(String)}
      onChange={handleChange}
      disabled={disabled}
      multiple
      size={Math.min(field.options?.length || 5, 8)}
      aria-invalid={!!error}
    >
      {field.options?.map((option) => (
        <option
          key={String(option.value)}
          value={String(option.value)}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}

/**
 * SearchableSelectField - Select with search functionality
 */
export function SearchableSelectField({
  field,
  value,
  onChange,
  error,
  disabled,
}: FieldComponentProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  // Filter options based on search
  const filteredOptions = React.useMemo(() => {
    if (!search) return field.options || [];
    const lowerSearch = search.toLowerCase();
    return (field.options || []).filter(
      (o) =>
        o.label.toLowerCase().includes(lowerSearch) ||
        String(o.value).toLowerCase().includes(lowerSearch)
    );
  }, [field.options, search]);

  // Get selected option label
  const selectedOption = field.options?.find((o) => o.value === value);
  const displayValue = selectedOption?.label || '';

  // Handle click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: unknown) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div
      ref={wrapperRef}
      className={`better-form-searchable-select ${isOpen ? 'open' : ''} ${
        error ? 'error' : ''
      }`}
    >
      <div
        className="better-form-searchable-select-trigger"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <span className="better-form-searchable-select-value">
          {displayValue || field.placeholder || 'Seleziona...'}
        </span>
        <span className="better-form-searchable-select-arrow">▼</span>
      </div>

      {isOpen && (
        <div className="better-form-searchable-select-dropdown">
          <input
            type="text"
            className="better-form-searchable-select-search"
            placeholder="Cerca..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          <ul className="better-form-searchable-select-options" role="listbox">
            {filteredOptions.length === 0 ? (
              <li className="better-form-searchable-select-empty">
                Nessun risultato
              </li>
            ) : (
              filteredOptions.map((option) => (
                <li
                  key={String(option.value)}
                  className={`better-form-searchable-select-option ${
                    option.value === value ? 'selected' : ''
                  } ${option.disabled ? 'disabled' : ''}`}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  role="option"
                  aria-selected={option.value === value}
                  aria-disabled={option.disabled}
                >
                  {option.label}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SelectField;
