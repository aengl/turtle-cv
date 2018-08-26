const fs = require('fs');
const yaml = require('js-yaml');

process.chdir(__dirname);

// Convert the YML to a JSON schema
const yamlSchema = fs.readFileSync('schema.yml');
const jsonSchema = JSON.stringify(yaml.load(yamlSchema), undefined, 2);
fs.writeFileSync('schema.json', jsonSchema);
process.stdout.write('created schema.json\n');
