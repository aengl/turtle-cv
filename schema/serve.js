const fs = require('fs');
const http = require('http');

const port = 31337;

process.chdir(__dirname);

// Serve the JSON schema locally
process.stdout.write(`serving schema locally on port ${port}\n`);
http
  .createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');
    const schema = fs.readFileSync('schema.json');
    res.end(schema);
  })
  .listen(port);
