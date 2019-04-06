const fs = require('fs');
const path = require('path');
const {
  compileModule,
  renderModule,
  renderTemplate,
  transpile,
} = require('../src');
const { resolveCV, resolveTemplate } = require('../src/resolve');

process.chdir(__dirname);

const cvPath = resolveCV('../__tests__/cv.yml');
const themes = fs
  .readdirSync('../themes')
  .map(theme => path.basename(theme, '.jsx'));

fs.writeFileSync(
  './index.html',
  renderModule(
    compileModule(
      transpile(fs.readFileSync('./gallery.jsx', 'utf-8')),
      path.resolve('./gallery.jsx')
    ),
    {
      themes: themes.map(theme => ({
        name: theme,
        html: renderTemplate(cvPath, resolveTemplate(theme)),
      })),
      script: fs.readFileSync('./index.js', 'utf-8'),
    }
  )
);
