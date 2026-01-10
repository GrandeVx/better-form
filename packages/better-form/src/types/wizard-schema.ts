/**
 * Better Form - Core Type Definitions
 * JSON-driven wizard form schema types
 */

import type { ComponentType, ReactNode } from 'react';

// ============================================
// Conditional Logic Types
// ============================================

export type ComparisonOperator =
  | 'equals'
  | 'notEquals'
  | 'contains'
  | 'notContains'
  | 'greaterThan'
  | 'lessThan'
  | 'greaterThanOrEquals'
  | 'lessThanOrEquals'
  | 'in'
  | 'notIn'
  | 'isEmpty'
  | 'isNotEmpty';

export interface ConditionalLogic {
  field: string;
  operator: ComparisonOperator;
  value: unknown;
  and?: ConditionalLogic[];
  or?: ConditionalLogic[];
}

// ============================================
// Validation Types
// ============================================

export type ValidationType =
  | 'required'
  | 'minLength'
  | 'maxLength'
  | 'pattern'
  | 'min'
  | 'max'
  | 'email'
  | 'custom';

export interface ValidationRule {
  type: ValidationType;
  value?: string | number | RegExp;
  message?: string;
  customValidator?: (value: unknown, formData: Record<string, unknown>) => boolean;
}

// ============================================
// Field Types
// ============================================

export type FieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'number'
  | 'date'
  | 'textarea'
  | 'select'
  | 'multiselect'
  | 'radio'
  | 'checkbox'
  | 'single-checkbox'
  | 'boolean'
  | 'file'
  | 'address'
  | 'custom';

export type FieldWidth =
  | 'full'
  | 'half'
  | 'third'
  | 'quarter'
  | 'two-thirds'
  | 'three-quarters'
  | 'auto';

export type TextTransform = 'uppercase' | 'lowercase' | 'capitalize' | 'none';

export interface SelectOption {
  label: string;
  value: string | number | boolean;
  disabled?: boolean;
  description?: string;
  icon?: React.ReactNode;
}

export interface AddressData {
  formattedAddress: string;
  street?: string;
  number?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

export interface WizardField {
  // Identity
  id: string;
  name: string;
  label: string;
  type: FieldType;

  // Display
  placeholder?: string;
  helpText?: string;
  helperText?: string;
  description?: string;
  tooltip?: string;
  defaultValue?: unknown;
  suffix?: string;
  prefix?: string;

  // Boolean/Checkbox specific
  checkboxLabel?: string;
  termsText?: string;
  termsUrl?: string;

  // Checkbox group specific
  minSelections?: number;
  maxSelections?: number;

  // Validation
  validations?: ValidationRule[];

  // Conditional visibility/state
  showIf?: ConditionalLogic;
  hideIf?: ConditionalLogic;
  disabled?: boolean;
  disabledIf?: ConditionalLogic;

  // Field-specific options
  options?: SelectOption[];
  multiple?: boolean;
  rows?: number;
  maxLength?: number;
  minLength?: number;
  minDate?: string | Date;
  maxDate?: string | Date;
  startLabel?: string;
  endLabel?: string;
  accept?: string;
  maxFileSize?: number;
  maxSize?: number;
  maxFiles?: number;

  // Text transformations
  transform?: TextTransform;

  // Layout
  className?: string;
  width?: FieldWidth;

  // Input attributes
  autoComplete?: string;
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  inputType?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'search';
  pattern?: string;
  required?: boolean;

  // Layout options for radio/checkbox groups
  layout?: 'horizontal' | 'vertical' | 'grid';
  columns?: number;

  // Textarea specific
  autoResize?: boolean;

  // Number field specific
  step?: number | 'any';
  min?: number;
  max?: number;
  currency?: string;
  locale?: string;

  // Dynamic options loading
  loadOptions?: () => Promise<SelectOption[]>;
  dependsOn?: string[];

  // Callbacks
  onChange?: (
    value: unknown,
    formData: Record<string, unknown>
  ) => undefined | Record<string, unknown> | Promise<undefined | Record<string, unknown>>;

  // Address field specific
  onAddressSelected?: (
    addressData: AddressData,
    formData: Record<string, unknown>
  ) => undefined | Record<string, unknown> | Promise<undefined | Record<string, unknown>>;
  showDetailFields?: boolean;
  onAddressDetailChange?: (
    addressData: AddressData,
    formData: Record<string, unknown>
  ) => undefined | Record<string, unknown> | Promise<undefined | Record<string, unknown>>;

  // Custom field rendering
  customComponent?: ComponentType<FieldComponentProps>;
}

// ============================================
// Field Group Types
// ============================================

export type GroupLayout = 'vertical' | 'horizontal' | 'grid';

export interface FieldGroup {
  id: string;
  title?: string;
  description?: string;
  fields: WizardField[];
  layout?: GroupLayout;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
  cardStyle?: boolean;
  showIf?: ConditionalLogic;
  hideIf?: ConditionalLogic;
}

// ============================================
// Step Types
// ============================================

export interface WizardStep {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  fieldGroups: FieldGroup[];

  // Conditional visibility
  showIf?: ConditionalLogic;
  hideIf?: ConditionalLogic;

  // Lifecycle hooks
  onEnter?: (
    formData: Record<string, unknown>
  ) => undefined | Record<string, unknown> | Promise<undefined | Record<string, unknown>>;
  onExit?: (
    formData: Record<string, unknown>
  ) => undefined | Record<string, unknown> | Promise<undefined | Record<string, unknown>>;

  // Step validation
  canProceed?: (formData: Record<string, unknown>) => boolean | string;

  // Custom rendering
  customComponent?: ComponentType<StepComponentProps>;
}

// ============================================
// Config Types
// ============================================

export interface WizardConfig {
  id: string;
  title?: string;
  description?: string;
  steps: WizardStep[];

  // Initial data
  initialData?: Record<string, unknown>;

  // Submit handling
  onSubmit?: (data: Record<string, unknown>) => Promise<void>;
  transformBeforeSubmit?: (data: Record<string, unknown>) => Record<string, unknown>;

  // Navigation labels
  nextButtonText?: string;
  previousButtonText?: string;
  submitButtonText?: string;
  loadingText?: string;

  // Auto-save
  autoSave?: boolean;
  storageKey?: string;
  saveDebounceMs?: number;
  saveOnStepChange?: boolean;
}

// ============================================
// State Types
// ============================================

export interface WizardState {
  config: WizardConfig;
  currentStepIndex: number;
  formData: Record<string, unknown>;
  /** Alias for formData - used by some components */
  data: Record<string, unknown>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  completedSteps: Set<string>;
  isLoading: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
  submitError?: string;
  /** Whether blocking dialog is open */
  blockingDialogOpen?: boolean;
}

// ============================================
// Action Types
// ============================================

export type WizardAction =
  | { type: 'SET_FIELD_VALUE'; payload: { field: string; value: unknown } }
  | { type: 'SET_MULTIPLE_VALUES'; payload: Record<string, unknown> }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'NEXT_STEP' }
  | { type: 'PREVIOUS_STEP' }
  | { type: 'SET_ERROR'; payload: { field: string; message: string } }
  | { type: 'CLEAR_ERROR'; payload: string }
  | { type: 'SET_TOUCHED'; payload: { field: string; touched: boolean } }
  | { type: 'MARK_STEP_COMPLETE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'RESET_FORM' }
  | { type: 'LOAD_SAVED_STATE'; payload: Partial<WizardState> };

// ============================================
// Component Props Types
// ============================================

export interface FieldComponentProps<T = unknown> {
  /** Field configuration */
  field: WizardField;
  /** Current field value */
  value: T;
  /** Update field value */
  onChange: (value: T) => void;
  /** Field error message */
  error?: string;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Full form data (for dependent fields) */
  formData: Record<string, unknown>;
  /** Blur handler */
  onBlur?: () => void;
  /** Custom class name */
  className?: string;
}

export interface StepComponentProps {
  step: WizardStep;
  stepIndex: number;
  formData: Record<string, unknown>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

export interface WizardNavigationProps {
  currentStepIndex: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  canProceed: boolean;
  isSubmitting: boolean;
  isLoading: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit?: () => void;
  nextButtonText?: string;
  previousButtonText?: string;
  submitButtonText?: string;
  loadingText?: string;
  className?: string;
}

export interface WizardStepIndicatorProps {
  steps: WizardStep[];
  currentStepIndex: number;
  completedSteps: Set<string>;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

// ============================================
// Hook Return Types
// ============================================

export interface UseWizardReturn {
  // State
  currentStep: WizardStep;
  currentStepIndex: number;
  formData: Record<string, unknown>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isLoading: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
  canProceed: boolean;

  // Actions
  setFieldValue: (field: string, value: unknown) => void;
  setMultipleValues: (values: Record<string, unknown>) => void;
  nextStep: () => Promise<boolean>;
  previousStep: () => void;
  goToStep: (stepIndex: number) => void;
  submit: () => Promise<void>;
  resetForm: () => void;

  // Validation
  validateField: (fieldName: string) => boolean;
  validateStep: (stepIndex?: number) => boolean;
  clearError: (field: string) => void;

  // Utilities
  getFieldValue: (field: string) => unknown;
  isFieldVisible: (field: WizardField) => boolean;
  isFieldDisabled: (field: WizardField) => boolean;
  getVisibleFields: (stepIndex?: number) => WizardField[];
}

// ============================================
// Provider Props Types
// ============================================

export interface WizardProviderProps {
  config: WizardConfig;
  children: ReactNode;

  // Callbacks
  onSubmit?: (data: Record<string, unknown>) => Promise<void>;
  onStepChange?: (stepIndex: number, stepId: string) => void;
  onNotify?: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
  onNavigate?: (path: string) => void;

  // Custom field components registry
  fieldComponents?: Record<string, ComponentType<FieldComponentProps>>;

  // Custom blocking dialog
  renderBlockingDialog?: (props: BlockingDialogProps) => ReactNode;

  // Storage adapter (for SSR/custom storage)
  storageAdapter?: StorageAdapter;
}

export interface BlockingDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: Record<string, unknown>) => Promise<void>;
  blockingReason: string;
  formData: Record<string, unknown>;
}

export interface StorageAdapter {
  getItem: (key: string) => string | null | Promise<string | null>;
  setItem: (key: string, value: string) => void | Promise<void>;
  removeItem: (key: string) => void | Promise<void>;
}
