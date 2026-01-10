/**
 * Better Form - Main Export
 * A powerful, schema-driven form wizard library for React
 *
 * @packageDocumentation
 */

// ============================================
// Types
// ============================================
export type {
  WizardConfig,
  WizardStep,
  WizardField as WizardFieldConfig,
  FieldType,
  SelectOption,
  ValidationRule,
  ValidationType,
  ConditionalLogic,
  ComparisonOperator,
  FieldGroup,
  GroupLayout,
  FieldWidth,
  TextTransform,
  AddressData,
  WizardState,
  WizardAction,
  FieldComponentProps,
  StepComponentProps,
  WizardNavigationProps as NavigationProps,
  WizardStepIndicatorProps,
  UseWizardReturn,
  WizardProviderProps,
  BlockingDialogProps,
  StorageAdapter,
} from './types/wizard-schema';

// ============================================
// Components
// ============================================
export {
  WizardProvider,
  WizardContext,
  type WizardContextType,
} from './components/WizardProvider';

export {
  WizardContainer,
  type WizardContainerProps,
} from './components/WizardContainer';

export {
  WizardStep as WizardStepRenderer,
  AutoStep,
  StepGroup,
  type WizardStepProps,
  type StepGroupProps,
} from './components/WizardStep';

export {
  WizardField,
  FieldError,
  FieldValue,
  ConditionalField,
  type WizardFieldProps,
} from './components/WizardField';

export {
  WizardNavigation,
  StepIndicator,
  ProgressBar,
  SaveIndicator,
  type WizardNavigationProps,
  type NavigationButtonProps,
  type StepIndicatorProps,
  type StepIndicatorItemProps,
  type ProgressBarProps,
  type SaveIndicatorProps,
} from './components/WizardNavigation';

// ============================================
// Hooks
// ============================================
export { useWizard } from './hooks/useWizard';

// ============================================
// Fields
// ============================================
export {
  // Text
  TextField,
  EmailField,
  PasswordField,
  PhoneField,
  UrlField,
  TextareaField,
  // Select
  SelectField,
  MultiSelectField,
  SearchableSelectField,
  // Boolean
  BooleanField,
  SwitchField,
  AcceptTermsField,
  // Number
  NumberField,
  RangeField,
  CurrencyField,
  PercentageField,
  // Date
  DateField,
  TimeField,
  DateTimeField,
  MonthField,
  WeekField,
  DateRangeField,
  // Radio
  RadioField,
  RadioCardsField,
  ButtonGroupField,
  // Checkbox
  CheckboxField,
  CheckboxCardsField,
  ChipsField,
  // File
  FileUploadField,
  ImageUploadField,
  DocumentUploadField,
  // Special
  HiddenField,
  ReadOnlyField,
  DisplayField,
} from './fields';

export type { FileInfo } from './fields';

export {
  defaultFieldComponents,
  getFieldComponentByType,
  mergeFieldComponents,
  type FieldComponentsMap,
} from './fields/defaultFieldComponents';

// ============================================
// Validation
// ============================================
export { WizardValidator } from './core/validation/WizardValidator';
export { commonValidations } from './core/validation/commonValidations';

// ============================================
// Conditional Logic
// ============================================
export { ConditionalLogicEvaluator } from './core/conditional-logic/ConditionalLogicEvaluator';
export {
  createCondition,
  andConditions,
  orConditions,
  complexCondition,
  equals,
  notEquals,
  contains,
  greaterThan,
  lessThan,
  greaterThanOrEquals,
  lessThanOrEquals,
  isIn,
  notIn,
  isEmpty,
  isNotEmpty,
  isTruthy,
  isFalsy,
  between,
  not,
} from './core/conditional-logic/helpers';

// ============================================
// Themes
// ============================================
export type {
  BetterFormTheme,
  ThemeColors,
  ThemeBorderRadius,
  ThemeSpacing,
  ThemeTypography,
  ThemeShadows,
  ThemeTransitions,
  DeepPartial,
} from './themes/types';

export { defaultTheme } from './themes/defaultTheme';
export {
  createTheme,
  themePresets,
  themeToCSS,
} from './themes/createTheme';
