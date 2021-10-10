const interopRequireDefault = (obj) => (obj && obj.__esModule ? obj : { default: obj });
/** @type {import("@rollup/plugin-commonjs")} */
const pluginCommonjs = interopRequireDefault(require('@rollup/plugin-commonjs'));
/** @type {import("@rollup/plugin-node-resolve")} */
const pluginNodeResolve = interopRequireDefault(require('@rollup/plugin-node-resolve'));
/** @type {import('@rollup/plugin-typescript')} */
const pluginTypescript = interopRequireDefault(require('@rollup/plugin-typescript'));
/** @type {import('rollup-plugin-terser')} */
const rollupPluginTerser = require('rollup-plugin-terser');
/** @type {import('rollup-plugin-ts')} */
const rollupPluginTs = interopRequireDefault(require('rollup-plugin-ts'));

module.exports = {
	commonjs: pluginCommonjs.default,
	resolve: pluginNodeResolve.default,
	typeScript: pluginTypescript.default,
	terser: rollupPluginTerser.terser,
	ts: rollupPluginTs.default,
};
