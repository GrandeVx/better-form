/**
 * Better Form - Conditional Logic Helpers
 * Helper functions to create conditional logic objects
 */

import { ComparisonOperator, ConditionalLogic } from '../../types/wizard-schema';

/**
 * Create a simple condition
 *
 * @example
 * ```ts
 * createCondition('category', 'equals', 'business')
 * ```
 */
export function createCondition(
  field: string,
  operator: ComparisonOperator,
  value: unknown
): ConditionalLogic {
  return { field, operator, value };
}

/**
 * Combine conditions with AND logic
 * All conditions must be true
 *
 * @example
 * ```ts
 * andConditions(
 *   createCondition('age', 'greaterThan', 18),
 *   createCondition('country', 'equals', 'US')
 * )
 * ```
 */
export function andConditions(
  ...conditions: ConditionalLogic[]
): ConditionalLogic {
  if (conditions.length === 0) {
    throw new Error('At least one condition is required');
  }

  const [first, ...rest] = conditions;
  return rest.length > 0
    ? { ...(first as ConditionalLogic), and: rest }
    : (first as ConditionalLogic);
}

/**
 * Combine conditions with OR logic
 * At least one condition must be true
 *
 * @example
 * ```ts
 * orConditions(
 *   createCondition('role', 'equals', 'admin'),
 *   createCondition('role', 'equals', 'moderator')
 * )
 * ```
 */
export function orConditions(
  ...conditions: ConditionalLogic[]
): ConditionalLogic {
  if (conditions.length === 0) {
    throw new Error('At least one condition is required');
  }

  const [first, ...rest] = conditions;
  return rest.length > 0
    ? { ...(first as ConditionalLogic), or: rest }
    : (first as ConditionalLogic);
}

/**
 * Create a complex condition with both AND and OR logic
 *
 * @example
 * ```ts
 * complexCondition(
 *   createCondition('age', 'greaterThan', 18),
 *   {
 *     and: [createCondition('verified', 'equals', true)],
 *     or: [createCondition('role', 'equals', 'admin')]
 *   }
 * )
 * ```
 */
export function complexCondition(
  base: ConditionalLogic,
  options?: {
    and?: ConditionalLogic[];
    or?: ConditionalLogic[];
  }
): ConditionalLogic {
  return {
    ...base,
    ...(options?.and && { and: options.and }),
    ...(options?.or && { or: options.or }),
  };
}

// ============================================
// Shorthand condition creators
// ============================================

/**
 * Create an "equals" condition
 */
export function equals(field: string, value: unknown): ConditionalLogic {
  return createCondition(field, 'equals', value);
}

/**
 * Create a "not equals" condition
 */
export function notEquals(field: string, value: unknown): ConditionalLogic {
  return createCondition(field, 'notEquals', value);
}

/**
 * Create a "contains" condition (for arrays and strings)
 */
export function contains(field: string, value: unknown): ConditionalLogic {
  return createCondition(field, 'contains', value);
}

/**
 * Create a "greater than" condition
 */
export function greaterThan(field: string, value: number): ConditionalLogic {
  return createCondition(field, 'greaterThan', value);
}

/**
 * Create a "less than" condition
 */
export function lessThan(field: string, value: number): ConditionalLogic {
  return createCondition(field, 'lessThan', value);
}

/**
 * Create a "greater than or equals" condition
 */
export function greaterThanOrEquals(
  field: string,
  value: number
): ConditionalLogic {
  return createCondition(field, 'greaterThanOrEquals', value);
}

/**
 * Create a "less than or equals" condition
 */
export function lessThanOrEquals(
  field: string,
  value: number
): ConditionalLogic {
  return createCondition(field, 'lessThanOrEquals', value);
}

/**
 * Create an "in" condition (value is in array)
 */
export function isIn(field: string, values: unknown[]): ConditionalLogic {
  return createCondition(field, 'in', values);
}

/**
 * Create a "not in" condition (value is not in array)
 */
export function notIn(field: string, values: unknown[]): ConditionalLogic {
  return createCondition(field, 'notIn', values);
}

/**
 * Create an "is empty" condition
 */
export function isEmpty(field: string): ConditionalLogic {
  return createCondition(field, 'isEmpty', null);
}

/**
 * Create an "is not empty" condition
 */
export function isNotEmpty(field: string): ConditionalLogic {
  return createCondition(field, 'isNotEmpty', null);
}

/**
 * Create a condition that checks if field is truthy
 */
export function isTruthy(field: string): ConditionalLogic {
  return createCondition(field, 'equals', true);
}

/**
 * Create a condition that checks if field is falsy
 */
export function isFalsy(field: string): ConditionalLogic {
  return createCondition(field, 'equals', false);
}

/**
 * Create a "between" condition (inclusive)
 */
export function between(
  field: string,
  min: number,
  max: number
): ConditionalLogic {
  return andConditions(
    greaterThanOrEquals(field, min),
    lessThanOrEquals(field, max)
  );
}

/**
 * Negate a condition (NOT)
 * This works by inverting showIf/hideIf usage
 */
export function not(condition: ConditionalLogic): {
  showIf: undefined;
  hideIf: ConditionalLogic;
} {
  return {
    showIf: undefined,
    hideIf: condition,
  };
}
