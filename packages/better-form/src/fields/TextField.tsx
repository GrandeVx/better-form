/**
 * Better Form - TextField
 * Basic text input field
 */

'use client';

import React from 'react';
import type { FieldComponentProps } from '../components/WizardField';

export function TextField({
  field,
  value,
  onChange,
  error,
  disabled,
}: FieldComponentProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  // Determine input type based on field configuration
  const inputType = field.inputType || 'text';

  return (
    <input
      id={field.id}
      name={field.id}
      type={inputType}
      className={`better-form-input ${error ? 'error' : ''}`}
      value={(value as string) || ''}
      onChange={handleChange}
      disabled={disabled}
      placeholder={field.placeholder}
      minLength={field.minLength}
      maxLength={field.maxLength}
      pattern={field.pattern}
      autoComplete={field.autoComplete}
      aria-invalid={!!error}
      aria-describedby={error ? `${field.id}-error` : undefined}
    />
  );
}

/**
 * EmailField - Email input with validation
 */
export function EmailField(props: FieldComponentProps) {
  return <TextField {...props} field={{ ...props.field, inputType: 'email' }} />;
}

/**
 * PasswordField - Password input
 */
export function PasswordField(props: FieldComponentProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="better-form-password-wrapper">
      <input
        id={props.field.id}
        name={props.field.id}
        type={showPassword ? 'text' : 'password'}
        className={`better-form-input ${props.error ? 'error' : ''}`}
        value={(props.value as string) || ''}
        onChange={(e) => props.onChange(e.target.value)}
        disabled={props.disabled}
        placeholder={props.field.placeholder}
        minLength={props.field.minLength}
        maxLength={props.field.maxLength}
        autoComplete={props.field.autoComplete || 'current-password'}
        aria-invalid={!!props.error}
      />
      <button
        type="button"
        className="better-form-password-toggle"
        onClick={() => setShowPassword(!showPassword)}
        tabIndex={-1}
        aria-label={showPassword ? 'Nascondi password' : 'Mostra password'}
      >
        {showPassword ? '👁️' : '👁️‍🗨️'}
      </button>
    </div>
  );
}

/**
 * PhoneField - Phone number input
 */
export function PhoneField(props: FieldComponentProps) {
  return (
    <TextField
      {...props}
      field={{ ...props.field, inputType: 'tel', autoComplete: 'tel' }}
    />
  );
}

/**
 * UrlField - URL input
 */
export function UrlField(props: FieldComponentProps) {
  return <TextField {...props} field={{ ...props.field, inputType: 'url' }} />;
}

export default TextField;
