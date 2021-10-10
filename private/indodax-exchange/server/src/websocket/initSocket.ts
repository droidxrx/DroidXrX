import WebSocket, { WebSocketServer } from 'ws';
import { IncomingMessage, Server } from 'http';
import { Socket } from 'net';
import Centrifuge from 'centrifuge';

export default function socketInit(expressServer: Server, SocketServer: typeof WebSocketServer) {
	const { SERVER_PORT, HOST } = process.env;
	const socketBaseUrl = `${HOST.replace(/http/, 'ws')}${SERVER_PORT}`;
	const listSocketPath = ['/socket/live-reload', '/socket/summaries', '/webpack'];
	const socketsUrl = `${[...listSocketPath].map((v) => `${socketBaseUrl}${v}`).join('\n')}\nServer lintening on: ${HOST}${SERVER_PORT})\n`;
	const initSocket = {
		liveReload: new SocketServer({ noServer: true, path: listSocketPath[0] }),
		summaries: new SocketServer({ noServer: true, path: listSocketPath[1] }),
		webpack: new SocketServer({ noServer: true, path: listSocketPath[2] }),
	};

	expressServer.on('upgrade', (request: IncomingMessage, socket: Socket, head: Buffer) => {
		if (listSocketPath[0] === request.url) {
			initSocket.liveReload.handleUpgrade(request, socket, head, (websocket) => {
				initSocket.liveReload.emit('connection', websocket, request);
			});
		} else if (listSocketPath[1] === request.url) {
			initSocket.summaries.handleUpgrade(request, socket, head, (websocket) => {
				initSocket.summaries.emit('connection', websocket, request);
			});
		} else if (listSocketPath[3] === request.url) {
			initSocket.webpack.handleUpgrade(request, socket, head, (websocket) => {
				initSocket.webpack.emit('connection', websocket, request);
			});
		} else {
			socket.destroy();
		}
	});

	let coutnter = 0;
	const centrifuge = new Centrifuge('wss://ws.indodax.com/ws/', { websocket: WebSocket });
	centrifuge.setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaW5mbyI6eyJuYW1lIjoiUHVibGljIn19.VJAHTrrfwxceSITpuPBl75LVM5bgojKGiUTOwCZxw-k');
	centrifuge.subscribe('market.summaries', (message) => {
		if (coutnter >= 5) {
			initSocket.summaries.clients.forEach((client) => {
				if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify(message));
			});
			coutnter = 0;
		}
		coutnter += 1;
	});
	centrifuge.connect();

	return {
		socketBaseUrl, listSocketPath, socketsUrl, initSocket,
	};
}
