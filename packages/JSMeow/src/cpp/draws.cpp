#include "draws.h"

#include <GL/glew.h>

struct rgbColor {
	float r, g, b;
};

struct rgbaColor {
	float r, g, b, a;
};

struct vec2 {
	float x, y;
};

rgbColor colorRgb(Array color) {
	rgbColor rgbs;
	rgbs.r = color.Get(0U).As<Number>().FloatValue();
	rgbs.g = color.Get(1U).As<Number>().FloatValue();
	rgbs.b = color.Get(2U).As<Number>().FloatValue();
	return rgbs;
}

rgbaColor colorRgba(Array color) {
	rgbaColor rgba;
	rgba.r = color.Get(0U).As<Number>().FloatValue();
	rgba.g = color.Get(1U).As<Number>().FloatValue();
	rgba.b = color.Get(2U).As<Number>().FloatValue();
	rgba.a = color.Get(3U).As<Number>().FloatValue();
	return rgba;
}

vec2 getVec2(Object obj) {
	vec2 vec2s;
	vec2s.x = obj.Get("x").As<Number>().FloatValue();
	vec2s.y = obj.Get("y").As<Number>().FloatValue();
	return vec2s;
}

Value drawText(const CallbackInfo &info) {
	GLuint base = info[0].As<Napi::Object>().Get("font").As<Napi::Number>();
	GLfloat x = info[1].As<Napi::Number>();
	GLfloat y = info[2].As<Napi::Number>();
	std::string text = info[3].As<Napi::String>();
	rgbColor color = colorRgb(info[4].As<Array>());

	glColor3f(color.r, color.g, color.b);
	glWindowPos2f(x, y);
	glPushAttrib(GL_LIST_BIT);
	glListBase(base - 32);
	glCallLists(text.length(), GL_UNSIGNED_BYTE, text.c_str());
	glPopAttrib();
	return info.Env().Undefined();
}

Value drawTextLines(const CallbackInfo &info) {
	Object Font = info[0].As<Napi::Object>();

	GLuint base = Font.Get("font").As<Napi::Number>();
	GLfloat x = info[1].As<Napi::Number>();
	GLfloat y = info[2].As<Napi::Number>();
	Array lines = info[3].As<Array>();
	rgbColor color = colorRgb(info[4].As<Array>());
	GLfloat offset = info[5].As<Napi::Number>();

	glColor3f(color.r, color.g, color.b);
	glPushAttrib(GL_LIST_BIT);
	glListBase(base - 32);

	GLfloat height = Font.Get("height").As<Napi::Number>();
	for (uint32_t i = 0; i < lines.Length(); i++) {
		std::string tempStr = lines.Get(i).As<String>();
		glWindowPos2f(x, y);
		glCallLists(tempStr.length(), GL_UNSIGNED_BYTE, tempStr.c_str());
		y = y - (height + offset);
	}

	glPopAttrib();
	return info.Env().Undefined();
}

Value drawPixel(const CallbackInfo &info) {
	rgbColor color = colorRgb(info[0].As<Array>());
	glBegin(GL_LINES);
	glColor3f(color.r, color.g, color.b);
	glVertex2f(x, y);
	glVertex2f(x + 1, y + 1);
	glEnd();
	return info.Env().Undefined();
}

Object drawsInit(Env env, Object exports) {
	exports.Set("drawText", Function::New(env, drawText));
	exports.Set("drawTextLines", Function::New(env, drawTextLines));

	return exports;
}