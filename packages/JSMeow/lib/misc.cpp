#include "misc.h"

#include <windows.h>

Napi::Value Misc::keyPressed(const Napi::CallbackInfo &info) {
    Napi::Env env = info.Env();

    return Napi::Boolean::New(env, (bool)GetAsyncKeyState(info[0].As<Napi::Number>().Int32Value()));
}

Napi::Value Misc::pressKey(const Napi::CallbackInfo &info) {
    Napi::Env env = info.Env();

    INPUT input;
    input.type = INPUT_KEYBOARD;
    input.ki.wScan = 0;
    input.ki.time = 0;
    input.ki.dwExtraInfo = 0;
    input.ki.wVk = (WORD)info[0].As<Napi::Number>().Int32Value();
    input.ki.dwFlags = 0;

    SendInput(1, &input, sizeof(input));

    return env.Null();
}

Napi::Value Misc::setForeground(const Napi::CallbackInfo &info) {
    Napi::Env env = info.Env();

    std::string winTitle = info[0].As<Napi::String>().Utf8Value();

    return Napi::Boolean::New(env, SetForegroundWindow(FindWindowA(NULL, winTitle.c_str())));
}

Napi::Value Misc::mouseMove(const Napi::CallbackInfo &info) {
    Napi::Env env = info.Env();

    Napi::Object overlay = info[0].As<Napi::Object>();
    INT32 midX = overlay.Get("midX").As<Napi::Number>().Int32Value();
    INT32 midY = overlay.Get("midY").As<Napi::Number>().Int32Value();
    INT32 x = info[1].As<Napi::Number>().Int32Value();
    INT32 y = info[2].As<Napi::Number>().Int32Value();

    INPUT input;
    input.type = INPUT_MOUSE;
    input.mi.dwFlags = MOUSEEVENTF_MOVE;
    input.mi.dx = x - midX;
    input.mi.dy = -(y - midY);
    input.mi.time = 0;

    SendInput(1, &input, sizeof(input));
    return env.Null();
}

Napi::Value Misc::mouseClick(const Napi::CallbackInfo &info) {
    Napi::Env env = info.Env();

    INPUT down;
    INPUT release;

    down.type = INPUT_MOUSE;
    down.mi.dwFlags = MOUSEEVENTF_LEFTDOWN;
    release.type = INPUT_MOUSE;
    release.mi.dwFlags = MOUSEEVENTF_LEFTDOWN;

    SendInput(1, &down, sizeof(down));
    Sleep(3);
    SendInput(1, &release, sizeof(release));

    return env.Null();
}