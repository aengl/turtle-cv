const fs = require('fs');
const path = require('path');
const program = require('caporal');
const packageJson = require('./package.json');
const turtle = require('./src');

const templates = ['default'];

program
  .version(packageJson.version)
  .description('Turn a YAML into a CV website')
  .argument('<yml>', 'YAML file with the CV data')
  .option(
    '-t, --template <name>',
    'Name of the HTML template to use',
    templates
  )
  .option('-o, --output <path>', 'Path to the output file', templates)
  .action((args, options, logger) => {
    const cvPath = path.resolve(args.yml);
    logger.info(`Reading CV from "${cvPath}"`);
    const cv = turtle.readCV(args.yml);

    logger.info(`Generating HTML`);
    const html = turtle.generateHTML(cv);
    const outputPath = options.output || cvPath.replace(/\.[^.]+$/, '.html');

    logger.info(`Saving HTML at "${outputPath}"`);
    fs.writeFileSync(outputPath, html);
  });

program.parse(process.argv);
