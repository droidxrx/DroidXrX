const logger = require('fancy-log');
const { lstatSync, readdirSync } = require('fs');
const { isMatch } = require('micromatch');
const path = require('path');

lstatSync(path.join(__dirname, '../node_modules')).isDirectory();
const nodeModules = path.join(__dirname, '../node_modules');
const asd = readdirSync(nodeModules).filter((v) => isMatch(v, 'eslint-config*', { regex: true }));
logger(asd);
