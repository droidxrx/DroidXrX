export default (_require?: NodeRequire): string => {
	const { main } = _require || require;
	if (main && /\\iisnode\\/.test(main.path)) return !main.children.length ? main.path : main.children[0].path;
	return main ? main.path : process.cwd();
};
