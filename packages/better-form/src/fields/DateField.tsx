/**
 * Better Form - DateField
 * Date and time input fields
 */

'use client';

import React from 'react';
import type { FieldComponentProps } from '../components/WizardField';

export function DateField({
  field,
  value,
  onChange,
  error,
  disabled,
}: FieldComponentProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value || null);
  };

  // Format min/max dates
  const minDate = field.minDate
    ? typeof field.minDate === 'string'
      ? field.minDate
      : field.minDate.toISOString().split('T')[0]
    : undefined;

  const maxDate = field.maxDate
    ? typeof field.maxDate === 'string'
      ? field.maxDate
      : field.maxDate.toISOString().split('T')[0]
    : undefined;

  return (
    <input
      id={field.id}
      name={field.id}
      type="date"
      className={`better-form-input better-form-date ${error ? 'error' : ''}`}
      value={(value as string) || ''}
      onChange={handleChange}
      disabled={disabled}
      min={minDate}
      max={maxDate}
      aria-invalid={!!error}
      aria-describedby={error ? `${field.id}-error` : undefined}
    />
  );
}

/**
 * TimeField - Time input
 */
export function TimeField({
  field,
  value,
  onChange,
  error,
  disabled,
}: FieldComponentProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value || null);
  };

  return (
    <input
      id={field.id}
      name={field.id}
      type="time"
      className={`better-form-input better-form-time ${error ? 'error' : ''}`}
      value={(value as string) || ''}
      onChange={handleChange}
      disabled={disabled}
      step={field.step} // seconds step
      aria-invalid={!!error}
    />
  );
}

/**
 * DateTimeField - Combined date and time input
 */
export function DateTimeField({
  field,
  value,
  onChange,
  error,
  disabled,
}: FieldComponentProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value || null);
  };

  const minDateTime = field.minDate
    ? typeof field.minDate === 'string'
      ? field.minDate
      : field.minDate.toISOString().slice(0, 16)
    : undefined;

  const maxDateTime = field.maxDate
    ? typeof field.maxDate === 'string'
      ? field.maxDate
      : field.maxDate.toISOString().slice(0, 16)
    : undefined;

  return (
    <input
      id={field.id}
      name={field.id}
      type="datetime-local"
      className={`better-form-input better-form-datetime ${error ? 'error' : ''}`}
      value={(value as string) || ''}
      onChange={handleChange}
      disabled={disabled}
      min={minDateTime}
      max={maxDateTime}
      aria-invalid={!!error}
    />
  );
}

/**
 * MonthField - Month/year input
 */
export function MonthField({
  field,
  value,
  onChange,
  error,
  disabled,
}: FieldComponentProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value || null);
  };

  return (
    <input
      id={field.id}
      name={field.id}
      type="month"
      className={`better-form-input better-form-month ${error ? 'error' : ''}`}
      value={(value as string) || ''}
      onChange={handleChange}
      disabled={disabled}
      aria-invalid={!!error}
    />
  );
}

/**
 * WeekField - Week input
 */
export function WeekField({
  field,
  value,
  onChange,
  error,
  disabled,
}: FieldComponentProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value || null);
  };

  return (
    <input
      id={field.id}
      name={field.id}
      type="week"
      className={`better-form-input better-form-week ${error ? 'error' : ''}`}
      value={(value as string) || ''}
      onChange={handleChange}
      disabled={disabled}
      aria-invalid={!!error}
    />
  );
}

/**
 * DateRangeField - Start and end date selection
 */
export function DateRangeField({
  field,
  value,
  onChange,
  error,
  disabled,
}: FieldComponentProps) {
  const rangeValue = (value as { start?: string; end?: string }) || {};

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...rangeValue, start: e.target.value || null });
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...rangeValue, end: e.target.value || null });
  };

  return (
    <div className={`better-form-daterange ${error ? 'error' : ''}`}>
      <div className="better-form-daterange-field">
        <label htmlFor={`${field.id}-start`}>
          {field.startLabel || 'Data inizio'}
        </label>
        <input
          id={`${field.id}-start`}
          name={`${field.id}-start`}
          type="date"
          className="better-form-input"
          value={rangeValue.start || ''}
          onChange={handleStartChange}
          disabled={disabled}
          max={rangeValue.end}
        />
      </div>
      <div className="better-form-daterange-separator">→</div>
      <div className="better-form-daterange-field">
        <label htmlFor={`${field.id}-end`}>
          {field.endLabel || 'Data fine'}
        </label>
        <input
          id={`${field.id}-end`}
          name={`${field.id}-end`}
          type="date"
          className="better-form-input"
          value={rangeValue.end || ''}
          onChange={handleEndChange}
          disabled={disabled}
          min={rangeValue.start}
        />
      </div>
    </div>
  );
}

export default DateField;
