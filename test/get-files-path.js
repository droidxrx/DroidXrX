const getAll = require('@droidxrx/get-files-paths');
const { join } = require('path');
// console.log(getAll.getAllSync(join(__dirname, "../"), {"ignore": ["**/.git"], "only": "path"}))
async function getAllAsync() {
	const paths = [join(__dirname, "../")];
	const result = await getAll.getAll(paths, { ignore: ['**/.git'], only: 'path' });
	console.log(result)
}
getAllAsync()