/**
 * Better Form - useWizard Hook
 * Access wizard context from any component
 */

'use client';

import { useContext } from 'react';
import { WizardContext, WizardContextType } from '../components/WizardProvider';

/**
 * Hook to access wizard context
 * Must be used within a WizardProvider
 */
export function useWizard(): WizardContextType {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
}
