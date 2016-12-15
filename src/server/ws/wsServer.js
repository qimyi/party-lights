import {server as WebSocketServer} from 'websocket';
import {emitter as setColorEmitter} from '../api/setColor';

let connections = [];
const removeConnection = connection => {
  const index = connections.indexOf(connection);
  if (index >= 0) {
    connections.splice(index, 1);
  }
  console.info('Total connections:', connections.length);
};

const handleConnection = connection => {
  console.info('Connected to client');
  connections.push(connection);
  console.info('Total connections:', connections.length);

  connection.on('close', () => {
    console.info('Disconnected from client');
    removeConnection(connection);
  });
};

let wsServer;
export default {
  start(server) {
    if (!wsServer) {
      wsServer = new WebSocketServer({
        httpServer: server,
        autoAcceptConnections: true,
        path: '/ws'
      });

      wsServer.on('connect', handleConnection);
      setColorEmitter.on('color', color => {
        console.info('Send color to clients', color);
        connections.forEach(connection => connection.send(JSON.stringify({color})));
      });
    }
  },

  getConnections() {
    return connections.slice();
  }
};
