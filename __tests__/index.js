const Ajv = require('ajv');
const test = require('ava');
const fs = require('fs');
const { generateHTML, parseCV } = require('../src');
const { readPath, resolveTemplate, resolveYML } = require('../src/resolve');
const siteSchema = require('../schema/schema.json');

const ajv = new Ajv();

process.chdir(__dirname);

const cv = parseCV(readPath(resolveYML('cv.yml')));
const themes = fs.readdirSync('../themes');

test(`cv conforms to the schema`, t => {
  t.is(
    ajv.validate(siteSchema, cv),
    true,
    JSON.stringify(ajv.errors, undefined, 2)
  );
});

themes.filter(theme => theme !== 'common.pug').forEach(theme =>
  test(`correctly applies theme "${theme}"`, t => {
    const template = resolveTemplate(theme);
    t.snapshot(generateHTML(cv, template));
  })
);
