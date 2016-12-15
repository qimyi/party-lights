import {server as WebSocketServer} from 'websocket';

export default {
  start: (server) => {
    const wsServer = new WebSocketServer({
      httpServer: server,
      autoAcceptConnections: true,
      path: '/ws/color'
    });

    wsServer.on('connect', (connection) => {
      console.info('Connected to client');
    });
  }
};
