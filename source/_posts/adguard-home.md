---
title: 使用AdGuard Home来过滤广告
tags: [Ad Guard, Pi-hole]
categories: [Ad Guard]
keywords: [AdGuard home, Pihole, ads, dns]
description: 之前我们讲解了使用Pi-hole进行DNS层面的广告过滤，今天我们来看看AdGuard Home的表现是不是和Pihole一样呢?一起来看看吧。
date: 2020-03-09 20:46:28
---
## 这两者之间各有各的好处，请根据自己的需要来选择
[之前介绍Pihole的文章链接](https://www.bmyjacks.cn/2020/pihole.html)

{% note info %}
### 信息
由于`AdGuard Home`目前只支持`Debian`操作系统，所以使用**Debian9 amd64**来演示。
{% endnote %}

## 首先，我们下载安装包到服务器上
### 打开官方GitHub页面
[https://github.com/AdguardTeam/AdGuardHome](https://github.com/AdguardTeam/AdGuardHome)

点击`releases`

![GitHub-Releases-Page](https://cdn.bmyjacks.io/img/20200309194654.png?x-oss-process=style/style)

下载最新版本

![Downloading](https://cdn.bmyjacks.io/img/20200309194854.png?x-oss-process=style/style)

先下载到本地在上传到云端比较节省时间（海外人士除外）

### 下载完毕后解压进入文件夹
```bash
tar -xzvf AdGuardHome_linux_amd64.tar.gz
cd AdGuardHome/
```
![Folder](https://cdn.bmyjacks.io/img/20200309201502.png?x-oss-process=style/style)

安装依赖`apt-get install sudo nano bind9-host`

输入`sudo ./AdGuardHome -s install`安装AdGuard Home

## 打开web页面
访问`http://ip:3000`，点击下一步直到这个页面

![confirgure](https://cdn.bmyjacks.io/img/20200309202015.png?x-oss-process=style/style)

填写好你的密码之后点击下一步即可完成安装

别忘了添加BFW的adhosts哦`https://cdn.jsdelivr.net/gh/bmyjacks/adhosts/adhosts.txt`

## 将`AdGuard Home`设置为你的DNS服务器
在路由器上将DNS服务器设置为你的`AdGuard Home`的IP地址，或者关闭路由器的DHCP进而使用`AdGuard Home`提供的DHCP。

{% note success %}
## 恭喜
恭喜你，成功完成了AdGuard Home的安装！
{% endnote %}

## 常用命令
| 意图 | 命令 |
| ------------------------ | -------------------------|
| 启动AdGuard Home服务     | AdGuardHome -s start     |
| 停止AdGuard Home服务     | AdGuardHome -s stop      |
| 重启AdGuard Home服务     | AdGuardHome -s restart   |
| 查看AdGuard Home服务状态 | AdGuardHome -s status    |
| 卸载AdGuard Home服务     | AdGuardHome -s uninstall |
