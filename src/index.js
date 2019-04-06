const babel = require('@babel/core');
const fs = require('fs');
const ReactDOMServer = require('react-dom/server');
const yaml = require('js-yaml');
const { flushToHTML } = require('styled-jsx/server');
const { Helmet } = require('react-helmet');
const { resolveTemplate } = require('./resolve');
const Module = require('module');
const path = require('path');

module.exports = {
  /**
   * Reads CV data from a YAML file.
   * @param {string} cvPath Path to the CV YAML file.
   * @returns {object} CV data object.
   */
  readCV: cvPath => yaml.load(fs.readFileSync(cvPath, 'utf8')),

  /**
   * Generates an HTML file from a template and a CV data object.
   * @param {object} data CV data that will be passed into the template.
   * @param {string} templatePath Path to a template.
   * @returns {string} The rendered HTML page.
   */
  generateHTML: (data, templatePath, language = 'en') => {
    const templateModule = importTemplate(templatePath);
    const renteredTemplate = ReactDOMServer.renderToStaticMarkup(
      templateModule.default({
        ...data,
        language,
      })
    );
    const styles = flushToHTML();
    const helmet = Helmet.renderStatic();
    const head = `<head>${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}${styles}</head>`;
    return `<!doctype html><html lang="${language}" ${helmet.htmlAttributes.toString()}>${head}<body>${renteredTemplate}</body></html>`;
  },
};

/**
 * Like NodeJs' `require`, but transpiles the template module and its
 * dependencies on-the-fly.
 */
const importTemplate = templatePath => {
  const templateCode = compileTemplateDependencies(templatePath);
  return compileModule(templateCode, templatePath).exports;
};

/**
 * Recursively searches for template imports and caches their modules.
 */
const compileTemplateDependencies = templatePath => {
  let templateCode = transpile(templatePath);
  const importRegex = /theme:\/\/(?<template>[^'"`]+)/;
  while (true) {
    const match = templateCode.match(importRegex);
    if (!match) {
      break;
    }
    const dependencyTemplatePath = resolveTemplate(match.groups.template);
    templateCode = templateCode.replace(importRegex, './$1.jsx');
    require.cache[dependencyTemplatePath] = compileModule(
      transpile(dependencyTemplatePath),
      dependencyTemplatePath
    );
    compileTemplateDependencies(dependencyTemplatePath);
  }
  return templateCode;
};

/**
 * Transpiles a template with Babel.
 */
const transpile = filePath =>
  babel.transformFileSync(filePath, {
    plugins: ['styled-jsx/babel', '@babel/plugin-transform-modules-commonjs'],
    presets: ['@babel/preset-react'],
  }).code;

/**
 * Compiles a module.
 */
const compileModule = (code, filename) => {
  const paths = Module._nodeModulePaths(path.dirname(filename));
  const m = new Module(filename, module.parent);
  m.filename = filename;
  m.paths = paths;
  m._compile(code, filename);
  return m;
};
