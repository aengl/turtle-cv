const test = require('ava');
const fs = require('fs');
const { generateHTML, readCV } = require('../src');
const { readPath, resolveTemplate, resolveYML } = require('../src/resolve');

process.chdir(__dirname);

const cv = readCV(readPath(resolveYML('cv.yml')));
const themes = fs.readdirSync('../themes');

themes.forEach(theme =>
  test(`correctly applies theme "${theme}"`, t => {
    const template = resolveTemplate(theme);
    t.snapshot(generateHTML(cv, template));
  })
);
