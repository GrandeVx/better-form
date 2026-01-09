/**
 * Better Form - Default Theme
 * A clean, neutral theme that works well out of the box
 */

import { BetterFormTheme } from './types';

export const defaultTheme: BetterFormTheme = {
  colors: {
    // Primary - Blue
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    primaryForeground: '#ffffff',

    // Secondary - Gray
    secondary: '#f3f4f6',
    secondaryHover: '#e5e7eb',
    secondaryForeground: '#374151',

    // Background
    background: '#ffffff',
    surface: '#f9fafb',
    surfaceHover: '#f3f4f6',

    // Text
    text: '#111827',
    textMuted: '#6b7280',
    textDisabled: '#9ca3af',

    // State colors
    error: '#ef4444',
    errorForeground: '#ffffff',
    success: '#22c55e',
    successForeground: '#ffffff',
    warning: '#f59e0b',
    warningForeground: '#ffffff',
    info: '#3b82f6',
    infoForeground: '#ffffff',

    // Borders
    border: '#e5e7eb',
    borderFocus: '#3b82f6',
    borderError: '#ef4444',

    // Input
    inputBackground: '#ffffff',
    inputBorder: '#d1d5db',
    inputPlaceholder: '#9ca3af',
  },

  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },

  spacing: {
    none: '0',
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },

  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    fontFamilyMono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, monospace',

    textXs: '0.75rem',
    textSm: '0.875rem',
    textBase: '1rem',
    textLg: '1.125rem',
    textXl: '1.25rem',
    text2xl: '1.5rem',
    text3xl: '1.875rem',

    fontNormal: '400',
    fontMedium: '500',
    fontSemibold: '600',
    fontBold: '700',

    leadingTight: '1.25',
    leadingNormal: '1.5',
    leadingRelaxed: '1.75',
  },

  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },

  transitions: {
    fast: '150ms ease',
    normal: '200ms ease',
    slow: '300ms ease',
  },
};
