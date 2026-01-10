/**
 * Better Form - NumberField
 * Numeric input field
 */

'use client';

import React from 'react';
import type { FieldComponentProps } from '../components/WizardField';

export function NumberField({ field, value, onChange, error, disabled }: FieldComponentProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    // Allow empty value
    if (rawValue === '') {
      onChange(null);
      return;
    }

    // Parse the number
    const numValue =
      field.step && typeof field.step === 'number' && field.step < 1
        ? Number.parseFloat(rawValue)
        : Number.parseInt(rawValue, 10);

    if (!Number.isNaN(numValue)) {
      onChange(numValue);
    }
  };

  return (
    <input
      id={field.id}
      name={field.id}
      type="number"
      className={`better-form-input better-form-number ${error ? 'error' : ''}`}
      value={value !== null && value !== undefined ? String(value) : ''}
      onChange={handleChange}
      disabled={disabled}
      placeholder={field.placeholder}
      min={field.min}
      max={field.max}
      step={field.step || 1}
      aria-invalid={!!error}
      aria-describedby={error ? `${field.id}-error` : undefined}
    />
  );
}

/**
 * RangeField - Slider/range input
 */
export function RangeField({ field, value, onChange, error, disabled }: FieldComponentProps) {
  const min = field.min ?? 0;
  const max = field.max ?? 100;
  const step = field.step ?? 1;
  const currentValue = (value as number) ?? min;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number.parseFloat(e.target.value));
  };

  // Calculate percentage for styling
  const percentage = ((currentValue - min) / (max - min)) * 100;

  return (
    <div className={`better-form-range-wrapper ${error ? 'error' : ''}`}>
      <input
        id={field.id}
        name={field.id}
        type="range"
        className="better-form-range"
        value={currentValue}
        onChange={handleChange}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        style={{
          background: `linear-gradient(to right, var(--bf-color-primary) ${percentage}%, var(--bf-color-border) ${percentage}%)`,
        }}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={currentValue}
      />
      <div className="better-form-range-labels">
        <span className="better-form-range-min">{min}</span>
        <span className="better-form-range-value">{currentValue}</span>
        <span className="better-form-range-max">{max}</span>
      </div>
    </div>
  );
}

/**
 * CurrencyField - Number input with currency formatting
 */
export function CurrencyField({ field, value, onChange, error, disabled }: FieldComponentProps) {
  const [displayValue, setDisplayValue] = React.useState('');
  const currency = field.currency || 'EUR';
  const locale = field.locale || 'it-IT';

  // Format value for display
  React.useEffect(() => {
    if (value !== null && value !== undefined) {
      const formatter = new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      setDisplayValue(formatter.format(value as number));
    } else {
      setDisplayValue('');
    }
  }, [value, locale]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d.,]/g, '').replace(',', '.');
    setDisplayValue(e.target.value);

    if (rawValue === '') {
      onChange(null);
      return;
    }

    const numValue = Number.parseFloat(rawValue);
    if (!Number.isNaN(numValue)) {
      onChange(numValue);
    }
  };

  const handleBlur = () => {
    if (value !== null && value !== undefined) {
      const formatter = new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      setDisplayValue(formatter.format(value as number));
    }
  };

  const currencySymbol = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : currency;

  return (
    <div className={`better-form-currency-wrapper ${error ? 'error' : ''}`}>
      <span className="better-form-currency-symbol">{currencySymbol}</span>
      <input
        id={field.id}
        name={field.id}
        type="text"
        inputMode="decimal"
        className="better-form-input better-form-currency"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        placeholder={field.placeholder || '0,00'}
        aria-invalid={!!error}
      />
    </div>
  );
}

/**
 * PercentageField - Number input for percentages
 */
export function PercentageField({ field, value, onChange, error, disabled }: FieldComponentProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    if (rawValue === '') {
      onChange(null);
      return;
    }

    const numValue = Number.parseFloat(rawValue);
    if (!Number.isNaN(numValue)) {
      // Clamp between 0 and 100
      const clampedValue = Math.min(100, Math.max(0, numValue));
      onChange(clampedValue);
    }
  };

  return (
    <div className={`better-form-percentage-wrapper ${error ? 'error' : ''}`}>
      <input
        id={field.id}
        name={field.id}
        type="number"
        className="better-form-input better-form-percentage"
        value={value !== null && value !== undefined ? String(value) : ''}
        onChange={handleChange}
        disabled={disabled}
        placeholder={field.placeholder || '0'}
        min={0}
        max={100}
        step={field.step || 1}
        aria-invalid={!!error}
      />
      <span className="better-form-percentage-symbol">%</span>
    </div>
  );
}

export default NumberField;
