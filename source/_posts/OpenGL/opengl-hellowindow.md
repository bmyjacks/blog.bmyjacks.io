---
title: 入门OpenGL教程EP2-Hello Window
tags:
  - OpenGL
  - Visual Studio
categories: OpenGL
keywords:
  - OpenGL
  - GLSL
  - Visual Studio
description: 入门OpenGL的第二部分-创建一个窗口
hide: false
comments: true
katex: false
date: 2021-08-02 11:45:34
updated: 2021-08-02 11:45:34
---

## 回顾

[上一部分](https://www.bmyjacks.cn/2021/opengl-env/)中我们已经成功使用 OpenGL 创建一个窗口，那么现在我们来详细看看其中的原理与方法。

## 详解

```cpp
#include <iostream>

#define GLEW_STATIC
#include <GL/glew.h>

#include <GLFW/glfw3.h>

const GLint WINDOW_WEIGHT = 800;
const GLint WINDOW_HEIGHT = 600;

int main() {
	glfwInit();
	glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
	glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
	glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
	glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);
	glfwWindowHint(GLFW_RESIZABLE, GL_FALSE);

	GLFWwindow* window = glfwCreateWindow(WINDOW_WEIGHT, WINDOW_HEIGHT, "OpenGL", nullptr, nullptr);
	if (window == nullptr) {
		glfwTerminate();
		std::cout << "Failed to crate OpenGL window." << std::endl;
		return -1;
	}
	glfwMakeContextCurrent(window);

	glewExperimental = true;
	if (glewInit() != GLEW_OK) {
		glfwTerminate();
		std::cout << "Failed to init GLEW." << std::endl;
		return -1;
	}

	GLint screenWidth, screenHeight;
	glfwGetFramebufferSize(window, &screenWidth, &screenHeight);


	glViewport(0, 0, screenWidth, screenHeight);

	while (!glfwWindowShouldClose(window)) {
		glfwSwapBuffers(window);
		glfwPollEvents();
	}

	glfwTerminate();

	return 0;
}
```

### 头文件

```cpp
#include <iostream>

#define GLEW_STATIC
#include <GL/glew.h>

#include <GLFW/glfw3.h>
```

其中的`iostream`为 C++的 IO 头文件，而`GLFW/glfw3.h`为`glew提供的头文件`。

`GLEW_STATIC`表明我们需要使用静态的`glew`库，所以必须要在引入`glew.h`前定义。

### 常数

```cpp
const GLint WINDOW_WEIGHT = 800;
const GLint WINDOW_HEIGHT = 600;
```

此处定义的是窗口的**宽(weight)**和**高(height)**，也就是我们在屏幕上所看到的**横向**长度与**纵向**长度。

使用[`GLint`](https://www.khronos.org/opengl/wiki/OpenGL_Type)的原因主要由于在不同的平台（编译器）上对于`int`所定义的容量可能会有不同，但`GLint`在**所有平台以及所有编译器中容量都相同**。

### 初始化

```cpp
glfwInit();
glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);
glfwWindowHint(GLFW_RESIZABLE, GL_FALSE);
```

#### 初始化函数

[`int glfwInit(void)`](https://www.glfw.org/docs/latest/intro_guide.html#intro_init_init)为`GLFW`的初始化函数，无需传入参数，常见用法如下：

```cpp
if (!glfwInit()) {
    // 初始化失败时的操作
}
```

当`GLFW`初始化失败时会返回`GLFW_FALSE`。我们在 OpenGL 创建窗口之前需要对`GLFW`进行初始化。

#### 窗口提示

[`void glfwWindowHint(int hint, int value)`](https://www.glfw.org/docs/latest/group__window.html#ga7d9c8c62384b1e2821c4dc48952d2033)提供了创建窗口时的提示。需要传入的参数为`int hint`与`int value`。**必须在创建窗口之前使用提示**。

所有提示可以在[GLFW: Window guide](https://www.glfw.org/docs/latest/window_guide.html#window_hints)找到，下面列举几个常见的。

| 提示（hint）                 | 代表内容                         | 默认值                    | 解释                                                               |
| ---------------------------- | -------------------------------- | ------------------------- | ------------------------------------------------------------------ |
| `GLFW_RESIZABLE`             | 窗口可否由用户改变大小           | ` GLFW_TRUE`              | 窗口是否可以由用户拖动边缘更改大小                                 |
| `GLFW_CONTEXT_VERSION_MAJOR` | 创建窗口的 OpenGL**主版本号**    | `1`                       | 建议使用 GPU 能够支持的最新版本或`3`                               |
| `GLFW_CONTEXT_VERSION_MINOR` | 创建窗口的 OpenGL**次版本号**    | `0`                       | 建议使用 GPU 能够支持的最新版本或`3`                               |
| `GLFW_OPENGL_FORWARD_COMPAT` | OpenGL 是否向前兼容              | `GLFW_FALSE`              | 设置为`GLFW_FALSE`时，在之前版本拥有而当前版本删除了的函数不能使用 |
| `GLFW_OPENGL_PROFILE`        | 创建窗口时选择的 OpenGL 配置文件 | `GLFW_OPENGL_ANY_PROFILE` | 建议使用`GLFW_OPENGL_CORE_PROFILE`                                 |

#### 创建窗口

```cpp
GLFWwindow* window = glfwCreateWindow(WINDOW_WEIGHT, WINDOW_HEIGHT, "OpenGL", nullptr, nullptr);
if (window == nullptr) {
	glfwTerminate();
	std::cout << "Failed to crate OpenGL window." << std::endl;
	return -1;
}
glfwMakeContextCurrent(window);
```

[`GLFWwindow* glfwCreateWindow(int width, int height, const char *title, GLFWminotor *monitor, GLFWwindow *share)`](https://www.glfw.org/docs/latest/group__window.html#ga5c336fddf2cbb5b92f65f10fb6043344)创建了类型为`GLFWwindow*`的指针，该指针指向创建的窗口内存位置。

当窗口创建失败时（内存不足等），返回的地址为`nullptr`，所以我们应当防止此类情况发生。创建失败时使用[`void glfwTerminate()`](https://www.glfw.org/docs/latest/group__init.html#gaaae48c0a18607ea4a4ba951d939f0901)来销毁所有创建的窗口等 OpenGL 文件。当使用了此函数后如需再次使用 GLFW 时需要再次进行`glfwInit()`。

[`void glfwMakeContextCurrent(GLFWwindow *window)`](https://www.glfw.org/docs/latest/group__context.html#ga1c04dc242268f827290fe40aa1c91157)为创建的`window`创建当前线程。

#### 初始化 GLEW

```cpp
glewExperimental = true;
if (glewInit() != GLEW_OK) {
	glfwTerminate();
	std::cout << "Failed to init GLEW." << std::endl;
	return -1;
}
```

为了使用`GLFW_OPENGL_CORE_PROFILE`，需要将`glewExperimental`设置为`true`，否则将导致程序崩溃。

和初始化`GLFW`一样，但`glewInit()`的返回值为`GLEW_OK`。

#### 获取窗口坐标

```cpp
GLint screenWidth, screenHeight;
glfwGetFramebufferSize(window, &screenWidth, &screenHeight);

glViewport(0, 0, screenWidth, screenHeight);
```

[`void glfwGetFramebufferSize(GLFWwindow *window, int *width, int *height)`](https://www.glfw.org/docs/latest/group__window.html#ga0e2637a4161afb283f5300c7f94785c9)用来获取窗口的宽和高，为了防止窗口坐标出错，我们实际获取一次宽与高来代替创建窗口时的宽与高。

接着就可以设置窗口的坐标[`void glViewport(GLint x, GLint y, GLsizei width, GLsizei height)`](https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/glViewport.xhtml)。其中`x, y`代表窗口左下角的像素坐标，`width, height`可以近似认为窗口右上角的像素坐标。

#### 侦测用户输入

```cpp
while (!glfwWindowShouldClose(window)) {
	glfwSwapBuffers(window);
	glfwPollEvents();
}
```

当用户按下退出按钮或结束程序时，[`int glfwWindowShouldClose(GLFWwindow *window)`](https://www.glfw.org/docs/latest/group__window.html#ga24e02fbfefbb81fc45320989f8140ab5)函数返回退出标识（`1`），我们在此时终止循环，并于最后销毁 OpenGL 窗口及其附属文件。
