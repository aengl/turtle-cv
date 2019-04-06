const fs = require('fs');
const path = require('path');
const Module = require('module');
const babel = require('@babel/core');
const yaml = require('js-yaml');
const ReactDOMServer = require('react-dom/server');
const { Helmet } = require('react-helmet');
const { flushToHTML } = require('styled-jsx/server');
const { resolveTemplate } = require('./resolve');

/**
 * Generates an HTML file from a template and a CV data object.
 * @param {Module} m The module which exports a React component.
 * @param {object} props Props to pass to the component.
 * @returns {string} The rendered HTML page.
 */
const renderModule = (m, props) => {
  const renteredTemplate = ReactDOMServer.renderToStaticMarkup(
    m.exports.default(props)
  );
  const styles = flushToHTML();
  const helmet = Helmet.renderStatic();
  const head = `<head>${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}${styles}</head>`;
  return `<!doctype html><html ${helmet.htmlAttributes.toString()}>${head}<body>${renteredTemplate}</body></html>`;
};

/**
 * Generates an HTML file from a template and a CV data object.
 * @param {object} data CV data that will be passed into the template.
 * @param {string} templatePath Path to a template.
 * @returns {string} The rendered HTML page.
 */
const renderTemplate = (cvPath, templatePath, language = 'en') => {
  const cv = yaml.load(fs.readFileSync(cvPath, 'utf8'));
  const templateModule = importTemplate(templatePath, cvPath);
  return renderModule(templateModule, { cv, language });
};

/**
 * Transpiles a template with Babel.
 * @param {string} code The JS code to transpile.
 */
const transpile = code =>
  babel.transformSync(code, {
    plugins: ['styled-jsx/babel', '@babel/plugin-transform-modules-commonjs'],
    presets: ['@babel/preset-react'],
  }).code;

/**
 * Compiles a module.
 * @param {string} code The JS code to compile.
 * @param {string} filename Path to the file that the code is from originally.
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

/**
 * Like NodeJs' `require`, but transpiles the template module and its
 * dependencies on-the-fly.
 */
const importTemplate = (templatePath, root) => {
  const templateCode = compileTemplateDependencies(templatePath, root);
  return compileModule(templateCode, templatePath);
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

module.exports = {
  renderModule,
  renderTemplate,
  transpile,
  compileModule,
};
