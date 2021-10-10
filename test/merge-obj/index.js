/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const eslintConfig = require('eslint-config-droidxrx/ts');
const merge = require('deepmerge');
const { log } = require('console');

function mergConfig(eslintonfig, extendList) {
	extendList = extendList || [];
	const { extends: extendes, ...allResult } = eslintonfig;
	let configes = { ...allResult };
	let extendeses = [];

	log(extendes);
	if (typeof extendes === 'string') extendeses = [extendes];
	else extendeses = [...extendeses, ...extendes];

	for (const item of extendeses) {
		if (!extendList.includes(item)) extendList.push(item);
		const req = require(item);
		if (typeof req === 'object' && !Array.isArray(req)) {
			if ('extends' in req) {
				if (typeof req.extends === 'string') {
					if (!extendList.includes(req.extends)) extendList.push(req.extends);
					else if (Array.isArray(req.extends)) {
						for (const value of req.extends) if (!extendList.includes(value)) extendList.push(value);
					}
				}
				const { extends: delExtd, ...allRes } = req;
				configes = merge(allRes, configes);
			} else {
				configes = merge(req, configes);
			}
		}
	}

	for (const item of extendList) {
		const req = require(item);
		if (typeof req === 'object' && !Array.isArray(req)) {
			if ('extends' in req) {
				const { extends: delExtd } = req;
				const result = mergConfig(req, delExtd);
				configes = merge(result, configes);
			} else {
				configes = merge(req, configes);
			}
		}
	}
	return configes;
}

function mergeConfig(baseConfig, ...eslintConfiges) {
	const concatConfiger = [...eslintConfiges, baseConfig];
	let result = {};
	for (const eslintconfig of concatConfiger) {
		result = merge(result, mergConfig(eslintconfig));
	}
	return result;
}
const rs = mergeConfig(eslintConfig);
log(rs);
