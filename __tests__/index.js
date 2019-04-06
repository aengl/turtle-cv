const Ajv = require('ajv');
const test = require('ava');
const fs = require('fs');
const yaml = require('js-yaml');
const { renderTemplate } = require('../src');
const { resolveTemplate, resolveCV } = require('../src/resolve');
const siteSchema = require('../schema/schema.json');

const ajv = new Ajv();

process.chdir(__dirname);

const cvPath = resolveCV('cv.yml');

test(`cv conforms to the schema`, t => {
  const cv = yaml.load(fs.readFileSync(cvPath, 'utf8'));
  t.is(
    ajv.validate(siteSchema, cv),
    true,
    JSON.stringify(ajv.errors, undefined, 2)
  );
});

fs.readdirSync('../themes')
  .filter(theme => theme.indexOf('.jsx') === -1)
  .forEach(theme =>
    test(`correctly applies theme "${theme}"`, t => {
      const template = resolveTemplate(theme);
      t.snapshot(renderTemplate(cvPath, template));
    })
  );

test(`can use another language`, t => {
  const template = resolveTemplate('default');
  t.snapshot(renderTemplate(cvPath, template, 'de'));
});
