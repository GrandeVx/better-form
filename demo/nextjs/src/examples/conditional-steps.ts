import type { WizardConfig } from '@better_form/core';

export const conditionalStepsConfig: WizardConfig = {
  id: 'conditional-steps-demo',
  title: 'User Registration',
  steps: [
    {
      id: 'user-type',
      title: 'Account Type',
      fieldGroups: [
        {
          id: 'type-selection',
          fields: [
            {
              id: 'userType',
              name: 'userType',
              label: 'What type of account do you need?',
              type: 'radio',
              required: true,
              options: [
                { label: 'Personal Account', value: 'personal', description: 'For individual use' },
                {
                  label: 'Business Account',
                  value: 'business',
                  description: 'For companies and organizations',
                },
              ],
              layout: 'vertical',
            },
          ],
        },
      ],
    },
    {
      id: 'personal-info',
      title: 'Personal Information',
      fieldGroups: [
        {
          id: 'personal-details',
          fields: [
            {
              id: 'firstName',
              name: 'firstName',
              label: 'First Name',
              type: 'text',
              required: true,
              placeholder: 'Enter your first name',
            },
            {
              id: 'lastName',
              name: 'lastName',
              label: 'Last Name',
              type: 'text',
              required: true,
              placeholder: 'Enter your last name',
            },
            {
              id: 'email',
              name: 'email',
              label: 'Email Address',
              type: 'email',
              required: true,
              placeholder: 'you@example.com',
            },
          ],
        },
      ],
    },
    {
      id: 'business-info',
      title: 'Business Information',
      // This step only shows when userType is 'business'
      showIf: {
        field: 'userType',
        operator: 'equals',
        value: 'business',
      },
      fieldGroups: [
        {
          id: 'company-details',
          fields: [
            {
              id: 'companyName',
              name: 'companyName',
              label: 'Company Name',
              type: 'text',
              required: true,
              placeholder: 'Acme Inc.',
            },
            {
              id: 'vatNumber',
              name: 'vatNumber',
              label: 'VAT Number',
              type: 'text',
              placeholder: 'IT12345678901',
            },
            {
              id: 'employees',
              name: 'employees',
              label: 'Number of Employees',
              type: 'select',
              options: [
                { label: '1-10', value: '1-10' },
                { label: '11-50', value: '11-50' },
                { label: '51-200', value: '51-200' },
                { label: '200+', value: '200+' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'confirmation',
      title: 'Confirmation',
      fieldGroups: [
        {
          id: 'terms',
          fields: [
            {
              id: 'acceptTerms',
              name: 'acceptTerms',
              label: 'Terms and Conditions',
              type: 'single-checkbox',
              checkboxLabel: 'I accept the terms and conditions',
              required: true,
            },
            {
              id: 'newsletter',
              name: 'newsletter',
              label: 'Newsletter',
              type: 'single-checkbox',
              checkboxLabel: 'Subscribe to our newsletter',
            },
          ],
        },
      ],
    },
  ],
};

export const conditionalStepsCode = `const config: WizardConfig = {
  id: 'user-registration',
  title: 'User Registration',
  steps: [
    {
      id: 'user-type',
      title: 'Account Type',
      fieldGroups: [{
        id: 'type-selection',
        fields: [{
          id: 'userType',
          name: 'userType',
          label: 'What type of account?',
          type: 'radio',
          required: true,
          options: [
            { label: 'Personal', value: 'personal' },
            { label: 'Business', value: 'business' },
          ],
        }],
      }],
    },
    {
      id: 'personal-info',
      title: 'Personal Information',
      fieldGroups: [/* ... */],
    },
    {
      id: 'business-info',
      title: 'Business Information',
      // Conditional step - only shows for business accounts
      showIf: {
        field: 'userType',
        operator: 'equals',
        value: 'business',
      },
      fieldGroups: [{
        id: 'company-details',
        fields: [
          { id: 'companyName', name: 'companyName', label: 'Company', type: 'text' },
          { id: 'vatNumber', name: 'vatNumber', label: 'VAT', type: 'text' },
        ],
      }],
    },
    {
      id: 'confirmation',
      title: 'Confirmation',
      fieldGroups: [/* ... */],
    },
  ],
};`;
