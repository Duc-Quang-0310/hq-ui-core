import postcss from 'rollup-plugin-postcss';
import sass from 'node-sass';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    postcss({
      preprocessor: (content, id) =>
        new Promise((resolve, reject) => {
          const result = sass.renderSync({ file: id });
          resolve({ code: result.css.toString() });
        }),
      plugins: [autoprefixer],
      sourceMap: true,
      extract: true,
      extensions: ['.sass', '.css'],
    }),
  ],
};
