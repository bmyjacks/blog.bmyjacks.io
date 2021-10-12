---
title: 初遇 deepnote —— 使用简介
tags:
  - deepnote
  - jupyter
categories:
  - deepnote
keywords:
  - deepnote
  - jupyter
  - lab
  - 人工智能
  - python
description: 本地 python 机器学习环境配置复杂？快来试试在线的 deepnote 吧！
hide: false
comments: true
katex: false
sticky: 0
sitemap: true
date: 2021-10-12 15:03:52
---

{% note info %}
本文章最后更新日期为：2021-10-12
{% endnote %}

## deepnote 是什么

我们废话不多说，马上来介绍 [deepnote](https://deepnote.com/referral?token=cca6530d)：
类似于 jupyter，deepnote 同样是一款非常好用的编辑工具，那么他可以解决我们小白们的什么烦恼呢？

1. 想象您现在正在配置您的开发（~~炼丹~~）环境，正在使用 anaconda 或 pip 安装某个包，突然控制台上跳出大片的 ERROR，为了安好这个包，找遍了所有的文档，折腾了一下午，浪费了许多时间。
2. 您在家中突然对自己的项目拥有了一些奇妙的想法，但由于在家中并未安装开发环境，所以还需要去到工作地点进行试验。

这时， deepnote 出现了，帮您快速解决了以上问题。

## deepnote 的功能

### 在线编辑

由于 deepnote 支持在线编辑、多人协作，那么就不必操心在每处地方都配置好您的环境，只需要一个可以上网的浏览器就行了。

![多人协作](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/deepnote/intro/collaboration.png)

### 快速安装

deepnote 运行在数据中心中，所以您不必担心安装包时的下载速度与超时等问题。

![飞速下载](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/deepnote/intro/download.apng)

### 多样的结合

deepnote 可以配置许多软件的协同工作，例如 GitHub、Google drive 等。

![软件协同](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/deepnote/intro/integration.png)

## 实际使用

说了这么多特点，让我们来一起看看实际上 deepnote 的使用情况。以 k 近邻算法预测鸢尾花数据集为例。

### 连接速度

相信许多小伙伴在使用在线服务时首先关心的就是连接的速度与稳定度了，那么我们实际检测一下在国内 deepnote 的连接体验如何？

由于我深处偏远山区，所以打开 deepnote 主站时需要大约 1s，但这仍然位于在线编辑器的前列。

关于稳定性，在前几个月的使用中不时会出现断连的现象，好在所有的文件不仅保存在 deepnote，浏览器缓存中也有保存，所以重新加载即可，最近 deepnote 官方好像已经修复了断连的问题。

### 账号注册

不需要专门注册一个 deepnote 账号，使用您的 Google 或 GitHub 账号即可进行 OAuth 登录。

### 主界面

完成成登陆后，进入 deepnote 主页面
![Dashboard](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/deepnote/intro/dashboard.png)

可以看到，主页面被分为**三个部分**：导航栏、团队管理以及项目管理。

点击右侧的{% button #, New project %}后进入项目主页面（应该看到的是空白的页面，由于我提前创建好了所以会存在一些内容）

![项目主界面](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/deepnote/intro/project-mainpage.png)

同时项目主界面也分为四部分：导航栏、侧边栏、代码编辑以及每一个 block 的工具

使用 {% button #, Ctrl %} + {% button #, P %} 可以呼出控制控制台，创建新的 notebook，搜索等。

### 运行代码

依据`/proc/cpuinfo`的结果，standard 机型的配置如下：

- CPU: Intel(R) Xeon(R) Platinum 8259CL CPU @ 2.50GHz (2 Cores)
- MEM: 15G(非全部可用)
- 无 GPU 、 TPU 或 FPGA 加速

#### Seaborn 图像

仅测试了`pairplot`

![seaborn测试](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/deepnote/intro/seaborn.png)

#### matplotlib

![matplotlib](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/deepnote/intro/plt.png)

## 心动不如行动

deepnote 有这么强大的能力，您心动了吗？那还不赶紧行动，开始码代码吧。

邀请链接：[deepnote](https://deepnote.com/referral?token=cca6530d)
文中测试项目的链接；[Deepnote intro](https://deepnote.com/@bmyjacks/Deepnote-intro-YI8ijuM7QcCIAB5syXbcUg)
