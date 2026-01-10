/**
 * Better Form - HiddenField
 * Hidden input field (for internal values)
 */

'use client';
import type { FieldComponentProps } from '../components/WizardField';

export function HiddenField({ field, value }: FieldComponentProps) {
  return (
    <input
      type="hidden"
      id={field.id}
      name={field.id}
      value={value !== null && value !== undefined ? String(value) : ''}
    />
  );
}

/**
 * ReadOnlyField - Display-only field (cannot be edited)
 */
export function ReadOnlyField({ field: _field, value, error }: FieldComponentProps) {
  const displayValue = (() => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'boolean') return value ? 'Sì' : 'No';
    if (Array.isArray(value)) return value.join(', ');
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  })();

  return (
    <div className={`better-form-readonly ${error ? 'error' : ''}`}>
      <span className="better-form-readonly-value">{displayValue}</span>
    </div>
  );
}

/**
 * DisplayField - Same as ReadOnlyField but with different styling
 */
export function DisplayField(props: FieldComponentProps) {
  return <ReadOnlyField {...props} />;
}

export default HiddenField;
