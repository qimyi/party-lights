import http from 'http';

const PORT = 1982;

let color = '#ff0000';

const getDatJson = req => new Promise((res, rej) => {
  const bufferSize = 1024;
  const s = Buffer.alloc(bufferSize);
  let offset = 0;

  req.on('error', () => {
    rej(new Error('Unexpected error'));
  });

  req.on('data', data => {
    const stringData = data.toString();
    if (offset + stringData.length > bufferSize) {
      res.end(JSON.stringify({error: 'Input data too long'}));
      rej(new Error('Input data too long'));
    } else {
      s.write(stringData, offset);
      offset += stringData.length;
    }
  });

  req.on('end', () => {
    try {
      res(JSON.parse(s.toString().substr(0, offset)));
    } catch (e) {
      rej(new Error('Input data was not valid JSON'));
    }
  });
});

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

const server = http.createServer((req, res) => {
  if (req.url === '/api/v1/setColor' && req.method === 'POST') {
    getDatJson(req)
      .then(json => {
        console.log('New color should be: ' + json.color);
        color = json.color;
        send(res, {success: true});
      })
      .catch(error => send(res, {error: error.message}, 400));
  } else {
    send(res, {error: 'Not found'}, 404);
  }
});

server.listen(PORT, () => {
  console.log('Server listening on: http://localhost:%s', PORT);
});

////////////////////////////////////////////////////////////////////////////////

// Import the interface to Tessel hardware
import tessel from 'tessel';
import {scaleLuminosity} from './colorUtil';
import Strand from './Strand';

const portA = tessel.port['A'];
const spi = new portA.SPI({
  clockSpeed: 2400000 // 4MHz
});

// Turn one of the LEDs on to start.
tessel.led[2].on();

const redGreen = (t) => 60 * (1 + Math.sin(0.628318531 * t));
const satWave = (t) => (1 + Math.sin(t * Math.PI / 10))/2;

let t = 0;
const getColor = () => color;

const strand = new Strand(24);

strand.setLEDColor(0, getColor());
setInterval(function () {
  strand.shiftRight();
  strand.setLEDColor(0, getColor());
  strand.update(spi);
}, 20);


////////////////////////////////////////////////////////////////////////////////
