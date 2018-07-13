#!/usr/bin/env node

const cluster = require('cluster');
const fs = require('fs');
const path = require('path');
const program = require('caporal');
const packageJson = require('./package.json');
const templates = require('./templates');
const turtle = require('./src');

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
  .option('-w, --watch', 'Monitor the YAML for changes')
  .action((args, options, logger) => {
    if (options.watch && cluster.isMaster) {
      logger.info('starting in watch mode');
      forkAndWatch(args.yml, logger);
    } else {
      const cvPath = path.resolve(args.yml);
      logger.info(`Reading CV from "${cvPath}"`);
      const cv = turtle.readCV(args.yml);

      const templatePath =
        options.template ||
        path.resolve(__dirname, 'templates', templates.default);
      logger.info(`Generating HTML from template at "${templatePath}"`);
      const html = turtle.generateHTML(cv, templatePath);
      const outputPath = options.output || cvPath.replace(/\.[^.]+$/, '.html');

      logger.info(`Saving HTML at "${outputPath}"`);
      fs.writeFileSync(outputPath, html);
    }
  });

program.parse(process.argv);
