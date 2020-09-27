'use strick'
const http = require('http');
const util = require('util');
const fs = require('fs').promises;
const exec = util.promisify(require('child_process').execFile);
const url = require('url');

const server = http.createServer()
server.listen(3170);

async function runApp() {
  let param = await fs.readFile('.\\list.txt', 'utf8');
  let tmpPath = param.split('\r\n');
  let listPath = {}
  for (let i in tmpPath) {
    listPath['/' + tmpPath[i].split('=')[0]] = tmpPath[i].split('=')[1];
  }

  server.on('request', (req, res) => {
    let pathUrl = url.parse(req.url).pathname.toLowerCase();
    if (listPath[pathUrl]) {
      //console.log(listPath[pathUrl])
      exec(listPath[pathUrl]);
      res.write('OK');
      res.end();
    } else {
      res.write("Path don't find");
      res.end();
    }
  });
}
runApp()
