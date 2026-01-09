/**
 * Better Form - Theme Type Definitions
 */

export interface ThemeColors {
  // Primary colors
  primary: string;
  primaryHover: string;
  primaryForeground: string;

  // Secondary colors
  secondary: string;
  secondaryHover: string;
  secondaryForeground: string;

  // Background colors
  background: string;
  surface: string;
  surfaceHover: string;

  // Text colors
  text: string;
  textMuted: string;
  textDisabled: string;

  // State colors
  error: string;
  errorForeground: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
  info: string;
  infoForeground: string;

  // Border colors
  border: string;
  borderFocus: string;
  borderError: string;

  // Input colors
  inputBackground: string;
  inputBorder: string;
  inputPlaceholder: string;
}

export interface ThemeBorderRadius {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  full: string;
}

export interface ThemeSpacing {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface ThemeTypography {
  fontFamily: string;
  fontFamilyMono: string;

  // Font sizes
  textXs: string;
  textSm: string;
  textBase: string;
  textLg: string;
  textXl: string;
  text2xl: string;
  text3xl: string;

  // Font weights
  fontNormal: string;
  fontMedium: string;
  fontSemibold: string;
  fontBold: string;

  // Line heights
  leadingTight: string;
  leadingNormal: string;
  leadingRelaxed: string;
}

export interface ThemeShadows {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeTransitions {
  fast: string;
  normal: string;
  slow: string;
}

export interface BetterFormTheme {
  colors: ThemeColors;
  borderRadius: ThemeBorderRadius;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  shadows: ThemeShadows;
  transitions: ThemeTransitions;
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type ThemeOverride = DeepPartial<BetterFormTheme>;
