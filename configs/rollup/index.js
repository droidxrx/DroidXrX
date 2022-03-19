import fs from 'fs-extra';
import path from 'path';

export { rollup, defineConfig } from 'rollup';

// Plugin
export { nodeResolve } from '@rollup/plugin-node-resolve';
export { default as cjs } from '@rollup/plugin-commonjs';
export { default as typescript } from '@rollup/plugin-typescript';
export { default as dts } from 'rollup-plugin-dts';
export { default as ts } from 'rollup-plugin-ts';

export const remove = async (pathorFile) => {
	try {
		if (typeof pathorFile === 'string') await fs.remove(pathorFile);
		else if (typeof pathorFile === 'object' && Array.isArray(pathorFile)) {
			for (const paths of pathorFile) await fs.remove(paths);
		}
	} catch (error) {
		console.log(error.message);
		process.exit();
	}
};

export const mkdir = async (pathdir) => {
	try {
		if (typeof pathdir === 'string') await fs.mkdir(pathdir);
		else if (typeof pathdir === 'object' && Array.isArray(pathdir)) {
			for (const paths of pathdir) await fs.mkdir(paths);
		}
	} catch (error) {
		console.log(error.message);
		process.exit();
	}
};

export const writeFile = async (pathdir, data) => {
	try {
		await fs.writeFile(pathdir, data);
	} catch (error) {
		console.log(error.message);
		process.exit();
	}
};

export const extname = (fileName) => path.extname(fileName);
export const fileName = (fileName) => path.basename(fileName);
