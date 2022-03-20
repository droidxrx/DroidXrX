#include "draws.h"
#include "misc.h"
#include "overlay.h"

Object assignObject(Env env, Object exports) {
	Object overlay = Object::New(env);
	Object draws = Object::New(env);
	Object misc = Object::New(env);

	ovInit(env, overlay);
	drawsInit(env, draws);
	miscInit(env, misc);

	exports.Set("overlay", overlay);
	exports.Set("draws", draws);
	exports.Set("misc", misc);

	return exports;
}

Object Inits(Env env, Object exports) {
	assignObject(env, exports);
	return exports;
}

NODE_API_MODULE(JSMeow, Inits);