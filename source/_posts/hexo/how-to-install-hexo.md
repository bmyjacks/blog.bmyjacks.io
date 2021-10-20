---
title: 如何安装Hexo
tags: [hexo, GitHub]
categories: [hexo]
keywords: [hexo, blog, 个人博客搭建, hexo blog, github 博客]
description: 想用Hexo来写个人博客，却不知道如何下手？本文将带您一步步安装Hexo来搭建您的个人Hexo博客
date: 2020-02-09 15:49:20
updated: 2020-02-09 15:49:20
---

![Hexo Logo](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20200309164643.png?x-oss-process=style/img)

## 首先，我们需要 Git 和 Nodejs

Git 的安装就不演示了，相信大家使用 hexo 的都会安装 git 了。

### 下面是 Nodejs 的安装

到 nodejs 官网下载[nodejs](https://nodejs.org/en/)

下载左边的和右边的均可，这里以右边的为例：

![nodejs download](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20200309164723.png?x-oss-process=style/img)

接着，我们按照正常的方法安装 nodejs。

安装完成后，在命令行里输入`node -v`查看 node 版本，出现版本号则安装成功，如下图所示：

![nodejs version](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20200309165142.png?x-oss-process=style/img)

`npm -v`查看 npm 版本：

![npm version](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20200309165203.png?x-oss-process=style/img)

好，我们已经安装完成了 nodejs。

接下来，我们安装 hexo。在命令行中输入`npm install hexo-cli -g`

我们来看看这条命令的意思：
`npm`是最基础的开头部分，`install`是安装命令,`hexo-cli`是我们要安装的包的名字，而`-g`则代表全局安装，也就是说你在哪里都可以使用前面安装的包。了解你输入的命令非常重要，这样你以后就有机会在 TravisCI 上测试部署了。

点击回车之后，我们看到命令行输出了一堆奇怪的字符，先不要管他，看到这些提示说明你安装成功了：

![install hexo](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20200309165221.png?x-oss-process=style/img)

## 下一步，创建一个新的文件夹，并安装 hexo

我们创建一个新的文件夹，名字随意。

![create folder](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20200309165237.png?x-oss-process=style/img)

在上一级文件夹中，输入`hexo init <你的文件夹名字>`来初始化这个文件夹：

![hexo initial](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20200309165254.png?x-oss-process=style/img)

好，现在让我们进入该文件夹，运行`npm install`来安装一些依赖的包文件：

![npm install](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20200309165311.png?x-oss-process=style/img)

然后运行`hexo generate`或者`hexo g`（这两个命令其实是一样的）来初始化 hexo：

![hexo generate](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20200309165331.png?x-oss-process=style/img)

接着，输入`hexo server`或`hexo s`（这两条命令也是一样的）来在本地运行 hexo：

![hexo server](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20200309165342.png?x-oss-process=style/img)

现在，打开你的浏览器，在地址栏输入`localhost:4000`回车后进入网页

![browser](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20200309165352.png?x-oss-process=style/img)

好了，我们已经成功的安装了 hexo

{% note success %}

## 恭喜，我们安装成功了

恭喜！
{% endnote %}

## 一些使用 hexo 的常见命令

| 结果               | Hexo 命令                 |
| ------------------ | ------------------------- |
| 创建新的草稿       | `hexo new draft <name>`   |
| 发布已经创建的草稿 | `hexo publish <name>`     |
| 创建新页面         | `hexo new page <name>`    |
| 生成网站文件       | `hexo generate`或`hexo g` |
| 开启网站服务器     | `hexo server`或`hexo s`   |
