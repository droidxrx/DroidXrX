const { defineWebpack } = require('../../configs/webpack');
const path = require('path');

module.exports = defineWebpack({
	mode: 'development',
	entry: './src/index.ts',
	output: {
		filename: 'index.js',
		path: path.join(__dirname, './dist'),
		libraryTarget: 'commonjs2',
	},
	target: 'node',
	resolve: {
		extensions: ['.ts', '.node', '.js', '.json'],
	},
	externals: [/node_modules/, /\.node$/],
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
						},
					},
				],
			},
		],
	},
});
