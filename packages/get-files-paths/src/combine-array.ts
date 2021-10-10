import path from 'path';
import getPath from './require-get-main-path';

function errorInput() {
	throw new TypeError('Path or File must string/array<string>.');
}

function errorInputIgnore() {
	throw new TypeError('Ignore must string/array<string>.');
}

export function inputPathFile(str: string | string[]): string[] {
	const result: string[] = [];
	if (str) {
		if (typeof str === 'string') {
			if (path.isAbsolute(str)) result.push(str);
			else result.push(path.join(getPath(), str));
		} else if (typeof str === 'object' && Array.isArray(str)) {
			for (const item of str.flat()) {
				if (typeof item === 'string') {
					if (path.isAbsolute(item)) result.push(item);
					else result.push(path.join(getPath(), item));
				} else errorInput();
			}
		} else errorInput();
	} else errorInput();
	return result;
}

export function ignorePathFile(str: string | string[]): string[] {
	const result: string[] = [];
	if (str) {
		if (typeof str === 'string') result.push(str);
		else if (typeof str === 'object' && Array.isArray(str)) {
			for (const item of str.flat()) {
				if (typeof item === 'string') result.push(item);
				else errorInputIgnore();
			}
		} else errorInputIgnore();
	} else errorInputIgnore();
	return result;
}
