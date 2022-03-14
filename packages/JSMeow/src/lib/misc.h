#include <napi.h>

namespace Misc {
Napi::Value keyPressed(const Napi::CallbackInfo &info);
Napi::Value pressKey(const Napi::CallbackInfo &info);
Napi::Value setForeground(const Napi::CallbackInfo &info);
Napi::Value mouseMove(const Napi::CallbackInfo &info);
Napi::Value mouseClick(const Napi::CallbackInfo &info);
} // namespace Misc
