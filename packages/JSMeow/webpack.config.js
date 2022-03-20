const path = require('path');

module.exports = {
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	entry: './src/ts/index.ts',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'index.js',
		library: 'JSMeow',
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
		minimize: process.env.NODE_ENV === 'production' ? true : false,
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
};
