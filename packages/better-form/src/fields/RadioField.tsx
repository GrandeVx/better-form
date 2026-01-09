/**
 * Better Form - RadioField
 * Radio button group field
 */

'use client';

import React from 'react';
import type { FieldComponentProps } from '../components/WizardField';

export function RadioField({
  field,
  value,
  onChange,
  error,
  disabled,
}: FieldComponentProps) {
  const handleChange = (optionValue: unknown) => {
    onChange(optionValue);
  };

  const layout = field.layout || 'vertical';

  return (
    <div
      className={`better-form-radio-group ${layout} ${error ? 'error' : ''}`}
      role="radiogroup"
      aria-labelledby={`${field.id}-label`}
    >
      {field.options?.map((option) => (
        <label
          key={String(option.value)}
          className={`better-form-radio-option ${
            option.value === value ? 'selected' : ''
          } ${option.disabled ? 'disabled' : ''}`}
        >
          <input
            type="radio"
            name={field.id}
            className="better-form-radio-input"
            checked={option.value === value}
            onChange={() => handleChange(option.value)}
            disabled={disabled || option.disabled}
            value={String(option.value)}
          />
          <span className="better-form-radio-mark" />
          <span className="better-form-radio-label">
            {option.label}
            {option.description && (
              <span className="better-form-radio-description">
                {option.description}
              </span>
            )}
          </span>
        </label>
      ))}
    </div>
  );
}

/**
 * RadioCardsField - Radio buttons displayed as clickable cards
 */
export function RadioCardsField({
  field,
  value,
  onChange,
  error,
  disabled,
}: FieldComponentProps) {
  const handleSelect = (optionValue: unknown) => {
    if (!disabled) {
      onChange(optionValue);
    }
  };

  const columns = field.columns || 2;

  return (
    <div
      className={`better-form-radio-cards ${error ? 'error' : ''}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
      role="radiogroup"
    >
      {field.options?.map((option) => {
        const isSelected = option.value === value;
        const isDisabled = disabled || option.disabled;

        return (
          <div
            key={String(option.value)}
            className={`better-form-radio-card ${isSelected ? 'selected' : ''} ${
              isDisabled ? 'disabled' : ''
            }`}
            onClick={() => !isDisabled && handleSelect(option.value)}
            onKeyDown={(e) => {
              if (!isDisabled && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                handleSelect(option.value);
              }
            }}
            role="radio"
            aria-checked={isSelected}
            aria-disabled={isDisabled}
            tabIndex={isDisabled ? -1 : 0}
          >
            {option.icon && (
              <div className="better-form-radio-card-icon">{option.icon}</div>
            )}
            <div className="better-form-radio-card-content">
              <div className="better-form-radio-card-label">{option.label}</div>
              {option.description && (
                <div className="better-form-radio-card-description">
                  {option.description}
                </div>
              )}
            </div>
            <div className="better-form-radio-card-check">
              {isSelected && '✓'}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * ButtonGroupField - Radio buttons styled as a button group
 */
export function ButtonGroupField({
  field,
  value,
  onChange,
  error,
  disabled,
}: FieldComponentProps) {
  return (
    <div
      className={`better-form-button-group ${error ? 'error' : ''}`}
      role="radiogroup"
    >
      {field.options?.map((option) => {
        const isSelected = option.value === value;
        const isDisabled = disabled || option.disabled;

        return (
          <button
            key={String(option.value)}
            type="button"
            className={`better-form-button-group-item ${
              isSelected ? 'selected' : ''
            }`}
            onClick={() => onChange(option.value)}
            disabled={isDisabled}
            aria-pressed={isSelected}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default RadioField;
