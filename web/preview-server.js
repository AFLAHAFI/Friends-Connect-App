const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5050;
const HTML_PATH = path.join(__dirname, '..', 'docs', 'index.html');

const server = http.createServer((req, res) => {
  const html = fs.readFileSync(HTML_PATH, 'utf8');
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('Friends Connect Web App running at http://localhost:' + PORT);
});
