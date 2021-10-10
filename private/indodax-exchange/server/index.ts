import express from 'express';
import dotenv from 'dotenv';
import { resolve } from 'path';
import middleware from './src/middleware';
import websocket from './src/websocket';

dotenv.config({ path: resolve(__dirname, '../.env') });
const { SERVER_PORT } = process.env;
const app = express();
middleware(app);
const server = app.listen(SERVER_PORT);
websocket(server);
