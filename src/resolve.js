const fs = require('fs');
const path = require('path');

module.exports = {
  /**
   * Resolves a relative or absolute path, adding an extension if necessary.
   * @param {string} uri The URI (relative/absolute path or URL).
   * @param {string} root Path to the root that is used to resolve relative
   * paths.
   * @param {string} extension Force this extension on path URIs. Specify the
   * full extension, including the dot.
   * @returns {string} Resolved URI.
   */
  resolvePath: (uri, root, extension) => {
    if (path.isAbsolute(uri)) {
      return uri;
    }
    const resolvedPath = root ? path.resolve(root, uri) : path.resolve(uri);
    return path.extname(resolvedPath)
      ? resolvedPath
      : `${resolvedPath}${extension}`;
  },
  /**
   * Reads the contents of a file.
   * @param {string} filePath Path to the file to read.
   * @returns {string} The file's contents.
   */
  readPath: filePath => fs.readFileSync(filePath, 'utf8'),
};
