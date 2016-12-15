import {client as WebSocketClient} from 'websocket';
import config from './config';

const client = new WebSocketClient();

let connectionState = 'disconnected';
client.on('connect', () => {
  connectionState = 'connected';
  console.info('Connected!');
});
client.on('connectFailed', (x) => {
  connectionState = 'disconnected';
  console.info('Connection failed', x);
});

setInterval(() => {
  if (connectionState === 'disconnected') {
    connectionState = 'connecting';
    console.info('Connecting to', config.connectTo);
    client.connect(config.connectTo, null);
  }
}, 2000);

