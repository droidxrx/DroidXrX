import { draws, Font, RGB, RGBA, vector2 } from './addon';

export function drawAlphaBox(x: number, y: number, width: number, height: number, color: RGBA, outlineColor: RGB) {
	draws.drawAlphaBox(x, y, width, height, color, outlineColor);
}
export function drawAlphaBoxV(pos: vector2, width: number, height: number, color: RGBA, outlineColor: RGB) {
	draws.drawAlphaBoxV(pos, width, height, color, outlineColor);
}
export function drawBox(x: number, y: number, width: number, height: number, lineWidth: number, color: RGB) {
	draws.drawBox(x, y, width, height, lineWidth, color);
}
export function drawBoxV(pos: vector2, width: number, height: number, lineWidth: number, color: RGB) {
	draws.drawBoxV(pos, width, height, lineWidth, color);
}
export function drawCircle(x: number, y: number, radius: number, color: RGB, filled = true) {
	draws.drawCircle(x, y, radius, color, filled);
}
export function drawCircleV(pos: vector2, radius: number, color: RGB, filled = true) {
	draws.drawCircleV(pos, radius, color, filled);
}
export function drawCornerBox(x: number, y: number, width: number, height: number, color: RGB, outlineColor: RGB, lineWidth = 1) {
	draws.drawCornerBox(x, y, width, height, color, outlineColor, lineWidth);
}
export function drawCornerBoxV(pos: vector2, width: number, height: number, color: RGB, outlineColor: RGB, lineWidth = 1) {
	draws.drawCornerBoxV(pos, width, height, color, outlineColor, lineWidth);
}
export function drawCustomShape(points: vector2[], color: RGBA, filled = true) {
	draws.drawCustomShape(points, color, filled);
}
export function drawDashedLine(x1: number, y1: number, x2: number, y2: number, lineWidth: number, color: RGB, factor = 2, pattern = 3855) {
	draws.drawDashedLine(x1, y1, x2, y2, lineWidth, factor, pattern, color);
}
export function drawDashedLineV(pos1: vector2, pos2: vector2, lineWidth: number, color: RGB, factor = 2, pattern = 3855) {
	draws.drawDashedLineV(pos1, pos2, lineWidth, factor, pattern, color);
}
export function drawLine(x1: number, y1: number, x2: number, y2: number, lineWidth: number, color: RGB) {
	draws.drawLine(x1, y1, x2, y2, lineWidth, color);
}
export function drawLineV(pos1: vector2, pos2: vector2, lineWidth: number, color: RGB) {
	draws.drawLineV(pos1, pos2, lineWidth, color);
}
export function drawPixel(x: number, y: number, color: RGB) {
	draws.drawPixel(x, y, color);
}
export function drawPixelV(pos: vector2, color: RGB) {
	draws.drawPixelV(pos, color);
}
export function drawPoly(x: number, y: number, radius: number, rotation: number, sides: number, color: RGB) {
	draws.drawPoly(x, y, radius, rotation, sides, color);
}
export function drawPolyV(pos: vector2, radius: number, rotation: number, sides: number, color: RGB) {
	draws.drawPolyV(pos, radius, rotation, sides, color);
}
export function drawRadCircle(x: number, y: number, radius: number, startValue: number, endValue: number, color: RGB) {
	draws.drawRadCircle(x, y, radius, startValue, endValue, color);
}
export function drawRadCircleV(pos: vector2, radius: number, startValue: number, endValue: number, color: RGB) {
	draws.drawRadCircleV(pos, radius, startValue, endValue, color);
}
export function drawTextLines(font: Font, x: number, y: number, lines: string[], color: RGB, offset: number) {
	draws.drawTextLines(font, x, y, lines, color, offset);
}
export function drawValueBar(x1: number, y1: number, x2: number, y2: number, width: number, maxValue: number, value: number, vertical = true) {
	draws.drawValueBar(x1, y1, x2, y2, width, maxValue, value, vertical);
}
export function drawValueBarV(pos1: vector2, pos2: vector2, width: number, maxValue: number, value: number, vertical = true) {
	draws.drawValueBarV(pos1, pos2, width, maxValue, value, vertical);
}
export function drawText(font: Font, x: number, y: number, text: string, color: RGB) {
	draws.drawText(font, x, y, text, color);
}
