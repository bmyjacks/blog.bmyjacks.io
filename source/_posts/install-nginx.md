---
title: 如何安装nginx
tags: [nginx]
categories: [nginx]
keywords: [nginx, web, webserver, www, website, 网站, 网站服务器, 服务器]
description: nginx作为著名的网页服务端,怎么能不安装它体验一下高并发的快感呢?
date: 2020-02-16 16:52:17
---

{% note info %}

## 信息

本文中演示的系统是**CentOS7 amd64**,并且要确保系统中没有安装 nginx 或其他网站服务端。
{% endnote %}

## 安装方法一:使用包管理器安装

这个方法我们就不介绍了,仅给出一条安装命令:

```
yum install nginx
```

## 安装方法二:使用源代码编译安装

这种方法是我们今天重点讲解的方法,使用这种安装方法的好处有很多,这里就不一一列举了。坏处嘛,比较麻烦。

### 首先,我们需要做安装前的准备

先安装一些编译工具

打开终端,输入:

```bash
yum install gcc gcc-c++ autoconf automake make zlib zlib-devel openssl openssl-devel pcre pcre-devel
```

在控制台输出`Complete!`后,进入下一步。

添加 WWW 用户

输入:

```bash
groupadd -f www
useradd -g www www
```

### 开始进入正式环节

获取安装源代码

首先进入[nginx 官网](http://nginx.org/en/download.html)查看最新版本

![](https://cdn.bmyjacks.io/img/20200309175844.png?x-oss-process=style/img)

这里选择最新的`1.17.8`版本

```bash
#官方地址:
wget http://nginx.org/download/nginx-1.17.8.tar.gz
```

获取安装包之后解压它:

```bash
tar -zxvf nginx-1.17.8.tar.gz
```

配置 nginx

进入文件夹

```bash
cd nginx-1.17.8
```

配置 nginx

```bash
#--prefix=你想要安装nginx的目录,例如:
#--prefix=/usr/local/nginx

./configure --user=www --group=www --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module --with-stream --with-http_gzip_static_module --with-http_sub_module
```

![](https://cdn.bmyjacks.io/img/20200309175912.png?x-oss-process=style/img)

看到配置结果说明配置成功了

安装 nginx

首先编译 nginx

```bash
make
```

然后安装

```bash
make install

```

启动服务,访问对应的 IP 地址

```bash
/usr/local/nginx/sbin/ngin
```

![](https://cdn.bmyjacks.io/img/20200309175943.png?x-oss-process=style/img)

## 其他使用事项

| 意图            | 命令                                  |
| --------------- | ------------------------------------- |
| 启动 nginx 服务 | /usr/local/nginx/sbin/nginx           |
| 停止 nginx 服务 | /usr/local/nginx/sbin/nginx -s stop   |
| 重启 nginx 服务 | /usr/local/nginx/sbin/nginx -s reload |

将网页存放在`/usr/local/nginx/html/`目录下即可。

{% note success %}

## 恭喜

恭喜你,成功完成了 nginx 的编译安装。
{% endnote %}
