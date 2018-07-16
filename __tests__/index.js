const test = require('ava');
const fs = require('fs');
const { generateHTML, parseCV } = require('../src');
const { readPath, resolveTemplate, resolveYML } = require('../src/resolve');

process.chdir(__dirname);

const cv = parseCV(readPath(resolveYML('cv.yml')));
const themes = fs.readdirSync('../themes');

themes.filter(theme => theme !== 'common.pug').forEach(theme =>
  test(`correctly applies theme "${theme}"`, t => {
    const template = resolveTemplate(theme);
    t.snapshot(generateHTML(cv, template));
  })
);
