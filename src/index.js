// @ts-check

const debug = require('debug')('turtle-cv:index');
const fs = require('fs');
const pug = require('pug');
const yaml = require('js-yaml');

module.exports = {
  /**
   * Reads CV data from a YAML file.
   * @param {string} cvPath Path to the YAML file.
   * @returns {object} CV data object.
   */
  readCV: cvPath => {
    const contents = fs.readFileSync(cvPath, 'utf8');
    const data = yaml.load(contents);
    debug(data);
    return data;
  },

  generateHTML: (cv, templatePath) => pug.renderFile(templatePath, cv),
};
