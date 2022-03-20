import { Font, Overlay, overlays } from './addon';

export function overlayClose(overlay: Overlay) {
	overlays.overlayClose(overlay);
}

export function overlayDeinit(overlay: Overlay) {
	overlays.overlayDeinit(overlay);
}

export function overlayFontDeInit(font: Font) {
	overlays.overlayFontDeInit(font);
}

export function overlayFontInit(height: number, fontName: string) {
	return overlays.overlayFontInit(height, fontName);
}

export function overlayLoop(overlay: Overlay, update = true) {
	return overlays.overlayLoop(overlay, update);
}

export function overlaySetPos(overlay: Overlay) {
	return overlays.overlaySetPos(overlay);
}

export function overlayUpdate(overlay: Overlay) {
	overlays.overlayUpdate(overlay);
}

export function overlayInit(target = 'FullScreen', exitkey = 0x23, borderOffset = 25) {
	return overlays.overlayInit(target, exitkey, borderOffset);
}
