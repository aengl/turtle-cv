const fs = require('fs');
const pug = require('pug');
const { generateHTML, parseCV } = require('../src');
const { readPath, resolveTemplate, resolveYML } = require('../src/resolve');

process.chdir(__dirname);

const cv = parseCV(readPath(resolveYML('../__tests__/cv.yml')));
const themes = fs.readdirSync('../themes');
const html = pug.renderFile('./index.pug', {
  themes: themes.map(theme => ({
    name: theme,
    html: generateHTML(cv, resolveTemplate(theme)),
  })),
});

fs.writeFileSync('./index.html', html);
