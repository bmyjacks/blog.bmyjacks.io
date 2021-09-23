---
title: 手把手教你安装manjaro
tags: [manjaro, linux]
categories: [manjaro]
keywords: [manjaro, linux, arch, arch linux]
date: 2020-03-31 18:02:09
description: 用久了windows，是不是想切换到linux上呢？让我们来看看如何去安装manjaro吧！
---

{% note info %}
本文章最后更新日期为：2021-09-22
{% endnote %}

## 下载映像以及工具

### 下载 manjaro 映像

前往[manjaro.org](https://manjaro.org/download/)下载

```bash
XFCE # 一种轻量的桌面系统
KDE Plasma # 最常用的KDE桌面系统
GNOME # 和Ubuntu用的同一个桌面系统
```

我们选择`KDE Plasma`下载，跳转到下载页面后建议选择"Minial"版本减少下载量。

## Ventoy

Ventoy 是一个制作可启动 U 盘的工具，在不需要格式化的情况下安装多种系统。

前往[www.ventoy.net](https://www.ventoy.net/cn/index.html)进行下载，后选择一个移动存储设备进行安装。

![Ventoy 安装界面](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/manjaro/1.png)

建议选择 MBR 格式以及关闭安全启动。

安装好之后将下载的镜像放入`Ventoy`分区下即可。

## 安装系统

## 从 U 盘启动

重启电脑，在显示 logo 时进入 BIOS(可以查看主板对应的说明书)
接着选择从 U 盘启动，关闭系统的`Secure boot`。

进入 Ventoy 界面后，选择 manjaro 的镜像。

## 开始安装

{% note info %}

### 信息

由于安装过程中无法截图，所以在虚拟机中演示安装过程。
{% endnote %}

从启动后，出现以下画面
![boot](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/manjaro/20200331155930.png?x-oss-process=style/img)
按照以下进行配置

- `tz`为时区，根据自己的需要进行选择
- `Keytable`为键盘配置，大部分情况下可选择`us`
- `lang`选择进入 live 系统后的语言，安装时可修改语言
- `driver`为驱动选择，如果使用 NVIDIA 显卡，建议将此项选择为`Proprietary`（最新版本把两个选项独立出来了）

![boot配置](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/manjaro/20200331160034.png?x-oss-process=style/img)

选中`boot`，点击<kbd>Enter</kbd>后，进入 live 系统
![manjaro live](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/manjaro/20200331160423.png?x-oss-process=style/img)

关闭欢迎屏幕，双击桌面的第一项`Install Manjaro Linux`进入安装程序
![install manjaro](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/manjaro/20200331160830.png?x-oss-process=style/img)

选择`简体中文(中国)`后，点击下一步
![choose language](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/manjaro/20200331161011.png?x-oss-process=style/img)

选择系统的时钟`Asia/Shanghai`后，点击下一步
![time zones](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/manjaro/20200331161145.png?x-oss-process=style/img)

键盘型号请根据自身进行选择，点击下一步
![keyboard](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/manjaro/20200331161323.png?x-oss-process=style/img)

到了这一步，可以选择`抹除磁盘`或`手动分区`，选择`抹除磁盘`的可以直接看后面的安装，选择`手动分区`请您继续往下看
![disk](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/manjaro/20200331162312.png?x-oss-process=style/img)

点击新建分区表，选择`GUID分区表(GPT)`格式，点击下一步
根据自己的需要进行分区

### 文件系统

建议主文件夹使用`ext4`、`btrfs`、`xfs`、`f2fs`等文件系统。

swap 分区的大小方案

| 内存大小 | 无休眠功能 | 有休眠功能 | 最大值 |
| -------- | ---------- | ---------- | ------ |
| 256MB    | 256MB      | 512MB      | 512MB  |
| 512MB    | 512MB      | 1024MB     | 1024MB |
| 1024MB   | 1024MB     | 2048MB     | 2048MB |
| 2GB      | 1GB        | 3GB        | 2GB    |
| 4GB      | 2GB        | 5GB        | 8GB    |
| 8GB      | 3GB        | 11GB       | 16GB   |
| 16GB     | 4GB        | 20GB       | 32GB   |
| 32GB     | 6GB        | 38GB       | 64GB   |
| 64GB     | 8GB        | 72GB       | 128GB  |
| 128GB    | 11GB       | 139GB      | 256GB  |

{% note info %}

### 信息

64G RAM 及以上不推荐开启休眠。
{% endnote %}

### 挂载点

```bash
(no mount point) #不进行挂载
/ #主目录
/boot #boot目录
/boot/efi #进行EFI启动的目录
/home #存放用户文件的目录
/opt #存放额外的安装程序的目录
/srv #存储本机或服务器向外界提供服务或数据的目录
/usr #存放系统的应用程序
/var #存放运行时需要改动的文件，比如log
```

分区方案

根据自己的需求进行分区。

{% note info 博主目前的方案：三星T7 500G %}

- `/boot/efi` 256MiB fat32
- `/swap` 8G linuxswap
- `/` 剩余所有空间 f2fs

{% endnote %}

调整好分区之后，我们就开始安装了
![install manjaro](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/manjaro/20200331175142.png?x-oss-process=style/img)

填写好名称以及密码，下一步
![username password](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/manjaro/20200331175554.png?x-oss-process=style/img)

选择安装的 office 套件（当然可以在安装好系统后选择 WPS）

```bash
No Office Suite # 不安装office套件
LibreOffice # 比较推荐的Linux下的office套件
FreeOffice # 博主并未使用过，并不知道好坏
```

继续点击下一步，确认更改与自己选择一样之后，点击安装

## 启动安装好的系统

安装完毕后，重启电脑，进入 manjaro 的桌面。
![manjaro desktop](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/manjaro/20200331182148.png?x-oss-process=style/img)

把`Launch at start`关上，这样系统就安装好了。
