#include "memory/memoryjs.h"
#include "misc.h"
#include "overlay.h"
#include "shapes.h"
#include "utils.h"

Napi::Object Init(Napi::Env env, Napi::Object exports) {
	Napi::Object tempMemory = Napi::Object::New(env);
	exports.Set("memory", memoryinit(env, tempMemory));

	exports.Set("overlayInit", Napi::Function::New(env, Overlay::overlayInit));
	exports.Set("overlayUpdate", Napi::Function::New(env, Overlay::overlayUpdate));
	exports.Set("overlayDeinit", Napi::Function::New(env, Overlay::overlayDeinit));
	exports.Set("overlayClose", Napi::Function::New(env, Overlay::overlayClose));
	exports.Set("overlayLoop", Napi::Function::New(env, Overlay::overlayLoop));
	exports.Set("overlaySetPos", Napi::Function::New(env, Overlay::overlaySetPos));
	exports.Set("fontInit", Napi::Function::New(env, Overlay::fontInit));
	exports.Set("fontDeInit", Napi::Function::New(env, Overlay::fontDeInit));
	exports.Set("fontPrint", Napi::Function::New(env, Overlay::fontPrint));
	exports.Set("fontPrintLines", Napi::Function::New(env, Overlay::fontPrintLines));

	exports.Set("keyPressed", Napi::Function::New(env, Misc::keyPressed));
	exports.Set("pressKey", Napi::Function::New(env, Misc::pressKey));
	exports.Set("setForeground", Napi::Function::New(env, Misc::setForeground));
	exports.Set("mouseMove", Napi::Function::New(env, Misc::mouseMove));
	exports.Set("mouseClick", Napi::Function::New(env, Misc::mouseClick));

	exports.Set("WorldToScreen", Napi::Function::New(env, Utils::WorldToScreen));

	exports.Set("pixel", Napi::Function::New(env, Shapes::pixel));
	exports.Set("box", Napi::Function::New(env, Shapes::box));
	exports.Set("alphaBox", Napi::Function::New(env, Shapes::alphaBox));
	exports.Set("cornerBox", Napi::Function::New(env, Shapes::cornerBox));
	exports.Set("line", Napi::Function::New(env, Shapes::line));
	exports.Set("dashedLine", Napi::Function::New(env, Shapes::dashedLine));
	exports.Set("circle", Napi::Function::New(env, Shapes::circle));
	exports.Set("radCircle", Napi::Function::New(env, Shapes::radCircle));
	exports.Set("valueBar", Napi::Function::New(env, Shapes::valueBar));
	exports.Set("poly", Napi::Function::New(env, Shapes::poly));
	exports.Set("customShape", Napi::Function::New(env, Shapes::customShape));

	return exports;
}

NODE_API_MODULE(JSMeow, Init)