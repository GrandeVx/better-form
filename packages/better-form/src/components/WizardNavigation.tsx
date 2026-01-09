/**
 * Better Form - WizardNavigation
 * Navigation components for the wizard
 */

'use client';

import React from 'react';
import { useWizard } from '../hooks/useWizard';

export interface WizardNavigationProps {
  /** Custom class name */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Text for previous button */
  prevText?: string;
  /** Text for next button */
  nextText?: string;
  /** Text for submit button */
  submitText?: string;
  /** Text shown during submission */
  submittingText?: string;
  /** Hide previous button */
  hidePrev?: boolean;
  /** Hide next/submit button */
  hideNext?: boolean;
  /** Custom previous button render */
  renderPrev?: (props: NavigationButtonProps) => React.ReactNode;
  /** Custom next button render */
  renderNext?: (props: NavigationButtonProps) => React.ReactNode;
  /** Custom submit button render */
  renderSubmit?: (props: NavigationButtonProps) => React.ReactNode;
  /** Additional content between buttons */
  children?: React.ReactNode;
}

export interface NavigationButtonProps {
  onClick: () => void;
  disabled: boolean;
  isSubmitting: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
  currentStepIndex: number;
  totalSteps: number;
}

/**
 * WizardNavigation - Flexible navigation component
 */
export function WizardNavigation({
  className,
  style,
  prevText = 'Indietro',
  nextText = 'Avanti',
  submitText = 'Invia',
  submittingText = 'Invio in corso...',
  hidePrev = false,
  hideNext = false,
  renderPrev,
  renderNext,
  renderSubmit,
  children,
}: WizardNavigationProps) {
  const {
    currentStepIndex,
    visibleSteps,
    previousStep,
    nextStep,
    submit,
    canGoNext,
    isSubmitting,
  } = useWizard();

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === visibleSteps.length - 1;

  const buttonProps: NavigationButtonProps = {
    onClick: () => {},
    disabled: false,
    isSubmitting,
    isFirstStep,
    isLastStep,
    currentStepIndex,
    totalSteps: visibleSteps.length,
  };

  return (
    <div className={`better-form-navigation ${className || ''}`} style={style}>
      {/* Previous Button */}
      {!hidePrev &&
        (renderPrev ? (
          renderPrev({
            ...buttonProps,
            onClick: previousStep,
            disabled: isFirstStep || isSubmitting,
          })
        ) : (
          <button
            type="button"
            className="better-form-btn better-form-btn-secondary"
            onClick={previousStep}
            disabled={isFirstStep || isSubmitting}
          >
            {prevText}
          </button>
        ))}

      {/* Custom content between buttons */}
      {children}

      {/* Next/Submit Button */}
      {!hideNext &&
        (isLastStep ? (
          // Submit Button
          <>
            {renderSubmit ? (
              renderSubmit({
                ...buttonProps,
                onClick: submit,
                disabled: !canGoNext || isSubmitting,
              })
            ) : (
              <button
                type="button"
                className="better-form-btn better-form-btn-primary"
                onClick={submit}
                disabled={!canGoNext || isSubmitting}
              >
                {isSubmitting ? submittingText : submitText}
              </button>
            )}
          </>
        ) : (
          // Next Button
          <>
            {renderNext ? (
              renderNext({
                ...buttonProps,
                onClick: nextStep,
                disabled: !canGoNext,
              })
            ) : (
              <button
                type="button"
                className="better-form-btn better-form-btn-primary"
                onClick={nextStep}
                disabled={!canGoNext}
              >
                {nextText}
              </button>
            )}
          </>
        ))}
    </div>
  );
}

/**
 * StepIndicator - Shows current step progress
 */
export interface StepIndicatorProps {
  /** Custom class name */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Show step numbers */
  showNumbers?: boolean;
  /** Show step labels */
  showLabels?: boolean;
  /** Allow clicking on steps to navigate */
  clickable?: boolean;
  /** Custom step renderer */
  renderStep?: (props: StepIndicatorItemProps) => React.ReactNode;
}

export interface StepIndicatorItemProps {
  step: { id: string; title?: string };
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  isClickable: boolean;
  onClick: () => void;
}

export function StepIndicator({
  className,
  style,
  showNumbers = true,
  showLabels = true,
  clickable = true,
  renderStep,
}: StepIndicatorProps) {
  const { visibleSteps, currentStepIndex, goToStep, isStepComplete } = useWizard();

  return (
    <div className={`better-form-step-indicator ${className || ''}`} style={style}>
      <div className="better-form-steps">
        {visibleSteps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isCompleted = isStepComplete(step.id);
          const isClickable = clickable && (index < currentStepIndex || isCompleted);

          const itemProps: StepIndicatorItemProps = {
            step,
            index,
            isActive,
            isCompleted,
            isClickable,
            onClick: () => isClickable && goToStep(index),
          };

          if (renderStep) {
            return <React.Fragment key={step.id}>{renderStep(itemProps)}</React.Fragment>;
          }

          return (
            <button
              key={step.id}
              type="button"
              className={`better-form-step-item ${isActive ? 'active' : ''} ${
                isCompleted ? 'completed' : ''
              }`}
              onClick={itemProps.onClick}
              disabled={!isClickable}
              aria-label={`Step ${index + 1}: ${step.title || step.id}`}
              aria-current={isActive ? 'step' : undefined}
            >
              {showNumbers && (
                <span className="better-form-step-number">{isCompleted ? '✓' : index + 1}</span>
              )}
              {showLabels && step.title && (
                <span className="better-form-step-label">{step.title}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * ProgressBar - Visual progress indicator
 */
export interface ProgressBarProps {
  /** Custom class name */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Show percentage text */
  showPercentage?: boolean;
  /** Show step text (e.g., "Step 2 of 5") */
  showStepText?: boolean;
}

export function ProgressBar({
  className,
  style,
  showPercentage = false,
  showStepText = true,
}: ProgressBarProps) {
  const { currentStepIndex, visibleSteps } = useWizard();

  const progress = ((currentStepIndex + 1) / visibleSteps.length) * 100;

  return (
    <div className={`better-form-progress ${className || ''}`} style={style}>
      <div className="better-form-progress-bar">
        <div className="better-form-progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="better-form-progress-text">
        {showStepText && (
          <span>
            Step {currentStepIndex + 1} di {visibleSteps.length}
          </span>
        )}
        {showPercentage && <span>{Math.round(progress)}%</span>}
      </div>
    </div>
  );
}

/**
 * SaveIndicator - Shows save status
 */
export interface SaveIndicatorProps {
  /** Custom class name */
  className?: string;
  /** Text to show when saving */
  savingText?: string;
  /** Text to show when saved */
  savedText?: string;
  /** Text to show when there's an error */
  errorText?: string;
}

export function SaveIndicator({
  className,
  savingText = 'Salvataggio...',
  savedText = 'Salvato',
  errorText = 'Errore di salvataggio',
}: SaveIndicatorProps) {
  const { state } = useWizard();
  const [showSaved, setShowSaved] = React.useState(false);

  // Show "Saved" indicator briefly after data changes
  React.useEffect(() => {
    if (!state.isSubmitting) {
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [state.data, state.isSubmitting]);

  if (state.isSubmitting) {
    return (
      <span className={`better-form-save-indicator saving ${className || ''}`}>{savingText}</span>
    );
  }

  if (showSaved) {
    return (
      <span className={`better-form-save-indicator saved ${className || ''}`}>{savedText}</span>
    );
  }

  return null;
}

export default WizardNavigation;
