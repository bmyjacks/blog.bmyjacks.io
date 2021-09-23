---
title: 入门OpenGL教程EP1-搭建环境
date: 2021-07-19 12:07:20
tags:
  - OpenGL
  - Visual Studio
keywords:
  - OpenGL
  - GLSL
  - Visual Studio
description: 入门OpenGL的第一部分-搭建开发环境
hide: false
comments: true
categories: OpenGL
katex: false
---

{% note info %}

## 所需要的工具

- 一台能上网的电脑
- `Visual Studio`
- 善于发现问题的心

{% endnote %}

## 下载安装`Visual Studio`

据传写`OpenGL`最方便的就是`VS`了，那么我们也跟随大流一起使用`VS`来进行学习。

进入[Visual Studio](https://visualstudio.microsoft.com/)的官方网站并且下载`Visual Studio`(2019 或 2022 均可)

在`Visual Studio Installer`界面选择`Desktop development with C++`点击安装即可完成`Visual Studio`的安装。

![](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20210720071839.png?x-oss-process=style/img)

## 下载`OpenGL`库(library)

在本系列教程中，我们使用`GLFW`与`GLEW`来进行学习，所以我们需要下载这两个库文件

### GLFW

进入[GLFW 的下载页面](https://www.glfw.org/download.html)，有几种不同的选项提供下载。

{% note warning %}

- 当我们需要**最好的性能**时我们需要下载源代码(`Source`)进行编译
- 为了节省时间，我们使用**预编译**(`pre-compiled`)文件
- `32-bit`文件可以使编译出来的程序运行在`32-bit`与`64-bit`的计算机上，而`64-bit`的文件编译后的程序仅能运行在`64-bit`的计算机上，下载时请谨慎考虑**目标**的环境，建议使用`32-bit`文件保证兼容性

{% endnote %}

### GLEW

由于`Sourceforge`上的`GLEW`版本`2.1.0`为 2017 年所发布的且不是最新版本，所以我们使用`GitHub`官方库进行下载，同样使用预编译文件。

同样进入[GLEW 的发布页面](https://github.com/nigels-com/glew/releases)，选择最新版本`2.2.0`的`glew-2.2.0-win32.zip`下载。

## 配置`Visual Studio`

创建我们的工作文件夹(比如`OpenGL`)，使用`Visual Studio`创建**空项目**。

![](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20210720074406.png?x-oss-process=style/img)

![](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20210720074550.png?x-oss-process=style/img)

在新创建的项目中添加`include`与`lib`文件夹

将`GLEW`与`GLFW`中`include`文件夹下的所有文件以及文件夹复制进入项目的`include`目录

![](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20210720075010.png?x-oss-process=style/img)

接着将`lib`文件进行复制，`glfw`请复制对应版本的`lib`目录，确保 lib 下拥有这两个文件。

![](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20210720075236.png?x-oss-process=style/img)

在项目中添加`cpp`文件，按{% button #, Ctrl %} + {% button #, Shift %} + {% button #, A %}进入对话框

![](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20210720075553.png?x-oss-process=style/img)

选择`Visual C++`创建`.cpp`文件，命名为`main.cpp`

创建之后右键项目名称后的最后一栏进入属性

![](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20210720075833.png?x-oss-process=style/img)

调整配置到'所有配置'以及’所有平台’，进入`C++`选项

![](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20210720075906.png?x-oss-process=style/img)

添加刚刚的`include`目录到’额外的 include 目录下’

![](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20210720080201.png?x-oss-process=style/img)

接着修改连接器

![](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20210720080241.png?x-oss-process=style/img)

![](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20210720080533.png?x-oss-process=style/img)

并且在’输入’中修改依赖

![](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20210720080406.png?x-oss-process=style/img)

![](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20210720080502.png?x-oss-process=style/img)

```
opengl32.lib
glfw3.lib
glew32s.lib
```

全部修改完成之后回到代码编辑页面复制下面的代码

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

保存，点击{% button #, F5 %}运行后，就能看到如下窗口

![](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20210720081503.png?x-oss-process=style/img)

代表我们成功配置好了开发环境
