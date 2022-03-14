/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any, max-len */
type dataType = "byte" | "int" | "int32" | "uint32" | "int64" | "uint64" | "dword" | "short" | "long" | "float" | "double" | "boolean" | "pointer" | "string" |  "vector3" | "vector4"; // prettier-ignore
type ReturnType <T extends dataType> = T extends "float" ? float : T extends "double" ? double : T extends "byte" ? byte : T extends "int" ? int : T extends "int32" ? int32 : T extends "uint32" ? uint32 : T extends "int64" ? int64 : T extends "uint64" ? uint64 : T extends "dword" ? dword : T extends "short" ? short : T extends "long" ? long : T extends "boolean" ? boolean : T extends "pointer" ? pointer : T extends "string" ? string : T extends "vector3" ? vector3 : T extends "vector4" ? vector4 : void; // prettier-ignore

type byte = number;
type int = number;
type int32 = number;
type uint32 = number;
type int64 = number;
type uint64 = number;
type dword = number;
type short = number;
type long = number;
type float = number;
type double = number;
type pointer = number;

type writeValue = byte | int | int32 | uint32 | int64 | uint64 | dword | short | long | float | double | pointer | string | boolean | vector3 | vector4;
type RGB = int[];
type ObjectRecord = Record<string, any>;

interface vector2 {
	x: number;
	y: number;
}

interface vector3 {
	x: number;
	y: number;
	z: number;
}

interface vector4 {
	w: number;
	x: number;
	y: number;
	z: number;
}

interface ProcessObject {
	dwSize: number;
	th32ProcessID: number;
	cntThreads: number;
	th32ParentProcessID: number;
	pcPriClassBase: number;
	modBaseAddr: number;
	handle: number;
	szExeFile: string;
}

interface ModuleObject {
	modBaseAddr: number;
	modBaseSize: number;
	szExePath: string;
	szModule: string;
	th32ProcessID: number;
	GlblcntUsage: number;
}

interface Overlay {
	exitKey: number;
	width: number;
	height: number;
	midX: number;
	midY: number;
	hwnd: number;
}

interface Font {
	fontHDC: number;
	font: number;
	height: number;
}

interface memory {
	openProcess: (processName: string) => ProcessObject;
	closeProcess: (handle: number) => void;
	getProcesses: () => ProcessObject[];
	getModules: (processId: number) => ModuleObject[];
	findModule: (moduleName: string, processId: number) => ModuleObject;
	readMemory: <T extends dataType>(handle: number, address: number, dataType: T) => ReturnType<T>;
	readBuffer: (handle: number, address: number, size: number) => Buffer;
	writeMemory: (handle: number, address: number, value: writeValue, dataType: dataType) => void;
	writeBuffer: (handle: number, address: number, buffer: Buffer) => void;
	findPattern: (handle: number, pattern: string, flags: number, patternOffset: number) => number;
	findPatternByModule: (handle: number, moduleName: string, pattern: string, flags: number, patternOffset: number) => number;
	findPatternByAddress: (handle: number, baseAddress: number, pattern: string, flags: number, patternOffset: number) => number;
	injectDll: (handle: number, dllPath: string) => void;
	unloadDll: (handle: number, moduleNameOrModuleBaseAddress: string | number) => void;
}

function hasOwnProperty(obj: Record<string, any>, key: string): boolean {
	return Object.prototype.hasOwnProperty.call(obj, key);
}

function checkVector2(vecTor2: vector2, msg: string) {
	if (Array.isArray(vecTor2)) throw new Error(msg);
	if (typeof vecTor2 !== 'object') throw new Error(msg);
	if (!hasOwnProperty(vecTor2, 'x')) throw new Error('Not have property x');
	if (!hasOwnProperty(vecTor2, 'y')) throw new Error('Not have property y');
}

// eslint-disable-next-line
const jsmeow: ObjectRecord = require('../../build/Release/JSMeow.node');

export class Memory {
	#memory: memory = jsmeow.memory;
	#handle: number;
	#processName?: string;

	constructor(processName?: string) {
		this.#processName = processName;
	}

	openProcess(processName: string) {
		try {
			const processObject = this.#memory.openProcess(this.#processName ?? processName);
			this.#handle = processObject.handle;
			this.#processName = processObject.szExeFile;
			return processObject;
		} catch (error) {
			// eslint-disable-next-line
			throw new Error(error.message);
		}
	}

	closeProcess() {
		this.#memory.closeProcess(this.#handle);
	}

	getProcesses() {
		return this.#memory.getProcesses();
	}

	getModules(processId: number) {
		return this.#memory.getModules(processId);
	}

	findModule(moduleName: string, processId: number) {
		return this.#memory.findModule(moduleName, processId);
	}

	readMemory<T extends dataType>(address: number, dataType: T): ReturnType<T> {
		// eslint-disable-next-line
		return this.#memory.readMemory(this.#handle, address, dataType);
	}

	readBuffer(address: number, size: number) {
		return this.#memory.readBuffer(this.#handle, address, size);
	}

	writeMemory(address: number, value: writeValue, dataType: dataType) {
		this.#memory.writeMemory(this.#handle, address, value, dataType);
	}

	writeBuffer(address: number, buffer: Buffer) {
		this.#memory.writeBuffer(this.#handle, address, buffer);
	}

	findPattern(pattern: string, flags = 0x0, patternOffset = 0x0) {
		return this.#memory.findPattern(this.#handle, pattern, flags, patternOffset);
	}

	findPatternByModule(moduleName: string, pattern: string, flags = 0x0, patternOffset = 0x0) {
		return this.#memory.findPatternByModule(this.#handle, moduleName, pattern, flags, patternOffset);
	}

	findPatternByAddress(baseAddress: number, pattern: string, flags = 0x0, patternOffset = 0x0) {
		return this.#memory.findPatternByAddress(this.#handle, baseAddress, pattern, flags, patternOffset);
	}

	injectDll(dllPath: string) {
		this.#memory.injectDll(this.#handle, dllPath);
	}

	unloadDll(moduleNameOrModuleBaseAddress: string | number) {
		this.#memory.unloadDll(this.#handle, moduleNameOrModuleBaseAddress);
	}

	pointer32(baseAddress: number, offset: number[]): number {
		let address = this.readMemory(baseAddress, 'dword');
		for (let i = 0; i < offset.length - 1; i++) address = this.readMemory(baseAddress + offset[i], 'dword');
		address += offset[offset.length - 1];
		return address;
	}

	pointer64(baseAddress: number, offset: number[]): number {
		let address = this.readMemory(baseAddress, 'pointer');
		for (let i = 0; i < offset.length - 1; i++) address = this.readMemory(baseAddress + offset[i], 'pointer');
		address += offset[offset.length - 1];
		return address;
	}
}

// Overlay
export function overlayInit(target = 'FullScreen', exitKey = 0x23, borderOffset = 25): Overlay {
	return jsmeow.overlayInit(target, exitKey, borderOffset);
}
export function overlayUpdate() {
	jsmeow.overlayUpdate();
}
export function overlayDeinit() {
	jsmeow.overlayDeinit();
}
export function overlayClose() {
	jsmeow.overlayClose();
}
export function overlayLoop(overlay: Overlay, update = true): boolean {
	return jsmeow.overlayLoop(overlay, update);
}
export function overlaySetPos(overlay: Overlay, pos: vector2) {
	jsmeow.overlaySetPos(overlay, pos.x, pos.y);
}
export function fontInit(height: int32, fontName: string): Font {
	return jsmeow.fontInit(height, fontName);
}
export function fontDeInit(font: Font) {
	jsmeow.fontDeInit(font);
}
export function fontPrint(font: Font, pos: vector2, text: string, color: RGB) {
	jsmeow.fontPrint(font, pos.x, pos.y, text, color);
}
export function fontPrintLines(font: Font, pos: vector2, text: string, lines: string[], color: RGB, offset: float = 2) {
	jsmeow.fontPrintLines(font, pos.x, pos.y, text, lines, color, offset);
}

// Misc
export function keyPressed(vKey: int32): boolean {
	return jsmeow.keyPressed(vKey);
}
export function pressKey(vKey: int32) {
	jsmeow.pressKey(vKey);
}
export function setForeground(winTitle: string) {
	jsmeow.setForeground(winTitle);
}
export function mouseMove(overlay: Overlay, pos: vector2) {
	jsmeow.mouseMove(overlay, pos.x, pos.y);
}
export function mouseClick() {
	jsmeow.mouseClick();
}
export function WorldToScreen(pos: vector3, matrix: number[], windowWidth: number, windowHeight: number, oglordx: 'OpenGL' | 'DirectX'): vector2 {
	return jsmeow.WorldToScreen(pos, matrix, windowWidth, windowHeight, oglordx);
}

// Draw
export function pixel(pos: vector2, color: number[]) {
	checkVector2(pos, 'Parameter 1 must be vector2');
	jsmeow.pixel(pos, color);
}

export function box(pos: vector2, width: float, height: float, lineWidth: float, color: RGB) {
	checkVector2(pos, 'Parameter 1 must be vector2');
	jsmeow.box(pos, width, height, lineWidth, color);
}

export function alphaBox(pos: vector2, width: float, height: float, color: RGB, outlineColor: RGB, alpha: float) {
	checkVector2(pos, 'Parameter 1 must be vector2');
	jsmeow.alphaBox(pos, width, height, color, outlineColor, alpha);
}

export function cornerBox(pos: vector2, width: float, height: float, color: RGB, outlineColor: RGB, lineWidth: float = 1.0) {
	checkVector2(pos, 'Parameter 1 must be vector2');
	jsmeow.cornerBox(pos, width, height, color, outlineColor, lineWidth);
}

export function line(pos1: vector2, pos2: vector2, lineWidth: float, color: RGB) {
	checkVector2(pos1, 'Parameter 1 must be vector2');
	checkVector2(pos2, 'Parameter 2 must be vector2');
	jsmeow.line(pos1, pos2, lineWidth, color);
}

export function dashedLine(pos1: vector2, pos2: vector2, lineWidth: float, color: RGB, factor: int32 = 2, pattern: int64 = 11111110000, alpha: float = 0.5) {
	checkVector2(pos1, 'Parameter 1 must be vector2');
	checkVector2(pos2, 'Parameter 2 must be vector2');
	jsmeow.dashedLine(pos1, pos2, lineWidth, color, factor, pattern, alpha);
}

export function circle(pos: vector2, radius: float, color: RGB, filled = true) {
	checkVector2(pos, 'Parameter 1 must be vector2');
	jsmeow.circle(pos, radius, color, filled);
}

export function radCircle(pos: vector2, radius: float, value: int, color: RGB) {
	checkVector2(pos, 'Parameter 1 must be vector2');
	jsmeow.radCircle(pos, radius, value, color);
}

export function valueBar(pos1: vector2, pos2: vector2, width: float, maxValue: float, value: float, vertical = true) {
	checkVector2(pos1, 'Parameter 1 must be vector2');
	checkVector2(pos2, 'Parameter 2 must be vector2');

	jsmeow.valueBar(pos1, pos2, width, maxValue, value, vertical);
}

export function poly(pos: vector2, radius: float, rotation: float, sides: int, color: RGB) {
	checkVector2(pos, 'Parameter 1 must be vector2');
	jsmeow.poly(pos, radius, rotation, sides, color);
}

export function customShape(points: vector2[], color: RGB, filled = true, alpha: float = 1.0) {
	jsmeow.customShape(points, color, filled, alpha);
}

// Vector
export const Vector2 = (x: float = 0, y: float = 0): vector2 => ({ x, y });
export const Vector3 = (x: float = 0, y: float = 0, z: float = 0): vector3 => ({ x, y, z });

export const Vector2Add = (a: vector2, b: vector2): vector2 => ({ x: a.x + b.x, y: a.y + b.y });
export const Vector3Add = (a: vector3, b: vector3): vector3 => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z });

export const Vector2Sub = (a: vector2, b: vector2): vector2 => ({ x: a.x - b.x, y: a.y - b.y });
export const Vector3Sub = (a: vector3, b: vector3): vector3 => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z });

export const Vector2Mult = (a: vector2, b: vector2): vector2 => ({ x: a.x * b.x, y: a.y * b.y });
export const Vector3Mult = (a: vector3, b: vector3): vector3 => ({ x: a.x * b.x, y: a.y * b.y, z: a.z * b.z });

export const Vector2Div = (a: vector2, b: vector2): vector2 => ({ x: a.x / b.x, y: a.y / b.y });
export const Vector3Div = (a: vector3, b: vector3): vector3 => ({ x: a.x / b.x, y: a.y / b.y, z: a.z / b.z });

export const Vector2MagSq = (a: vector2): float => (a.x * a.x) + (a.y * a.y); //prettier-ignore
export const Vector3MagSq = (a: vector3): float => (a.x * a.x) + (a.y * a.y) + (a.z * a.z); //prettier-ignore

export const Vector2Mag = (a: vector2): float => Math.sqrt(Vector2MagSq(a));
export const Vector3Mag = (a: vector3): float => Math.sqrt(Vector3MagSq(a));

export const Vector2Distance = (a: vector2, b: vector2): float => Vector2Mag(Vector2Sub(a, b));
export const Vector3Distance = (a: vector3, b: vector3): float => Vector3Mag(Vector3Sub(a, b));

export const Vector2Closest = (a: vector2, b: vector2[]): vector2 => {
	let closest_value = Infinity;
	let result = Vector2();

	for (const vec2 of b) {
		const dist: float = Vector2Distance(a, vec2);
		if (dist < closest_value) {
			result = vec2;
			closest_value = dist;
		}
	}

	return result;
};

export const Vector3Closest = (a: vector3, b: vector3[]): vector3 => {
	let closest_value = Infinity;
	let result = Vector3();

	for (const vec3 of b) {
		const dist: float = Vector3Distance(a, vec3);
		if (dist < closest_value) {
			result = vec3;
			closest_value = dist;
		}
	}

	return result;
};

export default {
	Memory,
	Vector2,
	Vector2Add,
	Vector2Closest,
	Vector2Distance,
	Vector2Div,
	Vector2Mag,
	Vector2MagSq,
	Vector2Mult,
	Vector2Sub,
	Vector3,
	Vector3Add,
	Vector3Closest,
	Vector3Distance,
	Vector3Div,
	Vector3Mag,
	Vector3MagSq,
	Vector3Mult,
	Vector3Sub,
	WorldToScreen,
	alphaBox,
	box,
	circle,
	cornerBox,
	customShape,
	dashedLine,
	fontDeInit,
	fontInit,
	fontPrint,
	fontPrintLines,
	keyPressed,
	line,
	mouseClick,
	mouseMove,
	overlayClose,
	overlayDeinit,
	overlayInit,
	overlayLoop,
	overlaySetPos,
	overlayUpdate,
	pixel,
	poly,
	pressKey,
	radCircle,
	setForeground,
	valueBar,
};
