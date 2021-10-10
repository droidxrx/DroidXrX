import { WebSocketServer } from 'ws';
import { Server } from 'http';
import initSocket from './initSocket';

export default (expressServer: Server) => {
	const socketInit = initSocket(expressServer, WebSocketServer);
	console.log(`List websocket url:\n${socketInit.socketsUrl}`);
};
