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
   * @param {string} root Paths are resolved relative to the root.
   * @returns {string} Resolved path to the template.
   */
  resolveTemplate: (name, root = '.') => {
    let uri = name;

    // Append extension
    if (!uri.endsWith('.jsx')) {
      uri = `${uri}.jsx`;
    }

    // Resolve path
    const resolvedPath = [
      uri,
      path.join(__dirname, '../themes', uri),
      path.join(root, uri),
      path.join(root, 'themes', uri),
    ]
      .map(x => path.resolve(x))
      .find(x => fs.existsSync(x));
    if (!resolvedPath) {
      throw new Error(`Error: theme not found: "${name}"`);
    }
    return resolvedPath;
  },
};
