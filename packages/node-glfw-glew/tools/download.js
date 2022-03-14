const Downloader = require('nodejs-file-downloader');
const path = require('path');
const fs = require('fs-extra');

const { version } = process;
const output = path.join(__dirname, '../.cache');

const baseUrl = `https://nodejs.org/download/release/${version}`;

(async () => {
	try {
		const headersExist = await fs.pathExists(`${output}/node-${version}-headers.tar.gz`);
		const libExist = await fs.pathExists(`${output}/node-${version}/lib/win-x64/node.lib`);

		if (!headersExist) {
			const nodeHeader = new Downloader({
				url: `${baseUrl}/node-${version}-headers.tar.gz`,
				directory: output,
			});
			await nodeHeader.download();
		} else {
		}

		if (!libExist) {
			const nodeLib = new Downloader({
				url: `${baseUrl}/win-x64/node.lib`,
				directory: `${output}/node-${version}/lib/win-x64`,
			});
			await nodeLib.download();
		}
	} catch (error) {
		if (error.responseBody) console.log(error.responseBody);
		else if (error.message) console.log(error.message);
	}
})();
