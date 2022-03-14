const config = require('../../configs/eslint/ts');
module.exports = {
	...config,
	parserOptions: {
		tsconfigRootDir: `${__dirname}`,
		project: ['tsconfig.esm.json'],
	},
	ignorePatterns: ['*.js', '*.cjs', '*.d.ts'],
};
