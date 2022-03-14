module.exports = {
	extends: ['@nodejs/eslint-config-all/ts'],
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: ['tsconfig.json'],
	},
	ignorePatterns: ['*.js', '*.cjs', '*.d.ts'],
};
