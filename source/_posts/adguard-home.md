---
title: 使用AdGuard Home来过滤广告
tags: [Ad Guard, Pi-hole]
categories: [Ad Guard]
keywords: [AdGuard home, Pihole, ads, dns]
description: 之前我们讲解了使用Pi-hole进行DNS层面的广告过滤，今天我们来看看AdGuard Home的表现是不是和Pihole一样呢?一起来看看吧。
date: 2020-03-09 20:46:28
updated: 2020-03-09 20:46:28
---

## 这两者之间各有各的好处，请根据自己的需要来选择

[之前介绍 Pihole 的文章链接](https://www.bmyjacks.cn/pihole/)

{% note info %}

### 信息

由于`AdGuard Home`目前只支持`Debian`操作系统，所以使用**Debian9 amd64**来演示。
{% endnote %}

## 首先，我们下载安装包到服务器上

### 打开官方 GitHub 页面

[https://github.com/AdguardTeam/AdGuardHome](https://github.com/AdguardTeam/AdGuardHome)

点击`releases`

![GitHub-Releases-Page](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20200309194654.png?x-oss-process=style/img)

下载最新版本

![Downloading](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20200309194854.png?x-oss-process=style/img)

先下载到本地在上传到云端比较节省时间（海外人士除外）

### 下载完毕后解压进入文件夹

```bash
tar -xzvf AdGuardHome_linux_amd64.tar.gz
cd AdGuardHome/
```

![Folder](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20200309201502.png?x-oss-process=style/img)

安装依赖`apt-get install sudo nano bind9-host`

输入`sudo ./AdGuardHome -s install`安装 AdGuard Home

## 打开 web 页面

访问`http://ip:3000`，点击下一步直到这个页面

![confirgure](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20200309202015.png?x-oss-process=style/img)

填写好你的密码之后点击下一步即可完成安装

别忘了添加 BFW 的 adhosts 哦`https://cdn.jsdelivr.net/gh/bmyjacks/adhosts/adhosts.txt`

## 将`AdGuard Home`设置为你的 DNS 服务器

在路由器上将 DNS 服务器设置为你的`AdGuard Home`的 IP 地址，或者关闭路由器的 DHCP 进而使用`AdGuard Home`提供的 DHCP。

{% note success %}

## 恭喜

恭喜你，成功完成了 AdGuard Home 的安装！
{% endnote %}

## 常用命令

| 意图                       | 命令                     |
| -------------------------- | ------------------------ |
| 启动 AdGuard Home 服务     | AdGuardHome -s start     |
| 停止 AdGuard Home 服务     | AdGuardHome -s stop      |
| 重启 AdGuard Home 服务     | AdGuardHome -s restart   |
| 查看 AdGuard Home 服务状态 | AdGuardHome -s status    |
| 卸载 AdGuard Home 服务     | AdGuardHome -s uninstall |
