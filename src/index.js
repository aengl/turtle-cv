const fs = require('fs');
const pug = require('pug');
const yaml = require('js-yaml');
const { markdown } = require('markdown');

module.exports = {
  /**
   * Reads CV data from a YAML file.
   * @param {string} cvPath Path to the YAML file.
   * @returns {object} CV data object.
   */
  readCV: cvPath => yaml.load(fs.readFileSync(cvPath, 'utf8')),

  /**
   * Generates an HTML file from a template and a CV data object.
   * @param {object} cv CV data that will be passed into the template.
   * @param {string} templatePath Path to a Pug template.
   * @returns {string} The rendered HTML page.
   */
  generateHTML: (cv, templatePath) =>
    pug.renderFile(templatePath, {
      ...cv,
      markdown: s => markdown.toHTML(s),
    }),
};
