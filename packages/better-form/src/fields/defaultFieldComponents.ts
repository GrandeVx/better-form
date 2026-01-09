/**
 * Better Form - Default Field Components Registry
 * Maps field types to their default component implementations
 */

import type { FieldComponentProps } from '../components/WizardField';
import type { FieldType } from '../types/wizard-schema';

import { TextField, EmailField, PasswordField, PhoneField, UrlField } from './TextField';
import { TextareaField } from './TextareaField';
import { SelectField, MultiSelectField, SearchableSelectField } from './SelectField';
import { BooleanField, SwitchField, AcceptTermsField } from './BooleanField';
import { NumberField, RangeField, CurrencyField, PercentageField } from './NumberField';
import { DateField, TimeField, DateTimeField, MonthField, WeekField, DateRangeField } from './DateField';
import { RadioField, RadioCardsField, ButtonGroupField } from './RadioField';
import { CheckboxField, CheckboxCardsField, ChipsField } from './CheckboxField';
import { FileUploadField, ImageUploadField, DocumentUploadField } from './FileUploadField';
import { HiddenField, ReadOnlyField, DisplayField } from './HiddenField';

export type FieldComponentsMap = Record<
  string,
  React.ComponentType<FieldComponentProps>
>;

/**
 * Default field components registry
 * Maps field type strings to their React components
 */
export const defaultFieldComponents: FieldComponentsMap = {
  // Text types
  text: TextField,
  email: EmailField,
  password: PasswordField,
  phone: PhoneField,
  tel: PhoneField,
  url: UrlField,
  textarea: TextareaField,

  // Select types
  select: SelectField,
  multiselect: MultiSelectField,
  'multi-select': MultiSelectField,
  searchable: SearchableSelectField,
  'searchable-select': SearchableSelectField,

  // Boolean types
  boolean: BooleanField,
  checkbox: BooleanField,
  switch: SwitchField,
  toggle: SwitchField,
  terms: AcceptTermsField,
  'accept-terms': AcceptTermsField,

  // Number types
  number: NumberField,
  range: RangeField,
  slider: RangeField,
  currency: CurrencyField,
  money: CurrencyField,
  percentage: PercentageField,
  percent: PercentageField,

  // Date types
  date: DateField,
  time: TimeField,
  datetime: DateTimeField,
  'datetime-local': DateTimeField,
  month: MonthField,
  week: WeekField,
  'date-range': DateRangeField,
  daterange: DateRangeField,

  // Radio types
  radio: RadioField,
  'radio-cards': RadioCardsField,
  radiocards: RadioCardsField,
  'button-group': ButtonGroupField,
  buttongroup: ButtonGroupField,

  // Checkbox group types
  checkboxes: CheckboxField,
  'checkbox-group': CheckboxField,
  checkboxgroup: CheckboxField,
  'checkbox-cards': CheckboxCardsField,
  checkboxcards: CheckboxCardsField,
  chips: ChipsField,
  tags: ChipsField,

  // File types
  file: FileUploadField,
  'file-upload': FileUploadField,
  fileupload: FileUploadField,
  image: ImageUploadField,
  'image-upload': ImageUploadField,
  imageupload: ImageUploadField,
  document: DocumentUploadField,
  'document-upload': DocumentUploadField,
  documentupload: DocumentUploadField,

  // Special types
  hidden: HiddenField,
  readonly: ReadOnlyField,
  'read-only': ReadOnlyField,
  display: DisplayField,
};

/**
 * Get a field component by type
 */
export function getFieldComponentByType(
  type: FieldType | string,
  customComponents?: FieldComponentsMap
): React.ComponentType<FieldComponentProps> | undefined {
  const normalizedType = type.toLowerCase();

  // Check custom components first
  if (customComponents?.[normalizedType]) {
    return customComponents[normalizedType];
  }

  // Check original type in custom components
  if (customComponents?.[type]) {
    return customComponents[type];
  }

  // Fall back to default components
  return defaultFieldComponents[normalizedType] || defaultFieldComponents[type];
}

/**
 * Create a merged field components map
 */
export function mergeFieldComponents(
  ...componentMaps: (FieldComponentsMap | undefined)[]
): FieldComponentsMap {
  return Object.assign({}, defaultFieldComponents, ...componentMaps.filter(Boolean));
}

export default defaultFieldComponents;
