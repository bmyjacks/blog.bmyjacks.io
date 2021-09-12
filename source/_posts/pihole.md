---
title: 使用Pi-hole来过滤广告
tags: [Pi-hole, DNS, Ad Guard]
categories: [Pi-hole]
keywords: [pihole, ads, Adguard, 广告, dns]
description: 现在网上纷繁复杂的广告严重扰乱了我们上网冲浪时的快感，还让我们为之付出流量，为什么不安装Pihole来过滤家中的广告呢？
date: 2020-02-29 18:49:47
---

{% note info %}

### 信息

本文中演示的系统是**Debian9 amd64**，其他版本可根据实际情况安装。
{% endnote %}

## 首先，我们先更新系统

终端输入：

```bash
sudo apt update
sudo apt upgrade -y
```

## 接下来，我们开始安装 Pihole

你可以进入[Pihole 的 GitHub 页面](https://github.com/pi-hole/pi-hole)来安装，也可以按照下面的操作一步步来。

先获取安装脚本：

```bash
wget -O basic-install.sh https://install.pi-hole.net
```

{% note warning %}

### 注意

如果您无法访问 GitHub 网站，请在[IPaddress 的网站](http://ipaddress.com)查询 GitHub 的 IP 地址修改 hosts 后访问。
{% endnote %}

接着，我们执行脚本：

```bash
sudo bash basic-install.sh
```

在看到 Pihole 的 logo 之后进入了安装页面，直接回车到以下页面，

用方向键滚动到最底下，选择`Custom`：
![](https://cdn.bmyjacks.io/img/20200309180649.png?x-oss-process=style/style)

输入上游 DNS 地址（这里以阿里云和百度为例）：
![](https://cdn.bmyjacks.io/img/20200309180701.png?x-oss-process=style/style)

之后一连串的回车来到这个页面：
![](https://cdn.bmyjacks.io/img/20200309180712.png?x-oss-process=style/style)

```bash
On #指的是安装web控制页面
Off #指不安装web控制页面
```

这里我们选择`On`回车下一步
![](https://cdn.bmyjacks.io/img/20200309180726.png?x-oss-process=style/style)

这里选择是否安装 web 服务器端（lighttpd），如果您已经在服务器上安装了 web 服务端（比如 nginx、apache）就选择`Off`，否则选择`On`安装 lighttpd 服务端。

之后直接按几次回车开始安装。

## 最后我们来调试 Pihole

### 首先更改 web 控制页面的密码

终端输入：

```bash
pihole -a -p
```

修改完成之后访问浏览器`http://你的IP地址/admin`进入 web 控制页面
![](https://cdn.bmyjacks.io/img/20200309180738.png?x-oss-process=style/style)

点击左侧的`Login`登录
![](https://cdn.bmyjacks.io/img/20200309180757.png?x-oss-process=style/style)

输入你刚刚设定的密码，可以勾选记住。
![](https://cdn.bmyjacks.io/img/20200309180757.png?x-oss-process=style/style)

点击左侧的`Settings`进入设置页面
![](https://cdn.bmyjacks.io/img/20200309180818.png?x-oss-process=style/style)

在这里我们可以看到各种设定：

```bash
#System 监控系统的运行状态
#Blocklists 广告拦截名单
#DNS 上游DNS服务器配置
#DHCP 将Pihole作为您的DHCP服务器使用
#API/Web interface 关于API和web控制页面的设定
#Privacy 隐私设定
#Teleporter 报告错误
```

可以根据自己的需要调整设定。

### 推荐几个常用的设定：

blocklist 里可以添加我的 blocklist：[https://cdn.jsdelivr.net/gh/bmyjacks/adhosts/adhosts.txt](https://github.com/bmyjacks/adhosts)

调整 DNS 缓存大小：
终端修改文件：

```bash
sudo nano /etc/dnsmasq.d/01-pihole.conf
# 找到 cache-size=10000
# 将10000修改为你想要的数值，例如
cache-size=200000
# 保存，退出
```

之后在 web 控制页面重启 DNS 服务器即可
![](https://cdn.bmyjacks.io/img/20200309180857.png?x-oss-process=style/style)

## 将 Pihole 设置为你的 DNS 服务器

在路由器上将 DNS 服务器设置为你的 Pihole，或者关闭路由器的 DHCP 进而使用 Pihole 提供的 DHCP。

{% note success %}

## 恭喜

恭喜你，成功完成了 Pihole 的安装，开始享受几乎无广告的网上冲浪吧。
{% endnote %}
