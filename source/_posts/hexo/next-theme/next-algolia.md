---
title: 给Hexo的NexT主题配置algolia搜索
tags: [hexo, NexT, algolia, search]
categories: [NexT]
keywords: [hexo, blog, next, hexo主题, algolia, 搜索, 本地, 博客, 网站]
description: 在安装了hexo的NexT主题后，我们来看看如何开启algolia搜索
date: 2020-03-13 15:43:09
---

## 首先，我们需要注册一个 algolia 账号

我们打开[algolia 的官方网站](https://www.algolia.com/)

![](https://cdn.bmyjacks.io/img/20200310184600.png?x-oss-process=style/style)

点击`FREE TRIAL`注册一个账号

![](https://cdn.bmyjacks.io/img/20200310205536.png?x-oss-process=style/style)

填写相应的邮箱以及密码之后来到控制台，新建一个应用：
![20200310205818](https://cdn.bmyjacks.io/img/20200310205818.png?x-oss-process=style/style)
接着选择数据存放的位置，一般在中国就选香港（HONGKONG）就行了
![20200310205938](https://cdn.bmyjacks.io/img/20200310205938.png?x-oss-process=style/style)
之后点击右侧的`Create index`创建索引名称
![20200310211031](https://cdn.bmyjacks.io/img/20200310211031.png?x-oss-process=style/style)
必须要记好这个名称，之后会用到，比如这里填 test，点击 create
![20200310211153](https://cdn.bmyjacks.io/img/20200310211153.png?x-oss-process=style/style)
创建成功后在左侧找到 API Keys
![20200310211303](https://cdn.bmyjacks.io/img/20200310211303.png?x-oss-process=style/style)
![20200310211356](https://cdn.bmyjacks.io/img/20200310211356.png?x-oss-process=style/style)
将图中所示的 API Key 保存好，接着我们开始在 Hexo 中配置

## Hexo 中的配置

我们先安装 algolia 的模块

```bash
npm install hexo-algolia --save
```

接着在{% label [warning]@站点的config文件 %}中配置

```yml
algolia:
  applicationID: 'Your applicationID'
  apiKey: 'Your Search-Only apikey'
  indexName: 'test(上面你创建索引时使用的名称)'

```

![20200313153519](https://cdn.bmyjacks.io/img/20200313153519.png?x-oss-process=style/style)

在{% label [warning]@NexT的config文件 %}中配置
![20200313153620](https://cdn.bmyjacks.io/img/20200313153620.png?x-oss-process=style/style)
将`enable`设置为`true`

完成站点的配置

## 将索引上传 algolia 服务器

执行

```bash
hexo clean
hexo algolia
```

如果出现以下情况
![20200313153947](https://cdn.bmyjacks.io/img/20200313153947.png?x-oss-process=style/style)
输入

```bash
set HEXO_ALGOLIA_INDEXING_KEY=Your Admin apikey
hexo algolia
```

{% note success %}

## 恭喜

恭喜您，完成了 algolia 的安装和配置
{% endnote %}
