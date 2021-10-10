import path from 'path';
import { lstat, readdir } from 'fs/promises';
import { lstatSync, readdirSync } from 'fs';
import { isMatch as isMatches } from 'micromatch';
import { inputPathFile, ignorePathFile } from './combine-array';

type PathsFiles = string | string[];
type GlobString = PathsFiles;
interface GetFilesPaths {
	ignore?: GlobString;
	ignoreNodeModules?: boolean;
	only?: 'all' | 'path' | 'file';
}
async function getting(pathsFiles: PathsFiles, options: GetFilesPaths, result: string[] = []) {
	pathsFiles = inputPathFile(pathsFiles);
	result = result || [];

	for await (const item of pathsFiles) {
		if (options.ignoreNodeModules && path.basename(item) === 'node_modules') continue;
		else if ((await lstat(item)).isDirectory()) {
			for await (const dirent of await readdir(item, { withFileTypes: true })) {
				if (options.ignoreNodeModules && dirent.name === 'node_modules') continue;
				const dirents = path.join(item, dirent.name);
				if (options.ignore.length > 0) {
					const ignore = ignorePathFile(options.ignore);
					if (!isMatches(dirents, ignore, { dot: true })) result = await getting(dirents, options, result);
					if (options.only !== 'file' && !result.includes(item) && !isMatches(item, ignore, { dot: true })) {
						result.push(item);
					}
				} else {
					result = await getting(dirents, options, result);
					if (options.only !== 'file' && !result.includes(item)) result.push(item);
				}
			}
		} else if (options.ignore.length > 0) {
			const ignore = ignorePathFile(options.ignore);
			if (options.only !== 'path' && !result.includes(item) && !isMatches(item, ignore, { dot: true })) result.push(item);
		} else if (options.only !== 'path' && !result.includes(item)) result.push(item);
	}

	return result;
}

function gettingSync(pathsFiles: PathsFiles, options: GetFilesPaths, result: string[] = []) {
	pathsFiles = inputPathFile(pathsFiles);
	result = result || [];

	for (const item of pathsFiles) {
		if (options.ignoreNodeModules && path.basename(item) === 'node_modules') continue;
		else if (lstatSync(item).isDirectory()) {
			for (const dirent of readdirSync(item, { withFileTypes: true })) {
				if (options.ignoreNodeModules && dirent.name === 'node_modules') continue;
				const dirents = path.join(item, dirent.name);
				if (options.ignore.length > 0) {
					const ignore = ignorePathFile(options.ignore);
					if (!isMatches(dirents, ignore, { dot: true })) result = gettingSync(dirents, options, result);
					if (options.only !== 'file' && !result.includes(item) && !isMatches(item, ignore, { dot: true })) result.push(item);
				} else {
					result = gettingSync(dirents, options, result);
					if (options.only !== 'file' && !result.includes(item)) result.push(item);
				}
			}
		} else if (options.ignore.length > 0) {
			const ignore = ignorePathFile(options.ignore);
			if (options.only !== 'path' && !result.includes(item) && !isMatches(item, ignore, { dot: true })) result.push(item);
		} else if (options.only !== 'path' && !result.includes(item)) result.push(item);
	}
	return result;
}

export function getAll(pathsFiles: PathsFiles, options?: GetFilesPaths): Promise<string[]> {
	if (typeof options === 'object' && !Array.isArray(options)) {
		options = {
			only: 'all',
			ignoreNodeModules: true,
			ignore: [],
			...options,
		};
	} else if (!options) options = { only: 'all', ignoreNodeModules: true, ignore: [] };
	else return Promise.reject(new TypeError('Options must object'));
	return new Promise((resolve: (value: Promise<string[]>) => void, reject: (reason?: Error) => void) => {
		try {
			resolve(getting(pathsFiles, options));
		} catch (error) {
			reject(error);
		}
	});
}

export function getAllSync(pathsFiles: PathsFiles, options?: GetFilesPaths): string[] {
	if (typeof options === 'object' && !Array.isArray(options)) {
		options = {
			only: 'all',
			ignoreNodeModules: true,
			ignore: [],
			...options,
		};
	} else if (!options) options = { only: 'all', ignoreNodeModules: true, ignore: [] };
	else throw new TypeError('Options must object');
	return gettingSync(pathsFiles, options);
}
