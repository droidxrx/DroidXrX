const path = require('path');

const mode = process.env.NODE_ENV.trimEnd();
module.exports = {
	mode,
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
		minimize: mode === 'production' ? true : false,
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
