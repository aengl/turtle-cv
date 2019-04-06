const fs = require('fs');
const path = require('path');
const Module = require('module');
const babel = require('@babel/core');
const yaml = require('js-yaml');
const ReactDOMServer = require('react-dom/server');
const { Helmet } = require('react-helmet');
const { flushToHTML } = require('styled-jsx/server');
const { resolveTemplate } = require('./resolve');

module.exports = {
  /**
   * Generates an HTML file from a template and a CV data object.
   * @param {object} data CV data that will be passed into the template.
   * @param {string} templatePath Path to a template.
   * @returns {string} The rendered HTML page.
   */
  generateHTML: (cvPath, templatePath, language = 'en') => {
    const cv = yaml.load(fs.readFileSync(cvPath, 'utf8'));
    const templateModule = importTemplate(templatePath, cvPath);
    const renteredTemplate = ReactDOMServer.renderToStaticMarkup(
      templateModule.default({
        ...cv,
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
const importTemplate = (templatePath, root) => {
  const templateCode = compileTemplateDependencies(templatePath, root);
  return compileModule(templateCode, templatePath).exports;
};

/**
 * Recursively searches for template imports and caches their modules.
 */
const compileTemplateDependencies = (templatePath, root) => {
  let templateCode = fs.readFileSync(templatePath, 'utf-8');
  const importRegex = /theme:\/\/(?<template>[^'"`]+)/;
  while (true) {
    const match = templateCode.match(importRegex);
    if (!match) {
      break;
    }
    const dependencyTemplatePath = resolveTemplate(match.groups.template, root);
    templateCode = templateCode.replace(importRegex, dependencyTemplatePath);
    require.cache[dependencyTemplatePath] = compileModule(
      compileTemplateDependencies(dependencyTemplatePath, root),
      dependencyTemplatePath
    );
  }
  return transpile(templateCode);
};

/**
 * Transpiles a template with Babel.
 */
const transpile = code =>
  babel.transformSync(code, {
    plugins: ['styled-jsx/babel', '@babel/plugin-transform-modules-commonjs'],
    presets: ['@babel/preset-react'],
  }).code;

/**
 * Compiles a module.
 */
const compileModule = (code, filename) => {
  const paths = [
    path.resolve(__dirname, '../node_modules'),
    ...Module._nodeModulePaths(filename),
  ];
  const m = new Module(filename, module.parent);
  m.filename = filename;
  m.paths = paths;
  m._compile(code, filename);
  return m;
};
