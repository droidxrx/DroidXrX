const asd = require('../dist/addon/JSMeow.node');

const overlay = asd.overlayInit('Untitled - Notepad', 35, 25);
const Font = asd.overlayFontInit(12, 'Consolas');

const waits = async (ms) => new Promise((resolve) => { setTimeout(resolve, ms); }); // prettier-ignore

async function main() {
	while (asd.overlayLoop(overlay, true)) {
		asd.drawTextLines(Font, overlay.midX, overlay.midY, ['JSMeow', 'kontol'], [255, 0, 0], 2.0);
		await waits(1);
	}
}

main();
