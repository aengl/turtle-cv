#!/usr/bin/env node

const cluster = require('cluster');
const fs = require('fs');
const path = require('path');
const program = require('caporal');
const packageJson = require('../package.json');
const { renderTemplate } = require('.');
const { resolveTemplate, resolveCV } = require('./resolve');

function forkAndWatch(file, logger) {
  if (!fs.existsSync(file)) {
    throw new Error(`file not found: ${file}`);
  }
  let worker = cluster.fork();
  fs.watchFile(file, { interval: 500 }, () => {
    logger.info('change detected');
    worker.process.kill(); // For some reason, worker.kill() will not work
    worker = cluster.fork();
  });
}

program
  .version(packageJson.version)
  .description('Turn a YAML into a CV website')
  .argument('<yml>', 'YAML file with the CV data')
  .option('-l, --language <code>', 'Language code (ISO 639-1)')
  .option(
    '-t, --template <name>',
    'Name of (or path to) the HTML template to use'
  )
  .option('-o, --output <path>', 'Path to the output file')
  .option('-w, --watch', 'Monitor the YAML for changes')
  .action((args, options, logger) => {
    if (options.watch && cluster.isMaster) {
      logger.info('starting in watch mode');
      forkAndWatch(args.yml, logger);
    } else {
      const cvPath = resolveCV(args.yml);
      const templatePath = resolveTemplate(
        options.template || 'default.jsx',
        path.dirname(cvPath)
      );
      logger.info(
        `Generating HTML from CV at ${cvPath} and template at "${templatePath}"`
      );
      const html = renderTemplate(cvPath, templatePath, options.language);

      const outputPath = path.resolve(
        options.output || path.basename(cvPath).replace(/\.[^.]+$/, '.html')
      );
      logger.info(`Saving HTML to "${outputPath}"`);
      fs.writeFileSync(outputPath, html);
    }
  });

program.parse(process.argv);
