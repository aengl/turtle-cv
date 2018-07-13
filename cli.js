const program = require('caporal');

const packageJson = require('./package.json');

program.version(packageJson.version);

program.parse(process.argv);
