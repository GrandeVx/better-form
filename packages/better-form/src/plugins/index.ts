/**
 * Better Form - Plugin System
 *
 * Utilities for extending better-form with plugins.
 *
 * @example
 * ```typescript
 * import { createPlugin, mergePlugins } from '@better_form/core/plugins';
 *
 * // Create a custom plugin
 * const myPlugin = createPlugin('my-plugin', '1.0.0', {
 *   'custom-field': CustomFieldComponent,
 * });
 *
 * // Merge multiple plugins
 * const pluginComponents = mergePlugins(
 *   googlePlacesPlugin({ apiKey: '...' }),
 *   myPlugin,
 * );
 * ```
 */

export type {
  BetterFormPlugin,
  PluginFactory,
} from './types';

export {
  createPlugin,
  mergePlugins,
  initializePlugins,
  getPluginFieldTypes,
} from './types';
