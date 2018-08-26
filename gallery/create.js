const fs = require('fs');
const pug = require('pug');
const { generateHTML, readCV } = require('../src');
const { resolveTemplate, resolveYML } = require('../src/resolve');

process.chdir(__dirname);

const cv = readCV(resolveYML('../__tests__/cv.yml'));
const themes = fs
  .readdirSync('../themes')
  .filter(theme => theme.indexOf('.pug') === -1);
const html = pug.renderFile('./index.pug', {
  themes: themes.map(theme => ({
    name: theme,
    html: generateHTML(cv, resolveTemplate(theme)),
  })),
});

fs.writeFileSync('./index.html', html);
