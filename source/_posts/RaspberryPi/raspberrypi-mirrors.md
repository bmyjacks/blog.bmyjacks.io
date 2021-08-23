---
title: 为树莓派更换为国内的软件源
tags:
  - RaspberryPi
  - mirrors
categories: RaspberryPi
description: 为树莓派安装好系统之后，默认使用的是国外的软件源，下载速度极慢，如何更换为国内的软件源呢？
hide: false
date: 2020-08-20 09:14:05
keywords:
---


{% note info %}
## 提示
本文中的链接使用的是[清华大学(TUNA)](https://mirrors.tuna.tsinghua.edu.cn/)软件源，包含`arm64`与`armhf`架构，包含`wheezy`与`jessie`与`stretch`与`buster`版本。演示中使用的是`buster armhf`版本，请大家**根据自己的需要**来修改。
{% endnote %}

## 更换软件源
打开终端，使用以下命令:

```shell
sudo nano /etc/apt/sources.list
```

打开后将里面的所有行全部删除，替换为以下行:

```text
deb http://mirrors.tuna.tsinghua.edu.cn/raspberry-pi-os/raspbian/ buster main non-free contrib rpi
deb-src http://mirrors.tuna.tsinghua.edu.cn/raspberry-pi-os/raspbian/ buster main non-free contrib rpi
```

按`Ctrl`+`O`保存后，按`Ctrl`+`X`退出

接着更换:
```shell
sudo nano /etc/apt/sources.list.d/raspi.list
```

将所有内容替换为:
```text
deb http://mirrors.tuna.tsinghua.edu.cn/raspberrypi/ buster main ui
```

按`Ctrl`+`O`保存后，按`Ctrl`+`X`退出

## 更新软件源
在终端中输入
```shell
sudo apt update
sudo apt-get update
sudo apt upgrade
sudo apt dist-upgrade
```

更换完成了！速度是不是变快了许多呢！
