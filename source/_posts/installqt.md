---
title: Qt教程（一）——安装Qt
tags: [qt, gui]
categories: [qt]
keywords: [qt, GUI, QT, qt框架, 图形页面]
description: 使用Qt来编写桌面窗口应用的图形界面？本教程教您如何安装Qt
date: 2020-02-19 22:07:08
---

{% note info %}

## 信息

本文中演示的系统是**Windows10Pro 64bit**
{% endnote %}

## 首先，我们进入[下载 Qt 的页面](http://download.qt.io/)

![](https://cdn.bmyjacks.io/img/20200309180333.png?x-oss-process=style/style)

文件结构类似于：

```bash
- snapshots/ #最新的快照版本
- online/ #在线安装器
- official_releases/ #官方发布版本
- new_archive/ #新的存档版本
- ministro/ #迷你版，目前针对Android
- linguist_releases/
- learning/ #学习资料
- development_releases/ #开发版本
- community_releases/ #社区版本，如Tizen
- archive/ #存档版本
- timestamp.txt #时间戳
```

我们现在要使用离线安装的方法安装 Qt，因为在线安装实在是太慢了。

点击进入[official_releases/qt/5.14/5.14.1/](http://download.qt.io/official_releases/qt/5.14/5.14.1/)

![](https://cdn.bmyjacks.io/img/20200309180345.png?x-oss-process=style/style)

有三个安装文件：

```bash
- qt-opensource-windows-x86-5.14.1.exe #Windows安装文件
- qt-opensource-mac-x64-5.14.1.dmg #MacOS安装文件
- qt-opensource-linux-x64-5.14.1.run #Linux安装文件
```

由于我们使用 Windows，所以选择第一个安装文件，点击安装文件后面的`Details`查看详情

![](https://cdn.bmyjacks.io/img/20200309180345.png?x-oss-process=style/style)

选择下载源（推荐 USTC 或者 TUNA）之后开始下载。

下载完成之后得到安装文件

![](https://cdn.bmyjacks.io/img/20200309180410.png?x-oss-process=style/style)

## 现在我们来开始安装

双击打开安装程序，点击`Next`之后需要登录

![](https://cdn.bmyjacks.io/img/20200309180420.png?x-oss-process=style/style)

{% note warning %}

### 注意

注册账户可去[**官网**](www.qt.io)注册，滑动到最低端的右下角

![](https://cdn.bmyjacks.io/img/20200309180434.png?x-oss-process=style/style)

{% endnote %}

登陆完毕之后，同意开源许可证，选择安装位置，就来到了**选择安装组件**的地方

![](https://cdn.bmyjacks.io/img/20200309180445.png?x-oss-process=style/style)

这里我们展开列表，勾选上如图示的组件

![](https://cdn.bmyjacks.io/img/20200309180501.png?x-oss-process=style/style)

{% note warning %}

### 注意

如果您的电脑系统为**x86**版本，请您将`MinGW 7.3.0 64-bit`替换为`MinGW 7.3.0 32-bit`
{% endnote %}

点击下一步开始安装……

## 最后

安装好之后，开始菜单中出现 Qt 的程序

![](https://cdn.bmyjacks.io/img/20200309180521.png?x-oss-process=style/style)

点击`Qt Creator 4.11.0(Community)`打开 QtC 页面

![](https://cdn.bmyjacks.io/img/20200309180521.png?x-oss-process=style/style)

{% note success %}

## 恭喜

恭喜您，完成了 Qt 的安装
{% endnote %}
