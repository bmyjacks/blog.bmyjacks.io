---
title: 将hexo上传到GitHub
tags: [hexo, GitHub, blog]
categories: [hexo]
description: 本文介绍如何将hexo博客上传到GitHub
keywords: [hexo, git, github, blog, blogger]
date: 2020-03-16 15:27:56
---

## 方法一：使用 hexo 插件自动上传

创建 GitHub 仓库
首先，我们创建一个新的 GitHub 仓库
![20200316150827](https://cdn.bmyjacks.io/img/20200316150827.png?x-oss-process=style/style)
![20200316150902](https://cdn.bmyjacks.io/img/20200316150902.png?x-oss-process=style/style)
修改 config.yml
打开站点的配置文件，将默认的`http://yoursite.com`替换为您自己的网址
![20200316151051](https://cdn.bmyjacks.io/img/20200316151051.png?x-oss-process=style/style)
将配置文件最下方的 deploy 替换为

```yml
deploy:
    type: git
    repo: #您的GitHub仓库地址
    branch: master
```

安装插件

```bash
npm install hexo-deployer-git --save
```

部署

```bash
hexo g && hexo d
```

接着您便可以访问您的网站来查看 hexo 博客

## 方法二：手动上传整个文件夹

命令行输入

```bash
git init
```

在新产生的`.gitignore`中填写以下内容

```txt
node_modules/
public/
db.json
debug.log
```

![20200316152215](https://cdn.bmyjacks.io/img/20200316152215.png?x-oss-process=style/style)
添加远端仓库

```bash
git remote add origin https://github.com/yourname/yourrepo.git
```

推送

```bash
git push -u origin master
```

{% note success %}

## 恭喜

恭喜您，成功将 hexo 上传到 GitHub 上！
{% endnote %}
