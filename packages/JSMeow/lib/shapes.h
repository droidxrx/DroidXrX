#include <napi.h>

namespace Shapes {
Napi::Value pixel(const Napi::CallbackInfo &info);
Napi::Value box(const Napi::CallbackInfo &info);
Napi::Value alphaBox(const Napi::CallbackInfo &info);
Napi::Value cornerBox(const Napi::CallbackInfo &info);
Napi::Value line(const Napi::CallbackInfo &info);
Napi::Value dashedLine(const Napi::CallbackInfo &info);
Napi::Value circle(const Napi::CallbackInfo &info);
Napi::Value radCircle(const Napi::CallbackInfo &info);
Napi::Value valueBar(const Napi::CallbackInfo &info);
Napi::Value poly(const Napi::CallbackInfo &info);
Napi::Value customShape(const Napi::CallbackInfo &info);
} // namespace Shapes