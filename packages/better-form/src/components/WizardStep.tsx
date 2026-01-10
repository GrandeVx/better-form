/**
 * Better Form - WizardStep
 * Renders a single step in the wizard
 */

'use client';

import React from 'react';
import { useWizard } from '../hooks/useWizard';
import { WizardField } from './WizardField';

export interface WizardStepProps {
  /** Step ID to render */
  stepId?: string;
  /** Custom class name */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Custom field wrapper component */
  fieldWrapper?: React.ComponentType<{ children: React.ReactNode; fieldId: string }>;
  /** Render custom content instead of automatic field rendering */
  children?: React.ReactNode;
}

/**
 * WizardStep - Renders fields for a specific step
 * If no stepId is provided, renders the current step
 */
export function WizardStep({
  stepId,
  className,
  style,
  fieldWrapper: FieldWrapper,
  children,
}: WizardStepProps) {
  const { config, visibleCurrentStepIndex, visibleSteps, getVisibleFields } = useWizard();

  // Get the step and its index to render
  let step: (typeof config.steps)[number] | undefined;
  let stepIndex: number;

  if (stepId) {
    stepIndex = config.steps.findIndex((s) => s.id === stepId);
    step = stepIndex >= 0 ? config.steps[stepIndex] : undefined;
  } else {
    const currentVisibleStep = visibleSteps[visibleCurrentStepIndex];
    step = currentVisibleStep?.step;
    stepIndex = currentVisibleStep?.originalIndex ?? 0;
  }

  if (!step) {
    console.warn(`WizardStep: Step "${stepId}" not found`);
    return null;
  }

  // If children are provided, render them instead of automatic fields
  if (children) {
    return (
      <div className={`better-form-step ${className || ''}`} style={style} data-step-id={step.id}>
        {children}
      </div>
    );
  }

  // Get visible fields for this step
  const visibleFields = getVisibleFields(stepIndex);

  return (
    <div className={`better-form-step ${className || ''}`} style={style} data-step-id={step.id}>
      <div className="better-form-fields">
        {visibleFields.map((field) => {
          const fieldElement = <WizardField key={field.id} field={field} />;

          if (FieldWrapper) {
            return (
              <FieldWrapper key={field.id} fieldId={field.id}>
                {fieldElement}
              </FieldWrapper>
            );
          }

          return fieldElement;
        })}
      </div>
    </div>
  );
}

/**
 * AutoStep - Automatically renders the current step's fields
 * Use this when you want the wizard to handle step rendering
 */
export function AutoStep(props: Omit<WizardStepProps, 'stepId'>) {
  return <WizardStep {...props} />;
}

/**
 * StepGroup - Renders fields in a visual group/section
 */
export interface StepGroupProps {
  /** Group title */
  title?: string;
  /** Group description */
  description?: string;
  /** Field IDs to include in this group */
  fields: string[];
  /** Custom class name */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Collapsible group */
  collapsible?: boolean;
  /** Initially collapsed */
  defaultCollapsed?: boolean;
}

export function StepGroup({
  title,
  description,
  fields,
  className,
  style,
  collapsible = false,
  defaultCollapsed = false,
}: StepGroupProps) {
  const { getVisibleFields, visibleCurrentStepIndex, visibleSteps } = useWizard();
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  const currentVisibleStep = visibleSteps[visibleCurrentStepIndex];
  if (!currentVisibleStep) return null;

  // Get visible fields that are in this group
  const visibleFields = getVisibleFields(currentVisibleStep.originalIndex).filter((f) =>
    fields.includes(f.id)
  );

  if (visibleFields.length === 0) return null;

  const handleToggle = () => {
    if (collapsible) {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div
      className={`better-form-group ${className || ''} ${isCollapsed ? 'collapsed' : ''}`}
      style={style}
    >
      {(title || description) && (
        <div
          className="better-form-group-header"
          onClick={handleToggle}
          role={collapsible ? 'button' : undefined}
          tabIndex={collapsible ? 0 : undefined}
          onKeyDown={(e) => {
            if (collapsible && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              handleToggle();
            }
          }}
        >
          {title && (
            <h3 className="better-form-group-title">
              {title}
              {collapsible && (
                <span className="better-form-group-toggle">{isCollapsed ? '▶' : '▼'}</span>
              )}
            </h3>
          )}
          {description && <p className="better-form-group-description">{description}</p>}
        </div>
      )}
      {!isCollapsed && (
        <div className="better-form-group-content">
          {visibleFields.map((field) => (
            <WizardField key={field.id} field={field} />
          ))}
        </div>
      )}
    </div>
  );
}

export default WizardStep;
