#include <napi.h>

namespace Overlay {
Napi::Value overlayInit(const Napi::CallbackInfo &info);
Napi::Value overlayUpdate(const Napi::CallbackInfo &info);
Napi::Value overlayDeinit(const Napi::CallbackInfo &info);
Napi::Value overlayClose(const Napi::CallbackInfo &info);
Napi::Value overlayLoop(const Napi::CallbackInfo &info);
Napi::Value overlaySetPos(const Napi::CallbackInfo &info);

Napi::Value fontInit(const Napi::CallbackInfo &info);
Napi::Value fontDeInit(const Napi::CallbackInfo &info);
Napi::Value fontPrint(const Napi::CallbackInfo &info);
Napi::Value fontPrintLines(const Napi::CallbackInfo &info);
} // namespace Overlay
