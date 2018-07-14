const pug = require('pug');
const yaml = require('js-yaml');
const { markdown } = require('markdown');

module.exports = {
  /**
   * Reads CV data from YAML.
   * @param {string} cv Contents of the CV YAML file.
   * @returns {object} CV data object.
   */
  parseCV: cv => yaml.load(cv),

  /**
   * Generates an HTML file from a template and a CV data object.
   * @param {object} data CV data that will be passed into the template.
   * @param {string} templatePath Path to a Pug template.
   * @returns {string} The rendered HTML page.
   */
  generateHTML: (data, templatePath) =>
    pug.renderFile(templatePath, {
      ...data,
      markdown: s => markdown.toHTML(s),
    }),
};
