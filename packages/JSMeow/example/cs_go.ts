/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access */
import { drawCircle, drawTextLines, Memory, overlayFontInit, overlayInit, overlayLoop, vector2, Vector2, Vector3, vector3Distance, waits, WorldToScreenDirectX } from '../'; // prettier-ignore
import { get as fetch } from 'superagent';
const mem = new Memory();

interface Offset {
	m_iHealth: number;
	m_bDormant: number;
	m_iTeamNum: number;
	m_dwBoneMatrix: number;
	m_vecOrigin: number;
	dwRadarBase: number;
	dwGlowObjectManager: number;
	m_iGlowIndex: number;
	m_iCrosshairId: number;
	dwLocalPlayer: number;
	dwEntityList: number;
	dwViewMatrix: number;
	[key: string]: number;
}

async function getcsgojson(): Promise<Offset> {
	try {
		/**
		 * Credits to https://github.com/frk1/hazedumper
		 * Offset Counter-Strike: Global Offensive Patch 1.38.2.2 (version 1443)
		 */
		const url = 'https://cdn.jsdelivr.net/gh/frk1/hazedumper@d03933a/csgo.json';
		const { body } = await fetch(url);
		return { ...body.signatures, ...body.netvars };
	} catch (error) {
		const msg: string = error.response.text;
		throw new Error(msg);
	}
}

function getMatrix(address: number): number[] {
	const result: number[] = [];
	for (let i = 0; i < 16; i++) result.push(mem.readFloat(address + 0x4 * i));
	return result;
}

class Entity {
	wts: Vector2;
	address: number;
	gameModule: number;

	id: number;
	health: number;
	dormant: number;
	team: number;
	bone_base: number;
	pos: Vector3;
	constructor(address: number, gameModule: number, offset: Offset) {
		this.wts = vector2();
		this.address = address;
		this.gameModule = gameModule;

		this.id = mem.readInt(this.address + 0x64);
		this.health = mem.readInt(this.address + offset.m_iHealth);
		this.dormant = mem.readInt(this.address + offset.m_bDormant);
		this.team = mem.readInt(this.address + offset.m_iTeamNum);
		this.bone_base = mem.readInt(this.address + offset.m_dwBoneMatrix);
		this.pos = mem.readVector3(this.address + offset.m_vecOrigin);
	}
}

void (async function () {
	const offset = await getcsgojson();
	const { th32ProcessID: processId } = mem.openProcess('csgo.exe');
	const { modBaseAddr: gameModule } = mem.findModule('client.dll', processId);
})();
