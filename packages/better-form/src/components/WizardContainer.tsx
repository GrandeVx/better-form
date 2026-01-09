/**
 * Better Form - WizardContainer
 * Main container component for the wizard
 */

'use client';

import type React from 'react';
import { useWizard } from '../hooks/useWizard';
import { WizardProvider, type WizardProviderProps } from './WizardProvider';

export interface WizardContainerProps extends WizardProviderProps {
  /** Custom class name for the container */
  className?: string;
  /** Custom styles for the container */
  style?: React.CSSProperties;
  /** Show step indicator */
  showStepIndicator?: boolean;
  /** Custom step indicator component */
  stepIndicator?: React.ReactNode;
  /** Show navigation buttons */
  showNavigation?: boolean;
  /** Custom navigation component */
  navigation?: React.ReactNode;
  /** Header content */
  header?: React.ReactNode;
  /** Footer content (appears after navigation) */
  footer?: React.ReactNode;
}

/**
 * Internal container content that uses the wizard context
 */
function WizardContainerContent({
  children,
  className,
  style,
  showStepIndicator = true,
  stepIndicator,
  showNavigation = true,
  navigation,
  header,
  footer,
}: Omit<WizardContainerProps, keyof WizardProviderProps>) {
  const { theme, currentStepIndex, visibleSteps, config, state, blockingDialog } = useWizard();

  const currentStep = visibleSteps[currentStepIndex];

  // Generate CSS variables from theme
  const themeStyles: React.CSSProperties = {
    '--bf-color-primary': theme.colors.primary,
    '--bf-color-primary-hover': theme.colors.primaryHover,
    '--bf-color-secondary': theme.colors.secondary,
    '--bf-color-background': theme.colors.background,
    '--bf-color-surface': theme.colors.surface,
    '--bf-color-text': theme.colors.text,
    '--bf-color-text-muted': theme.colors.textMuted,
    '--bf-color-border': theme.colors.border,
    '--bf-color-error': theme.colors.error,
    '--bf-color-success': theme.colors.success,
    '--bf-color-warning': theme.colors.warning,
    '--bf-radius-sm': theme.borderRadius.sm,
    '--bf-radius-md': theme.borderRadius.md,
    '--bf-radius-lg': theme.borderRadius.lg,
    '--bf-spacing-xs': theme.spacing.xs,
    '--bf-spacing-sm': theme.spacing.sm,
    '--bf-spacing-md': theme.spacing.md,
    '--bf-spacing-lg': theme.spacing.lg,
    '--bf-spacing-xl': theme.spacing.xl,
    '--bf-font-family': theme.typography.fontFamily,
    '--bf-font-size-sm': theme.typography.fontSize.sm,
    '--bf-font-size-base': theme.typography.fontSize.base,
    '--bf-font-size-lg': theme.typography.fontSize.lg,
    '--bf-font-size-xl': theme.typography.fontSize.xl,
    '--bf-shadow-sm': theme.shadows.sm,
    '--bf-shadow-md': theme.shadows.md,
    '--bf-shadow-lg': theme.shadows.lg,
    '--bf-transition-fast': theme.transitions.fast,
    '--bf-transition-normal': theme.transitions.normal,
    ...style,
  } as React.CSSProperties;

  return (
    <div
      className={`better-form-container ${className || ''}`}
      style={themeStyles}
      data-step={currentStep?.id}
      data-step-index={currentStepIndex}
    >
      {/* Header */}
      {header && <div className="better-form-header">{header}</div>}

      {/* Step Indicator */}
      {showStepIndicator && (
        <div className="better-form-step-indicator">
          {stepIndicator || <DefaultStepIndicator />}
        </div>
      )}

      {/* Current Step Title & Description */}
      {currentStep && (
        <div className="better-form-step-header">
          {currentStep.title && <h2 className="better-form-step-title">{currentStep.title}</h2>}
          {currentStep.description && (
            <p className="better-form-step-description">{currentStep.description}</p>
          )}
        </div>
      )}

      {/* Step Content */}
      <div className="better-form-content">{children}</div>

      {/* Navigation */}
      {showNavigation && (
        <div className="better-form-navigation">{navigation || <DefaultNavigation />}</div>
      )}

      {/* Footer */}
      {footer && <div className="better-form-footer">{footer}</div>}

      {/* Blocking Dialog */}
      {state.blockingDialogOpen && blockingDialog && (
        <div className="better-form-blocking-dialog">{blockingDialog}</div>
      )}
    </div>
  );
}

/**
 * Default step indicator component
 */
function DefaultStepIndicator() {
  const { visibleSteps, currentStepIndex, goToStep, isStepComplete } = useWizard();

  return (
    <div className="better-form-steps">
      {visibleSteps.map((step, index) => {
        const isActive = index === currentStepIndex;
        const isCompleted = isStepComplete(step.id);
        const isClickable = index < currentStepIndex || isCompleted;

        return (
          <button
            key={step.id}
            type="button"
            className={`better-form-step-dot ${isActive ? 'active' : ''} ${
              isCompleted ? 'completed' : ''
            }`}
            onClick={() => isClickable && goToStep(index)}
            disabled={!isClickable}
            aria-label={`Step ${index + 1}: ${step.title || step.id}`}
            aria-current={isActive ? 'step' : undefined}
          >
            <span className="better-form-step-number">{index + 1}</span>
            {step.title && <span className="better-form-step-label">{step.title}</span>}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Default navigation component
 */
function DefaultNavigation() {
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

  return (
    <div className="better-form-nav-buttons">
      <button
        type="button"
        className="better-form-btn better-form-btn-secondary"
        onClick={previousStep}
        disabled={isFirstStep || isSubmitting}
      >
        Indietro
      </button>

      {isLastStep ? (
        <button
          type="button"
          className="better-form-btn better-form-btn-primary"
          onClick={submit}
          disabled={!canGoNext || isSubmitting}
        >
          {isSubmitting ? 'Invio in corso...' : 'Invia'}
        </button>
      ) : (
        <button
          type="button"
          className="better-form-btn better-form-btn-primary"
          onClick={nextStep}
          disabled={!canGoNext}
        >
          Avanti
        </button>
      )}
    </div>
  );
}

/**
 * WizardContainer - Main component that wraps the wizard
 */
export function WizardContainer({
  config,
  initialData,
  storage,
  theme,
  fieldComponents,
  onSubmit,
  onStepChange,
  onFieldChange,
  onValidationError,
  onNavigate,
  onNotify,
  blockingDialog,
  children,
  ...containerProps
}: WizardContainerProps) {
  return (
    <WizardProvider
      config={config}
      initialData={initialData}
      storage={storage}
      theme={theme}
      fieldComponents={fieldComponents}
      onSubmit={onSubmit}
      onStepChange={onStepChange}
      onFieldChange={onFieldChange}
      onValidationError={onValidationError}
      onNavigate={onNavigate}
      onNotify={onNotify}
      blockingDialog={blockingDialog}
    >
      <WizardContainerContent {...containerProps}>{children}</WizardContainerContent>
    </WizardProvider>
  );
}

export default WizardContainer;
