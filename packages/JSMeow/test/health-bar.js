const jsmeow = require('../');

async function waits(ms) {
	return new Promise(function executor(resolve) {
		setTimeout(resolve, ms);
	});
}

async function main() {
	const overlay = jsmeow.overlayInit();

	const x = overlay.midX;
	const y = overlay.midY;
	const bar_length = 300;
	const bar_width = 5;
	const max_health = 200;

	while (jsmeow.overlayLoop(overlay, false)) {
		for (let index = max_health; index > 0; index--) {
			jsmeow.valueBar({ x, y }, { x, y: y + bar_length }, bar_width, max_health, index);
			jsmeow.valueBar({ x, y: y - 12 }, { x: x + bar_length, y: y - 12 }, bar_width, max_health, index, false);

			jsmeow.cornerBox({ x: x + 7, y }, bar_length - 7, bar_length, [255, 255, 255], [0, 0, 0]);

			jsmeow.overlayUpdate();

			await waits(1);
		}
	}
}

main();
