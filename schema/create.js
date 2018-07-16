const fs = require('fs');
const yaml = require('js-yaml');
const http = require('http');

const port = 31337;

process.chdir(__dirname);

// Convert the YML to a JSON schema
const yamlSchema = fs.readFileSync('schema.yml');
const jsonSchema = JSON.stringify(yaml.load(yamlSchema), undefined, 2);
fs.writeFileSync('schema.json', jsonSchema);
process.stdout.write('created schema.json\n');

// Serve the JSON schema locally
process.stdout.write(`serving schema locally on port ${port}\n`);
http
  .createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');
    res.end(jsonSchema);
  })
  .listen(port);
