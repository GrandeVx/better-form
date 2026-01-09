/**
 * Better Form - Conditional Logic Evaluator
 * Evaluates complex conditional logic to determine field visibility and state
 */

import type { ComparisonOperator, ConditionalLogic } from '../../types/wizard-schema';

export class ConditionalLogicEvaluator {
  private formData: Record<string, unknown>;

  constructor(formData: Record<string, unknown>) {
    this.formData = formData || {};
  }

  /**
   * Get nested field value using dot notation
   * @param fieldPath - Path to field (e.g., "step1.field1" or "field1")
   */
  private getFieldValue(fieldPath: string): unknown {
    if (!fieldPath || typeof fieldPath !== 'string') {
      return undefined;
    }

    const keys = fieldPath.split('.');
    let value: unknown = this.formData;

    for (const key of keys) {
      if (value === null || value === undefined) {
        return undefined;
      }
      value = (value as Record<string, unknown>)[key];
    }

    return value;
  }

  /**
   * Evaluate a single comparison
   */
  private evaluateComparison(
    fieldValue: unknown,
    operator: ComparisonOperator,
    comparisonValue: unknown
  ): boolean {
    switch (operator) {
      case 'equals':
        return fieldValue === comparisonValue;

      case 'notEquals':
        return fieldValue !== comparisonValue;

      case 'contains':
        if (Array.isArray(fieldValue)) {
          return fieldValue.includes(comparisonValue);
        }
        if (typeof fieldValue === 'string') {
          return fieldValue.includes(String(comparisonValue));
        }
        return false;

      case 'notContains':
        if (Array.isArray(fieldValue)) {
          return !fieldValue.includes(comparisonValue);
        }
        if (typeof fieldValue === 'string') {
          return !fieldValue.includes(String(comparisonValue));
        }
        return true;

      case 'greaterThan':
        return Number(fieldValue) > Number(comparisonValue);

      case 'lessThan':
        return Number(fieldValue) < Number(comparisonValue);

      case 'greaterThanOrEquals':
        return Number(fieldValue) >= Number(comparisonValue);

      case 'lessThanOrEquals':
        return Number(fieldValue) <= Number(comparisonValue);

      case 'in':
        if (!Array.isArray(comparisonValue)) {
          return false;
        }
        return comparisonValue.includes(fieldValue);

      case 'notIn':
        if (!Array.isArray(comparisonValue)) {
          return true;
        }
        return !comparisonValue.includes(fieldValue);

      case 'isEmpty':
        return (
          fieldValue === null ||
          fieldValue === undefined ||
          fieldValue === '' ||
          (Array.isArray(fieldValue) && fieldValue.length === 0) ||
          (typeof fieldValue === 'object' && Object.keys(fieldValue as object).length === 0)
        );

      case 'isNotEmpty':
        return !(
          fieldValue === null ||
          fieldValue === undefined ||
          fieldValue === '' ||
          (Array.isArray(fieldValue) && fieldValue.length === 0) ||
          (typeof fieldValue === 'object' &&
            !Array.isArray(fieldValue) &&
            Object.keys(fieldValue as object).length === 0)
        );

      default:
        console.warn(`Unknown operator: ${operator}`);
        return false;
    }
  }

  /**
   * Evaluate a single condition
   */
  private evaluateCondition(condition: ConditionalLogic): boolean {
    if (!condition || !condition.field) {
      return true;
    }

    const fieldValue = this.getFieldValue(condition.field);
    return this.evaluateComparison(fieldValue, condition.operator, condition.value);
  }

  /**
   * Evaluate complex conditional logic with AND/OR support
   */
  public evaluate(logic: ConditionalLogic | undefined | null): boolean {
    if (!logic) {
      return true;
    }

    // Evaluate the base condition
    let result = this.evaluateCondition(logic);

    // Handle AND conditions (all must be true)
    if (logic.and && logic.and.length > 0) {
      const andResults = logic.and.map((condition) => this.evaluate(condition));
      result = result && andResults.every((r) => r === true);
    }

    // Handle OR conditions (at least one must be true)
    if (logic.or && logic.or.length > 0) {
      const orResults = logic.or.map((condition) => this.evaluate(condition));
      result = result || orResults.some((r) => r === true);
    }

    return result;
  }

  /**
   * Update form data and re-evaluate
   */
  public updateFormData(formData: Record<string, unknown>): void {
    this.formData = formData || {};
  }

  /**
   * Check if a field should be visible
   */
  public isFieldVisible(showIf?: ConditionalLogic, hideIf?: ConditionalLogic): boolean {
    // If hideIf condition is true, hide the field
    if (hideIf && this.evaluate(hideIf)) {
      return false;
    }

    // If showIf condition exists, only show if it's true
    if (showIf) {
      return this.evaluate(showIf);
    }

    // Default to showing the field
    return true;
  }

  /**
   * Check if a field should be disabled
   */
  public isFieldDisabled(disabled: boolean | undefined, disabledIf?: ConditionalLogic): boolean {
    // If explicitly disabled
    if (disabled === true) {
      return true;
    }

    // If conditionally disabled
    if (disabledIf && this.evaluate(disabledIf)) {
      return true;
    }

    return false;
  }

  /**
   * Get all visible field names for a given set of conditions
   */
  public getVisibleFields(
    fields: Array<{
      name: string;
      showIf?: ConditionalLogic;
      hideIf?: ConditionalLogic;
    }>
  ): string[] {
    return fields
      .filter((field) => this.isFieldVisible(field.showIf, field.hideIf))
      .map((field) => field.name);
  }

  /**
   * Evaluate multiple conditions and return results
   */
  public evaluateMultiple(conditions: Record<string, ConditionalLogic>): Record<string, boolean> {
    const results: Record<string, boolean> = {};

    for (const [key, condition] of Object.entries(conditions)) {
      results[key] = this.evaluate(condition);
    }

    return results;
  }

  /**
   * Debug helper to explain why a condition evaluated to true/false
   */
  public explainEvaluation(logic: ConditionalLogic): string {
    const fieldValue = this.getFieldValue(logic.field);
    const baseResult = this.evaluateComparison(fieldValue, logic.operator, logic.value);

    let explanation = `Field "${logic.field}" (value: ${JSON.stringify(fieldValue)}) `;
    explanation += `${logic.operator} ${JSON.stringify(logic.value)}: ${baseResult}`;

    if (logic.and && logic.and.length > 0) {
      explanation += '\nAND conditions:';
      logic.and.forEach((cond, index) => {
        explanation += `\n  ${index + 1}. ${this.explainEvaluation(cond)}`;
      });
    }

    if (logic.or && logic.or.length > 0) {
      explanation += '\nOR conditions:';
      logic.or.forEach((cond, index) => {
        explanation += `\n  ${index + 1}. ${this.explainEvaluation(cond)}`;
      });
    }

    return explanation;
  }
}
