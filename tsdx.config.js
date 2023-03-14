const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        modules: true,
        plugins: [
          autoprefixer(),
          cssnano({
            preset: 'default',
          }),
        ],
        // Append to <head /> as code running
        inject: true,
        // Keep it as false since we don't extract to css file anymore
        extract: false,
      })
    );
    return config;
  },
};
