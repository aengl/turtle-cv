const Ajv = require('ajv');
const test = require('ava');
const fs = require('fs');
const { generateHTML, readCV } = require('../src');
const { resolveTemplate, resolveYML } = require('../src/resolve');
const siteSchema = require('../schema/schema.json');

const ajv = new Ajv();

process.chdir(__dirname);

const cv = readCV(resolveYML('cv.yml'));
const themes = fs.readdirSync('../themes');

test(`cv conforms to the schema`, t => {
  t.is(
    ajv.validate(siteSchema, cv),
    true,
    JSON.stringify(ajv.errors, undefined, 2)
  );
});

themes.filter(theme => theme.indexOf('.pug') === -1).forEach(theme =>
  test(`correctly applies theme "${theme}"`, t => {
    const template = resolveTemplate(theme);
    t.snapshot(generateHTML(cv, template));
  })
);

test(`can use another language`, t => {
  const template = resolveTemplate('default');
  t.snapshot(generateHTML(cv, template, 'de'));
});
