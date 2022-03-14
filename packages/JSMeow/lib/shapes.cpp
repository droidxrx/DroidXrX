#include "shapes.h"

#include <GL/glew.h>
#include <math.h>

#include "utils.h"

#define PI 3.14159265358979

float degToRad(float a) {
    return a * (PI / 180);
}

void boxs(Vector2 pos, float width, float height, float lineWidth, RGBs color) {
    glLineWidth(lineWidth);
    glBegin(GL_LINE_LOOP);
    glColor3f(color.Get(0), color.Get(1), color.Get(2));
    glVertex2f(pos.x, pos.y);
    glVertex2f(pos.x + width, pos.y);
    glVertex2f(pos.x + width, pos.y + height);
    glVertex2f(pos.x, pos.y + height);
    glEnd();
    return;
}

void drawCorner(Vector2 pos, float width, float height, RGBs color, RGBs outlineColor, float lineWidth, float lineW, float lineH) {
    float x = pos.x;
    float y = pos.y;

    glBegin(GL_LINES);
    // Lower Left
    glVertex2f(x, y);
    glVertex2f(x + lineW, y);
    glVertex2f(x, y);
    glVertex2f(x, y + lineH);

    // Lower Right
    glVertex2f(x + width, y);
    glVertex2f(x + width, y + lineH);
    glVertex2f(x + width, y);
    glVertex2f(x + width - lineW, y);

    // Upper Left
    glVertex2f(x, y + height);
    glVertex2f(x, y + height - lineH);
    glVertex2f(x, y + height);
    glVertex2f(x + lineW, y + height);

    // Upper Right
    glVertex2f(x + width, y + height);
    glVertex2f(x + width, y + height - lineH);
    glVertex2f(x + width, y + height);
    glVertex2f(x + width - lineW, y + height);
    glEnd();

    return;
}

Napi::Value Shapes::pixel(const Napi::CallbackInfo &info) {
    Napi::Env env = info.Env();

    Vector2 pos(info[0].As<Napi::Object>());
    RGBs color(info[1].As<Napi::Array>());

    glBegin(GL_LINES);
    glColor3f(color.Get(0), color.Get(1), color.Get(2));
    glVertex2f(pos.x, pos.y);
    glVertex2f(pos.x + 1, pos.y + 1);
    glEnd();

    return env.Null();
}

Napi::Value Shapes::box(const Napi::CallbackInfo &info) {
    Napi::Env env = info.Env();

    Vector2 pos(info[0].As<Napi::Object>());
    float width = info[1].As<Napi::Number>();
    float height = info[2].As<Napi::Number>();
    float lineWidth = info[3].As<Napi::Number>();
    RGBs color(info[4].As<Napi::Array>());

    boxs(pos, width, height, lineWidth, color);

    return env.Null();
}

Napi::Value Shapes::alphaBox(const Napi::CallbackInfo &info) {
    Napi::Env env = info.Env();

    Vector2 pos(info[0].As<Napi::Object>());
    float width = info[1].As<Napi::Number>().FloatValue();
    float height = info[2].As<Napi::Number>().FloatValue();
    RGBs color(info[3].As<Napi::Array>());
    RGBs outlineColor(info[4].As<Napi::Array>());
    float alpha = info[5].As<Napi::Number>().FloatValue();

    boxs(pos, width, height, 1.0, outlineColor);
    glBegin(GL_POLYGON);
    glColor4f(color.Get(0), color.Get(1), color.Get(2), alpha);
    glVertex2f(pos.x, pos.y);
    glVertex2f(pos.x + width, pos.y);
    glVertex2f(pos.x + width, pos.y + height);
    glVertex2f(pos.x, pos.y + height);
    glEnd();

    return env.Null();
}

Napi::Value Shapes::cornerBox(const Napi::CallbackInfo &info) {
    Napi::Env env = info.Env();

    Vector2 pos(info[0].As<Napi::Object>());
    float width = info[1].As<Napi::Number>().FloatValue();
    float height = info[2].As<Napi::Number>().FloatValue();
    RGBs color(info[3].As<Napi::Array>());
    RGBs outlineColor(info[4].As<Napi::Array>());
    float lineWidth = info[5].As<Napi::Number>().FloatValue();

    float lineW = width / 4;
    float lineH = height / 3;

    glLineWidth(lineWidth + 2);
    glColor3f(outlineColor.Get(0), outlineColor.Get(1), outlineColor.Get(2));
    drawCorner(pos, width, height, color, outlineColor, lineWidth, lineW, lineH);
    glLineWidth(lineWidth);
    glColor3f(color.Get(0), color.Get(1), color.Get(2));
    drawCorner(pos, width, height, color, outlineColor, lineWidth, lineW, lineH);
    return env.Null();
}

Napi::Value Shapes::line(const Napi::CallbackInfo &info) {
    Napi::Env env = info.Env();

    Vector2 pos1(info[0].As<Napi::Object>());
    Vector2 pos2(info[1].As<Napi::Object>());
    float lineWidth = info[2].As<Napi::Number>().FloatValue();
    RGBs color(info[3].As<Napi::Array>());

    glLineWidth(lineWidth);
    glBegin(GL_LINES);
    glColor3f(color.Get(0), color.Get(1), color.Get(2));
    glVertex2f(pos1.x, pos1.y);
    glVertex2f(pos2.x, pos2.y);
    glEnd();
    return env.Null();
}

Napi::Value Shapes::dashedLine(const Napi::CallbackInfo &info) {
    Napi::Env env = info.Env();

    Vector2 pos1(info[0].As<Napi::Object>());
    Vector2 pos2(info[1].As<Napi::Object>());
    float lineWidth = info[2].As<Napi::Number>().FloatValue();
    RGBs color(info[3].As<Napi::Array>());
    int32_t factor = info[4].As<Napi::Number>().Int32Value();
    short pattern = info[5].As<Napi::Number>().Int64Value();
    float alpha = info[6].As<Napi::Number>().FloatValue();

    glPushAttrib(GL_ENABLE_BIT);
    glLineStipple(factor, pattern);
    glLineWidth(lineWidth);
    glEnable(GL_LINE_STIPPLE);

    glBegin(GL_LINES);
    glColor4f(color.Get(0), color.Get(1), color.Get(2), alpha);
    glVertex2f(pos1.x, pos1.y);
    glVertex2f(pos2.x, pos2.y);
    glEnd();
    glPopAttrib();
    return env.Null();
}

Napi::Value Shapes::circle(const Napi::CallbackInfo &info) {
    Napi::Env env = info.Env();

    Vector2 pos(info[0].As<Napi::Object>());
    float radius = info[1].As<Napi::Number>().FloatValue();
    RGBs color(info[2].As<Napi::Array>());
    bool filled = info[3].As<Napi::Boolean>().Value();

    if (filled)
        glBegin(GL_POLYGON);
    else
        glBegin(GL_LINE_LOOP);

    glColor3f(color.Get(0), color.Get(1), color.Get(2));
    for (int i = 0; i < 360; i++) {
        glVertex2f(cos(degToRad((float)i)) * radius + pos.x, sin(degToRad((float)i)) * radius + pos.y);
    }
    glEnd();
    return env.Null();
}

Napi::Value Shapes::radCircle(const Napi::CallbackInfo &info) {
    Napi::Env env = info.Env();

    Vector2 pos(info[0].As<Napi::Object>());
    float radius = info[1].As<Napi::Number>().FloatValue();
    int value = info[2].As<Napi::Number>();
    RGBs color(info[3].As<Napi::Array>());

    glBegin(GL_POLYGON);
    glColor3f(color.Get(0), color.Get(1), color.Get(2));

    for (int i = 0; i < value; i++) {
        glVertex2f(cos(degToRad((float)i)) * radius + pos.x, sin(degToRad((float)i)) * radius + pos.y);
    }

    glEnd();
    return env.Null();
}

Napi::Value Shapes::valueBar(const Napi::CallbackInfo &info) {
    Napi::Env env = info.Env();
    Vector2 pos1(info[0].As<Napi::Object>());
    Vector2 pos2(info[1].As<Napi::Object>());
    float width = info[2].As<Napi::Number>().FloatValue();
    float maxValue = info[3].As<Napi::Number>().FloatValue();
    float value = info[4].As<Napi::Number>().FloatValue();
    bool vertical = info[5].As<Napi::Boolean>().Value();
    Napi::Array colors = Napi::Array::New(env);

    if (value > maxValue) {
        Napi::Error::New(env, "ValueBar: Max Value > value").ThrowAsJavaScriptException();
        return env.Null();
    }

    colors.Set((uint32_t)0, 0);
    colors.Set((uint32_t)1, 0);
    colors.Set((uint32_t)2, 0);

    RGBs color(colors);

    float x = value / maxValue;
    float barY = (pos2.y - pos1.y) * x + pos1.y;
    float barX = (pos2.x - pos1.x) * x + pos1.x;

    glLineWidth(width);
    glBegin(GL_LINES);
    glColor3f(0, 0, 0);
    glVertex2f(pos1.x, pos1.y);
    glVertex2f(pos2.x, pos2.y);
    glEnd();

    if (vertical) {
        glLineWidth(width);
        glBegin(GL_LINES);
        glColor3f(GLfloat(2.0 * (1 - x)), GLfloat((2.0 * x)), GLfloat(0));
        glVertex2f(pos1.x, pos1.y);
        glVertex2f(pos2.x, barY);
        glEnd();
    } else {
        glLineWidth(width);
        glBegin(GL_LINES);
        glColor3f(GLfloat(2.0 * (1 - x)), GLfloat((2.0 * x)), GLfloat(0));
        glVertex2f(pos1.x, pos1.y);
        glVertex2f(barX, pos2.y);
        glEnd();
    }

    return env.Null();
}

Napi::Value Shapes::poly(const Napi::CallbackInfo &info) {
    Napi::Env env = info.Env();

    Vector2 pos1(info[0].As<Napi::Object>());
    float radius = info[1].As<Napi::Number>().FloatValue();
    float rotation = info[2].As<Napi::Number>().FloatValue();
    int sides = info[3].As<Napi::Number>();
    RGBs color(info[4].As<Napi::Array>());

    float s = (sides <= 3) ? 3.0 : (float)sides, centralAngle = 0.0;

    glPushMatrix();
    glTranslatef(pos1.x, pos1.y, 0.0);
    glRotatef(rotation, 0.0, 0.0, 1.0);

    glBegin(GL_TRIANGLES);

    for (int i = 0; i < sides; i++) {
        glColor3f(color.Get(0), color.Get(1), color.Get(2));
        glVertex2f(0, 0);
        glVertex2f(sin(degToRad(centralAngle)) * radius, cos(degToRad(centralAngle)) * radius);
        centralAngle += 360.0 / s;
        glVertex2f(sin(degToRad(centralAngle)) * radius, cos(degToRad(centralAngle)) * radius);
    }
    glEnd();
    glPopMatrix();
    return env.Null();
}

Napi::Value Shapes::customShape(const Napi::CallbackInfo &info) {
    Napi::Env env = info.Env();

    Napi::Array points = info[0].As<Napi::Array>();
    RGBs color(info[1].As<Napi::Array>());
    bool filled = info[2].As<Napi::Boolean>().Value();
    float alpha = info[3].As<Napi::Number>().FloatValue();

    if (filled)
        glBegin(GL_POLYGON);
    else
        glBegin(GL_LINE_LOOP);

    glColor4f(color.Get(0), color.Get(1), color.Get(2), alpha);

    for (uint32_t i = 0; i < points.Length(); i++) {
        Vector2 temp(points.Get(i).As<Napi::Object>());
        glVertex2f(temp.x, temp.y);
    }
    glEnd();
    return env.Null();
}