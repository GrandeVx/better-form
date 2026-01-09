/**
 * Better Form - Common Validation Rules
 * Pre-built validation rules for common use cases
 */

import { ValidationRule } from '../../types/wizard-schema';

/**
 * Common validation rule builders
 */
export const commonValidations = {
  /**
   * Required field validation
   */
  required: (message?: string): ValidationRule => ({
    type: 'required',
    message: message || 'This field is required',
  }),

  /**
   * Email validation
   */
  email: (message?: string): ValidationRule => ({
    type: 'email',
    message: message || 'Please enter a valid email address',
  }),

  /**
   * Minimum length validation
   */
  minLength: (length: number, message?: string): ValidationRule => ({
    type: 'minLength',
    value: length,
    message: message || `Must be at least ${length} characters`,
  }),

  /**
   * Maximum length validation
   */
  maxLength: (length: number, message?: string): ValidationRule => ({
    type: 'maxLength',
    value: length,
    message: message || `Must be at most ${length} characters`,
  }),

  /**
   * Pattern validation
   */
  pattern: (pattern: RegExp | string, message: string): ValidationRule => ({
    type: 'pattern',
    value: pattern,
    message,
  }),

  /**
   * Minimum value validation
   */
  min: (value: number, message?: string): ValidationRule => ({
    type: 'min',
    value,
    message: message || `Minimum value is ${value}`,
  }),

  /**
   * Maximum value validation
   */
  max: (value: number, message?: string): ValidationRule => ({
    type: 'max',
    value,
    message: message || `Maximum value is ${value}`,
  }),

  /**
   * Custom validation
   */
  custom: (
    validator: (value: unknown, formData: Record<string, unknown>) => boolean,
    message: string
  ): ValidationRule => ({
    type: 'custom',
    customValidator: validator,
    message,
  }),

  /**
   * Number range validation
   */
  range: (min: number, max: number, message?: string): ValidationRule => ({
    type: 'custom',
    customValidator: (value) => {
      const num = Number(value);
      return !isNaN(num) && num >= min && num <= max;
    },
    message: message || `Value must be between ${min} and ${max}`,
  }),

  /**
   * URL validation
   */
  url: (message?: string): ValidationRule => ({
    type: 'pattern',
    value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    message: message || 'Please enter a valid URL',
  }),

  /**
   * Phone number validation (basic)
   */
  phone: (message?: string): ValidationRule => ({
    type: 'pattern',
    value: /^[\+]?[(]?[0-9]{2,4}[)]?[-\s\.]?[(]?[0-9]{2,4}[)]?[-\s\.]?[0-9]{3,6}$/,
    message: message || 'Please enter a valid phone number',
  }),

  /**
   * Alphanumeric validation
   */
  alphanumeric: (message?: string): ValidationRule => ({
    type: 'pattern',
    value: /^[a-zA-Z0-9]+$/,
    message: message || 'Only letters and numbers are allowed',
  }),

  /**
   * Numeric validation
   */
  numeric: (message?: string): ValidationRule => ({
    type: 'pattern',
    value: /^\d+$/,
    message: message || 'Only numbers are allowed',
  }),

  /**
   * Decimal validation
   */
  decimal: (decimalPlaces?: number, message?: string): ValidationRule => ({
    type: 'pattern',
    value: decimalPlaces
      ? new RegExp(`^\\d+(\\.\\d{1,${decimalPlaces}})?$`)
      : /^\d+(\.\d+)?$/,
    message:
      message ||
      (decimalPlaces
        ? `Please enter a valid number with up to ${decimalPlaces} decimal places`
        : 'Please enter a valid number'),
  }),

  /**
   * Match another field validation
   */
  matchField: (fieldName: string, message?: string): ValidationRule => ({
    type: 'custom',
    customValidator: (value, formData) => value === formData[fieldName],
    message: message || 'Values do not match',
  }),

  /**
   * Different from another field validation
   */
  differentFrom: (fieldName: string, message?: string): ValidationRule => ({
    type: 'custom',
    customValidator: (value, formData) => value !== formData[fieldName],
    message: message || 'Values must be different',
  }),

  /**
   * File size validation (bytes)
   */
  fileSize: (maxBytes: number, message?: string): ValidationRule => ({
    type: 'custom',
    customValidator: (value) => {
      if (typeof File !== 'undefined' && value instanceof File) {
        return value.size <= maxBytes;
      }
      return true;
    },
    message:
      message ||
      `File size must be less than ${(maxBytes / (1024 * 1024)).toFixed(1)} MB`,
  }),

  /**
   * File type validation
   */
  fileType: (allowedTypes: string[], message?: string): ValidationRule => ({
    type: 'custom',
    customValidator: (value) => {
      if (typeof File !== 'undefined' && value instanceof File) {
        const extension = value.name.split('.').pop()?.toLowerCase();
        return extension ? allowedTypes.includes(extension) : false;
      }
      return true;
    },
    message:
      message ||
      `Allowed file types: ${allowedTypes.map((t) => t.toUpperCase()).join(', ')}`,
  }),

  /**
   * Date after validation
   */
  dateAfter: (date: Date | 'today', message?: string): ValidationRule => ({
    type: 'custom',
    customValidator: (value) => {
      if (!value) return true;
      const inputDate = new Date(value as string);
      const compareDate = date === 'today' ? new Date() : date;
      compareDate.setHours(0, 0, 0, 0);
      return inputDate > compareDate;
    },
    message: message || 'Date must be in the future',
  }),

  /**
   * Date before validation
   */
  dateBefore: (date: Date | 'today', message?: string): ValidationRule => ({
    type: 'custom',
    customValidator: (value) => {
      if (!value) return true;
      const inputDate = new Date(value as string);
      const compareDate = date === 'today' ? new Date() : date;
      compareDate.setHours(23, 59, 59, 999);
      return inputDate < compareDate;
    },
    message: message || 'Date must be in the past',
  }),
};

/**
 * Common validation patterns
 */
export const validationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  phone: /^[\+]?[(]?[0-9]{2,4}[)]?[-\s\.]?[(]?[0-9]{2,4}[)]?[-\s\.]?[0-9]{3,6}$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  numeric: /^\d+$/,
  decimal: /^\d+(\.\d{1,2})?$/,

  // Italian specific
  italianFiscalCode: /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/,
  italianVAT: /^\d{11}$/,
  italianPostalCode: /^\d{5}$/,

  // US specific
  usZipCode: /^\d{5}(-\d{4})?$/,
  usSSN: /^\d{3}-\d{2}-\d{4}$/,

  // UK specific
  ukPostcode: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,

  // Credit card (basic)
  creditCard: /^\d{13,19}$/,

  // UUID
  uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,

  // Slug
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,

  // Hex color
  hexColor: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i,

  // IP address
  ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
};
