---
title: 英伟达Jetson nano创造我们自定义的系统
tags:
  - nvidia
  - jetson nano
  - linux
description: 一步步带您自定义jetson nano的系统
hide: false
comments: true
categories: jetson nano
katex: false
date: 2021-06-07 14:58:31
---


## 下载辅助脚本

```bash
git clone https://github.com/pythops/jetson-nano-image
```

## 构建rootfs

首先先指定rootfs的目录

```bash
export JETSON_ROOTFS_DIR=/path/to/rootfs
```

接着进行构建

```bash
$ cd jetson-nano-image
$ sudo -E ./create-rootfs.sh

Installing the dependencies...  [OK]
Creating rootfs directory...    [OK]
Run debootstrap first stage...  [OK]
Run debootstrap second stage... [OK]
Success!
```

## 进行自定义

我们需要先安装`ansible`来进行自定义

```bash
python3 -m pip install --user ansible -i https://mirrors.aliyun.com/pypi/simple/
```

进入`ansible`目录

```bash
cd ansible
```

修改对应的文件

`./roles/jetson/defaults/main.yaml`

```yaml
---
ubuntu_release: focal
  
new_user:
  name: <您想使用的用户名>
  shell: /bin/bash
  password: <您的密码> # 密码必须使用字母，不然可能会在构建中失败
```

`./roles/jetson/templates/etc/apt/sources.list`

```shell
deb http://mirrors.ustc.edu.cn/ubuntu-ports {{ ubuntu_release }} main restricted
deb http://mirrors.ustc.edu.cn/ubuntu-ports {{ ubuntu_release }}-updates main restricted
deb http://mirrors.ustc.edu.cn/ubuntu-ports {{ ubuntu_release }} universe
deb http://mirrors.ustc.edu.cn/ubuntu-ports {{ ubuntu_release }}-updates universe
deb http://mirrors.ustc.edu.cn/ubuntu-ports {{ ubuntu_release }} multiverse
deb http://mirrors.ustc.edu.cn/ubuntu-ports {{ ubuntu_release }}-updates multiverse
deb http://mirrors.ustc.edu.cn/ubuntu-ports {{ ubuntu_release }}-backports main restricted universe multiverse
deb http://mirrors.ustc.edu.cn/ubuntu-ports {{ ubuntu_release }}-security main restricted
deb http://mirrors.ustc.edu.cn/ubuntu-ports {{ ubuntu_release }}-security universe
deb http://mirrors.ustc.edu.cn/ubuntu-ports {{ ubuntu_release }}-security multiverse

# Needed for libffi6
deb http://mirrors.ustc.edu.cn/ubuntu-ports bionic main
```

接着开始构建自定义后的rootfs

```bash
sudo -E $(which ansible-playbook) jetson.yaml
```

返回上级目录

```bash
cd ..
```

## 构建镜像

自定义开发板类型

* 4GB内存版 `export JETSON_NANO_BOARD=jetson-nano`
* 2GB内存版 `export JETSON_NANO_BOARD=jetson-nano-2gb`

存储目录

```bash
export JETSON_BUILD_DIR=/path/to/build_dir
```

开始构建

```bash
sudo -E ./create-image.sh
```

出现`successfully`后，在`$JETSON_BUILD_DIR/tools`目录下可以找到镜像文件

## 安装nvidia运行库

```bash
sudo apt update
sudo apt upgrade
sudo apt install cuda-toolkit-10-2 libcudnn8 libcudnn8-dev
```
