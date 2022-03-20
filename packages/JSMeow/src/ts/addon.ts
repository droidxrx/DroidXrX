export interface Overlay {
	width: number;
	height: number;
	midX: number;
	midY: number;
	target: string;
	targetHwnd: number;
	exitKey: number;
	window: number;
	hwnd: number;
}

export interface Font {
	fontHDC: number;
	font: number;
	height: number;
}

type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift';
type FixedLengthArray<T, L extends number, TObj = [T, ...Array<T>]> = Pick<TObj, Exclude<keyof TObj, ArrayLengthMutationKeys>> & {
	readonly length: L;
	[I: number]: T;
	[Symbol.iterator]: () => IterableIterator<T>;
};

type _NumbersFrom0ToN<Nr extends number> = Nr extends Nr ? (number extends Nr ? number : Nr extends 0 ? never : _NumbersFrom0ToNRec<Nr, [], 0>) : never;
type _NumbersFrom0ToNRec<Nr extends number, Counter extends any[], Accumulator extends number> = Counter['length'] extends Nr
	? Accumulator
	: _NumbersFrom0ToNRec<Nr, [any, ...Counter], Accumulator | Counter['length']>;

type NrRange<Start extends number, End extends number> = Exclude<_NumbersFrom0ToN<End>, _NumbersFrom0ToN<Start>>;

export type RGB = FixedLengthArray<NrRange<0, 256>, 3>;
export type RGBA = FixedLengthArray<NrRange<0, 256>, 4>;

export interface vector2 {
	x: number;
	y: number;
}

interface Addons {
	overlay: {
		overlayClose: (overlay: Overlay) => void;
		overlayDeinit: (overlay: Overlay) => void;
		overlayFontDeInit: (font: Font) => void;
		overlayFontInit: (height: number, fontName: string) => Font;
		overlayLoop: (overlay: Overlay, update: boolean) => boolean;
		overlaySetPos: (overlay: Overlay) => boolean;
		overlayUpdate: (overlay: Overlay) => void;
		overlayInit: (target: string, exitkey: number, borderOffset: number) => Overlay;
	};
	draws: {
		drawAlphaBox: (x: number, y: number, width: number, height: number, color: RGBA, outlineColor: RGB) => void;
		drawAlphaBoxV: (pos: vector2, width: number, height: number, color: RGBA, outlineColor: RGB) => void;
		drawBox: (x: number, y: number, width: number, height: number, lineWidth: number, color: RGB) => void;
		drawBoxV: (pos: vector2, width: number, height: number, lineWidth: number, color: RGB) => void;
		drawCircle: (x: number, y: number, radius: number, color: RGB, filled: boolean) => void;
		drawCircleV: (pos: vector2, radius: number, color: RGB, filled: boolean) => void;
		drawCornerBox: (x: number, y: number, width: number, height: number, color: RGB, outlineColor: RGB, lineWidth: number) => void;
		drawCornerBoxV: (pos: vector2, width: number, height: number, color: RGB, outlineColor: RGB, lineWidth: number) => void;
		drawCustomShape: (points: vector2[], color: RGBA, filled: boolean) => void;
		drawDashedLine: (x1: number, y1: number, x2: number, y2: number, lineWidth: number, factor: number, pattern: number, color: RGB) => void;
		drawDashedLineV: (pos1: vector2, pos2: vector2, lineWidth: number, factor: number, pattern: number, color: RGB) => void;
		drawLine: (x1: number, y1: number, x2: number, y2: number, lineWidth: number, color: RGB) => void;
		drawLineV: (pos1: vector2, pos2: vector2, lineWidth: number, color: RGB) => void;
		drawPixel: (x: number, y: number, color: RGB) => void;
		drawPixelV: (pos: vector2, color: RGB) => void;
		drawPoly: (x: number, y: number, radius: number, rotation: number, sides: number, color: RGB) => void;
		drawPolyV: (pos: vector2, radius: number, rotation: number, sides: number, color: RGB) => void;
		drawRadCircle: (x: number, y: number, radius: number, startValue: number, endValue: number, color: RGB) => void;
		drawRadCircleV: (pos: vector2, radius: number, startValue: number, endValue: number, color: RGB) => void;
		drawTextLines: (font: Font, x: number, y: number, lines: string[], color: RGB, offset: number) => void;
		drawValueBar: (x1: number, y1: number, x2: number, y2: number, width: number, maxValue: number, value: number, vertical: boolean) => void;
		drawValueBarV: (pos1: vector2, pos2: vector2, width: number, maxValue: number, value: number, vertical: boolean) => void;
		drawText: (font: Font, x: number, y: number, text: string, color: RGB) => void;
	};
	misc: {
		isKeyPressed: (vkey: number) => boolean;
		mouseClick: (leftOrRight: boolean) => void;
		mouseMove: (overlay: Overlay, x: number, y: number) => void;
		pressKey: (vkey: number) => void;
		setForeground: (winTitle: string) => boolean;
	};
}

const addons: Addons = require('JSMeow');
export const overlays = addons.overlay;
export const draws = addons.draws;
export const miscs = addons.misc;
