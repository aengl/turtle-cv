const fs = require('fs');
const path = require('path');

module.exports = {
  /**
   * Resolves the absolute path to a CV file.
   * @param {string} uri The URI (relative or absolute path) for the CV file.
   * @returns {string} Resolved path to the CV file.
   */
  resolveCV: uri => path.resolve(uri),

  /**
   * Resolves the absolute path to a template.
   * @param {string} name Template name or path.
   * @returns {string} Resolved path to the template.
   */
  resolveTemplate: name => {
    let uri = name;

    // Append extension
    if (!uri.endsWith('.jsx')) {
      uri = `${uri}.jsx`;
    }

    // Resolve path
    if (!fs.existsSync(uri)) {
      const templateRoot = path.join(__dirname, '../themes');
      uri = path.join(templateRoot, uri);
    }
    if (!fs.existsSync(uri)) {
      throw new Error(`Error: theme not found: "${name}"`);
    }
    return path.resolve(uri);
  },
};
