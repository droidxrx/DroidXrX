const { join } = require('path');

module.exports = {
	overrides: [
		{
			files: ['./src/**/*.ts'],
			parserOptions: {
				project: join(__dirname, 'tsconfig.json'),
			},
			extends: ['@droidxrx/eslint-config-droidxrx/typescript'],
		},
	],
};
