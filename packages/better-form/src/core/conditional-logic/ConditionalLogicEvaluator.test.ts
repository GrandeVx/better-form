/**
 * ConditionalLogicEvaluator Test Suite
 * Comprehensive tests for conditional logic evaluation
 */

import { describe, expect, it } from 'vitest';
import type { ConditionalLogic } from '../../types/wizard-schema';
import { ConditionalLogicEvaluator } from './ConditionalLogicEvaluator';

describe('ConditionalLogicEvaluator', () => {
  describe('constructor', () => {
    it('should create evaluator with form data', () => {
      const evaluator = new ConditionalLogicEvaluator({ field1: 'value1' });
      expect(evaluator).toBeDefined();
    });

    it('should handle null/undefined form data', () => {
      const evaluator = new ConditionalLogicEvaluator(null as unknown as Record<string, unknown>);
      expect(evaluator).toBeDefined();
    });
  });

  describe('updateFormData', () => {
    it('should update form data for evaluation', () => {
      const evaluator = new ConditionalLogicEvaluator({});

      const condition: ConditionalLogic = {
        field: 'status',
        operator: 'equals',
        value: 'active',
      };

      expect(evaluator.evaluate(condition)).toBe(false);

      evaluator.updateFormData({ status: 'active' });
      expect(evaluator.evaluate(condition)).toBe(true);
    });
  });

  describe('evaluate - basic operators', () => {
    describe('equals operator', () => {
      it('should return true when values are equal', () => {
        const evaluator = new ConditionalLogicEvaluator({ status: 'active' });
        const condition: ConditionalLogic = {
          field: 'status',
          operator: 'equals',
          value: 'active',
        };

        expect(evaluator.evaluate(condition)).toBe(true);
      });

      it('should return false when values are not equal', () => {
        const evaluator = new ConditionalLogicEvaluator({ status: 'inactive' });
        const condition: ConditionalLogic = {
          field: 'status',
          operator: 'equals',
          value: 'active',
        };

        expect(evaluator.evaluate(condition)).toBe(false);
      });

      it('should handle number equality', () => {
        const evaluator = new ConditionalLogicEvaluator({ count: 5 });
        const condition: ConditionalLogic = {
          field: 'count',
          operator: 'equals',
          value: 5,
        };

        expect(evaluator.evaluate(condition)).toBe(true);
      });

      it('should handle boolean equality', () => {
        const evaluator = new ConditionalLogicEvaluator({ enabled: true });
        const condition: ConditionalLogic = {
          field: 'enabled',
          operator: 'equals',
          value: true,
        };

        expect(evaluator.evaluate(condition)).toBe(true);
      });

      it('should use strict equality', () => {
        const evaluator = new ConditionalLogicEvaluator({ count: '5' });
        const condition: ConditionalLogic = {
          field: 'count',
          operator: 'equals',
          value: 5,
        };

        expect(evaluator.evaluate(condition)).toBe(false);
      });
    });

    describe('notEquals operator', () => {
      it('should return true when values are not equal', () => {
        const evaluator = new ConditionalLogicEvaluator({ status: 'inactive' });
        const condition: ConditionalLogic = {
          field: 'status',
          operator: 'notEquals',
          value: 'active',
        };

        expect(evaluator.evaluate(condition)).toBe(true);
      });

      it('should return false when values are equal', () => {
        const evaluator = new ConditionalLogicEvaluator({ status: 'active' });
        const condition: ConditionalLogic = {
          field: 'status',
          operator: 'notEquals',
          value: 'active',
        };

        expect(evaluator.evaluate(condition)).toBe(false);
      });
    });

    describe('contains operator', () => {
      it('should return true when string contains substring', () => {
        const evaluator = new ConditionalLogicEvaluator({ name: 'John Doe' });
        const condition: ConditionalLogic = {
          field: 'name',
          operator: 'contains',
          value: 'John',
        };

        expect(evaluator.evaluate(condition)).toBe(true);
      });

      it('should return false when string does not contain substring', () => {
        const evaluator = new ConditionalLogicEvaluator({ name: 'Jane Doe' });
        const condition: ConditionalLogic = {
          field: 'name',
          operator: 'contains',
          value: 'John',
        };

        expect(evaluator.evaluate(condition)).toBe(false);
      });

      it('should return true when array contains value', () => {
        const evaluator = new ConditionalLogicEvaluator({ tags: ['red', 'green', 'blue'] });
        const condition: ConditionalLogic = {
          field: 'tags',
          operator: 'contains',
          value: 'green',
        };

        expect(evaluator.evaluate(condition)).toBe(true);
      });

      it('should return false when array does not contain value', () => {
        const evaluator = new ConditionalLogicEvaluator({ tags: ['red', 'green', 'blue'] });
        const condition: ConditionalLogic = {
          field: 'tags',
          operator: 'contains',
          value: 'yellow',
        };

        expect(evaluator.evaluate(condition)).toBe(false);
      });

      it('should return false for non-string/non-array values', () => {
        const evaluator = new ConditionalLogicEvaluator({ count: 123 });
        const condition: ConditionalLogic = {
          field: 'count',
          operator: 'contains',
          value: '1',
        };

        expect(evaluator.evaluate(condition)).toBe(false);
      });
    });

    describe('notContains operator', () => {
      it('should return true when string does not contain substring', () => {
        const evaluator = new ConditionalLogicEvaluator({ name: 'Jane Doe' });
        const condition: ConditionalLogic = {
          field: 'name',
          operator: 'notContains',
          value: 'John',
        };

        expect(evaluator.evaluate(condition)).toBe(true);
      });

      it('should return false when string contains substring', () => {
        const evaluator = new ConditionalLogicEvaluator({ name: 'John Doe' });
        const condition: ConditionalLogic = {
          field: 'name',
          operator: 'notContains',
          value: 'John',
        };

        expect(evaluator.evaluate(condition)).toBe(false);
      });

      it('should return true when array does not contain value', () => {
        const evaluator = new ConditionalLogicEvaluator({ tags: ['red', 'green'] });
        const condition: ConditionalLogic = {
          field: 'tags',
          operator: 'notContains',
          value: 'blue',
        };

        expect(evaluator.evaluate(condition)).toBe(true);
      });
    });

    describe('greaterThan operator', () => {
      it('should return true when field value is greater', () => {
        const evaluator = new ConditionalLogicEvaluator({ age: 25 });
        const condition: ConditionalLogic = {
          field: 'age',
          operator: 'greaterThan',
          value: 18,
        };

        expect(evaluator.evaluate(condition)).toBe(true);
      });

      it('should return false when field value is equal', () => {
        const evaluator = new ConditionalLogicEvaluator({ age: 18 });
        const condition: ConditionalLogic = {
          field: 'age',
          operator: 'greaterThan',
          value: 18,
        };

        expect(evaluator.evaluate(condition)).toBe(false);
      });

      it('should return false when field value is less', () => {
        const evaluator = new ConditionalLogicEvaluator({ age: 15 });
        const condition: ConditionalLogic = {
          field: 'age',
          operator: 'greaterThan',
          value: 18,
        };

        expect(evaluator.evaluate(condition)).toBe(false);
      });
    });

    describe('lessThan operator', () => {
      it('should return true when field value is less', () => {
        const evaluator = new ConditionalLogicEvaluator({ age: 15 });
        const condition: ConditionalLogic = {
          field: 'age',
          operator: 'lessThan',
          value: 18,
        };

        expect(evaluator.evaluate(condition)).toBe(true);
      });

      it('should return false when field value is equal', () => {
        const evaluator = new ConditionalLogicEvaluator({ age: 18 });
        const condition: ConditionalLogic = {
          field: 'age',
          operator: 'lessThan',
          value: 18,
        };

        expect(evaluator.evaluate(condition)).toBe(false);
      });
    });

    describe('greaterThanOrEquals operator', () => {
      it('should return true when field value is greater', () => {
        const evaluator = new ConditionalLogicEvaluator({ age: 25 });
        const condition: ConditionalLogic = {
          field: 'age',
          operator: 'greaterThanOrEquals',
          value: 18,
        };

        expect(evaluator.evaluate(condition)).toBe(true);
      });

      it('should return true when field value is equal', () => {
        const evaluator = new ConditionalLogicEvaluator({ age: 18 });
        const condition: ConditionalLogic = {
          field: 'age',
          operator: 'greaterThanOrEquals',
          value: 18,
        };

        expect(evaluator.evaluate(condition)).toBe(true);
      });

      it('should return false when field value is less', () => {
        const evaluator = new ConditionalLogicEvaluator({ age: 15 });
        const condition: ConditionalLogic = {
          field: 'age',
          operator: 'greaterThanOrEquals',
          value: 18,
        };

        expect(evaluator.evaluate(condition)).toBe(false);
      });
    });

    describe('lessThanOrEquals operator', () => {
      it('should return true when field value is less', () => {
        const evaluator = new ConditionalLogicEvaluator({ age: 15 });
        const condition: ConditionalLogic = {
          field: 'age',
          operator: 'lessThanOrEquals',
          value: 18,
        };

        expect(evaluator.evaluate(condition)).toBe(true);
      });

      it('should return true when field value is equal', () => {
        const evaluator = new ConditionalLogicEvaluator({ age: 18 });
        const condition: ConditionalLogic = {
          field: 'age',
          operator: 'lessThanOrEquals',
          value: 18,
        };

        expect(evaluator.evaluate(condition)).toBe(true);
      });
    });

    describe('in operator', () => {
      it('should return true when field value is in array', () => {
        const evaluator = new ConditionalLogicEvaluator({ status: 'pending' });
        const condition: ConditionalLogic = {
          field: 'status',
          operator: 'in',
          value: ['pending', 'approved', 'rejected'],
        };

        expect(evaluator.evaluate(condition)).toBe(true);
      });

      it('should return false when field value is not in array', () => {
        const evaluator = new ConditionalLogicEvaluator({ status: 'draft' });
        const condition: ConditionalLogic = {
          field: 'status',
          operator: 'in',
          value: ['pending', 'approved', 'rejected'],
        };

        expect(evaluator.evaluate(condition)).toBe(false);
      });

      it('should return false when comparison value is not an array', () => {
        const evaluator = new ConditionalLogicEvaluator({ status: 'pending' });
        const condition: ConditionalLogic = {
          field: 'status',
          operator: 'in',
          value: 'pending',
        };

        expect(evaluator.evaluate(condition)).toBe(false);
      });
    });

    describe('notIn operator', () => {
      it('should return true when field value is not in array', () => {
        const evaluator = new ConditionalLogicEvaluator({ status: 'draft' });
        const condition: ConditionalLogic = {
          field: 'status',
          operator: 'notIn',
          value: ['pending', 'approved', 'rejected'],
        };

        expect(evaluator.evaluate(condition)).toBe(true);
      });

      it('should return false when field value is in array', () => {
        const evaluator = new ConditionalLogicEvaluator({ status: 'pending' });
        const condition: ConditionalLogic = {
          field: 'status',
          operator: 'notIn',
          value: ['pending', 'approved', 'rejected'],
        };

        expect(evaluator.evaluate(condition)).toBe(false);
      });

      it('should return true when comparison value is not an array', () => {
        const evaluator = new ConditionalLogicEvaluator({ status: 'pending' });
        const condition: ConditionalLogic = {
          field: 'status',
          operator: 'notIn',
          value: 'pending',
        };

        expect(evaluator.evaluate(condition)).toBe(true);
      });
    });

    describe('isEmpty operator', () => {
      it('should return true for null', () => {
        const evaluator = new ConditionalLogicEvaluator({ field: null });
        const condition: ConditionalLogic = {
          field: 'field',
          operator: 'isEmpty',
          value: true,
        };

        expect(evaluator.evaluate(condition)).toBe(true);
      });

      it('should return true for undefined', () => {
        const evaluator = new ConditionalLogicEvaluator({});
        const condition: ConditionalLogic = {
          field: 'field',
          operator: 'isEmpty',
          value: true,
        };

        expect(evaluator.evaluate(condition)).toBe(true);
      });

      it('should return true for empty string', () => {
        const evaluator = new ConditionalLogicEvaluator({ field: '' });
        const condition: ConditionalLogic = {
          field: 'field',
          operator: 'isEmpty',
          value: true,
        };

        expect(evaluator.evaluate(condition)).toBe(true);
      });

      it('should return true for empty array', () => {
        const evaluator = new ConditionalLogicEvaluator({ field: [] });
        const condition: ConditionalLogic = {
          field: 'field',
          operator: 'isEmpty',
          value: true,
        };

        expect(evaluator.evaluate(condition)).toBe(true);
      });

      it('should return true for empty object', () => {
        const evaluator = new ConditionalLogicEvaluator({ field: {} });
        const condition: ConditionalLogic = {
          field: 'field',
          operator: 'isEmpty',
          value: true,
        };

        expect(evaluator.evaluate(condition)).toBe(true);
      });

      it('should return false for non-empty values', () => {
        const evaluator = new ConditionalLogicEvaluator({ field: 'value' });
        const condition: ConditionalLogic = {
          field: 'field',
          operator: 'isEmpty',
          value: true,
        };

        expect(evaluator.evaluate(condition)).toBe(false);
      });
    });

    describe('isNotEmpty operator', () => {
      it('should return true for non-empty string', () => {
        const evaluator = new ConditionalLogicEvaluator({ field: 'value' });
        const condition: ConditionalLogic = {
          field: 'field',
          operator: 'isNotEmpty',
          value: true,
        };

        expect(evaluator.evaluate(condition)).toBe(true);
      });

      it('should return true for non-empty array', () => {
        const evaluator = new ConditionalLogicEvaluator({ field: [1, 2, 3] });
        const condition: ConditionalLogic = {
          field: 'field',
          operator: 'isNotEmpty',
          value: true,
        };

        expect(evaluator.evaluate(condition)).toBe(true);
      });

      it('should return false for empty values', () => {
        const evaluator = new ConditionalLogicEvaluator({ field: '' });
        const condition: ConditionalLogic = {
          field: 'field',
          operator: 'isNotEmpty',
          value: true,
        };

        expect(evaluator.evaluate(condition)).toBe(false);
      });

      it('should return true for zero (valid value)', () => {
        const evaluator = new ConditionalLogicEvaluator({ field: 0 });
        const condition: ConditionalLogic = {
          field: 'field',
          operator: 'isNotEmpty',
          value: true,
        };

        expect(evaluator.evaluate(condition)).toBe(true);
      });

      it('should return true for false (valid value)', () => {
        const evaluator = new ConditionalLogicEvaluator({ field: false });
        const condition: ConditionalLogic = {
          field: 'field',
          operator: 'isNotEmpty',
          value: true,
        };

        expect(evaluator.evaluate(condition)).toBe(true);
      });
    });
  });

  describe('evaluate - nested field paths', () => {
    it('should access nested fields with dot notation', () => {
      const evaluator = new ConditionalLogicEvaluator({
        user: {
          profile: {
            role: 'admin',
          },
        },
      });
      const condition: ConditionalLogic = {
        field: 'user.profile.role',
        operator: 'equals',
        value: 'admin',
      };

      expect(evaluator.evaluate(condition)).toBe(true);
    });

    it('should return undefined for non-existent nested paths', () => {
      const evaluator = new ConditionalLogicEvaluator({ user: {} });
      const condition: ConditionalLogic = {
        field: 'user.profile.role',
        operator: 'equals',
        value: 'admin',
      };

      expect(evaluator.evaluate(condition)).toBe(false);
    });

    it('should handle null in nested path', () => {
      const evaluator = new ConditionalLogicEvaluator({ user: { profile: null } });
      const condition: ConditionalLogic = {
        field: 'user.profile.role',
        operator: 'isEmpty',
        value: true,
      };

      expect(evaluator.evaluate(condition)).toBe(true);
    });
  });

  describe('evaluate - AND conditions', () => {
    it('should return true when all AND conditions are true', () => {
      const evaluator = new ConditionalLogicEvaluator({
        age: 25,
        status: 'active',
        country: 'US',
      });
      const condition: ConditionalLogic = {
        field: 'age',
        operator: 'greaterThan',
        value: 18,
        and: [
          { field: 'status', operator: 'equals', value: 'active' },
          { field: 'country', operator: 'equals', value: 'US' },
        ],
      };

      expect(evaluator.evaluate(condition)).toBe(true);
    });

    it('should return false when any AND condition is false', () => {
      const evaluator = new ConditionalLogicEvaluator({
        age: 25,
        status: 'inactive',
        country: 'US',
      });
      const condition: ConditionalLogic = {
        field: 'age',
        operator: 'greaterThan',
        value: 18,
        and: [
          { field: 'status', operator: 'equals', value: 'active' },
          { field: 'country', operator: 'equals', value: 'US' },
        ],
      };

      expect(evaluator.evaluate(condition)).toBe(false);
    });

    it('should return false when base condition is false even if AND conditions are true', () => {
      const evaluator = new ConditionalLogicEvaluator({
        age: 15,
        status: 'active',
      });
      const condition: ConditionalLogic = {
        field: 'age',
        operator: 'greaterThan',
        value: 18,
        and: [{ field: 'status', operator: 'equals', value: 'active' }],
      };

      expect(evaluator.evaluate(condition)).toBe(false);
    });
  });

  describe('evaluate - OR conditions', () => {
    it('should return true when any OR condition is true', () => {
      const evaluator = new ConditionalLogicEvaluator({
        role: 'guest',
        isVip: true,
      });
      const condition: ConditionalLogic = {
        field: 'role',
        operator: 'equals',
        value: 'admin',
        or: [
          { field: 'role', operator: 'equals', value: 'moderator' },
          { field: 'isVip', operator: 'equals', value: true },
        ],
      };

      expect(evaluator.evaluate(condition)).toBe(true);
    });

    it('should return true when base condition is true even if OR conditions are false', () => {
      const evaluator = new ConditionalLogicEvaluator({
        role: 'admin',
        isVip: false,
      });
      const condition: ConditionalLogic = {
        field: 'role',
        operator: 'equals',
        value: 'admin',
        or: [{ field: 'isVip', operator: 'equals', value: true }],
      };

      expect(evaluator.evaluate(condition)).toBe(true);
    });

    it('should return false when all conditions are false', () => {
      const evaluator = new ConditionalLogicEvaluator({
        role: 'guest',
        isVip: false,
      });
      const condition: ConditionalLogic = {
        field: 'role',
        operator: 'equals',
        value: 'admin',
        or: [{ field: 'isVip', operator: 'equals', value: true }],
      };

      expect(evaluator.evaluate(condition)).toBe(false);
    });
  });

  describe('evaluate - combined AND/OR conditions', () => {
    it('should handle complex combined conditions', () => {
      const evaluator = new ConditionalLogicEvaluator({
        userType: 'business',
        country: 'US',
        revenue: 100000,
      });

      // (userType === 'business' AND country === 'US') OR revenue > 50000
      const condition: ConditionalLogic = {
        field: 'userType',
        operator: 'equals',
        value: 'business',
        and: [{ field: 'country', operator: 'equals', value: 'US' }],
        or: [{ field: 'revenue', operator: 'greaterThan', value: 50000 }],
      };

      expect(evaluator.evaluate(condition)).toBe(true);
    });

    it('should handle nested conditions', () => {
      const evaluator = new ConditionalLogicEvaluator({
        status: 'active',
        plan: 'premium',
        seats: 10,
      });

      const condition: ConditionalLogic = {
        field: 'status',
        operator: 'equals',
        value: 'active',
        and: [
          {
            field: 'plan',
            operator: 'equals',
            value: 'premium',
            or: [{ field: 'seats', operator: 'greaterThan', value: 5 }],
          },
        ],
      };

      expect(evaluator.evaluate(condition)).toBe(true);
    });
  });

  describe('evaluate - edge cases', () => {
    it('should return true for null/undefined condition', () => {
      const evaluator = new ConditionalLogicEvaluator({});
      expect(evaluator.evaluate(null as unknown as ConditionalLogic)).toBe(true);
      expect(evaluator.evaluate(undefined)).toBe(true);
    });

    it('should return true for condition without field', () => {
      const evaluator = new ConditionalLogicEvaluator({});
      const condition = { operator: 'equals', value: 'test' } as ConditionalLogic;
      expect(evaluator.evaluate(condition)).toBe(true);
    });

    it('should handle invalid field path', () => {
      const evaluator = new ConditionalLogicEvaluator({});
      const condition: ConditionalLogic = {
        field: '',
        operator: 'equals',
        value: 'test',
      };
      expect(evaluator.evaluate(condition)).toBe(true);
    });
  });

  describe('isFieldVisible', () => {
    it('should return true when no conditions are provided', () => {
      const evaluator = new ConditionalLogicEvaluator({});
      expect(evaluator.isFieldVisible(undefined, undefined)).toBe(true);
    });

    it('should return true when showIf condition is met', () => {
      const evaluator = new ConditionalLogicEvaluator({ type: 'business' });
      const showIf: ConditionalLogic = {
        field: 'type',
        operator: 'equals',
        value: 'business',
      };

      expect(evaluator.isFieldVisible(showIf, undefined)).toBe(true);
    });

    it('should return false when showIf condition is not met', () => {
      const evaluator = new ConditionalLogicEvaluator({ type: 'personal' });
      const showIf: ConditionalLogic = {
        field: 'type',
        operator: 'equals',
        value: 'business',
      };

      expect(evaluator.isFieldVisible(showIf, undefined)).toBe(false);
    });

    it('should return false when hideIf condition is met', () => {
      const evaluator = new ConditionalLogicEvaluator({ hidden: true });
      const hideIf: ConditionalLogic = {
        field: 'hidden',
        operator: 'equals',
        value: true,
      };

      expect(evaluator.isFieldVisible(undefined, hideIf)).toBe(false);
    });

    it('should prioritize hideIf over showIf', () => {
      const evaluator = new ConditionalLogicEvaluator({
        type: 'business',
        hidden: true,
      });
      const showIf: ConditionalLogic = {
        field: 'type',
        operator: 'equals',
        value: 'business',
      };
      const hideIf: ConditionalLogic = {
        field: 'hidden',
        operator: 'equals',
        value: true,
      };

      expect(evaluator.isFieldVisible(showIf, hideIf)).toBe(false);
    });
  });

  describe('isFieldDisabled', () => {
    it('should return false when no conditions are provided', () => {
      const evaluator = new ConditionalLogicEvaluator({});
      expect(evaluator.isFieldDisabled(undefined, undefined)).toBe(false);
    });

    it('should return true when disabled is true', () => {
      const evaluator = new ConditionalLogicEvaluator({});
      expect(evaluator.isFieldDisabled(true, undefined)).toBe(true);
    });

    it('should return false when disabled is false', () => {
      const evaluator = new ConditionalLogicEvaluator({});
      expect(evaluator.isFieldDisabled(false, undefined)).toBe(false);
    });

    it('should return true when disabledIf condition is met', () => {
      const evaluator = new ConditionalLogicEvaluator({ status: 'locked' });
      const disabledIf: ConditionalLogic = {
        field: 'status',
        operator: 'equals',
        value: 'locked',
      };

      expect(evaluator.isFieldDisabled(false, disabledIf)).toBe(true);
    });

    it('should return false when disabledIf condition is not met', () => {
      const evaluator = new ConditionalLogicEvaluator({ status: 'open' });
      const disabledIf: ConditionalLogic = {
        field: 'status',
        operator: 'equals',
        value: 'locked',
      };

      expect(evaluator.isFieldDisabled(false, disabledIf)).toBe(false);
    });
  });

  describe('getVisibleFields', () => {
    it('should return all fields when no conditions', () => {
      const evaluator = new ConditionalLogicEvaluator({});
      const fields = [{ name: 'field1' }, { name: 'field2' }, { name: 'field3' }];

      expect(evaluator.getVisibleFields(fields)).toEqual(['field1', 'field2', 'field3']);
    });

    it('should filter out hidden fields', () => {
      const evaluator = new ConditionalLogicEvaluator({ type: 'personal' });
      const fields = [
        { name: 'field1' },
        {
          name: 'field2',
          showIf: { field: 'type', operator: 'equals' as const, value: 'business' },
        },
        { name: 'field3' },
      ];

      expect(evaluator.getVisibleFields(fields)).toEqual(['field1', 'field3']);
    });

    it('should filter out fields with hideIf condition met', () => {
      const evaluator = new ConditionalLogicEvaluator({ hidden: true });
      const fields = [
        { name: 'field1' },
        {
          name: 'field2',
          hideIf: { field: 'hidden', operator: 'equals' as const, value: true },
        },
      ];

      expect(evaluator.getVisibleFields(fields)).toEqual(['field1']);
    });
  });

  describe('evaluateMultiple', () => {
    it('should evaluate multiple conditions and return results', () => {
      const evaluator = new ConditionalLogicEvaluator({
        age: 25,
        status: 'active',
        country: 'UK',
      });

      const conditions = {
        isAdult: { field: 'age', operator: 'greaterThan' as const, value: 18 },
        isActive: { field: 'status', operator: 'equals' as const, value: 'active' },
        isUS: { field: 'country', operator: 'equals' as const, value: 'US' },
      };

      const results = evaluator.evaluateMultiple(conditions);

      expect(results).toEqual({
        isAdult: true,
        isActive: true,
        isUS: false,
      });
    });
  });

  describe('explainEvaluation', () => {
    it('should return explanation string', () => {
      const evaluator = new ConditionalLogicEvaluator({ status: 'active' });
      const condition: ConditionalLogic = {
        field: 'status',
        operator: 'equals',
        value: 'active',
      };

      const explanation = evaluator.explainEvaluation(condition);

      expect(explanation).toContain('status');
      expect(explanation).toContain('active');
      expect(explanation).toContain('equals');
      expect(explanation).toContain('true');
    });

    it('should include AND conditions in explanation', () => {
      const evaluator = new ConditionalLogicEvaluator({ status: 'active', role: 'admin' });
      const condition: ConditionalLogic = {
        field: 'status',
        operator: 'equals',
        value: 'active',
        and: [{ field: 'role', operator: 'equals', value: 'admin' }],
      };

      const explanation = evaluator.explainEvaluation(condition);

      expect(explanation).toContain('AND conditions');
      expect(explanation).toContain('role');
    });

    it('should include OR conditions in explanation', () => {
      const evaluator = new ConditionalLogicEvaluator({ status: 'active' });
      const condition: ConditionalLogic = {
        field: 'status',
        operator: 'equals',
        value: 'inactive',
        or: [{ field: 'status', operator: 'equals', value: 'active' }],
      };

      const explanation = evaluator.explainEvaluation(condition);

      expect(explanation).toContain('OR conditions');
    });
  });
});
