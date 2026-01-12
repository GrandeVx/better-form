/**
 * Better Form - WizardProvider
 * Context provider for wizard state management
 */

'use client';

import {
  type ComponentType,
  type ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

import { ConditionalLogicEvaluator } from '../core/conditional-logic/ConditionalLogicEvaluator';
import { WizardValidator } from '../core/validation/WizardValidator';
import { defaultFieldComponents } from '../fields/defaultFieldComponents';
import { defaultTheme } from '../themes/defaultTheme';
import type { BetterFormTheme } from '../themes/types';
import type {
  BlockingDialogProps,
  FieldComponentProps,
  StorageAdapter,
  UseWizardReturn,
  WizardAction,
  WizardConfig,
  WizardField,
  WizardState,
  WizardStep,
} from '../types/wizard-schema';

// ============================================
// Context Types
// ============================================

interface VisibleStep {
  step: WizardStep;
  originalIndex: number;
}

export interface WizardContextType extends UseWizardReturn {
  config: WizardConfig;
  state: WizardState;
  theme: BetterFormTheme;
  showBlockingDialog: boolean;
  setShowBlockingDialog: (show: boolean) => void;
  blockingReason: string;
  visibleSteps: VisibleStep[];
  visibleCurrentStepIndex: number;
  fieldComponents: Record<string, ComponentType<FieldComponentProps>>;
  onNotify?: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
}

// ============================================
// Context
// ============================================

export const WizardContext = createContext<WizardContextType | null>(null);

// ============================================
// State Management
// ============================================

function createInitialState(config: WizardConfig): WizardState {
  const initialData = config.initialData || {};
  return {
    config,
    currentStepIndex: 0,
    formData: initialData,
    data: initialData,
    errors: {},
    touched: {},
    completedSteps: new Set<string>(),
    isLoading: false,
    isSubmitting: false,
    isDirty: false,
    submitError: undefined,
  };
}

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'SET_FIELD_VALUE': {
      const newFormData = {
        ...state.formData,
        [action.payload.field]: action.payload.value,
      };
      return {
        ...state,
        formData: newFormData,
        data: newFormData,
        isDirty: true,
        errors: {
          ...state.errors,
          [action.payload.field]: '',
          _step: '',
        },
      };
    }

    case 'SET_MULTIPLE_VALUES': {
      const newFormData = {
        ...state.formData,
        ...action.payload,
      };
      return {
        ...state,
        formData: newFormData,
        data: newFormData,
        isDirty: true,
      };
    }

    case 'SET_STEP':
      return {
        ...state,
        currentStepIndex: action.payload,
      };

    case 'NEXT_STEP': {
      const nextIndex = Math.min(state.currentStepIndex + 1, state.config.steps.length - 1);
      const currentStepId = state.config.steps[state.currentStepIndex]?.id;
      return {
        ...state,
        currentStepIndex: nextIndex,
        completedSteps: new Set([...Array.from(state.completedSteps), currentStepId]),
      } as WizardState;
    }

    case 'PREVIOUS_STEP':
      return {
        ...state,
        currentStepIndex: Math.max(state.currentStepIndex - 1, 0),
      };

    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.field]: action.payload.message,
        },
      };

    case 'CLEAR_ERROR': {
      const newErrors = { ...state.errors };
      delete newErrors[action.payload];
      return {
        ...state,
        errors: newErrors,
      };
    }

    case 'SET_TOUCHED':
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.payload.field]: action.payload.touched,
        },
      };

    case 'MARK_STEP_COMPLETE':
      return {
        ...state,
        completedSteps: new Set([...Array.from(state.completedSteps), action.payload]),
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.payload,
      };

    case 'RESET_FORM':
      return createInitialState(state.config);

    case 'LOAD_SAVED_STATE':
      return {
        ...state,
        ...action.payload,
        config: state.config,
      };

    default:
      return state;
  }
}

// ============================================
// Default Storage Adapter
// ============================================

const defaultStorageAdapter: StorageAdapter = {
  getItem: (key: string) => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },
};

// ============================================
// Config Normalization
// ============================================

/**
 * Normalizes the wizard config by auto-generating field `id` from `name` if not provided.
 * This allows users to only specify `name` in their config and have `id` auto-generated.
 */
function normalizeConfig(config: WizardConfig): WizardConfig {
  return {
    ...config,
    steps: config.steps.map((step) => ({
      ...step,
      fieldGroups: step.fieldGroups.map((group) => ({
        ...group,
        fields: group.fields.map((field) => ({
          ...field,
          // Auto-generate id from name if not provided
          id: field.id || field.name,
        })),
      })),
    })),
  };
}

// ============================================
// Provider Props
// ============================================

export interface WizardProviderProps {
  config: WizardConfig;
  children: ReactNode;
  theme?: BetterFormTheme;
  onSubmit?: (data: Record<string, unknown>) => Promise<void>;
  onStepChange?: (stepIndex: number, stepId: string) => void;
  onNotify?: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
  onNavigate?: (path: string) => void;
  fieldComponents?: Record<string, ComponentType<FieldComponentProps>>;
  renderBlockingDialog?: (props: BlockingDialogProps) => ReactNode;
  storageAdapter?: StorageAdapter;
}

// ============================================
// Provider Component
// ============================================

export function WizardProvider({
  config: rawConfig,
  children,
  theme = defaultTheme,
  onSubmit,
  onStepChange,
  onNotify,
  fieldComponents = defaultFieldComponents,
  renderBlockingDialog,
  storageAdapter = defaultStorageAdapter,
}: WizardProviderProps) {
  // Normalize config to auto-generate field ids from names
  const config = useMemo(() => normalizeConfig(rawConfig), [rawConfig]);

  // Initialize state with normalized config
  const [state, dispatch] = useReducer(wizardReducer, rawConfig, (cfg) =>
    createInitialState(normalizeConfig(cfg))
  );
  const [showBlockingDialog, setShowBlockingDialog] = useState(false);
  const [blockingReason, setBlockingReason] = useState('');

  // Create evaluator and validator instances
  const evaluator = useMemo(() => new ConditionalLogicEvaluator(state.formData), [state.formData]);

  const validator = useMemo(
    () => new WizardValidator(config, state.formData),
    [config, state.formData]
  );

  // Update evaluator and validator when form data changes
  useEffect(() => {
    evaluator.updateFormData(state.formData);
    validator.updateFormData(state.formData);
  }, [state.formData, evaluator, validator]);

  // Auto-save to storage if enabled
  useEffect(() => {
    if (config.autoSave && config.storageKey) {
      const timeoutId = setTimeout(() => {
        const dataToSave = {
          formData: state.formData,
          currentStepIndex: state.currentStepIndex,
          completedSteps: Array.from(state.completedSteps),
        };
        storageAdapter.setItem(config.storageKey as string, JSON.stringify(dataToSave));
      }, config.saveDebounceMs || 500);

      return () => clearTimeout(timeoutId);
    }
  }, [state.formData, state.currentStepIndex, state.completedSteps, config, storageAdapter]);

  // Load saved state on mount
  useEffect(() => {
    if (config.storageKey) {
      const loadSavedState = async () => {
        const savedData = await storageAdapter.getItem(config.storageKey as string);
        if (savedData) {
          try {
            const parsed = JSON.parse(savedData) as Partial<WizardState>;

            let stepIndex = parsed.currentStepIndex ?? 0;
            if (stepIndex >= config.steps.length) {
              stepIndex = 0;
            }

            dispatch({
              type: 'LOAD_SAVED_STATE',
              payload: {
                formData: parsed.formData,
                currentStepIndex: stepIndex,
                completedSteps: new Set(parsed.completedSteps),
              },
            });
          } catch (error) {
            console.error('Failed to load saved wizard state:', error);
          }
        }
      };
      loadSavedState();
    }
  }, [config.storageKey, config.steps.length, storageAdapter]);

  // Notify step change
  useEffect(() => {
    const step = config.steps[state.currentStepIndex];
    if (step) {
      onStepChange?.(state.currentStepIndex, step.id);
    }
  }, [state.currentStepIndex, config.steps, onStepChange]);

  // ============================================
  // Actions
  // ============================================

  const setFieldValue = useCallback((field: string, value: unknown) => {
    dispatch({ type: 'SET_FIELD_VALUE', payload: { field, value } });
  }, []);

  const setMultipleValues = useCallback((values: Record<string, unknown>) => {
    dispatch({ type: 'SET_MULTIPLE_VALUES', payload: values });
  }, []);

  const validateField = useCallback(
    (fieldName: string): boolean => {
      const allFields: WizardField[] = [];
      for (const step of config.steps) {
        for (const group of step.fieldGroups) {
          allFields.push(...group.fields);
        }
      }

      const field = allFields.find((f) => f.name === fieldName);
      if (!field) return true;

      const result = validator.validateField(field, state.formData[fieldName]);
      if (!result.isValid && result.error) {
        dispatch({
          type: 'SET_ERROR',
          payload: { field: fieldName, message: result.error },
        });
        return false;
      }

      dispatch({ type: 'CLEAR_ERROR', payload: fieldName });
      return true;
    },
    [config.steps, validator, state.formData]
  );

  const validateStep = useCallback(
    (stepIndex?: number): boolean => {
      const index = stepIndex ?? state.currentStepIndex;
      const result = validator.validateStep(index);

      Object.entries(result.errors).forEach(([field, message]) => {
        dispatch({ type: 'SET_ERROR', payload: { field, message } });
      });

      const fields: string[] = [];
      const step = config.steps[index];
      for (const group of step?.fieldGroups || []) {
        fields.push(...group.fields.map((f) => f.name));
      }

      fields.forEach((field) => {
        if (!result.errors[field]) {
          dispatch({ type: 'CLEAR_ERROR', payload: field });
        }
      });

      return result.isValid;
    },
    [config.steps, state.currentStepIndex, validator]
  );

  const isStepVisible = useCallback(
    (step: WizardStep): boolean => {
      return evaluator.isFieldVisible(step.showIf, step.hideIf);
    },
    [evaluator]
  );

  const findNextVisibleStepIndex = useCallback(
    (fromIndex: number): number => {
      for (let i = fromIndex + 1; i < config.steps.length; i++) {
        const step = config.steps[i];
        if (step && isStepVisible(step)) {
          return i;
        }
      }
      return -1;
    },
    [config.steps, isStepVisible]
  );

  const findPreviousVisibleStepIndex = useCallback(
    (fromIndex: number): number => {
      for (let i = fromIndex - 1; i >= 0; i--) {
        const step = config.steps[i];
        if (step && isStepVisible(step)) {
          return i;
        }
      }
      return -1;
    },
    [config.steps, isStepVisible]
  );

  const nextStep = useCallback(async (): Promise<boolean> => {
    const currentStep = config.steps[state.currentStepIndex];

    // Run onExit for current step
    if (currentStep?.onExit) {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const valuesToSet = await currentStep.onExit(state.formData);
        if (valuesToSet && typeof valuesToSet === 'object') {
          if ('_error' in valuesToSet && typeof valuesToSet._error === 'string') {
            onNotify?.(valuesToSet._error, 'error');
            dispatch({ type: 'SET_LOADING', payload: false });
            return false;
          }
          dispatch({ type: 'SET_MULTIPLE_VALUES', payload: valuesToSet });
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error saving data';
        onNotify?.(errorMessage, 'error');
        dispatch({ type: 'SET_LOADING', payload: false });
        return false;
      }
      dispatch({ type: 'SET_LOADING', payload: false });
    }

    // Validate current step
    if (!validateStep()) {
      const step = config.steps[state.currentStepIndex];
      for (const group of step?.fieldGroups || []) {
        for (const field of group.fields) {
          dispatch({
            type: 'SET_TOUCHED',
            payload: { field: field.name, touched: true },
          });
        }
      }
      return false;
    }

    // Check canProceed function
    if (currentStep?.canProceed) {
      const canProceedResult = currentStep.canProceed(state.formData);
      if (typeof canProceedResult === 'string' && canProceedResult !== '') {
        // Check for blocking dialog trigger
        if (canProceedResult.startsWith('BLOCK:')) {
          setBlockingReason(canProceedResult.substring(6));
          setShowBlockingDialog(true);
          return false;
        }
        dispatch({
          type: 'SET_ERROR',
          payload: { field: '_step', message: canProceedResult },
        });
        return false;
      }
      if (canProceedResult === false) {
        return false;
      }
    }

    // Find next visible step
    const nextVisibleIndex = findNextVisibleStepIndex(state.currentStepIndex);

    if (nextVisibleIndex !== -1) {
      dispatch({ type: 'SET_STEP', payload: nextVisibleIndex });

      // Run onEnter for next step
      const nextStepConfig = config.steps[nextVisibleIndex];
      if (nextStepConfig?.onEnter) {
        const valuesToSet = await nextStepConfig.onEnter(state.formData);
        if (valuesToSet && typeof valuesToSet === 'object') {
          dispatch({ type: 'SET_MULTIPLE_VALUES', payload: valuesToSet });
        }
      }

      return true;
    }

    return false;
  }, [
    config,
    state.currentStepIndex,
    state.formData,
    validateStep,
    findNextVisibleStepIndex,
    onNotify,
  ]);

  const previousStep = useCallback(() => {
    const prevVisibleIndex = findPreviousVisibleStepIndex(state.currentStepIndex);

    if (prevVisibleIndex !== -1) {
      dispatch({ type: 'SET_STEP', payload: prevVisibleIndex });
    }
  }, [state.currentStepIndex, findPreviousVisibleStepIndex]);

  const goToStep = useCallback(
    (stepIndex: number) => {
      if (stepIndex >= 0 && stepIndex < config.steps.length) {
        dispatch({ type: 'SET_STEP', payload: stepIndex });
      }
    },
    [config.steps.length]
  );

  const submit = useCallback(async () => {
    const result = validator.validateAll();
    if (!result.isValid) {
      Object.entries(result.errors).forEach(([field, message]) => {
        dispatch({ type: 'SET_ERROR', payload: { field, message } });
      });

      const lastError = Object.entries(result.errors).at(-1);
      if (lastError) {
        onNotify?.(lastError[1], 'error');
        return;
      }
    }

    dispatch({ type: 'SET_SUBMITTING', payload: true });

    try {
      let dataToSubmit = state.formData;
      if (config.transformBeforeSubmit) {
        dataToSubmit = config.transformBeforeSubmit(dataToSubmit);
      }

      if (onSubmit) {
        await onSubmit(dataToSubmit);
      } else if (config.onSubmit) {
        await config.onSubmit(dataToSubmit);
      }

      if (config.storageKey) {
        storageAdapter.removeItem(config.storageKey);
      }
    } catch (error) {
      console.error('Submission error:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: {
          field: '_submit',
          message: error instanceof Error ? error.message : 'Submission error',
        },
      });
      onNotify?.(error instanceof Error ? error.message : 'Submission error', 'error');
    } finally {
      dispatch({ type: 'SET_SUBMITTING', payload: false });
    }
  }, [config, state.formData, validator, onSubmit, storageAdapter, onNotify]);

  const resetForm = useCallback(() => {
    dispatch({ type: 'RESET_FORM' });
    if (config.storageKey) {
      storageAdapter.removeItem(config.storageKey);
    }
  }, [config.storageKey, storageAdapter]);

  const clearError = useCallback((field: string) => {
    dispatch({ type: 'CLEAR_ERROR', payload: field });
  }, []);

  const getFieldValue = useCallback(
    (field: string): unknown => {
      return field
        .split('.')
        .reduce<unknown>((obj, key) => (obj as Record<string, unknown>)?.[key], state.formData);
    },
    [state.formData]
  );

  const isFieldVisible = useCallback(
    (field: WizardField): boolean => {
      return evaluator.isFieldVisible(field.showIf, field.hideIf);
    },
    [evaluator]
  );

  const isFieldDisabled = useCallback(
    (field: WizardField): boolean => {
      return evaluator.isFieldDisabled(field.disabled, field.disabledIf);
    },
    [evaluator]
  );

  const getVisibleFields = useCallback(
    (stepIndex?: number): WizardField[] => {
      const index = stepIndex ?? state.currentStepIndex;
      const step = config.steps[index];
      const visibleFields: WizardField[] = [];

      for (const group of step?.fieldGroups || []) {
        if (evaluator.isFieldVisible(group.showIf, group.hideIf)) {
          for (const field of group.fields) {
            if (evaluator.isFieldVisible(field.showIf, field.hideIf)) {
              visibleFields.push(field);
            }
          }
        }
      }

      return visibleFields;
    },
    [config.steps, state.currentStepIndex, evaluator]
  );

  // ============================================
  // Computed Values
  // ============================================

  const currentStep = config.steps[state.currentStepIndex] as WizardStep;

  const visibleSteps: VisibleStep[] = useMemo(() => {
    return config.steps
      .map((step, index) => ({ step, originalIndex: index }))
      .filter(({ step }) => isStepVisible(step));
  }, [config.steps, isStepVisible]);

  const visibleCurrentStepIndex = useMemo(() => {
    return visibleSteps.findIndex((vs) => vs.originalIndex === state.currentStepIndex);
  }, [visibleSteps, state.currentStepIndex]);

  const isFirstStep = findPreviousVisibleStepIndex(state.currentStepIndex) === -1;
  const isLastStep = findNextVisibleStepIndex(state.currentStepIndex) === -1;
  const canProceed = validator.isStepComplete(state.currentStepIndex);

  // ============================================
  // Context Value
  // ============================================

  const contextValue: WizardContextType = {
    // State
    config,
    state,
    theme,
    currentStep,
    currentStepIndex: state.currentStepIndex,
    formData: state.formData,
    errors: state.errors,
    touched: state.touched,
    isLoading: state.isLoading,
    isSubmitting: state.isSubmitting,
    isDirty: state.isDirty,
    isFirstStep,
    isLastStep,
    canProceed,

    // Visible steps management
    visibleSteps,
    visibleCurrentStepIndex,

    // Blocking dialog
    showBlockingDialog,
    setShowBlockingDialog,
    blockingReason,

    // Field components
    fieldComponents,

    // Callbacks
    onNotify,

    // Actions
    setFieldValue,
    setMultipleValues,
    nextStep,
    previousStep,
    goToStep,
    submit,
    resetForm,

    // Validation
    validateField,
    validateStep,
    clearError,

    // Utilities
    getFieldValue,
    isFieldVisible,
    isFieldDisabled,
    getVisibleFields,
  };

  return (
    <WizardContext.Provider value={contextValue}>
      {children}
      {showBlockingDialog &&
        renderBlockingDialog &&
        renderBlockingDialog({
          open: showBlockingDialog,
          onClose: () => setShowBlockingDialog(false),
          onConfirm: async (_data) => {
            setShowBlockingDialog(false);
            // Handle confirm action
          },
          blockingReason,
          formData: state.formData,
        })}
    </WizardContext.Provider>
  );
}
