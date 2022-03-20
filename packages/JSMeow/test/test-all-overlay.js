const jsmeow = require('../dist/JSMeow.node');

async function waits(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

async function main() {
	const overlay = jsmeow.overlayInit('Untitled - Notepad', 35, 25);
	const Font = jsmeow.overlayFontInit(12, 'Consolas');

	const colorRed = [255, 0, 0];
	const colorGreen = [0, 128, 0];
	const colorBlueAlpha = [0, 0, 255, 0.3];

	const x = overlay.midX + 200;
	const y = overlay.midY;
	const barLength = 300;
	const barWidth = 5;
	const maxHealth = 200;
	let currenHealth = maxHealth;

	while (jsmeow.overlayLoop(overlay, true)) {
		jsmeow.drawText(Font, 10, overlay.midY, 'drawText', colorRed);
		jsmeow.drawTextLines(Font, 70, overlay.midY, ['drawTextLines1', 'drawTextLines2', 'drawTextLines3'], colorRed, 2.0);

		jsmeow.drawPixel(175, overlay.midY + 5, colorRed);
		jsmeow.drawPixelV({ x: 175, y: overlay.midY - 5 }, colorRed);

		jsmeow.drawBox(185, overlay.midY - 45, 30, 50, 1.5, colorRed);
		jsmeow.drawBoxV({ x: 220, y: overlay.midY - 45 }, 30, 50, 1.5, colorRed);

		jsmeow.drawAlphaBox(255, overlay.midY - 45, 30, 50, colorBlueAlpha, colorRed);
		jsmeow.drawAlphaBoxV({ x: 290, y: overlay.midY - 45 }, 30, 50, colorBlueAlpha, colorRed);

		jsmeow.drawCornerBox(325, overlay.midY - 45, 30, 50, colorRed, colorGreen, 1.5);
		jsmeow.drawCornerBoxV({ x: 360, y: overlay.midY - 45 }, 30, 50, colorRed, colorGreen, 1.5);

		jsmeow.drawLine(400, overlay.midY + 5, 400, overlay.midY - 50, 1.5, colorGreen);
		jsmeow.drawLineV({ x: 405, y: overlay.midY + 5 }, { x: 455, y: overlay.midY + 5 }, 1.5, colorGreen);

		jsmeow.drawDashedLine(470, overlay.midY + 5, 470, overlay.midY - 90, 1.5, 2, 3855, [...colorGreen, 0.5]);
		jsmeow.drawDashedLineV({ x: 475, y: overlay.midY + 5 }, { x: 570, y: overlay.midY + 5 }, 1.5, 2, 3855, [...colorGreen, 0.5]);

		jsmeow.drawCircle(620, overlay.midY - 50, 50, colorGreen, false);
		jsmeow.drawCircleV({ x: 725, y: overlay.midY - 50 }, 50, colorGreen, true);

		jsmeow.drawRadCircle(830, overlay.midY - 50, 50, 0, 180, colorGreen);
		jsmeow.drawRadCircleV({ x: 935, y: overlay.midY - 50 }, 50, 180, 360, colorGreen);

		jsmeow.drawPoly(55, overlay.midY + 60, 50, 120, 2, colorGreen);
		jsmeow.drawPolyV({ x: 155, y: overlay.midY + 60 }, 50, 25, 2, colorGreen);

		let arrayVector2 = [
			{ x: 120 + 120, y: 250 + overlay.midY - 175 },
			{ x: 400 + 120, y: 250 + overlay.midY - 175 },
			{ x: 400 + 120, y: 350 + overlay.midY - 175 },
			{ x: 450 + 120, y: 200 + overlay.midY - 175 },
			{ x: 120 + 120, y: 250 + overlay.midY - 175 },
		];
		jsmeow.drawCustomShape(arrayVector2, [...colorGreen, 0.5], false);
		arrayVector2 = [
			{ x: 120 + 450, y: 250 + overlay.midY - 175 },
			{ x: 400 + 450, y: 250 + overlay.midY - 175 },
			{ x: 400 + 450, y: 350 + overlay.midY - 175 },
			{ x: 450 + 450, y: 200 + overlay.midY - 175 },
			{ x: 120 + 450, y: 250 + overlay.midY - 175 },
		];
		jsmeow.drawCustomShape(arrayVector2, [...colorRed, 0.5], true);

		jsmeow.drawValueBar(x, y, x, y + barLength, barWidth, maxHealth, currenHealth, true);
		jsmeow.drawValueBar(x, y - 12, x + barLength, y - 12, barWidth, maxHealth, currenHealth, false);
		jsmeow.drawCornerBox(x + 7, y, barLength - 7, barLength, [255, 255, 255], [0, 0, 0], 1.5);

		if (currenHealth === 0) currenHealth = maxHealth;
		else currenHealth -= 1;
		await waits(0);
	}
}

// main();
console.log(jsmeow);
