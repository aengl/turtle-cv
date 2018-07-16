const fs = require('fs');
const pug = require('pug');
const yaml = require('js-yaml');
const { markdown } = require('markdown');

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
  generateHTML: (data, templatePath, language = 'en') =>
    pug.renderFile(templatePath, {
      ...data,
      language,
      markdown: s => markdown.toHTML(s),
      sections: Object.keys(data), // Remember the order of the sections
    }),
};
