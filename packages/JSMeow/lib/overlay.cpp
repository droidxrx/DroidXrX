#include "overlay.h"

#include <GL/glew.h>
#include <GLFW/glfw3.h>
#include <GLFW/glfw3native.h>
#include <windows.h>

GLFWwindow *OverlayWindow;

Napi::Value Overlay::overlayInit(const Napi::CallbackInfo &info) {
	Napi::Env env = info.Env();

	// Cek parameter harus 3
	if (info.Length() < 3) {
		Napi::Error::New(env, "Parameter harus tiga!").ThrowAsJavaScriptException();
		return env.Null();
	}

	// Parameter 1 harus string (target)
	if (!info[0].IsString()) {
		Napi::Error::New(env, "Parameter pertama harus string!").ThrowAsJavaScriptException();
		return env.Null();
	}

	// Parameter 2 harus number (exitKey)
	if (!info[1].IsNumber()) {
		Napi::Error::New(env, "Parameter kedua harus number!").ThrowAsJavaScriptException();
		return env.Null();
	}

	// Parameter 3 harus number (borderOffset)
	if (!info[2].IsNumber()) {
		Napi::Error::New(env, "Parameter ketiga harus number!").ThrowAsJavaScriptException();
		return env.Null();
	}

	RECT rect;

	if (glfwInit() == GLFW_FALSE) {
		Napi::Error::New(env, "Gagal inisialisasi GLFW.").ThrowAsJavaScriptException();
		return env.Null();
	}

	glfwWindowHint(GLFW_FLOATING, GLFW_TRUE);
	glfwWindowHint(GLFW_DECORATED, GLFW_FALSE);
	glfwWindowHint(GLFW_RESIZABLE, GLFW_FALSE);
	glfwWindowHint(GLFW_TRANSPARENT_FRAMEBUFFER, GLFW_TRUE);
	glfwWindowHint(GLFW_MOUSE_PASSTHROUGH, GLFW_TRUE);
	glfwWindowHint(GLFW_SAMPLES, 8);

	Napi::Object result = Napi::Object::New(env);
	result.Set("exitKey", info[1].As<Napi::Number>().Int32Value());

	std::string target = info[0].As<Napi::String>().Utf8Value();
	int borderOffset = info[2].As<Napi::Number>().Int32Value();
	int width;
	int height;

	if (target == "FullScreen") {
		const GLFWvidmode *videoMode = glfwGetVideoMode(glfwGetPrimaryMonitor());
		width = videoMode->width;
		height = videoMode->height;

		result.Set("width", width);
		result.Set("height", height);
		result.Set("midX", width / 2);
		result.Set("midY", height / 2);
	} else {
		HWND hwndWin = FindWindowA(NULL, target.c_str());
		if (hwndWin == 0) {
			Napi::Error::New(env, "Window " + target + " not found.").ThrowAsJavaScriptException();
			return env.Null();
		}
		GetWindowRect(hwndWin, &rect);
		width = rect.right - rect.left;
		height = rect.bottom - rect.top - borderOffset;

		result.Set("width", width);
		result.Set("height", height);
		result.Set("midX", width / 2);
		result.Set("midY", height / 2);
	}

	OverlayWindow = glfwCreateWindow(width - 1, height - 1, "JSMeow", NULL, NULL);
	glfwSetInputMode(OverlayWindow, GLFW_CURSOR, GLFW_CURSOR_DISABLED);
	glfwMakeContextCurrent(OverlayWindow);
	glfwSwapInterval(0);

	if (glewInit() != GLEW_OK) {
		Napi::Error::New(env, "Gagal inisialisasi OPENGL.").ThrowAsJavaScriptException();
		return env.Null();
	}

	glPushAttrib(GL_ALL_ATTRIB_BITS);
	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();
	glOrtho(0, (double)width, 0, (double)height, -1, 1);
	glDisable(GL_DEPTH_TEST);
	glDisable(GL_TEXTURE_2D);
	glEnable(GL_BLEND);
	glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);

	HWND ovhwnd = glfwGetWin32Window(OverlayWindow);
	result.Set("hwnd", (INT_PTR)ovhwnd);

	if (target != "FullScreen") {
		SetWindowPos(ovhwnd, NULL, rect.left, rect.top + borderOffset, 0, 0, 0x0001);
	}

	return result;
}

Napi::Value Overlay::overlayUpdate(const Napi::CallbackInfo &info) {
	Napi::Env env = info.Env();

	glfwSwapBuffers(OverlayWindow);
	glClear(GL_COLOR_BUFFER_BIT);
	glfwPollEvents();

	return env.Null();
}

Napi::Value Overlay::overlayDeinit(const Napi::CallbackInfo &info) {
	Napi::Env env = info.Env();

	glfwDestroyWindow(OverlayWindow);
	glfwTerminate();

	return env.Null();
}

Napi::Value Overlay::overlayClose(const Napi::CallbackInfo &info) {
	Napi::Env env = info.Env();

	glfwSetWindowShouldClose(OverlayWindow, true);

	return env.Null();
}

Napi::Value Overlay::overlayLoop(const Napi::CallbackInfo &info) {
	Napi::Env env = info.Env();

	// Cek parameter harus 2
	if (info.Length() < 2) {
		Napi::Error::New(env, "Parameter harus dua!").ThrowAsJavaScriptException();
		return env.Null();
	}

	// Parameter 1 harus object (overlay)
	if (!info[0].IsObject()) {
		Napi::Error::New(env, "Parameter pertama harus object!").ThrowAsJavaScriptException();
		return env.Null();
	}

	// Parameter 2 harus bool (update)
	if (!info[1].IsBoolean()) {
		Napi::Error::New(env, "Parameter kedua harus boolean!").ThrowAsJavaScriptException();
		return env.Null();
	}

	if ((bool)GetAsyncKeyState(info[0].As<Napi::Object>().Get("exitKey").As<Napi::Number>().Int32Value()))
		Overlay::overlayClose(info);

	if (info[1].As<Napi::Boolean>().Value())
		Overlay::overlayUpdate(info);

	return Napi::Boolean::New(env, !(bool)glfwWindowShouldClose(OverlayWindow));
}

Napi::Value Overlay::overlaySetPos(const Napi::CallbackInfo &info) {
	Napi::Env env = info.Env();

	// Cek parameter harus 3
	if (info.Length() < 3) {
		Napi::Error::New(env, "Parameter harus tiga!").ThrowAsJavaScriptException();
		return env.Null();
	}

	// Parameter 1 harus object (overlay)
	if (!info[0].IsObject()) {
		Napi::Error::New(env, "Parameter pertama harus object!").ThrowAsJavaScriptException();
		return env.Null();
	}

	// Parameter 2 harus number (x)
	if (!info[1].IsNumber()) {
		Napi::Error::New(env, "Parameter kedua harus number!").ThrowAsJavaScriptException();
		return env.Null();
	}

	// Parameter 3 harus number (y)
	if (!info[2].IsNumber()) {
		Napi::Error::New(env, "Parameter ketiga harus number!").ThrowAsJavaScriptException();
		return env.Null();
	}

	INT_PTR hwnd = info[0].As<Napi::Object>().Get("hwnd").As<Napi::Number>();
	INT32 x = info[1].As<Napi::Number>().Int32Value();
	INT32 y = info[2].As<Napi::Number>().Int32Value();

	SetWindowPos((HWND)hwnd, NULL, x, y, 0, 0, 0x0001);
	return env.Null();
}

Napi::Value Overlay::fontInit(const Napi::CallbackInfo &info) {
	Napi::Env env = info.Env();

	// Cek parameter harus 2
	if (info.Length() < 2) {
		Napi::Error::New(env, "Parameter harus dua!").ThrowAsJavaScriptException();
		return env.Null();
	}

	// Parameter 1 harus number (height)
	if (!info[0].IsNumber()) {
		Napi::Error::New(env, "Parameter pertama harus number!").ThrowAsJavaScriptException();
		return env.Null();
	}

	// Parameter 2 harus string (fontName)
	if (!info[1].IsString()) {
		Napi::Error::New(env, "Parameter kedua harus string!").ThrowAsJavaScriptException();
		return env.Null();
	}

	Napi::Object result = Napi::Object::New(env);
	HDC fontHDC = wglGetCurrentDC();
	result.Set("fontHDC", (INT_PTR)fontHDC);
	if (fontHDC == 0) {
		Napi::Error::New(env, "Font initialisation without a overlay").ThrowAsJavaScriptException();
		return env.Null();
	}

	INT32 height = info[0].As<Napi::Number>().Int32Value();
	std::string fontName = info[1].As<Napi::String>().Utf8Value();

	HFONT hFont = CreateFontA(-(height), 0, 0, 0, FW_DONTCARE, 0, 0, 0, ANSI_CHARSET, OUT_TT_PRECIS, CLIP_DEFAULT_PRECIS, DEFAULT_QUALITY, FF_DONTCARE | DEFAULT_PITCH, fontName.c_str());
	HGDIOBJ hOldFont = SelectObject(fontHDC, hFont);

	result.Set("font", (INT32)glGenLists(96));
	result.Set("height", height);

	wglUseFontBitmaps(fontHDC, 32, 96, result.Get("font").As<Napi::Number>().Int32Value());
	SelectObject(fontHDC, hOldFont);
	DeleteObject(hFont);

	return result;
}

Napi::Value Overlay::fontDeInit(const Napi::CallbackInfo &info) {
	Napi::Env env = info.Env();

	// Cek parameter harus 1
	if (info.Length() < 1) {
		Napi::Error::New(env, "Parameter harus 1!").ThrowAsJavaScriptException();
		return env.Null();
	}

	// Parameter 1 harus object (Font)
	if (!info[0].IsObject()) {
		Napi::Error::New(env, "Parameter pertama harus object!").ThrowAsJavaScriptException();
		return env.Null();
	}

	glDeleteLists(info[0].As<Napi::Object>().Get("font").As<Napi::Number>().Int32Value(), 96);

	return env.Null();
}

Napi::Value Overlay::fontPrint(const Napi::CallbackInfo &info) {
	Napi::Env env = info.Env();

	// Cek parameter harus 1
	if (info.Length() < 5) {
		Napi::Error::New(env, "Parameter harus 5!").ThrowAsJavaScriptException();
		return env.Null();
	}

	// Parameter 1 harus object (Font)
	if (!info[0].IsObject()) {
		Napi::Error::New(env, "Parameter pertama harus object!").ThrowAsJavaScriptException();
		return env.Null();
	}

	// Parameter 2 harus number (x)
	if (!info[1].IsNumber()) {
		Napi::Error::New(env, "Parameter kedua harus number!").ThrowAsJavaScriptException();
		return env.Null();
	}

	// Parameter 3 harus number (y)
	if (!info[2].IsNumber()) {
		Napi::Error::New(env, "Parameter ketiga harus number!").ThrowAsJavaScriptException();
		return env.Null();
	}

	// Parameter 4 harus string (text)
	if (!info[3].IsString()) {
		Napi::Error::New(env, "Parameter keempat harus string!").ThrowAsJavaScriptException();
		return env.Null();
	}

	// Parameter 5 harus array (color)
	if (!info[4].IsArray()) {
		Napi::Error::New(env, "Parameter kelima harus array!").ThrowAsJavaScriptException();
		return env.Null();
	}

	Napi::Array colorLs = info[4].As<Napi::Array>();
	std::string text = info[3].As<Napi::String>().Utf8Value();

	glColor3f(colorLs.Get((UINT32)0).As<Napi::Number>(), colorLs.Get((UINT32)1).As<Napi::Number>(), colorLs.Get((UINT32)2).As<Napi::Number>());
	glWindowPos2f(info[1].As<Napi::Number>().FloatValue(), info[2].As<Napi::Number>().FloatValue());
	glPushAttrib(GL_LIST_BIT);
	glListBase(info[0].As<Napi::Object>().Get("font").As<Napi::Number>().Int32Value() - 32);
	glCallLists((INT)text.length(), GL_UNSIGNED_BYTE, text.c_str());
	glPopAttrib();

	return env.Null();
}

Napi::Value Overlay::fontPrintLines(const Napi::CallbackInfo &info) {
	Napi::Env env = info.Env();

	// Cek parameter harus 6
	if (info.Length() < 6) {
		Napi::Error::New(env, "Parameter harus 6!").ThrowAsJavaScriptException();
		return env.Null();
	}

	// Parameter 1 harus object (Font)
	if (!info[0].IsObject()) {
		Napi::Error::New(env, "Parameter pertama harus object!").ThrowAsJavaScriptException();
		return env.Null();
	}

	// Parameter 2 harus number (x)
	if (!info[1].IsNumber()) {
		Napi::Error::New(env, "Parameter kedua harus number!").ThrowAsJavaScriptException();
		return env.Null();
	}

	// Parameter 3 harus number (y)
	if (!info[2].IsNumber()) {
		Napi::Error::New(env, "Parameter ketiga harus number!").ThrowAsJavaScriptException();
		return env.Null();
	}

	// Parameter 4 harus array string(lines)
	if (!info[3].IsArray()) {
		Napi::Error::New(env, "Parameter keempat harus array string!").ThrowAsJavaScriptException();
		return env.Null();
	}

	// Parameter 5 harus array (color)
	if (!info[4].IsArray()) {
		Napi::Error::New(env, "Parameter kelima harus array!").ThrowAsJavaScriptException();
		return env.Null();
	}

	// Parameter 6 harus number (offset)
	if (!info[5].IsNumber()) {
		Napi::Error::New(env, "Parameter keenam harus number!").ThrowAsJavaScriptException();
		return env.Null();
	}

	Napi::Object Font = info[0].As<Napi::Object>();
	Napi::Array colorLs = info[4].As<Napi::Array>();
	float x = info[1].As<Napi::Number>().FloatValue();
	float yPos = info[2].As<Napi::Number>().FloatValue();
	float offset = info[5].As<Napi::Number>().FloatValue();
	Napi::Array lines = info[3].As<Napi::Array>();

	glColor3f(colorLs.Get((UINT32)0).As<Napi::Number>(), colorLs.Get((UINT32)1).As<Napi::Number>(), colorLs.Get((UINT32)2).As<Napi::Number>());
	glPushAttrib(GL_LIST_BIT);
	glListBase(Font.Get("font").As<Napi::Number>().Int32Value() - 32);

	for (UINT32 i = 0; i < lines.Length(); i++) {
		glWindowPos2f(x, yPos);
		glCallLists((INT)lines.Get(i).As<Napi::String>().Utf8Value().length(), GL_UNSIGNED_BYTE, lines.Get(i).As<Napi::String>().Utf8Value().c_str());
		yPos -= Font.Get("height").As<Napi::Number>().FloatValue() + offset;
	}

	glPopAttrib();
	return env.Null();
}