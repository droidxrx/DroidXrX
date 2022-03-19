#include "draws.h"
#include "misc.h"
#include "overlay.h"

Object Inits(Env env, Object exports) {
	ovInit(env, exports);
	drawsInit(env, exports);
	miscInit(env, exports);

	return exports;
}

NODE_API_MODULE(JSMeow, Inits);