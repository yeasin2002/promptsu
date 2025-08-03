// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { FileStore } = require('metro-cache');
const { withNativeWind } = require('nativewind/metro');
const path = require('node:path');

const config = withTurborepoManagedCache(
  withMonorepoPaths(
    withNativeWind(getDefaultConfig(__dirname), {
      input: './global.css',
      configPath: './tailwind.config.js',
    })
  )
);

config.resolver.unstable_enablePackageExports = true;

config.resolver.disableHierarchicalLookup = true;

module.exports = config;

/**
 * Add the monorepo paths to the Metro config.
 * This allows Metro to resolve modules from the monorepo.
 *
 * @see https://docs.expo.dev/guides/monorepos/#modify-the-metro-config
 * @param {import('expo/metro-config').MetroConfig} MonoConfig
 * @returns {import('expo/metro-config').MetroConfig}
 */
function withMonorepoPaths(MonoConfig) {
  const projectRoot = import.meta.dirname;
  const workspaceRoot = path.resolve(projectRoot, '../..');

  // #1 - Watch all files in the monorepo
  MonoConfig.watchFolders = [workspaceRoot];

  // #2 - Resolve modules within the project's `node_modules` first, then all monorepo modules
  MonoConfig.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(workspaceRoot, 'node_modules'),
  ];

  return MonoConfig;
}

/**
 * Move the Metro cache to the `.cache/metro` folder.
 * If you have any environment variables, you can configure Turborepo to invalidate it when needed.
 *
 * @see https://turbo.build/repo/docs/reference/configuration#env
 * @param {import('expo/metro-config').MetroConfig} turboConfig
 * @returns {import('expo/metro-config').MetroConfig}
 */
function withTurborepoManagedCache(turboConfig) {
  turboConfig.cacheStores = [
    new FileStore({ root: path.join(__dirname, '.cache/metro') }),
  ];
  return turboConfig;
}
