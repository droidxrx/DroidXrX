const { defineWebpack } = require('../../configs/webpack');
const path = require('path');

module.exports = defineWebpack({
	mode: 'production',
	entry: './src/ts/index.ts',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, './dist'),
		libraryTarget: 'commonjs2',
	},
	target: 'node',
	resolve: {
		alias: {
			JSMeow: path.resolve(__dirname, './build/Release/JSMeow.node'),
		},
		extensions: ['.ts', '.node', '.js'],
	},
	externals: [/node_modules/],
	optimization: {
		minimize: false,
	},
	module: {
		rules: [
			{
				test: /\.node$/,
				loader: 'node-loader',
				options: {
					name: '[name].[ext]',
				},
			},
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
