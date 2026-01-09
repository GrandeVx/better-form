/**
 * Better Form - CheckboxField
 * Multiple selection checkbox group
 */

'use client';
import type { FieldComponentProps } from '../components/WizardField';

export function CheckboxField({ field, value, onChange, error, disabled }: FieldComponentProps) {
  const selectedValues = Array.isArray(value) ? value : [];

  const handleChange = (optionValue: unknown, checked: boolean) => {
    if (checked) {
      onChange([...selectedValues, optionValue]);
    } else {
      onChange(selectedValues.filter((v) => v !== optionValue));
    }
  };

  const layout = field.layout || 'vertical';

  // Check min/max selections
  const minSelections = field.minSelections || 0;
  const maxSelections = field.maxSelections || Number.POSITIVE_INFINITY;
  const canSelectMore = selectedValues.length < maxSelections;

  return (
    <div
      className={`better-form-checkbox-group ${layout} ${error ? 'error' : ''}`}
      role="group"
      aria-labelledby={`${field.id}-label`}
    >
      {field.options?.map((option) => {
        const isChecked = selectedValues.includes(option.value);
        const isDisabled = disabled || option.disabled || (!isChecked && !canSelectMore);

        return (
          <label
            key={String(option.value)}
            className={`better-form-checkbox-option ${isChecked ? 'checked' : ''} ${
              isDisabled ? 'disabled' : ''
            }`}
          >
            <input
              type="checkbox"
              name={field.id}
              className="better-form-checkbox-input"
              checked={isChecked}
              onChange={(e) => handleChange(option.value, e.target.checked)}
              disabled={isDisabled}
              value={String(option.value)}
            />
            <span className="better-form-checkbox-mark" />
            <span className="better-form-checkbox-label">
              {option.label}
              {option.description && (
                <span className="better-form-checkbox-description">{option.description}</span>
              )}
            </span>
          </label>
        );
      })}
      {/* Selection counter */}
      {(minSelections > 0 || maxSelections < Number.POSITIVE_INFINITY) && (
        <div className="better-form-checkbox-counter">
          Selezionati: {selectedValues.length}
          {maxSelections < Number.POSITIVE_INFINITY && ` / ${maxSelections}`}
          {minSelections > 0 && ` (minimo ${minSelections})`}
        </div>
      )}
    </div>
  );
}

/**
 * CheckboxCardsField - Checkboxes displayed as clickable cards
 */
export function CheckboxCardsField({
  field,
  value,
  onChange,
  error,
  disabled,
}: FieldComponentProps) {
  const selectedValues = Array.isArray(value) ? value : [];
  const maxSelections = field.maxSelections || Number.POSITIVE_INFINITY;
  const canSelectMore = selectedValues.length < maxSelections;

  const handleToggle = (optionValue: unknown) => {
    const isSelected = selectedValues.includes(optionValue);
    if (isSelected) {
      onChange(selectedValues.filter((v) => v !== optionValue));
    } else if (canSelectMore) {
      onChange([...selectedValues, optionValue]);
    }
  };

  const columns = field.columns || 2;

  return (
    <div
      className={`better-form-checkbox-cards ${error ? 'error' : ''}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
      role="group"
    >
      {field.options?.map((option) => {
        const isSelected = selectedValues.includes(option.value);
        const isDisabled = disabled || option.disabled || (!isSelected && !canSelectMore);

        return (
          <div
            key={String(option.value)}
            className={`better-form-checkbox-card ${isSelected ? 'selected' : ''} ${
              isDisabled ? 'disabled' : ''
            }`}
            onClick={() => !isDisabled && handleToggle(option.value)}
            onKeyDown={(e) => {
              if (!isDisabled && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                handleToggle(option.value);
              }
            }}
            role="checkbox"
            aria-checked={isSelected}
            aria-disabled={isDisabled}
            tabIndex={isDisabled ? -1 : 0}
          >
            {option.icon && <div className="better-form-checkbox-card-icon">{option.icon}</div>}
            <div className="better-form-checkbox-card-content">
              <div className="better-form-checkbox-card-label">{option.label}</div>
              {option.description && (
                <div className="better-form-checkbox-card-description">{option.description}</div>
              )}
            </div>
            <div className="better-form-checkbox-card-check">{isSelected && '✓'}</div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * ChipsField - Multi-select displayed as chips/tags
 */
export function ChipsField({ field, value, onChange, error, disabled }: FieldComponentProps) {
  const selectedValues = Array.isArray(value) ? value : [];
  const maxSelections = field.maxSelections || Number.POSITIVE_INFINITY;
  const canSelectMore = selectedValues.length < maxSelections;

  const handleToggle = (optionValue: unknown) => {
    const isSelected = selectedValues.includes(optionValue);
    if (isSelected) {
      onChange(selectedValues.filter((v) => v !== optionValue));
    } else if (canSelectMore) {
      onChange([...selectedValues, optionValue]);
    }
  };

  return (
    <div className={`better-form-chips ${error ? 'error' : ''}`} role="group">
      {field.options?.map((option) => {
        const isSelected = selectedValues.includes(option.value);
        const isDisabled = disabled || option.disabled || (!isSelected && !canSelectMore);

        return (
          <button
            key={String(option.value)}
            type="button"
            className={`better-form-chip ${isSelected ? 'selected' : ''}`}
            onClick={() => handleToggle(option.value)}
            disabled={isDisabled}
            aria-pressed={isSelected}
          >
            {option.icon && <span className="better-form-chip-icon">{option.icon}</span>}
            {option.label}
            {isSelected && <span className="better-form-chip-remove">×</span>}
          </button>
        );
      })}
    </div>
  );
}

export default CheckboxField;
