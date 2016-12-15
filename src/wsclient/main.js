import {client as WebSocketClient} from 'websocket';
import config from './config';

const cs = {
  DISCONNECTED: 'DISCONNECTED',
  CONNECTED: 'CONNECTED',
  CONNECTING: 'CONNECTING'
};

const client = new WebSocketClient();

let currentConnection;
const handleConnection = connection => {
  currentConnection = connection;
  currentConnection.on('close', () => {
    connectionState = cs.DISCONNECTED;
    console.info('Disconnected');
    currentConnection = null;
  });

  currentConnection.on('message', message => {
    console.info('Received message', message);

    let json;
    try {
      json = JSON.parse(message.utf8Data);
    } catch (e) {
      console.error('Could not parse message.utf8Data as JSON', e);
    }

    if (json && json.color) {
      console.info('Set color to', json.color);
    }
  });
};

let connectionState = cs.DISCONNECTED;
client.on('connect', (connection) => {
  connectionState = cs.CONNECTED;
  console.info('Connected!');
  handleConnection(connection);
});
client.on('connectFailed', () => {
  connectionState = cs.DISCONNECTED;
  console.info('Connection failed');
});

setInterval(() => {
  switch (connectionState) {
    case cs.CONNECTING:
    case cs.CONNECTED:
      // Do nothing
      break;
    case cs.DISCONNECTED:
    default:
      connectionState = cs.CONNECTING;
      console.info('Connecting to', config.connectTo);
      client.connect(config.connectTo, null);
      break;
  }
}, 2000);

