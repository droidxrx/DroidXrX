const logger = require('fancy-log');
const { join } = require('path');
const { defineConfig, rollup } = require('rollup');
const loadPlugin = require('./load-plugin');

// const rootDir = process.cwd();
const rollupConfig = defineConfig({
	input: 'src/index.ts',
	output: {
		dir: 'lib',
		// file: 'index.js',
		format: 'commonjs',
		exports: 'auto',
	},
	external: ['fs/promises'],
	plugins: [
		loadPlugin.resolve(),
		loadPlugin.commonjs({ ignoreDynamicRequires: true }),
		loadPlugin.ts({
			transpiler: 'babel',
			babelConfig: {
				presets: ['@babel/preset-env'],
				plugins: ['@babel/plugin-transform-runtime', 'babel-plugin-transform-undefined-to-void'],
			},
			tsconfig: (resolvedOptions) => ({ ...resolvedOptions, declaration: true, declarationDir: 'lib', outDir: 'lib' }),
		}),
		loadPlugin.terser({
			format: {
				comments: false,
			},
		}),
	],
});

(async () => {
	const bundle = await rollup(rollupConfig);
	await bundle.write(rollupConfig.output);
	await bundle.close();
})();
