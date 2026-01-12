import type { WizardConfig } from '@better_form/core';

export const crossFieldValidationConfig: WizardConfig = {
  id: 'cross-field-validation-demo',
  title: 'Event Booking',
  steps: [
    {
      id: 'event-details',
      title: 'Event Details',
      fieldGroups: [
        {
          id: 'basic-info',
          title: 'Basic Information',
          fields: [
            {
              id: 'eventName',
              name: 'eventName',
              label: 'Event Name',
              type: 'text',
              required: true,
              placeholder: 'Enter event name',
            },
            {
              id: 'eventType',
              name: 'eventType',
              label: 'Event Type',
              type: 'select',
              required: true,
              options: [
                { label: 'Conference', value: 'conference' },
                { label: 'Workshop', value: 'workshop' },
                { label: 'Webinar', value: 'webinar' },
                { label: 'Meetup', value: 'meetup' },
              ],
            },
          ],
        },
        {
          id: 'date-range',
          title: 'Date Range',
          description: 'End date must be after start date',
          fields: [
            {
              id: 'startDate',
              name: 'startDate',
              label: 'Start Date',
              type: 'date',
              required: true,
            },
            {
              id: 'endDate',
              name: 'endDate',
              label: 'End Date',
              type: 'date',
              required: true,
              validations: [
                {
                  type: 'custom',
                  customValidator: (value, formData) => {
                    const startDate = formData.startDate as string;
                    if (!startDate || !value) return true;
                    return new Date(value as string) >= new Date(startDate);
                  },
                  message: 'End date must be on or after start date',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'capacity',
      title: 'Capacity',
      fieldGroups: [
        {
          id: 'attendees',
          title: 'Attendee Limits',
          description: 'Maximum must be greater than minimum',
          fields: [
            {
              id: 'minAttendees',
              name: 'minAttendees',
              label: 'Minimum Attendees',
              type: 'number',
              required: true,
              placeholder: '10',
              validations: [{ type: 'min', value: 1, message: 'Must be at least 1' }],
            },
            {
              id: 'maxAttendees',
              name: 'maxAttendees',
              label: 'Maximum Attendees',
              type: 'number',
              required: true,
              placeholder: '100',
              validations: [
                {
                  type: 'custom',
                  customValidator: (value, formData) => {
                    const min = Number(formData.minAttendees);
                    const max = Number(value);
                    if (!min || !max) return true;
                    return max > min;
                  },
                  message: 'Maximum must be greater than minimum attendees',
                },
              ],
            },
          ],
        },
        {
          id: 'pricing',
          title: 'Ticket Pricing',
          description: 'VIP price should be higher than regular',
          fields: [
            {
              id: 'regularPrice',
              name: 'regularPrice',
              label: 'Regular Ticket Price',
              type: 'number',
              required: true,
              placeholder: '50',
              validations: [{ type: 'min', value: 0, message: 'Price cannot be negative' }],
            },
            {
              id: 'vipPrice',
              name: 'vipPrice',
              label: 'VIP Ticket Price',
              type: 'number',
              required: true,
              placeholder: '150',
              validations: [
                {
                  type: 'custom',
                  customValidator: (value, formData) => {
                    const regular = Number(formData.regularPrice);
                    const vip = Number(value);
                    if (!regular || !vip) return true;
                    return vip > regular;
                  },
                  message: 'VIP price must be higher than regular price',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'confirmation',
      title: 'Review',
      fieldGroups: [
        {
          id: 'confirm',
          fields: [
            {
              id: 'acceptTerms',
              name: 'acceptTerms',
              label: 'Terms',
              type: 'single-checkbox',
              checkboxLabel: 'I confirm all information is correct',
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

export const crossFieldValidationCode = `const config: WizardConfig = {
  id: 'event-booking',
  title: 'Event Booking',
  steps: [
    {
      id: 'event-details',
      title: 'Event Details',
      fieldGroups: [{
        id: 'date-range',
        fields: [
          {
            id: 'startDate',
            name: 'startDate',
            label: 'Start Date',
            type: 'date',
            required: true,
          },
          {
            id: 'endDate',
            name: 'endDate',
            label: 'End Date',
            type: 'date',
            required: true,
            // Cross-field validation
            validations: [{
              type: 'custom',
              customValidator: (value, formData) => {
                const startDate = formData.startDate;
                if (!startDate || !value) return true;
                return new Date(value) >= new Date(startDate);
              },
              message: 'End date must be after start date',
            }],
          },
        ],
      }],
    },
    // More fields with cross-validation...
  ],
};`;
