/**
 * Better Form - TextareaField
 * Multi-line text input field
 */

'use client';

import React from 'react';
import type { FieldComponentProps } from '../components/WizardField';

export interface TextareaFieldConfig {
  rows?: number;
  maxRows?: number;
  autoResize?: boolean;
}

export function TextareaField({
  field,
  value,
  onChange,
  error,
  disabled,
}: FieldComponentProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);

    // Auto-resize if enabled
    if (field.autoResize && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // Calculate remaining characters if maxLength is set
  const currentLength = ((value as string) || '').length;
  const maxLength = field.maxLength;
  const showCounter = maxLength && maxLength > 0;

  return (
    <div className="better-form-textarea-wrapper">
      <textarea
        ref={textareaRef}
        id={field.id}
        name={field.id}
        className={`better-form-textarea ${error ? 'error' : ''}`}
        value={(value as string) || ''}
        onChange={handleChange}
        disabled={disabled}
        placeholder={field.placeholder}
        rows={field.rows || 4}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={error ? `${field.id}-error` : undefined}
      />
      {showCounter && (
        <div className="better-form-textarea-counter">
          {currentLength}/{maxLength}
        </div>
      )}
    </div>
  );
}

export default TextareaField;
