/**
 * @better-form/plugin-google-places - Config Store
 *
 * Module-level configuration storage for the plugin.
 * This allows components to access the API key without prop drilling.
 */

import type { GooglePlacesPluginConfig } from './types';

let pluginConfig: GooglePlacesPluginConfig | null = null;

/**
 * Set the plugin configuration
 * Called by the plugin factory function
 */
export function setPluginConfig(config: GooglePlacesPluginConfig): void {
  pluginConfig = config;
}

/**
 * Get the plugin configuration
 * Throws if config has not been set
 */
export function getPluginConfig(): GooglePlacesPluginConfig {
  if (!pluginConfig) {
    throw new Error(
      '[@better-form/plugin-google-places] Plugin not initialized. ' +
        'Make sure to call googlePlacesPlugin() before using address components.'
    );
  }
  return pluginConfig;
}

/**
 * Check if the plugin is configured
 */
export function isPluginConfigured(): boolean {
  return pluginConfig !== null;
}

/**
 * Get the Google Maps API key
 */
export function getApiKey(): string {
  return getPluginConfig().apiKey;
}

/**
 * Get default country restrictions
 */
export function getDefaultCountryRestrictions(): string[] | undefined {
  return getPluginConfig().defaultCountryRestrictions;
}

/**
 * Get default language
 */
export function getDefaultLanguage(): string | undefined {
  return getPluginConfig().defaultLanguage;
}

/**
 * Get default map center
 */
export function getDefaultMapCenter(): [number, number] {
  return getPluginConfig().defaultMapCenter ?? [41.9028, 12.4964]; // Rome, Italy
}

/**
 * Get default map zoom
 */
export function getDefaultMapZoom(): number {
  return getPluginConfig().defaultMapZoom ?? 12;
}

/**
 * Get default map height
 */
export function getDefaultMapHeight(): number {
  return getPluginConfig().defaultMapHeight ?? 300;
}

/**
 * Get default show detail fields
 */
export function getDefaultShowDetailFields(): boolean {
  return getPluginConfig().defaultShowDetailFields ?? true;
}

/**
 * Get default show map picker
 */
export function getDefaultShowMapPicker(): boolean {
  return getPluginConfig().defaultShowMapPicker ?? false;
}
