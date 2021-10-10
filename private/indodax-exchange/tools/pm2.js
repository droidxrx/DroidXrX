const getall = require('get-files-paths');
const { resolve } = require('path');

const result = getall('../../').onlyPaths();
console.log(result);
