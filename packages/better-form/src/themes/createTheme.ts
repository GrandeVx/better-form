/**
 * Better Form - Theme Creation Utilities
 */

import { defaultTheme } from './defaultTheme';
import type { BetterFormTheme, ThemeOverride } from './types';

/**
 * Deep merge two objects
 */
function deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
  const result = { ...target };

  for (const key in source) {
    if (source[key] !== undefined) {
      if (
        typeof source[key] === 'object' &&
        source[key] !== null &&
        !Array.isArray(source[key]) &&
        typeof target[key] === 'object' &&
        target[key] !== null
      ) {
        result[key] = deepMerge(
          target[key] as Record<string, unknown>,
          source[key] as Record<string, unknown>
        ) as T[Extract<keyof T, string>];
      } else {
        result[key] = source[key] as T[Extract<keyof T, string>];
      }
    }
  }

  return result;
}

/**
 * Create a custom theme by merging overrides with the default theme
 *
 * @example
 * ```tsx
 * const myTheme = createTheme({
 *   colors: {
 *     primary: '#0B493D',
 *     primaryHover: '#083d33',
 *   },
 * });
 * ```
 */
export function createTheme(overrides: ThemeOverride): BetterFormTheme {
  return deepMerge(defaultTheme, overrides as Partial<BetterFormTheme>);
}

/**
 * Pre-built theme presets
 */
export const themePresets = {
  /**
   * Default neutral theme
   */
  default: defaultTheme,

  /**
   * Dark theme
   */
  dark: createTheme({
    colors: {
      primary: '#60a5fa',
      primaryHover: '#3b82f6',
      primaryForeground: '#1f2937',

      secondary: '#374151',
      secondaryHover: '#4b5563',
      secondaryForeground: '#f9fafb',

      background: '#111827',
      surface: '#1f2937',
      surfaceHover: '#374151',

      text: '#f9fafb',
      textMuted: '#9ca3af',
      textDisabled: '#6b7280',

      border: '#374151',
      borderFocus: '#60a5fa',

      inputBackground: '#1f2937',
      inputBorder: '#4b5563',
      inputPlaceholder: '#6b7280',
    },
  }),

  /**
   * Green theme (eco/sustainability)
   */
  green: createTheme({
    colors: {
      primary: '#059669',
      primaryHover: '#047857',
      primaryForeground: '#ffffff',

      secondary: '#ecfdf5',
      secondaryHover: '#d1fae5',
      secondaryForeground: '#065f46',

      borderFocus: '#059669',
    },
  }),

  /**
   * Purple theme
   */
  purple: createTheme({
    colors: {
      primary: '#8b5cf6',
      primaryHover: '#7c3aed',
      primaryForeground: '#ffffff',

      secondary: '#f5f3ff',
      secondaryHover: '#ede9fe',
      secondaryForeground: '#5b21b6',

      borderFocus: '#8b5cf6',
    },
  }),

  /**
   * Warm theme (orange/amber)
   */
  warm: createTheme({
    colors: {
      primary: '#f59e0b',
      primaryHover: '#d97706',
      primaryForeground: '#1f2937',

      secondary: '#fffbeb',
      secondaryHover: '#fef3c7',
      secondaryForeground: '#92400e',

      borderFocus: '#f59e0b',
    },
  }),
};

/**
 * Generate CSS custom properties from a theme
 */
export function themeToCSS(theme: BetterFormTheme): string {
  const cssVars: string[] = [];

  // Colors
  for (const [key, value] of Object.entries(theme.colors)) {
    cssVars.push(`--bf-color-${camelToKebab(key)}: ${value};`);
  }

  // Border radius
  for (const [key, value] of Object.entries(theme.borderRadius)) {
    cssVars.push(`--bf-radius-${key}: ${value};`);
  }

  // Spacing
  for (const [key, value] of Object.entries(theme.spacing)) {
    cssVars.push(`--bf-spacing-${key}: ${value};`);
  }

  // Typography
  for (const [key, value] of Object.entries(theme.typography)) {
    cssVars.push(`--bf-${camelToKebab(key)}: ${value};`);
  }

  // Shadows
  for (const [key, value] of Object.entries(theme.shadows)) {
    cssVars.push(`--bf-shadow-${key}: ${value};`);
  }

  // Transitions
  for (const [key, value] of Object.entries(theme.transitions)) {
    cssVars.push(`--bf-transition-${key}: ${value};`);
  }

  return cssVars.join('\n  ');
}

/**
 * Convert camelCase to kebab-case
 */
function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}
