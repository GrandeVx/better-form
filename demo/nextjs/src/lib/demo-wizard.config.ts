/**
 * Demo Wizard Configuration
 * Showcases better-form capabilities
 */

import type { WizardConfig } from 'better-form';
import {
  commonValidations,
  equals,
  greaterThan,
  andConditions,
} from 'better-form';

export const demoWizardConfig: WizardConfig = {
  id: 'demo-wizard',
  title: 'Better Form Demo',
  description: 'A comprehensive demo of the better-form library',
  steps: [
    // Step 1: Personal Info
    {
      id: 'personal-info',
      title: 'Personal Information',
      description: 'Tell us about yourself',
      fieldGroups: [
        {
          id: 'name-group',
          title: 'Your Name',
          fields: [
            {
              id: 'firstName',
              name: 'firstName',
              label: 'First Name',
              type: 'text',
              placeholder: 'Enter your first name',
              validations: [commonValidations.required('First name is required')],
              width: 'half',
            },
            {
              id: 'lastName',
              name: 'lastName',
              label: 'Last Name',
              type: 'text',
              placeholder: 'Enter your last name',
              validations: [commonValidations.required('Last name is required')],
              width: 'half',
            },
          ],
        },
        {
          id: 'contact-group',
          title: 'Contact Details',
          fields: [
            {
              id: 'email',
              name: 'email',
              label: 'Email Address',
              type: 'email',
              placeholder: 'your@email.com',
              validations: [
                commonValidations.required('Email is required'),
                commonValidations.email('Please enter a valid email'),
              ],
            },
            {
              id: 'phone',
              name: 'phone',
              label: 'Phone Number',
              type: 'tel',
              placeholder: '+39 123 456 7890',
              helpText: 'Optional - for order updates',
            },
          ],
        },
      ],
    },

    // Step 2: Preferences
    {
      id: 'preferences',
      title: 'Your Preferences',
      description: 'Customize your experience',
      fieldGroups: [
        {
          id: 'subscription-group',
          fields: [
            {
              id: 'subscriptionType',
              name: 'subscriptionType',
              label: 'Subscription Type',
              type: 'radio',
              options: [
                { label: 'Free', value: 'free', description: 'Basic features' },
                { label: 'Pro', value: 'pro', description: 'All features + priority support' },
                { label: 'Enterprise', value: 'enterprise', description: 'Custom solutions' },
              ],
              validations: [commonValidations.required('Please select a subscription')],
            },
            {
              id: 'budget',
              name: 'budget',
              label: 'Monthly Budget',
              type: 'number',
              placeholder: 'Enter amount',
              prefix: '€',
              showIf: equals('subscriptionType', 'enterprise'),
              validations: [
                commonValidations.required('Budget is required for enterprise'),
                commonValidations.min(1000, 'Minimum budget is €1,000'),
              ],
            },
          ],
        },
        {
          id: 'features-group',
          title: 'Select Features',
          fields: [
            {
              id: 'features',
              name: 'features',
              label: 'Which features interest you?',
              type: 'checkbox',
              options: [
                { label: 'API Access', value: 'api' },
                { label: 'Custom Branding', value: 'branding' },
                { label: 'Analytics Dashboard', value: 'analytics' },
                { label: 'Team Collaboration', value: 'team' },
                { label: 'Priority Support', value: 'support' },
              ],
            },
          ],
        },
      ],
    },

    // Step 3: Additional Info (Conditional)
    {
      id: 'additional-info',
      title: 'Additional Information',
      description: 'Almost there!',
      showIf: andConditions(
        equals('subscriptionType', 'pro'),
        greaterThan('features.length', 2)
      ),
      fieldGroups: [
        {
          id: 'company-group',
          title: 'Company Details',
          fields: [
            {
              id: 'companyName',
              name: 'companyName',
              label: 'Company Name',
              type: 'text',
              placeholder: 'Your company',
            },
            {
              id: 'companySize',
              name: 'companySize',
              label: 'Company Size',
              type: 'select',
              options: [
                { label: '1-10 employees', value: 'small' },
                { label: '11-50 employees', value: 'medium' },
                { label: '51-200 employees', value: 'large' },
                { label: '200+ employees', value: 'enterprise' },
              ],
            },
            {
              id: 'description',
              name: 'description',
              label: 'Tell us more',
              type: 'textarea',
              placeholder: 'What are you looking to achieve?',
              rows: 4,
            },
          ],
        },
      ],
    },

    // Step 4: Confirmation
    {
      id: 'confirmation',
      title: 'Confirm & Submit',
      description: 'Review and accept terms',
      fieldGroups: [
        {
          id: 'terms-group',
          fields: [
            {
              id: 'newsletter',
              name: 'newsletter',
              label: 'Subscribe to our newsletter',
              type: 'boolean',
              helpText: 'Get updates about new features and tips',
            },
            {
              id: 'acceptTerms',
              name: 'acceptTerms',
              label: 'I accept the Terms of Service and Privacy Policy',
              type: 'boolean',
              validations: [
                {
                  type: 'custom',
                  message: 'You must accept the terms to continue',
                  customValidator: (value) => value === true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  nextButtonText: 'Continue',
  previousButtonText: 'Back',
  submitButtonText: 'Complete Registration',
  loadingText: 'Submitting...',
};
