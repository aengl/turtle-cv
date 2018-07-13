const fs = require('fs');
const path = require('path');
const program = require('caporal');
const packageJson = require('./package.json');
const turtle = require('./src');
const templates = require('./templates');

program
  .version(packageJson.version)
  .description('Turn a YAML into a CV website')
  .argument('<yml>', 'YAML file with the CV data')
  .option(
    '-t, --template <name>',
    'Name of the HTML template to use',
    Object.values(templates)
  )
  .option('-o, --output <path>', 'Path to the output file')
  .action((args, options, logger) => {
    const cvPath = path.resolve(args.yml);
    logger.info(`Reading CV from "${cvPath}"`);
    const cv = turtle.readCV(args.yml);

    const templatePath = options.template || templates.default;
    logger.info(`Generating HTML from template at "${templatePath}"`);
    const html = turtle.generateHTML(cv, path.join('templates', templatePath));
    const outputPath = options.output || cvPath.replace(/\.[^.]+$/, '.html');

    logger.info(`Saving HTML at "${outputPath}"`);
    fs.writeFileSync(outputPath, html);
  });

program.parse(process.argv);
