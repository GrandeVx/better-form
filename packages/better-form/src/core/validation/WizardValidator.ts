/**
 * Better Form - Validation System
 * Handles field-level and step-level validation
 */

import type { ValidationRule, WizardConfig, WizardField } from '../../types/wizard-schema';
import { ConditionalLogicEvaluator } from '../conditional-logic/ConditionalLogicEvaluator';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface FieldValidationResult {
  isValid: boolean;
  error?: string;
}

export class WizardValidator {
  private config: WizardConfig;
  private formData: Record<string, unknown>;
  private evaluator: ConditionalLogicEvaluator;

  constructor(config: WizardConfig, formData: Record<string, unknown>) {
    this.config = config;
    this.formData = formData || {};
    this.evaluator = new ConditionalLogicEvaluator(formData);
  }

  /**
   * Update form data for validation
   */
  public updateFormData(formData: Record<string, unknown>): void {
    this.formData = formData || {};
    this.evaluator.updateFormData(formData);
  }

  /**
   * Get all fields from a specific step or all steps
   */
  private getFields(stepIndex?: number): WizardField[] {
    const fields: WizardField[] = [];

    const steps = stepIndex !== undefined ? [this.config.steps[stepIndex]] : this.config.steps;

    for (const step of steps) {
      if (!step) continue;

      // Skip steps that are not visible
      if (!this.evaluator.isFieldVisible(step.showIf, step.hideIf)) {
        continue;
      }

      for (const group of step.fieldGroups || []) {
        // Only include fields from visible groups
        if (this.evaluator.isFieldVisible(group.showIf, group.hideIf)) {
          fields.push(...group.fields);
        }
      }
    }

    return fields;
  }

  /**
   * Validate a single field value
   */
  public validateField(field: WizardField, value: unknown): FieldValidationResult {
    // Skip validation if field is not visible
    if (!this.evaluator.isFieldVisible(field.showIf, field.hideIf)) {
      return { isValid: true };
    }

    // Skip validation if field is disabled
    if (this.evaluator.isFieldDisabled(field.disabled, field.disabledIf)) {
      return { isValid: true };
    }

    const validations = field.validations || [];

    for (const rule of validations) {
      const error = this.validateRule(rule, value, field);
      if (error) {
        return { isValid: false, error };
      }
    }

    return { isValid: true };
  }

  /**
   * Validate a single rule
   */
  private validateRule(rule: ValidationRule, value: unknown, field: WizardField): string | null {
    switch (rule.type) {
      case 'required':
        if (this.isEmpty(value)) {
          return rule.message || `${field.label} is required`;
        }
        break;

      case 'minLength':
        if (value && String(value).length < (rule.value as number)) {
          return rule.message || `${field.label} must be at least ${rule.value} characters`;
        }
        break;

      case 'maxLength':
        if (value && String(value).length > (rule.value as number)) {
          return rule.message || `${field.label} must be at most ${rule.value} characters`;
        }
        break;

      case 'pattern': {
        const pattern =
          rule.value instanceof RegExp ? rule.value : new RegExp(rule.value as string);
        if (value && !pattern.test(String(value))) {
          return rule.message || `${field.label} format is invalid`;
        }
        break;
      }

      case 'min':
        if (value !== null && value !== undefined && Number(value) < (rule.value as number)) {
          return rule.message || `${field.label} must be at least ${rule.value}`;
        }
        break;

      case 'max':
        if (value !== null && value !== undefined && Number(value) > (rule.value as number)) {
          return rule.message || `${field.label} must be at most ${rule.value}`;
        }
        break;

      case 'email': {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailPattern.test(String(value))) {
          return rule.message || `${field.label} must be a valid email address`;
        }
        break;
      }

      case 'custom':
        if (rule.customValidator && !rule.customValidator(value, this.formData)) {
          return rule.message || `${field.label} is invalid`;
        }
        break;

      default:
        console.warn(`Unknown validation type: ${rule.type}`);
    }

    return null;
  }

  /**
   * Check if a value is considered empty
   */
  private isEmpty(value: unknown): boolean {
    // File objects are not empty
    if (typeof File !== 'undefined' && value instanceof File) {
      return false;
    }

    return (
      value === null ||
      value === undefined ||
      value === '' ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'object' &&
        !Array.isArray(value) &&
        Object.keys(value as object).length === 0)
    );
  }

  /**
   * Validate a specific step
   */
  public validateStep(stepIndex: number): ValidationResult {
    const errors: Record<string, string> = {};
    const step = this.config.steps[stepIndex];

    if (!step) {
      return { isValid: true, errors: {} };
    }

    // Skip validation for hidden steps
    if (!this.evaluator.isFieldVisible(step.showIf, step.hideIf)) {
      return { isValid: true, errors: {} };
    }

    const fields = this.getFields(stepIndex);

    // Validate each field
    for (const field of fields) {
      // Skip invisible fields
      if (!this.evaluator.isFieldVisible(field.showIf, field.hideIf)) {
        continue;
      }

      const value = this.formData[field.name];
      const result = this.validateField(field, value);

      if (!result.isValid && result.error) {
        errors[field.name] = result.error;
      }
    }

    // Run step-level validation if provided
    if (step.canProceed) {
      const canProceed = step.canProceed(this.formData);
      if (typeof canProceed === 'string') {
        errors._step = canProceed;
      } else if (canProceed === false) {
        errors._step = 'Cannot proceed. Please verify your data.';
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  /**
   * Validate all steps
   */
  public validateAll(): ValidationResult {
    const errors: Record<string, string> = {};

    for (let i = 0; i < this.config.steps.length; i++) {
      const stepResult = this.validateStep(i);
      Object.assign(errors, stepResult.errors);
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  /**
   * Validate specific fields by name
   */
  public validateFields(fieldNames: string[]): ValidationResult {
    const errors: Record<string, string> = {};
    const allFields = this.getFields();

    for (const fieldName of fieldNames) {
      const field = allFields.find((f) => f.name === fieldName);
      if (field) {
        const value = this.formData[fieldName];
        const result = this.validateField(field, value);

        if (!result.isValid && result.error) {
          errors[fieldName] = result.error;
        }
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  /**
   * Check if a step is complete (all required fields filled)
   */
  public isStepComplete(stepIndex: number): boolean {
    const step = this.config.steps[stepIndex];

    if (!step) {
      return true;
    }

    // Hidden steps are considered complete
    if (!this.evaluator.isFieldVisible(step.showIf, step.hideIf)) {
      return true;
    }

    const fields = this.getFields(stepIndex);

    for (const field of fields) {
      // Skip invisible fields
      if (!this.evaluator.isFieldVisible(field.showIf, field.hideIf)) {
        continue;
      }

      // Skip disabled fields
      if (this.evaluator.isFieldDisabled(field.disabled, field.disabledIf)) {
        continue;
      }

      // Check if required fields have values
      const requiredRule = field.validations?.find((v) => v.type === 'required');
      if (requiredRule) {
        const value = this.formData[field.name];
        if (this.isEmpty(value)) {
          return false;
        }
      }
    }

    // Check step-level validation
    if (step.canProceed) {
      const canProceed = step.canProceed(this.formData);
      if (canProceed === false || typeof canProceed === 'string') {
        return false;
      }
    }

    return true;
  }

  /**
   * Get list of missing required fields for a step
   */
  public getMissingRequiredFields(stepIndex: number): string[] {
    const step = this.config.steps[stepIndex];

    if (!step) {
      return [];
    }

    // Hidden steps have no missing required fields
    if (!this.evaluator.isFieldVisible(step.showIf, step.hideIf)) {
      return [];
    }

    const missingFields: string[] = [];
    const fields = this.getFields(stepIndex);

    for (const field of fields) {
      // Skip invisible fields
      if (!this.evaluator.isFieldVisible(field.showIf, field.hideIf)) {
        continue;
      }

      // Skip disabled fields
      if (this.evaluator.isFieldDisabled(field.disabled, field.disabledIf)) {
        continue;
      }

      // Check if required fields have values
      const requiredRule = field.validations?.find((v) => v.type === 'required');
      if (requiredRule) {
        const value = this.formData[field.name];
        if (this.isEmpty(value)) {
          missingFields.push(field.label);
        }
      }
    }

    return missingFields;
  }
}
