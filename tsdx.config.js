/* eslint-disable @typescript-eslint/no-var-requires */
const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const path = require('path');

module.exports = {
  /**
   * @param {import('rollup/dist/rollup').InputOptions} config
   */
  rollup(config, options) {
    config.plugins.push(
      postcss({
        plugins: [
          autoprefixer(),
          cssnano({
            preset: 'default',
          }),
        ],
        // sourceMap: true,
        // inject: true,
        // extract: false,
        inject: false,
        // only write out CSS for the first bundle (avoids pointless extra files):
        // extract: !!options.writeMeta,
        extract: path.resolve('dist/styles.min.css'),
        minimize: true,
      })
    );
    return config;
  },
};
