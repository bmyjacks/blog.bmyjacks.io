---
title: 使用arduino配置esp8266开发环境
tags:
  - esp8266
  - arduino
  - helloworld
categories:
  - esp8266
description: 购买了esp8266开发板之后如何配置arduino下的开发环境？一起来学习一下吧
keywords:
  - esp8266
  - arduino
hide: false
date: 2020-08-13 09:29:29
---

## 下载安装 arduino IDE

首先进入[arduino 的官网](https://www.arduino.cc/)，进入[下载 IDE 页面](https://www.arduino.cc/en/Main/Software)

向下滑动至

![下载arduino](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20200813090226.png?x-oss-process=style/img)

单击图片中的`Windows Installer`进行安装程序下载

{% note info %}

### 提示

请您根据您的**实际需要**来下载对应的**IDE 版本**，如：UWP 版本请下载 Windows app；树莓派请下载 Linux ARM 32 bits。
{% endnote %}

下载完成后运行安装程序，同意用户账户控制后如同一般的程序安装即可

## 配置 esp8266 环境

### 方式一

单击`文件>首选项`或点按`Ctrl + ,(逗号)`

![](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20200813091825.png?x-oss-process=style/img)

在“附加开发板管理器网址”一栏中填写`http://arduino.esp8266.com/stable/package_esp8266com_index.json`

使用“好”保存后，找到`工具>开发板>开发板管理器`，搜索“esp8266”

![](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20200813092116.png?x-oss-process=style/img)

安装对应开发板即可完成配置 esp8266 开发环境

{% note warning %}

#### 注意

由于此处使用了 GitHub 的 releases 下载，下载速度较慢，请耐心等待，或使用第二种方法。
{% endnote %}

### 方式二

进入 arduino 安装位置`Arduino>hardware`，新建文件夹`esp8266com`，进入文件夹后打开 cmd

```bash
git clone https://github.com/esp8266/Arduino.git esp8266
cd esp8266
git submodule update --init
cd tools
python3 get.py #最后一步python执行时并无任何提示
```

这一些步骤执行完毕之后，重启 arduino IDE，即可在开发板中选择 esp8266
