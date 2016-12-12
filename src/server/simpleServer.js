import 'babel-polyfill';
import http from 'http';
import parseJsonRequest from './parseJsonRequest';

const PORT = 1982;

const send = (res, data = '', statusCode = 200) => {
  if (typeof data === 'object') {
    data = JSON.stringify(data);
  }

  res.writeHead(statusCode, {
    'Content-Length': Buffer.byteLength(data),
    'Content-Type': 'application/json; charset=utf-8'
  });
  res.end(data);
};

const server = http.createServer(async (req, res) => {
  if (req.url === '/api/v1/setColor' && req.method === 'POST') {
    try {
      const json = await parseJsonRequest(req)
      console.log('New color should be: ' + json.color);
      send(res, {success: true});
    } catch (error) {
      send(res, {error: error.message}, 400)
    }
  } else {
    send(res, {error: 'Not found'}, 404);
  }
});

server.listen(PORT, () => {
  console.log('Server listening on: http://localhost:%s', PORT);
});
