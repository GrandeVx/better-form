/**
 * Better Form - Plugin Types
 * Interfaces and types for the plugin system
 */

import type { ComponentType } from 'react';
import type { FieldComponentProps } from '../types/wizard-schema';

/**
 * Better Form Plugin Interface
 *
 * Plugins can extend better-form with custom field components,
 * new field types, and optional initialization logic.
 *
 * @example
 * ```typescript
 * const myPlugin: BetterFormPlugin = {
 *   name: 'my-plugin',
 *   version: '1.0.0',
 *   fieldComponents: {
 *     'custom-field': CustomFieldComponent,
 *   },
 * };
 * ```
 */
export interface BetterFormPlugin {
  /** Plugin unique identifier */
  name: string;

  /** Plugin version (semver) */
  version: string;

  /** Field components provided by this plugin */
  fieldComponents: Record<string, ComponentType<FieldComponentProps>>;

  /** Optional: Field types added (for documentation/TypeScript) */
  fieldTypes?: string[];

  /** Optional: Plugin initialization (called when plugin is registered) */
  init?: () => void | Promise<void>;

  /** Optional: Plugin cleanup */
  destroy?: () => void | Promise<void>;
}

/**
 * Plugin factory function type
 *
 * @example
 * ```typescript
 * const myPlugin: PluginFactory<MyPluginConfig> = (config) => ({
 *   name: 'my-plugin',
 *   version: '1.0.0',
 *   fieldComponents: { ... },
 * });
 * ```
 */
export type PluginFactory<TConfig = unknown> = (config: TConfig) => BetterFormPlugin;

/**
 * Create a simple plugin from field components
 *
 * @param name - Plugin unique identifier
 * @param version - Plugin version
 * @param fieldComponents - Map of field type to component
 * @returns A valid BetterFormPlugin
 *
 * @example
 * ```typescript
 * const plugin = createPlugin('my-plugin', '1.0.0', {
 *   'custom-field': CustomFieldComponent,
 * });
 * ```
 */
export function createPlugin(
  name: string,
  version: string,
  fieldComponents: Record<string, ComponentType<FieldComponentProps>>
): BetterFormPlugin {
  return {
    name,
    version,
    fieldComponents,
    fieldTypes: Object.keys(fieldComponents),
  };
}

/**
 * Merge multiple plugins into a single fieldComponents map
 *
 * This is useful when you want to combine several plugins
 * with the default field components.
 *
 * @param plugins - Array of plugins to merge
 * @returns Combined field components map
 *
 * @example
 * ```typescript
 * const combinedComponents = mergePlugins(
 *   googlePlacesPlugin({ apiKey: '...' }),
 *   richTextPlugin(),
 * );
 *
 * const allComponents = {
 *   ...defaultFieldComponents,
 *   ...combinedComponents,
 * };
 * ```
 */
export function mergePlugins(
  ...plugins: BetterFormPlugin[]
): Record<string, ComponentType<FieldComponentProps>> {
  const result: Record<string, ComponentType<FieldComponentProps>> = {};
  for (const plugin of plugins) {
    Object.assign(result, plugin.fieldComponents);
  }
  return result;
}

/**
 * Initialize multiple plugins
 *
 * Calls the init() method on each plugin that has one.
 * Useful for plugins that need to load external scripts.
 *
 * @param plugins - Array of plugins to initialize
 *
 * @example
 * ```typescript
 * await initializePlugins(googlePlacesPlugin({ apiKey: '...' }));
 * ```
 */
export async function initializePlugins(...plugins: BetterFormPlugin[]): Promise<void> {
  await Promise.all(plugins.filter((plugin) => plugin.init).map((plugin) => plugin.init?.()));
}

/**
 * Get all field types from plugins
 *
 * @param plugins - Array of plugins
 * @returns Array of all field type names
 */
export function getPluginFieldTypes(...plugins: BetterFormPlugin[]): string[] {
  return plugins.flatMap((plugin) => plugin.fieldTypes || Object.keys(plugin.fieldComponents));
}
