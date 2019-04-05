const babel = require('@babel/core');
const fs = require('fs');
const ReactDOMServer = require('react-dom/server');
const yaml = require('js-yaml');
const requireFromString = require('require-from-string');
const { flushToHTML } = require('styled-jsx/server');

const readFile = filePath => fs.readFileSync(filePath, 'utf8');

module.exports = {
  /**
   * Reads CV data from YAML.
   * @param {string} cv Contents of the CV YAML file.
   * @returns {object} CV data object.
   */
  readCV: cv => yaml.load(readFile(cv)),

  /**
   * Generates an HTML file from a template and a CV data object.
   * @param {object} data CV data that will be passed into the template.
   * @param {string} templatePath Path to a Pug template.
   * @returns {string} The rendered HTML page.
   */
  generateHTML: (data, templatePath, language = 'en') => {
    const { code } = babel.transformFileSync(templatePath, {
      plugins: ['styled-jsx/babel', '@babel/plugin-transform-modules-commonjs'],
      presets: ['@babel/preset-react'],
    });
    const templateModule = requireFromString(code);
    const componentString = ReactDOMServer.renderToStaticMarkup(
      templateModule.default({
        ...data,
        language,
      })
    );
    const styles = flushToHTML();
    return `<!doctype html><html><head>${styles}</head><body>${componentString}</body></html>`;
  },
};
