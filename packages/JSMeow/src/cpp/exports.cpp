#include "draws.h"
#include "overlay.h"

Object Inits(Env env, Object exports) {
	ovInit(env, exports);
	drawsInit(env, exports);

	return exports;
}

NODE_API_MODULE(JSMeow, Inits);