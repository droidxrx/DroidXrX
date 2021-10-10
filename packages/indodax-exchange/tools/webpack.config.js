const path = require('path');
const webpack = require('webpack');
/**
 * @param {string|string[]|{[key:string]:*}} entry
 * @param {string} output
 * @returns {import('webpack').WebpackOptionsNormalized}
 */
function configWebpack(entry, output) {
	const mainPath = (str) => path.resolve(require.main.path, str);
	const toObs = (str) => (path.isAbsolute(str) ? str : mainPath(str));
	const getNameFile = (str) => path.parse(str).name;
	return {
		mode: process.env.MODE || 'development',
		cache: false,
		entry: (() => {
			let result = {};
			if (typeof entry === 'string') result[getNameFile(entry)] = toObs(entry);
			else if (typeof entry === 'object' && Array.isArray(entry)) entry.forEach((v) => { result[getNameFile(v)] = toObs(v); });
			else result = entry;
			return result;
		})(),
		output: {
			path: mainPath(output),
			filename: '[name].min.js',
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx'],
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: [
						{
							loader: 'ts-loader',
							options: { transpileOnly: true },
						},
					],
				},
			],
		},
		target: ['web', 'es2020'],
	};
}

function bundle(config) {
	const wp = webpack(config);
	wp.run((err, result) => {
		if (err) throw err;
		console.log(result.toString({ colors: true }));
		wp.close(() => false);
	});
}
exports.bundle = bundle;
exports.configWebpack = configWebpack;
