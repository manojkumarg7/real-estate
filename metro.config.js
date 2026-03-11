const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    resolveRequest: (context, moduleName, platform) => {
      // Use CJS build of lucide-react-native to avoid ESM .js resolution issues on Metro
      if (moduleName === 'lucide-react-native') {
        return {
          type: 'sourceFile',
          filePath: path.resolve(
            __dirname,
            'node_modules/lucide-react-native/dist/cjs/lucide-react-native.js'
          ),
        };
      }
      return context.resolveRequest(context, moduleName, platform);
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
