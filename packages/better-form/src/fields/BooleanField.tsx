/**
 * Better Form - BooleanField
 * Boolean/checkbox input field
 */

'use client';

import React from 'react';
import type { FieldComponentProps } from '../components/WizardField';

export function BooleanField({
  field,
  value,
  onChange,
  error,
  disabled,
}: FieldComponentProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <label className={`better-form-boolean ${error ? 'error' : ''}`}>
      <input
        id={field.id}
        name={field.id}
        type="checkbox"
        className="better-form-checkbox"
        checked={Boolean(value)}
        onChange={handleChange}
        disabled={disabled}
        aria-invalid={!!error}
      />
      <span className="better-form-boolean-label">
        {field.checkboxLabel || field.label}
      </span>
    </label>
  );
}

/**
 * SwitchField - Toggle switch for boolean values
 */
export function SwitchField({
  field,
  value,
  onChange,
  error,
  disabled,
}: FieldComponentProps) {
  const handleClick = () => {
    if (!disabled) {
      onChange(!value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className={`better-form-switch-wrapper ${error ? 'error' : ''}`}>
      <button
        id={field.id}
        type="button"
        role="switch"
        className={`better-form-switch ${value ? 'on' : 'off'}`}
        aria-checked={Boolean(value)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-label={field.label}
      >
        <span className="better-form-switch-thumb" />
      </button>
      {field.checkboxLabel && (
        <span className="better-form-switch-label" onClick={handleClick}>
          {field.checkboxLabel}
        </span>
      )}
    </div>
  );
}

/**
 * AcceptTermsField - Special boolean for terms acceptance
 */
export function AcceptTermsField({
  field,
  value,
  onChange,
  error,
  disabled,
}: FieldComponentProps) {
  return (
    <label className={`better-form-accept-terms ${error ? 'error' : ''}`}>
      <input
        id={field.id}
        name={field.id}
        type="checkbox"
        className="better-form-checkbox"
        checked={Boolean(value)}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        aria-invalid={!!error}
      />
      <span className="better-form-accept-terms-text">
        {field.termsText || (
          <>
            Accetto i{' '}
            <a
              href={field.termsUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              termini e condizioni
            </a>
          </>
        )}
      </span>
    </label>
  );
}

export default BooleanField;
