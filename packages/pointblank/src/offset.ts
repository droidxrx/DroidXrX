export function baseOffset(baseAddress: number) {
	const GameInterFace = baseAddress + 0xf757e0;
	return {
		GameInterFace,
		CGameFrameWork: GameInterFace + 0x4,
		i3Viewer: GameInterFace + 0x8,
		CGameCamera_FPS: GameInterFace + 0xc,
		CGameCharacManager: GameInterFace + 0x10,
		CGameWeaponManager: GameInterFace + 0x14,
		CTracerBulletManager: GameInterFace + 0x18,
		i3GuiRoot: GameInterFace + 0x1c,
		CEffectManager: GameInterFace + 0x20,
		CGameSoundManager: GameInterFace + 0x24,
		CClanMarkManager: GameInterFace + 0x28,
		CGameContext: GameInterFace + 0x2c,
		CRandTable: GameInterFace + 0x30,
		CServerInfoContext: GameInterFace + 0x34,
		PhysixInfoDataBase: GameInterFace + 0x38,
		WeaponInfoDataBase: GameInterFace + 0x3c,
		ShopItemInfoDataBase: GameInterFace + 0x40,
		WeaponAccessoryInfoMgr: GameInterFace + 0x44,
		CConfig: GameInterFace + 0x48,
		CharaInfoDataBase: GameInterFace + 0x4c,
		Unknowm1: GameInterFace + 0x50,
		Unknowm2: GameInterFace + 0x54,
		CEnvSet: GameInterFace + 0x58,
		pMySlot: baseAddress + 0xf749c0,
		CharacterControllerManager: baseAddress + 0xf70c18,
	};
}

export const offset = {
	camera: {
		x: [0x8, 0x0, 0x4e0, 0x0, 0x198, 0x0], // CGameCharacManager
		y: [0x8, 0x0, 0x4e0, 0x0, 0x1dc, 0x0], // CGameCharacManager
		fovX: [0xc0, 0x98, 0x20], // CGameFrameWork
		fovY: [0xc0, 0x98, 0x34], // CGameFrameWork
	},
	mySlot: [0x24054], // pMySlot
	totalPlayer: [0x0, 0x8, 0x8], // CharacterControllerManager
	pos3d: [0x0, 0x8, 0x4, 0x0], // CharacterControllerManager
	healt: {
		red: [0x3c, 0x26c, 0x49c, 0x6cc, 0x8fc, 0xb2c, 0xd5c, 0xf8c], // CGameCharacManager
		blue: [0x154, 0x384, 0x5b4, 0x7e4, 0xa14, 0xc44, 0xe74, 0x10a4], // CGameCharacManager
	},
};
