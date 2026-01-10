/**
 * Better Form - WizardField
 * Renders a single field with the appropriate field component
 */

'use client';

import type React from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useWizard } from '../hooks/useWizard';
import type { FieldComponentProps, WizardField as WizardFieldType } from '../types/wizard-schema';

// Re-export for backwards compatibility
export type { FieldComponentProps };

export interface WizardFieldProps {
  /** Field configuration */
  field: WizardFieldType;
  /** Custom class name */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Override the field component */
  component?: React.ComponentType<FieldComponentProps>;
}

/**
 * WizardField - Renders a field using the appropriate field component
 */
export function WizardField({ field, className, style, component }: WizardFieldProps) {
  const { state, formData, setFieldValue, fieldComponents } = useWizard();

  const value = formData[field.id];
  const error = state.errors[field.id];
  const isDisabled = field.disabled || state.isSubmitting;

  // Debounce timer for onChange callback
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Get the field component to use
  const FieldComponent =
    component || fieldComponents[field.type] || fieldComponents[field.type.toLowerCase()];

  // Handle value change with debounced callback
  const handleChange = useCallback(
    (newValue: unknown) => {
      setFieldValue(field.id, newValue);

      // Call onChange callback if provided (debounced)
      if (field.onChange) {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(async () => {
          if (field.onChange) {
            // Get the return value from onChange (can be sync or async)
            const updates = await field.onChange(newValue, formData);
            console.log('[better-form] onChange returned:', updates);
            // If onChange returns an object, update the corresponding fields
            if (updates && typeof updates === 'object') {
              for (const [fieldName, fieldValue] of Object.entries(updates)) {
                console.log(`[better-form] Setting ${fieldName} = ${fieldValue}`);
                setFieldValue(fieldName, fieldValue);
              }
            }
          }
        }, 300);
      }
    },
    [field.id, field.onChange, setFieldValue, formData]
  );

  // Cleanup debounce timer
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Props to pass to field component
  const fieldProps: FieldComponentProps = useMemo(
    () => ({
      field,
      value,
      onChange: handleChange,
      error,
      disabled: isDisabled,
      required: field.required,
      formData,
    }),
    [field, value, handleChange, error, isDisabled, formData]
  );

  if (!FieldComponent) {
    console.warn(`No component found for field type: ${field.type}`);
    return <div className="better-form-field-error">Unknown field type: {field.type}</div>;
  }

  return (
    <div
      className={`better-form-field ${className || ''} ${error ? 'has-error' : ''} ${
        isDisabled ? 'disabled' : ''
      }`}
      style={style}
      data-field-id={field.id}
      data-field-type={field.type}
    >
      {/* Label */}
      {field.label && (
        <label className="better-form-label" htmlFor={field.id}>
          {field.label}
          {field.required && <span className="better-form-required">*</span>}
          {field.tooltip && (
            <span className="better-form-tooltip" title={field.tooltip}>
              ℹ
            </span>
          )}
        </label>
      )}

      {/* Description */}
      {field.description && <p className="better-form-description">{field.description}</p>}

      {/* Field Component */}
      <div className="better-form-input-wrapper">
        <FieldComponent {...fieldProps} />
      </div>

      {/* Error Message */}
      {error && <p className="better-form-error">{error}</p>}

      {/* Helper Text */}
      {field.helperText && !error && <p className="better-form-helper">{field.helperText}</p>}
    </div>
  );
}

/**
 * FieldError - Display field error inline
 */
export interface FieldErrorProps {
  fieldId: string;
  className?: string;
}

export function FieldError({ fieldId, className }: FieldErrorProps) {
  const { state } = useWizard();
  const error = state.errors[fieldId];

  if (!error) return null;

  return <p className={`better-form-error ${className || ''}`}>{error}</p>;
}

/**
 * FieldValue - Display current field value (for debugging/display)
 */
export interface FieldValueProps {
  fieldId: string;
  format?: (value: unknown) => string;
  className?: string;
}

export function FieldValue({ fieldId, format, className }: FieldValueProps) {
  const { formData } = useWizard();
  const value = formData[fieldId];

  const displayValue = format ? format(value) : String(value ?? '');

  return <span className={`better-form-value ${className || ''}`}>{displayValue}</span>;
}

/**
 * ConditionalField - Wrapper to show/hide field based on condition
 */
export interface ConditionalFieldProps {
  /** Field ID to check visibility */
  fieldId: string;
  /** Children to render if field is visible */
  children: React.ReactNode;
  /** Invert the condition (show when field is hidden) */
  invert?: boolean;
}

export function ConditionalField({ fieldId, children, invert = false }: ConditionalFieldProps) {
  const { getVisibleFields, visibleCurrentStepIndex, visibleSteps } = useWizard();

  const currentVisibleStep = visibleSteps[visibleCurrentStepIndex];
  if (!currentVisibleStep) return null;

  const visibleFields = getVisibleFields(currentVisibleStep.originalIndex);
  const isVisible = visibleFields.some((f) => f.id === fieldId);
  const shouldShow = invert ? !isVisible : isVisible;

  return shouldShow ? <>{children}</> : null;
}

export default WizardField;
