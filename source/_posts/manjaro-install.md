---
title: 手把手教你安装manjaro
tags: [manjaro, linux]
categories: [manjaro]
keywords: [manjaro, linux, arch, arch linux]
date: 2020-03-31 18:02:09
description: 用久了windows，是不是想切换到linux上呢？让我们来看看如何去安装manjaro吧！
---

## 下载映像以及工具

### 下载 manjaro 映像

前往[manjaro 官网](https://manjaro.org/download/)下载
![manjaro-install](https://cdn.bmyjacks.io/img/20200331085728.png?x-oss-process=style/style)

```bash
XFCE #一种轻量的桌面系统
KDE Plasma #最常用的KDE桌面系统
GNOME #和Ubuntu用的同一个桌面系统
Architect #没有桌面的版本，只有终端，需要使用终端安装
```

我们选择`KDE Plasma`下载，自动跳转到清华开源镜像站下载，或使用以下链接直接下载

- [TUNA](https://mirrors.tuna.tsinghua.edu.cn/osdn/storage/g/m/ma/manjaro/kde/19.0.2/manjaro-kde-19.0.2-200311-linux54.iso)
- [USTC](http://mirrors.ustc.edu.cn/manjaro-cd/kde/19.0.2/manjaro-kde-19.0.2-200311-linux54.iso)

### 下载工具

前往[rufus 官网](http://rufus.ie/)下载[rufus](https://github.com/pbatard/rufus/releases/download/v3.9/rufus-3.9.exe)
![rufus website](https://cdn.bmyjacks.io/img/20200331091353.png?x-oss-process=style/style)

## 烧写映像

打开 rufus 工具
![rufus tool](https://cdn.bmyjacks.io/img/20200331155031.png?x-oss-process=style/style)
在设备中选择已经插入的 U 盘，选择下载好的映像，点击开始，等待一会就好了

## 安装系统

## 从 U 盘启动

重启电脑，在显示 logo 是进入 BIOS(可以狂按 esc 试试)
接着选择从 U 盘启动，关闭系统的`Secure boot`和`Launch CSM`

## 开始安装

{% note info %}

### 信息

由于安装过程中无法截图，所以在虚拟机中演示安装过程。
{% endnote %}

从 U 盘 Boot 之后，出现以下画面
![boot](https://cdn.bmyjacks.io/img/20200331155930.png?x-oss-process=style/style)
按照以下进行配置
![boot](https://cdn.bmyjacks.io/img/20200331160034.png?x-oss-process=style/style)
选中`boot`，点击<kbd>Enter</kbd>后，进入 live 系统
![manjaro live](https://cdn.bmyjacks.io/img/20200331160423.png?x-oss-process=style/style)
关闭欢迎屏幕，双击桌面的第一项`Install Manjaro Linux`进入安装程序
![install manjaro](https://cdn.bmyjacks.io/img/20200331160830.png?x-oss-process=style/style)
选择`简体中文(中国)`后，点击下一步
![choose language](https://cdn.bmyjacks.io/img/20200331161011.png?x-oss-process=style/style)
选择系统的时钟`Asia/Shanghai`后，点击下一步
![time zones](https://cdn.bmyjacks.io/img/20200331161145.png?x-oss-process=style/style)
键盘型号请根据自身进行选择，点击下一步
![keyboard](https://cdn.bmyjacks.io/img/20200331161323.png?x-oss-process=style/style)
到了这一步，可以选择`抹除磁盘`或`手动分区`，选择`抹除磁盘`的可以直接看后面的安装，选择`手动分区`请您继续往下看
![disk](https://cdn.bmyjacks.io/img/20200331162312.png?x-oss-process=style/style)
点击新建分区表，选择`GUID分区表(GPT)`格式，点击下一步
根据自己的需要进行分区
文件系统

```bash
etx2
etx3
etx4 #默认的文件系统
linuxswap #swap的文件系统
fat16
fat32 #boot需要使用的文件系统
ntfs
reiser
xfs #常用
jfs
未格式化
brtfs #常用
luks
exfat
nilfs2
lvm2 pv
f2fs
luks2
fat12
minix
```

挂载点

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

分区方案

```bash
/boot/efi #512MiB FAT32
/ #剩下的分区 ETX4
/swap #内存大小为2G-8G时选择内存大小，大于8G时选择4G
```

博主使用的方案,三块硬盘，SSD1 240G SSD2 500G HDD 2T.

```bash
/boot/efi # 512MiB FAT32 SSD1
/home # SSD1剩下的大小 XFS SSD1
/opt # 200G XFS SSD2
/srv # 500G XFS HDD
/usr # 250G XFS SSD2
/var # 50G XFS SSD2
/swap # 20G linuxswap HDD
```

调整好分区之后，我们就开始安装了
![install manjaro](https://cdn.bmyjacks.io/img/20200331175142.png?x-oss-process=style/style)
填写好名称以及密码，下一步
![username password](https://cdn.bmyjacks.io/img/20200331175554.png?x-oss-process=style/style)
选择安装的 office 套件

```bash
No Office Suite #不安装office套件
LibreOffice #博主比较喜欢的Linux下的office软件
FreeOffice #博主并未使用过，并不知道好坏
```

继续点击下一步，检查更改与自己想法一样之后，点击安装

## 启动安装好的系统

安装完毕后，关闭电脑，拔出 U 盘，开机，是不是进入桌面了！
![manjaro desktop](https://cdn.bmyjacks.io/img/20200331182148.png?x-oss-process=style/style)
把`Launch at start`关上，这样系统就安装好了。
