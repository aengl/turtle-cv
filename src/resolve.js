const fs = require('fs');
const path = require('path');

module.exports = {
  /**
   * Resolves the absolute path to a YML file.
   * @param {string} uri The URI (relative or absolute path) for the YML file.
   * @returns {string} Resolved path to the YML file.
   */
  resolveYML: uri => path.resolve(uri),

  /**
   * Resolves the absolute path to a Pug template.
   * @param {string} uri The URI (relative or absolute path) for the Pug
   * template.
   * @returns {string} Resolved path to the template.
   */
  resolveTemplate: uri => {
    const templateRoot = path.join(__dirname, '../themes');

    // Find something that actually exists first
    let existingUri = uri;
    if (!fs.existsSync(existingUri)) {
      existingUri = path.join(templateRoot, uri);
    }
    if (!fs.existsSync(existingUri)) {
      throw new Error(`Error: theme not found: "${uri}"`);
    }

    // Figure out the path to the Pug file
    const stats = fs.lstatSync(existingUri);
    if (stats.isDirectory) {
      return path.resolve(existingUri);
    }
    return existingUri;
  },
};
