#include <napi.h>
struct vec2 {
	float x, y;
};

struct vec3 {
	float x, y, z;
};

struct vec4 {
	float w, x, y, z;
};

class Vector2 {
  public:
	float x, y;
	Vector2(Napi::Object obj) {
		x = obj.Get("x").As<Napi::Number>().FloatValue();
		y = obj.Get("y").As<Napi::Number>().FloatValue();
	}
};

class Vector3 {
  public:
	float x, y, z;
	Vector3(Napi::Object obj) {
		x = obj.Get("x").As<Napi::Number>().FloatValue();
		y = obj.Get("y").As<Napi::Number>().FloatValue();
		z = obj.Get("z").As<Napi::Number>().FloatValue();
	}
};

class Vector4 {
  public:
	float w, x, y, z;
	Vector4(Napi::Object obj) {
		w = obj.Get("w").As<Napi::Number>().FloatValue();
		x = obj.Get("x").As<Napi::Number>().FloatValue();
		y = obj.Get("y").As<Napi::Number>().FloatValue();
		z = obj.Get("z").As<Napi::Number>().FloatValue();
	}
};

class Matrix {
  private:
	Napi::Array a;
	float x;

  public:
	Matrix(Napi::Array arr) {
		a = arr;
	}
	float Get(uint32_t index) {
		x = a.Get(index).As<Napi::Number>().FloatValue();
		return x;
	}
};

class RGBs {
  private:
	Napi::Array a;
	int32_t x;

  public:
	RGBs(Napi::Array arr) {
		a = arr;
	}
	float Get(uint32_t index) {
		x = a.Get(index).As<Napi::Number>().Int32Value();
		return x;
	}
};

namespace Utils {
Napi::Value WorldToScreen(const Napi::CallbackInfo &info);
} // namespace Utils
