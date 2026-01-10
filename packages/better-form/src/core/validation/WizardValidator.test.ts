/**
 * WizardValidator Test Suite
 * Comprehensive tests for form validation logic
 */

import { describe, expect, it, vi } from 'vitest';
import type { WizardConfig, WizardField } from '../../types/wizard-schema';
import { WizardValidator } from './WizardValidator';

// Helper to create a minimal config
function createConfig(
  fields: WizardField[],
  stepOptions?: Partial<WizardConfig['steps'][0]>
): WizardConfig {
  return {
    id: 'test-wizard',
    title: 'Test Wizard',
    steps: [
      {
        id: 'step-1',
        title: 'Step 1',
        fieldGroups: [
          {
            id: 'group-1',
            fields,
          },
        ],
        ...stepOptions,
      },
    ],
  };
}

// Helper to create a field
function createField(overrides: Partial<WizardField> = {}): WizardField {
  return {
    id: 'test-field',
    name: 'testField',
    label: 'Test Field',
    type: 'text',
    ...overrides,
  };
}

describe('WizardValidator', () => {
  describe('constructor', () => {
    it('should create validator with config and form data', () => {
      const config = createConfig([createField()]);
      const validator = new WizardValidator(config, {});
      expect(validator).toBeDefined();
    });

    it('should handle null/undefined form data', () => {
      const config = createConfig([createField()]);
      const validator = new WizardValidator(config, null as unknown as Record<string, unknown>);
      expect(validator).toBeDefined();
    });
  });

  describe('updateFormData', () => {
    it('should update form data for validation', () => {
      const field = createField({ required: true });
      const config = createConfig([field]);
      const validator = new WizardValidator(config, {});

      // Initially invalid
      let result = validator.validateStep(0);
      expect(result.isValid).toBe(false);

      // Update with valid data
      validator.updateFormData({ testField: 'value' });
      result = validator.validateStep(0);
      expect(result.isValid).toBe(true);
    });
  });

  describe('validateField', () => {
    describe('required validation', () => {
      it('should fail for empty string when required', () => {
        const field = createField({ required: true });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {});

        const result = validator.validateField(field, '');
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('required');
      });

      it('should fail for null when required', () => {
        const field = createField({ required: true });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {});

        const result = validator.validateField(field, null);
        expect(result.isValid).toBe(false);
      });

      it('should fail for undefined when required', () => {
        const field = createField({ required: true });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {});

        const result = validator.validateField(field, undefined);
        expect(result.isValid).toBe(false);
      });

      it('should fail for empty array when required', () => {
        const field = createField({ required: true });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {});

        const result = validator.validateField(field, []);
        expect(result.isValid).toBe(false);
      });

      it('should fail for empty object when required', () => {
        const field = createField({ required: true });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {});

        const result = validator.validateField(field, {});
        expect(result.isValid).toBe(false);
      });

      it('should pass for non-empty value when required', () => {
        const field = createField({ required: true });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {});

        const result = validator.validateField(field, 'test');
        expect(result.isValid).toBe(true);
      });

      it('should pass for zero when required (valid number)', () => {
        const field = createField({ required: true, type: 'number' });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {});

        const result = validator.validateField(field, 0);
        expect(result.isValid).toBe(true);
      });

      it('should pass for false when required (valid boolean)', () => {
        const field = createField({ required: true, type: 'boolean' });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {});

        const result = validator.validateField(field, false);
        expect(result.isValid).toBe(true);
      });
    });

    describe('email validation', () => {
      it('should auto-validate email format for email type fields', () => {
        const field = createField({ type: 'email', required: true });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {});

        const result = validator.validateField(field, 'invalid-email');
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('valid email');
      });

      it('should pass for valid email format', () => {
        const field = createField({ type: 'email', required: true });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {});

        const result = validator.validateField(field, 'test@example.com');
        expect(result.isValid).toBe(true);
      });

      it('should pass for empty email when not required', () => {
        const field = createField({ type: 'email', required: false });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {});

        const result = validator.validateField(field, '');
        expect(result.isValid).toBe(true);
      });

      it('should validate email with validations array', () => {
        const field = createField({
          type: 'text',
          validations: [{ type: 'email' }],
        });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {});

        const result = validator.validateField(field, 'invalid');
        expect(result.isValid).toBe(false);
      });
    });

    describe('minLength validation', () => {
      it('should fail when value is shorter than minLength', () => {
        const field = createField({
          validations: [{ type: 'minLength', value: 5 }],
        });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {});

        const result = validator.validateField(field, 'abc');
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('at least 5');
      });

      it('should pass when value meets minLength', () => {
        const field = createField({
          validations: [{ type: 'minLength', value: 5 }],
        });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {});

        const result = validator.validateField(field, 'abcde');
        expect(result.isValid).toBe(true);
      });

      it('should pass when value exceeds minLength', () => {
        const field = createField({
          validations: [{ type: 'minLength', value: 5 }],
        });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {});

        const result = validator.validateField(field, 'abcdefgh');
        expect(result.isValid).toBe(true);
      });
    });

    describe('maxLength validation', () => {
      it('should fail when value exceeds maxLength', () => {
        const field = createField({
          validations: [{ type: 'maxLength', value: 5 }],
        });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {});

        const result = validator.validateField(field, 'abcdefgh');
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('at most 5');
      });

      it('should pass when value meets maxLength', () => {
        const field = createField({
          validations: [{ type: 'maxLength', value: 5 }],
        });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {});

        const result = validator.validateField(field, 'abcde');
        expect(result.isValid).toBe(true);
      });
    });

    describe('min/max number validation', () => {
      it('should fail when number is below min', () => {
        const field = createField({
          type: 'number',
          validations: [{ type: 'min', value: 10 }],
        });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {});

        const result = validator.validateField(field, 5);
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('at least 10');
      });

      it('should pass when number equals min', () => {
        const field = createField({
          type: 'number',
          validations: [{ type: 'min', value: 10 }],
        });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {});

        const result = validator.validateField(field, 10);
        expect(result.isValid).toBe(true);
      });

      it('should fail when number exceeds max', () => {
        const field = createField({
          type: 'number',
          validations: [{ type: 'max', value: 100 }],
        });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {});

        const result = validator.validateField(field, 150);
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('at most 100');
      });

      it('should pass when number equals max', () => {
        const field = createField({
          type: 'number',
          validations: [{ type: 'max', value: 100 }],
        });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {});

        const result = validator.validateField(field, 100);
        expect(result.isValid).toBe(true);
      });
    });

    describe('pattern validation', () => {
      it('should fail when value does not match pattern string', () => {
        const field = createField({
          validations: [{ type: 'pattern', value: '^[A-Z]+$' }],
        });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {});

        const result = validator.validateField(field, 'abc123');
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('format is invalid');
      });

      it('should pass when value matches pattern string', () => {
        const field = createField({
          validations: [{ type: 'pattern', value: '^[A-Z]+$' }],
        });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {});

        const result = validator.validateField(field, 'ABC');
        expect(result.isValid).toBe(true);
      });

      it('should work with RegExp object', () => {
        const field = createField({
          validations: [{ type: 'pattern', value: /^\d{3}-\d{3}-\d{4}$/ }],
        });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {});

        const result = validator.validateField(field, '123-456-7890');
        expect(result.isValid).toBe(true);
      });
    });

    describe('custom validation', () => {
      it('should call custom validator function', () => {
        const customValidator = vi.fn().mockReturnValue(true);
        const field = createField({
          validations: [{ type: 'custom', customValidator, message: 'Custom error' }],
        });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, { testField: 'value' });

        validator.validateField(field, 'value');
        expect(customValidator).toHaveBeenCalledWith('value', { testField: 'value' });
      });

      it('should fail when custom validator returns false', () => {
        const field = createField({
          validations: [
            {
              type: 'custom',
              customValidator: () => false,
              message: 'Custom validation failed',
            },
          ],
        });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {});

        const result = validator.validateField(field, 'value');
        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Custom validation failed');
      });

      it('should pass when custom validator returns true', () => {
        const field = createField({
          validations: [
            {
              type: 'custom',
              customValidator: () => true,
            },
          ],
        });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {});

        const result = validator.validateField(field, 'value');
        expect(result.isValid).toBe(true);
      });

      it('should support cross-field validation', () => {
        const field = createField({
          name: 'endDate',
          label: 'End Date',
          validations: [
            {
              type: 'custom',
              customValidator: (value, formData) => {
                const startDate = formData.startDate as string;
                return !startDate || !value || value > startDate;
              },
              message: 'End date must be after start date',
            },
          ],
        });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {
          startDate: '2024-01-15',
          endDate: '2024-01-10',
        });

        const result = validator.validateField(field, '2024-01-10');
        expect(result.isValid).toBe(false);
        expect(result.error).toBe('End date must be after start date');
      });
    });

    describe('custom error messages', () => {
      it('should use custom message when provided', () => {
        const field = createField({
          validations: [{ type: 'required', message: 'Please fill this field' }],
        });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {});

        const result = validator.validateField(field, '');
        expect(result.error).toBe('Please fill this field');
      });
    });

    describe('conditional validation', () => {
      it('should skip validation for hidden fields', () => {
        const field = createField({
          required: true,
          hideIf: { field: 'toggle', operator: 'equals', value: true },
        });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, { toggle: true });

        const result = validator.validateField(field, '');
        expect(result.isValid).toBe(true);
      });

      it('should validate visible fields', () => {
        const field = createField({
          required: true,
          showIf: { field: 'toggle', operator: 'equals', value: true },
        });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, { toggle: true });

        const result = validator.validateField(field, '');
        expect(result.isValid).toBe(false);
      });

      it('should skip validation for disabled fields', () => {
        const field = createField({
          required: true,
          disabled: true,
        });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, {});

        const result = validator.validateField(field, '');
        expect(result.isValid).toBe(true);
      });

      it('should skip validation for conditionally disabled fields', () => {
        const field = createField({
          required: true,
          disabledIf: { field: 'status', operator: 'equals', value: 'locked' },
        });
        const config = createConfig([field]);
        const validator = new WizardValidator(config, { status: 'locked' });

        const result = validator.validateField(field, '');
        expect(result.isValid).toBe(true);
      });
    });
  });

  describe('validateStep', () => {
    it('should validate all fields in a step', () => {
      const field1 = createField({ id: 'f1', name: 'field1', label: 'Field 1', required: true });
      const field2 = createField({ id: 'f2', name: 'field2', label: 'Field 2', required: true });
      const config = createConfig([field1, field2]);
      const validator = new WizardValidator(config, {});

      const result = validator.validateStep(0);
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveProperty('field1');
      expect(result.errors).toHaveProperty('field2');
    });

    it('should return valid when all fields pass', () => {
      const field1 = createField({ id: 'f1', name: 'field1', label: 'Field 1', required: true });
      const field2 = createField({ id: 'f2', name: 'field2', label: 'Field 2', required: true });
      const config = createConfig([field1, field2]);
      const validator = new WizardValidator(config, {
        field1: 'value1',
        field2: 'value2',
      });

      const result = validator.validateStep(0);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it('should return valid for non-existent step', () => {
      const config = createConfig([createField()]);
      const validator = new WizardValidator(config, {});

      const result = validator.validateStep(999);
      expect(result.isValid).toBe(true);
    });

    it('should skip validation for hidden steps', () => {
      const field = createField({ required: true });
      const config = createConfig([field], {
        hideIf: { field: 'skipStep', operator: 'equals', value: true },
      });
      const validator = new WizardValidator(config, { skipStep: true });

      const result = validator.validateStep(0);
      expect(result.isValid).toBe(true);
    });

    it('should call step canProceed function', () => {
      const config = createConfig([createField()], {
        canProceed: () => 'Cannot proceed: custom error',
      });
      const validator = new WizardValidator(config, {});

      const result = validator.validateStep(0);
      expect(result.isValid).toBe(false);
      expect(result.errors._step).toBe('Cannot proceed: custom error');
    });

    it('should handle canProceed returning false', () => {
      const config = createConfig([createField()], {
        canProceed: () => false,
      });
      const validator = new WizardValidator(config, {});

      const result = validator.validateStep(0);
      expect(result.isValid).toBe(false);
      expect(result.errors._step).toContain('Cannot proceed');
    });

    it('should pass when canProceed returns true', () => {
      const config = createConfig([createField()], {
        canProceed: () => true,
      });
      const validator = new WizardValidator(config, {});

      const result = validator.validateStep(0);
      expect(result.isValid).toBe(true);
    });
  });

  describe('validateAll', () => {
    it('should validate all steps', () => {
      const config: WizardConfig = {
        id: 'test',
        title: 'Test',
        steps: [
          {
            id: 'step-1',
            title: 'Step 1',
            fieldGroups: [
              {
                id: 'g1',
                fields: [
                  createField({ id: 'f1', name: 'field1', label: 'Field 1', required: true }),
                ],
              },
            ],
          },
          {
            id: 'step-2',
            title: 'Step 2',
            fieldGroups: [
              {
                id: 'g2',
                fields: [
                  createField({ id: 'f2', name: 'field2', label: 'Field 2', required: true }),
                ],
              },
            ],
          },
        ],
      };
      const validator = new WizardValidator(config, {});

      const result = validator.validateAll();
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveProperty('field1');
      expect(result.errors).toHaveProperty('field2');
    });

    it('should return valid when all steps pass', () => {
      const config: WizardConfig = {
        id: 'test',
        title: 'Test',
        steps: [
          {
            id: 'step-1',
            title: 'Step 1',
            fieldGroups: [
              {
                id: 'g1',
                fields: [
                  createField({ id: 'f1', name: 'field1', label: 'Field 1', required: true }),
                ],
              },
            ],
          },
          {
            id: 'step-2',
            title: 'Step 2',
            fieldGroups: [
              {
                id: 'g2',
                fields: [
                  createField({ id: 'f2', name: 'field2', label: 'Field 2', required: true }),
                ],
              },
            ],
          },
        ],
      };
      const validator = new WizardValidator(config, {
        field1: 'value1',
        field2: 'value2',
      });

      const result = validator.validateAll();
      expect(result.isValid).toBe(true);
    });
  });

  describe('validateFields', () => {
    it('should validate specific fields by name', () => {
      const field1 = createField({ id: 'f1', name: 'field1', label: 'Field 1', required: true });
      const field2 = createField({ id: 'f2', name: 'field2', label: 'Field 2', required: true });
      const field3 = createField({ id: 'f3', name: 'field3', label: 'Field 3', required: true });
      const config = createConfig([field1, field2, field3]);
      const validator = new WizardValidator(config, {});

      const result = validator.validateFields(['field1', 'field3']);
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveProperty('field1');
      expect(result.errors).not.toHaveProperty('field2');
      expect(result.errors).toHaveProperty('field3');
    });

    it('should ignore non-existent fields', () => {
      const config = createConfig([createField()]);
      const validator = new WizardValidator(config, {});

      const result = validator.validateFields(['nonExistent']);
      expect(result.isValid).toBe(true);
    });
  });

  describe('isStepComplete', () => {
    it('should return false when required fields are empty', () => {
      const field = createField({ required: true });
      const config = createConfig([field]);
      const validator = new WizardValidator(config, {});

      expect(validator.isStepComplete(0)).toBe(false);
    });

    it('should return true when all required fields are filled', () => {
      const field = createField({ required: true });
      const config = createConfig([field]);
      const validator = new WizardValidator(config, { testField: 'value' });

      expect(validator.isStepComplete(0)).toBe(true);
    });

    it('should check validations array for required', () => {
      const field = createField({
        validations: [{ type: 'required' }],
      });
      const config = createConfig([field]);
      const validator = new WizardValidator(config, {});

      expect(validator.isStepComplete(0)).toBe(false);
    });

    it('should return true for non-existent step', () => {
      const config = createConfig([createField()]);
      const validator = new WizardValidator(config, {});

      expect(validator.isStepComplete(999)).toBe(true);
    });

    it('should return true for hidden steps', () => {
      const field = createField({ required: true });
      const config = createConfig([field], {
        hideIf: { field: 'skip', operator: 'equals', value: true },
      });
      const validator = new WizardValidator(config, { skip: true });

      expect(validator.isStepComplete(0)).toBe(true);
    });

    it('should skip disabled fields', () => {
      const field = createField({ required: true, disabled: true });
      const config = createConfig([field]);
      const validator = new WizardValidator(config, {});

      expect(validator.isStepComplete(0)).toBe(true);
    });

    it('should check canProceed function', () => {
      const config = createConfig([createField()], {
        canProceed: () => false,
      });
      const validator = new WizardValidator(config, {});

      expect(validator.isStepComplete(0)).toBe(false);
    });
  });

  describe('getMissingRequiredFields', () => {
    it('should return labels of missing required fields', () => {
      const field1 = createField({ id: 'f1', name: 'field1', label: 'First Name', required: true });
      const field2 = createField({ id: 'f2', name: 'field2', label: 'Last Name', required: true });
      const config = createConfig([field1, field2]);
      const validator = new WizardValidator(config, { field1: 'John' });

      const missing = validator.getMissingRequiredFields(0);
      expect(missing).toEqual(['Last Name']);
    });

    it('should return empty array when all required fields are filled', () => {
      const field = createField({ required: true, label: 'Name' });
      const config = createConfig([field]);
      const validator = new WizardValidator(config, { testField: 'value' });

      const missing = validator.getMissingRequiredFields(0);
      expect(missing).toEqual([]);
    });

    it('should return empty array for hidden steps', () => {
      const field = createField({ required: true });
      const config = createConfig([field], {
        hideIf: { field: 'skip', operator: 'equals', value: true },
      });
      const validator = new WizardValidator(config, { skip: true });

      const missing = validator.getMissingRequiredFields(0);
      expect(missing).toEqual([]);
    });

    it('should skip invisible fields', () => {
      const field = createField({
        required: true,
        label: 'Hidden Field',
        hideIf: { field: 'hide', operator: 'equals', value: true },
      });
      const config = createConfig([field]);
      const validator = new WizardValidator(config, { hide: true });

      const missing = validator.getMissingRequiredFields(0);
      expect(missing).toEqual([]);
    });

    it('should skip disabled fields', () => {
      const field = createField({
        required: true,
        label: 'Disabled Field',
        disabled: true,
      });
      const config = createConfig([field]);
      const validator = new WizardValidator(config, {});

      const missing = validator.getMissingRequiredFields(0);
      expect(missing).toEqual([]);
    });
  });
});
