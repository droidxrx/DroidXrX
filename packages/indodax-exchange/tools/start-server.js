/* eslint-disable no-plusplus */
const getall = require('get-files-paths');
const chokidar = require('chokidar');
const { resolve } = require('path');
const dotenv = require('dotenv');
const { exec } = require('child_process');
const psTree = require('ps-tree');

dotenv.config();
const ignore = ['**/server/public', '**/server/**/*.json'];
const result = getall(['../server'], ignore).all();
const argTsNode = ['ts-node', '-P', resolve(__dirname, '../server/tsconfig.json'), '-T', resolve(__dirname, '../server/index.ts')].join(' ');

let app;
let count = -1;
function runtsNode() {
	if (app) { app = null; }
	app = exec(argTsNode);
	app.stdout.on('data', (data) => console.log(`${count < 0 ? '' : '\n'}${data.trim()}\nTotal reater: ${++count}`));
	app.stderr.on('data', (data) => console.log(`stdout: ${data}`));
	process.stdout.write('\x1Bc');
}
function kill() {
	psTree(app.pid, (err, children) => children.forEach((v) => exec(`taskkill /pid ${v.PID} /T /F`, runtsNode)));
}

const watcher = chokidar.watch(result, { ignored: ignore });
watcher.once('ready', runtsNode);
watcher.on('change', kill);
