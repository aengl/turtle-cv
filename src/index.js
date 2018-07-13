const debug = require('debug')('turtle-cv:index');
const fs = require('fs');
const yaml = require('js-yaml');

module.exports = {
  readCV: cvPath => {
    if (!fs.existsSync(cvPath)) {
      throw new Error(`file not found`);
    }
    const data = yaml.load(fs.readFileSync(cvPath, 'utf8'));
    debug(data);
    return data;
  },

  generateHTML: cv => {
    return '';
  },
};
