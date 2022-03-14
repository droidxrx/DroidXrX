module.exports = {
	env: {
		commonjs: true,
		es2021: true,
		node: true,
	},
	extends: 'eslint-config-airbnb-base',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'script',
	},
	rules: {
		'no-console': 0,
		'no-continue': 0,
		'no-plusplus': 0,
		'no-await-in-loop': 0,
		'no-tabs': 0,
		indent: 0,
		'linebreak-style': ['error', 'windows'],
		'max-len': ['error', 290],
		'import/no-extraneous-dependencies': 0,
		'func-names': 0,
		'class-methods-use-this': 0,
		'object-curly-newline': 0,
		'import/no-relative-packages': 0,
		'no-constant-condition': 0,
	},
};
