---
title: 如何编译安装最新版Openssl
tags: [openssl, ssl]
categories: [openssl]
keywords: [openssl, ssl, web, nginx, apcache, lighttpd, canddy, https, 安全链接]
description: 很多小伙伴在安装Openssl时遇到了困难，快来看看怎么完全安装最新版Openssl吧！
date: 2020-02-15 16:23:39
updated: 2020-02-15 16:23:39
---

{% note info %}

## 信息

本文中演示的系统是**CentOS7 amd64**，并且要确保系统中没有安装 Openssl.
{% endnote %}

## 首先，我们先登录服务器后台命令行页面

输入命令获取最新版本（1.1.1d）的安装包

```
# wget https://www.openssl.org/source/openssl-1.1.1d.tar.gz
-省略过程
xxxx-xx-xx xx:xx:xx (xxx MB/s) - ‘openssl-1.1.1d.tar.gz’ saved [8845861/8845861]
```

### 获取完安装包之后解压，进入目录

```
# tar -xzf openssl-1.1.1d.tar.gz
# cd openssl-1.1.1d
```

### 接下来配置并编译 Openssl

{% note warning %}

#### 注意

请将第一行目录中的`/usr/local/openssl`替换成你想安装 Openssl 的目录的位置，在这里我们保留默认。
{% endnote %}

```
# ./config --prefix=/usr/local/openssl
# ./config -t
# make
```

{% note info %}

### 信息

如出现`/bin/sh: gcc: command not found`那么安装`gcc`即可`yum install gcc`
{% endnote %}

### 然后安装

```
# make install
```

## 下面，我们来配置 Openssl 环境变量

如果你现在在终端输入`openssl version`

输出类似于以下这样：

```
# openssl version
-bash: /usr/bin/openssl: No such file or directory
```

所以接下来我们来配置它

### 进入`/usr/local`并创建链接

```
# cd /usr/local
# ln -s openssl ssl
```

### 编辑`/etc/ld.so.conf`文件

```
# nano /etc/ld.so.conf
在末尾添加/usr/local/openssl/lib
看起来像下面这样

include ld.so.conf.d/*.conf
/usr/local/openssl/lib
```

{% note info %}

#### 信息

如出现`-bash: nano: command not found`那么安装`nano`即可`yum install nano`
{% endnote %}

接着，按`ctrl+o`保存，按`ctrl+x`离开 nano

输入`ldconfig`共享动态链接库

### 配置环境变量

编辑`.bashrc`文件：

```
# cd
# nano .bashrc
```

在末尾添加

```
export OPENSSL=/usr/local/openssl/bin
export PATH=$OPENSSL:$PATH:$HOME/bin
```

保存退出，使用`source .bashrc`来使修改生效。

## 最后

输入`which openssl`查看 openssl 路径，输入`openssl version`查看版本。

```
# which openssl
/usr/local/openssl/bin/openssl
# openssl version
OpenSSL 1.1.1d  10 Sep 2019
```

{% note success %}

## 恭喜

恭喜你，成功完成了 Openssl 的编译安装。
{% endnote %}
