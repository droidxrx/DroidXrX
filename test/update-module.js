const path = require('path');
const fs = require('fs');
const commandLineArgs = require('command-line-args');
const fetch = require('superagent').get;
const log = require("fancy-log");

(async function () {
	const options = commandLineArgs([
		{ name: 'devDependencies', alias: 'D', type: Boolean },
		{ name: 'dependencies', alias: 'd', type: Boolean },
		{ name: 'packagejson', alias: 'p', type: String, multiple: false, defaultOption: false },
	]);

	const devDependencies = {};
	const dependencies = {};

	const pkg = await require(options.packagejson);

	if ('dependencies' in pkg) {
		for await (const depen of Object.keys(pkg.dependencies)) {
			const { body } = await fetch(`https://registry.npmjs.org/-/package/${depen}/dist-tags`);
			dependencies[depen] = `^${body.latest}`;
		}
	}
	if ('devDependencies' in pkg) {
		for await (const depen of Object.keys(pkg.devDependencies)) {
			const { body } = await fetch(`https://registry.npmjs.org/-/package/${depen}/dist-tags`);
			devDependencies[depen] = `^${body.latest}`;
		}
	}

	if (Object.keys(dependencies).length !== 0) pkg.dependencies = dependencies;
	if (Object.keys(devDependencies).length !== 0) pkg.devDependencies = devDependencies;
	fs.writeFile(options.packagejson, JSON.stringify(pkg, null, '\t'), { encoding: 'utf8' }, () => log("Done!"));
})();
