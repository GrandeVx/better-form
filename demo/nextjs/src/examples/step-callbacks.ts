import type { WizardConfig } from 'better-form';

export const stepCallbacksConfig: WizardConfig = {
  id: 'step-callbacks-demo',
  title: 'User Verification',
  steps: [
    {
      id: 'email-verification',
      title: 'Email',
      // onEnter is called when the user enters this step
      // Can return an object with field values to pre-fill
      onEnter: async (formData) => {
        console.log('Entered email verification step');
        // Could pre-fill email from localStorage or API
        const savedEmail = localStorage.getItem('user_email');
        if (savedEmail && !formData.email) {
          return { email: savedEmail };
        }
        return undefined;
      },
      // onExit is called when the user leaves this step (for side effects)
      onExit: async (formData) => {
        // Side effects: logging, saving to localStorage, etc.
        const email = formData.email as string;
        if (email) {
          console.log('Saving email to localStorage');
          localStorage.setItem('user_email', email);
        }
        return undefined;
      },
      // canProceed is used for validation before allowing navigation
      canProceed: (formData) => {
        const email = formData.email as string;
        if (!email?.includes('@')) {
          return 'Please enter a valid email address';
        }
        return true;
      },
      fieldGroups: [
        {
          id: 'email-group',
          description: 'Enter your email to receive verification code',
          fields: [
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
      id: 'verification-code',
      title: 'Verify',
      onEnter: async (formData) => {
        console.log('Generating verification code for:', formData.email);
        // Simulate sending verification code
        await new Promise((resolve) => setTimeout(resolve, 300));
        // Note: In a real app, the code would be sent via email
        // For demo, use code 123456
        console.log('Demo: use verification code 123456');
        return undefined;
      },
      // Custom validation for verification code
      canProceed: (formData) => {
        const enteredCode = formData.verificationCode as string;
        // Accept 123456 for demo
        if (enteredCode === '123456') {
          return true;
        }
        if (enteredCode?.length === 6) {
          return 'Invalid verification code. Try 123456 for demo.';
        }
        return 'Please enter the 6-digit code';
      },
      fieldGroups: [
        {
          id: 'code-group',
          description: 'Enter the verification code (use 123456 for demo)',
          fields: [
            {
              id: 'verificationCode',
              name: 'verificationCode',
              label: 'Verification Code',
              type: 'text',
              required: true,
              placeholder: '123456',
              validations: [
                {
                  type: 'pattern',
                  value: '^\\d{6}$',
                  message: 'Code must be 6 digits',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'profile',
      title: 'Profile',
      onEnter: async () => {
        console.log('Loading profile data...');
        // Simulate API call to fetch user profile
        await new Promise((resolve) => setTimeout(resolve, 400));
        // Pre-fill some fields based on "fetched" data
        // In real app, this would come from an API
        return undefined;
      },
      fieldGroups: [
        {
          id: 'profile-group',
          title: 'Complete Your Profile',
          fields: [
            {
              id: 'firstName',
              name: 'firstName',
              label: 'First Name',
              type: 'text',
              required: true,
              placeholder: 'John',
            },
            {
              id: 'lastName',
              name: 'lastName',
              label: 'Last Name',
              type: 'text',
              required: true,
              placeholder: 'Doe',
            },
            {
              id: 'phone',
              name: 'phone',
              label: 'Phone Number',
              type: 'tel',
              placeholder: '+1 234 567 8900',
            },
          ],
        },
      ],
    },
    {
      id: 'preferences',
      title: 'Preferences',
      onExit: async (formData) => {
        console.log('Saving preferences...');
        // Simulate saving preferences
        await new Promise((resolve) => setTimeout(resolve, 300));
        console.log('Preferences saved:', {
          notifications: formData.notifications,
          newsletter: formData.newsletter,
        });
        return undefined;
      },
      fieldGroups: [
        {
          id: 'notification-prefs',
          title: 'Notification Preferences',
          fields: [
            {
              id: 'notifications',
              name: 'notifications',
              label: 'Push Notifications',
              type: 'boolean',
              checkboxLabel: 'Enable push notifications',
            },
            {
              id: 'newsletter',
              name: 'newsletter',
              label: 'Newsletter',
              type: 'single-checkbox',
              checkboxLabel: 'Subscribe to weekly newsletter',
            },
            {
              id: 'frequency',
              name: 'frequency',
              label: 'Email Frequency',
              type: 'radio',
              options: [
                { label: 'Daily digest', value: 'daily' },
                { label: 'Weekly summary', value: 'weekly' },
                { label: 'Monthly newsletter', value: 'monthly' },
              ],
              layout: 'vertical',
            },
          ],
        },
      ],
    },
    {
      id: 'complete',
      title: 'Complete',
      onEnter: async (formData) => {
        console.log('Registration complete!');
        console.log('Final data:', formData);
        // In real app, submit to API here
        return undefined;
      },
      fieldGroups: [
        {
          id: 'confirm',
          fields: [
            {
              id: 'acceptTerms',
              name: 'acceptTerms',
              label: 'Terms',
              type: 'single-checkbox',
              checkboxLabel: 'I agree to the terms of service and privacy policy',
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

export const stepCallbacksCode = `const config: WizardConfig = {
  id: 'user-verification',
  steps: [
    {
      id: 'email-verification',
      title: 'Email',
      // Called when entering the step
      // Return an object to pre-fill fields
      onEnter: async (formData) => {
        const savedEmail = localStorage.getItem('user_email');
        if (savedEmail && !formData.email) {
          return { email: savedEmail }; // Pre-fill email
        }
        return undefined;
      },
      // Called when leaving the step
      // Return false to block, string for error message
      onExit: async (formData) => {
        const isValid = await validateEmailAPI(formData.email);
        if (!isValid) return false; // Block navigation
        return undefined; // Allow navigation
      },
      fieldGroups: [/* ... */],
    },
    {
      id: 'verification-code',
      title: 'Verify',
      onEnter: async (formData) => {
        // Send verification code
        await sendVerificationCode(formData.email);
        return undefined;
      },
      // Use canProceed for custom validation logic
      canProceed: (formData) => {
        if (formData.verificationCode === expectedCode) {
          return true;
        }
        return 'Invalid verification code';
      },
      fieldGroups: [/* ... */],
    },
  ],
};`;
