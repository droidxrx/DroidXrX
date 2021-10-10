import { fileURLToPath } from 'url';
import { dirname as pathDirname } from 'path';

function filename(importMeta) {
	return importMeta.url ? fileURLToPath(importMeta.url) : '';
}
function dirname(importMeta) {
	return pathDirname(filename(importMeta));
}

export = {dirname, filename}