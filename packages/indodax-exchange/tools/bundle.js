const WebSocket = require('ws');
const forever = require('forever-monitor');
const dotenv = require('dotenv');
const getall = require('get-files-paths');
const { resolve } = require('path');
const { bundle, configWebpack } = require('./webpack.config');

dotenv.config();
const { SERVER_PORT, HOST } = process.env;
const socketUrl = `${HOST.replace(/http/, 'ws')}${SERVER_PORT}/webpack`;

// bundle(configWebpack(['../src/home.ts'], '../server/public/src/js'))

const monit = forever.start(resolve(__dirname, './testing.js'), {
	max: 1,
	silent: false,
	watch: true,
	watchIgnoreDotFiles: true,
	watchIgnorePatterns: ['*.json'],
	watchDirectory: [resolve(__dirname, '../src')],
});

monit.on('watch:restart', (info) => {
	console.error(`Restarting script because ${info.file} changed`);
});

monit.on('restart', () => {
	console.error(`Forever restarting script for ${monit.times} time`);
});

monit.on('exit:code', (code) => {
	console.error(`Forever detected script exited with code ${code}`);
});
