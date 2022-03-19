const configTS = require('../../configs/eslint/ts/index');
const configCJS = require('../../configs/eslint/cjs/index');
const { join: pathJoin } = require('path');

module.exports = {
	overrides: [
		{
			files: ['./src/*.ts'],
			...configTS,
			parserOptions: {
				tsconfigRootDir: __dirname,
				project: ['./tsconfig.json'],
			},
		},
		{
			files: ['test/*.js'],
			...configCJS,
		},
	],
};
