/** @type {import("eslint").Linter.BaseConfig} */
module.exports = {
	root: true,
	env: {
		es6: true,
		node: true,
		commonjs: true,
		es2021: true,
		browser: true,
	},
	extends: [
		'eslint-config-airbnb/base',
		'prettier',
	],
	parserOptions: {
		sourceType: 'script',
		ecmaVersion: 2021,
	},
	plugins: ['eslint-plugin-prettier'],
	rules: {
		'prettier/prettier': ['error', { endOfLine: 'lf', printWidth: 140, semi: true, singleQuote: true, useTabs: true }],
		'no-param-reassign': 'off',
		'import/no-extraneous-dependencies': 'off',
		'no-tabs': 'off',
		'no-async-promise-executor': 'off',
		'no-restricted-syntax': 'off',
		'max-len': ['error', 140],
		'no-await-in-loop': 'off',
		'no-continue': 'off',
		'no-plusplus': 'off',
	},
	ignorePatterns: ['**/node_modules/**'],
};
