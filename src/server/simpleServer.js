import 'babel-polyfill';
import http from 'http';
import path from 'path';
import fs from 'fs';
import wsServer from './ws/wsServer';
import sendResponse from './sendResponse';
import lights from './lights';

const PORT = 1982;

const serveStatic = (staticPath) => (req, res) => {
  const filePath = path.resolve(__dirname, staticPath);
  const fileStream = fs.createReadStream(filePath);
  fileStream.on('open', (d) => {
    res.writeHead(200, {'Content-Type': `text/${staticPath.split('.').pop()}`});
    fileStream.pipe(res);
  });
};

const stack = [
  {url: '/', method: 'GET', handler: serveStatic('static/index.html')},
  {url: '/main.css', method: 'GET', handler: serveStatic('static/main.css')},
  {url: '/main.js', method: 'GET', handler: serveStatic('../client/main.js')},
  {url: '/jscolor.js', method: 'GET', handler: serveStatic('../client/jscolor.min.js')},
  require('./api/setColor')
];

const server = http.createServer((request, response) => {
  let len = stack.length;
  for (let i = 0; i < len; i++) {
    let h = stack[i];
    if (h.method === request.method
      && h.url === request.url
      && typeof h.handler === 'function'
    ) {
      return h.handler(request, response);
    }
  }

  sendResponse(response, {error: 'Not found'}, 404);
});

wsServer.start(server);

server.listen(PORT, () => {
  lights.init();
  console.log('Server listening on: http://localhost:%s', PORT);
});
