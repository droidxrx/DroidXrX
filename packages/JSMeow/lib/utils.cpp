#include "utils.h"

Napi::Value Utils::WorldToScreen(const Napi::CallbackInfo &info) {
    Napi::Env env = info.Env();

    Vector3 pos(info[0].As<Napi::Object>());
    Matrix matrix(info[1].As<Napi::Array>());
    int windowWidth = info[2].As<Napi::Number>();
    int windowHeight = info[3].As<Napi::Number>();
    std::string oglordx = info[4].As<Napi::String>().Utf8Value();

    vec4 clipCoords;
    vec3 NDC;

    if (oglordx == "OpenGL") {
        clipCoords.w = pos.x * matrix.Get(3) + pos.y * matrix.Get(7) + pos.z * matrix.Get(11) + matrix.Get(15);
        if (clipCoords.w < 0.1f)
            return Napi::Boolean::New(env, false);

        clipCoords.x = pos.x * matrix.Get(0) + pos.y * matrix.Get(4) + pos.z * matrix.Get(8) + matrix.Get(12);
        clipCoords.y = pos.x * matrix.Get(1) + pos.y * matrix.Get(5) + pos.z * matrix.Get(9) + matrix.Get(13);
        clipCoords.z = pos.x * matrix.Get(2) + pos.y * matrix.Get(6) + pos.z * matrix.Get(10) + matrix.Get(14);
    } else if (oglordx == "DirectX") {
        clipCoords.w = pos.x * matrix.Get(12) + pos.y * matrix.Get(13) + pos.z * matrix.Get(14) + matrix.Get(15);
        if (clipCoords.w < 0.1f)
            return Napi::Boolean::New(env, false);

        clipCoords.x = pos.x * matrix.Get(0) + pos.y * matrix.Get(1) + pos.z * matrix.Get(2) + matrix.Get(3);
        clipCoords.y = pos.x * matrix.Get(4) + pos.y * matrix.Get(5) + pos.z * matrix.Get(6) + matrix.Get(7);
        clipCoords.z = pos.x * matrix.Get(8) + pos.y * matrix.Get(9) + pos.z * matrix.Get(10) + matrix.Get(11);
    } else {
        Napi::Error::New(env, "oglordx harus OpenGL atau DirectX!").ThrowAsJavaScriptException();
        return env.Null();
    }

    NDC.x = clipCoords.x / clipCoords.w;
    NDC.y = clipCoords.y / clipCoords.w;
    NDC.z = clipCoords.z / clipCoords.w;

    Napi::Object result = Napi::Object::New(env);
    result.Set("x", (windowWidth / 2 * NDC.x) + (NDC.x + windowWidth / 2));
    result.Set("y", -(windowHeight / 2 * NDC.y) + (NDC.y + windowHeight / 2));

    return result;
}
