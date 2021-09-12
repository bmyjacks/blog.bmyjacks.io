---
title: NexT主题速度优化
tags: [NexT, hexo]
categories: [NexT]
description: 博客打开慢？一起来看看如何优化您的博客吧！
keywords: [NexT主题, hexo, 博客, blog, 优化, optimization]

date: 2020-04-06 11:21:03
---

## hexo 自带的`config.yml`优化

将原本主题的链接配置文件的第`21-23`行更改为以下文件有助于 SEO

```yml
url: https://www.bmyjacks.cn #填写您的网站地址
root: / #填写您的根目录地址
permalink: :year/:title.html #建议改成这样
```

## NexT 主题的`next.yml`优化

这一个选项就比较多了，且听我细细道来

### 打开缓存与最小化

```yml
cache:
  enable: true

minify: true
```

### favicon 优化

favicon 图标文件最好为压缩过的，并且存放在诸如`阿里云OSS`等

```yml
favicon:
  small:
  medium:
  apple_touch_icon:
  safari_pinned_tab:
  android_manifest:
  ms_browserconfig:

avatar:
  # Replace the default image and set the url here.
  url:
  # If true, the avatar will be dispalyed in circle.
  rounded: false
  # If true, the avatar will be rotated with the cursor.
  rotated: false
```

## 关闭一些不需要的功能

这种优化方法就因人而异了，请大家根据自己的需要进行选择

### 关闭动画

关闭动画之后你的网站上就没有过渡动画显示了，请考虑后在选择,将第`820`附近的代码`(819-835)`更改为

```yml
motion:
  enable: false
  async: false
  transition:
    # Transition variants:
    # fadeIn | flipXIn | flipYIn | flipBounceXIn | flipBounceYIn
    # swoopIn | whirlIn | shrinkIn | expandIn
    # bounceIn | bounceUpIn | bounceDownIn | bounceLeftIn | bounceRightIn
    # slideUpIn | slideDownIn | slideLeftIn | slideRightIn
    # slideUpBigIn | slideDownBigIn | slideLeftBigIn | slideRightBigIn
    # perspectiveUpIn | perspectiveDownIn | perspectiveLeftIn | perspectiveRightIn
    post_block: fadeIn
    post_header: slideDownIn
    post_body: slideDownIn
    coll_header: slideLeftIn
    # Only for Pisces | Gemini.
    sidebar: slideUpIn
```

### 减少不必要的服务

如果您设置了两个评论系统，请您在优化时去掉一个，只留下最合适的那一个，并且进行以下配置`557-574`

```yml
# Multiple Comment System Support
comments:
  # Available values: tabs | buttons
  style: tabs
  # Choose a comment system to be displayed by default.
  # Available values: changyan | disqus | disqusjs | gitalk | livere | valine
  active: disqusjs # 改成您最合适的评论系统
  # Setting `true` means remembering the comment system selected by the visitor.
  storage: false
  # Lazyload all comment systems.
  lazyload: true
  # Modify texts or order for any navs, here are some examples.
  nav:
    #disqus:
    #  text: Load Disqus
    #  order: -1
    #gitalk:
    #  order: -2
```

关闭在线聊天，关闭掉如`chatra`的在线聊天系统

### 关闭 pace

```yml
pace:
  enable: false
  # Themes list:
  # big-counter | bounce | barber-shop | center-atom | center-circle | center-radar | center-simple
  # corner-indicator | fill-left | flat-top | flash | loading-bar | mac-osx | material | minimal
  theme: minimal
```

### 关闭 three

```yml
three:
  enable: false
  three_waves: false
  canvas_lines: false
  canvas_sphere: false
```

### 使用 CDN

修改`874-986`

```yml
vendors:
  # Internal path prefix.
  _internal: lib

  # Internal version: 3.1.0
  # anime: //cdn.jsdelivr.net/npm/animejs@3.1.0/lib/anime.min.js
  anime: //cdn.jsdelivr.net/npm/animejs@3.1.0/lib/anime.min.js

  # Internal version: 5.13.0
  # fontawesome: //cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5/css/all.min.css
  # fontawesome: //cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css
  fontawesome: //cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5/css/all.min.css

  # MathJax
  # mathjax: //cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js
  mathjax: //cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js

  # KaTeX
  # katex: //cdn.jsdelivr.net/npm/katex@0/dist/katex.min.css
  # katex: //cdnjs.cloudflare.com/ajax/libs/KaTeX/0.11.1/katex.min.css
  # copy_tex_js: //cdn.jsdelivr.net/npm/katex@0/dist/contrib/copy-tex.min.js
  # copy_tex_css: //cdn.jsdelivr.net/npm/katex@0/dist/contrib/copy-tex.min.css
  katex: //cdn.jsdelivr.net/npm/katex@0/dist/katex.min.css
  copy_tex_js: //cdn.jsdelivr.net/npm/katex@0/dist/contrib/copy-tex.min.js
  copy_tex_css: //cdn.jsdelivr.net/npm/katex@0/dist/contrib/copy-tex.min.css

  # Internal version: 0.2.8
  # pjax: //cdn.jsdelivr.net/gh/theme-next/theme-next-pjax@0/pjax.min.js
  pjax: //cdn.jsdelivr.net/gh/theme-next/theme-next-pjax@0/pjax.min.js

  # FancyBox
  # jquery: //cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js
  # fancybox: //cdn.jsdelivr.net/gh/fancyapps/fancybox@3/dist/jquery.fancybox.min.js
  # fancybox_css: //cdn.jsdelivr.net/gh/fancyapps/fancybox@3/dist/jquery.fancybox.min.css
  jquery: //cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js
  fancybox: //cdn.jsdelivr.net/gh/fancyapps/fancybox@3/dist/jquery.fancybox.min.js
  fancybox_css: //cdn.jsdelivr.net/gh/fancyapps/fancybox@3/dist/jquery.fancybox.min.css

  # Medium-zoom
  # mediumzoom: //cdn.jsdelivr.net/npm/medium-zoom@1/dist/medium-zoom.min.js
  mediumzoom: //cdn.jsdelivr.net/npm/medium-zoom@1/dist/medium-zoom.min.js

  # Lazyload
  # lazyload: //cdn.jsdelivr.net/npm/lozad@1/dist/lozad.min.js
  # lazyload: //cdnjs.cloudflare.com/ajax/libs/lozad.js/1.14.0/lozad.min.js
  lazyload: //cdn.jsdelivr.net/npm/lozad@1/dist/lozad.min.js

  # Pangu
  # pangu: //cdn.jsdelivr.net/npm/pangu@4/dist/browser/pangu.min.js
  # pangu: //cdnjs.cloudflare.com/ajax/libs/pangu/4.0.7/pangu.min.js
  pangu: //cdn.jsdelivr.net/npm/pangu@4/dist/browser/pangu.min.js

  # Quicklink
  # quicklink: //cdn.jsdelivr.net/npm/quicklink@1/dist/quicklink.umd.js
  quicklink: //cdn.jsdelivr.net/npm/quicklink@1/dist/quicklink.umd.js

  # DisqusJS
  # disqusjs_js: //cdn.jsdelivr.net/npm/disqusjs@1/dist/disqus.js
  # disqusjs_css: //cdn.jsdelivr.net/npm/disqusjs@1/dist/disqusjs.css
  disqusjs_js: //cdn.jsdelivr.net/npm/disqusjs@1/dist/disqus.js
  disqusjs_css: //cdn.jsdelivr.net/npm/disqusjs@1/dist/disqusjs.css

  # Valine
  # valine: //cdn.jsdelivr.net/npm/valine@1/dist/Valine.min.js
  # valine: //cdnjs.cloudflare.com/ajax/libs/valine/1.3.10/Valine.min.js
  valine: //cdn.jsdelivr.net/npm/valine@1/dist/Valine.min.js

  # Gitalk
  # gitalk_js: //cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js
  # gitalk_css: //cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.css
  gitalk_js: //cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js
  gitalk_css: //cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.css

  # Algolia Search
  # algolia_search: //cdn.jsdelivr.net/npm/algoliasearch@4/dist/algoliasearch-lite.umd.js
  # instant_search: //cdn.jsdelivr.net/npm/instantsearch.js@4/dist/instantsearch.production.min.js
  algolia_search: //cdn.jsdelivr.net/npm/algoliasearch@4/dist/algoliasearch-lite.umd.js
  instant_search: //cdn.jsdelivr.net/npm/instantsearch.js@4/dist/instantsearch.production.min.js

  # Mermaid
  # mermaid: //cdn.jsdelivr.net/npm/mermaid@8/dist/mermaid.min.js
  # mermaid: //cdnjs.cloudflare.com/ajax/libs/mermaid/8.4.8/mermaid.min.js
  mermaid: //cdn.jsdelivr.net/npm/mermaid@8/dist/mermaid.min.js

  # Internal version: 1.2.1
  # velocity: //cdn.jsdelivr.net/npm/velocity-animate@1/velocity.min.js
  # velocity: //cdnjs.cloudflare.com/ajax/libs/velocity/1.2.1/velocity.min.js
  # velocity_ui: //cdn.jsdelivr.net/npm/velocity-animate@1/velocity.ui.min.js
  # velocity_ui: //cdnjs.cloudflare.com/ajax/libs/velocity/1.2.1/velocity.ui.min.js
  velocity: //cdn.jsdelivr.net/npm/velocity-animate@1/velocity.min.js
  velocity_ui: //cdn.jsdelivr.net/npm/velocity-animate@1/velocity.ui.min.js

  # Internal version: 1.0.2
  # pace: //cdn.jsdelivr.net/npm/pace-js@1/pace.min.js
  # pace: //cdnjs.cloudflare.com/ajax/libs/pace/1.0.2/pace.min.js
  # pace_css: //cdn.jsdelivr.net/npm/pace-js@1/themes/blue/pace-theme-minimal.css
  # pace_css: //cdnjs.cloudflare.com/ajax/libs/pace/1.0.2/themes/blue/pace-theme-minimal.min.css
  pace: //cdn.jsdelivr.net/npm/pace-js@1/pace.min.js
  pace_css: //cdn.jsdelivr.net/npm/pace-js@1/themes/blue/pace-theme-minimal.css

  # Internal version: 1.0.0
  # three: //cdn.jsdelivr.net/gh/theme-next/theme-next-three@1/three.min.js
  # three_waves: //cdn.jsdelivr.net/gh/theme-next/theme-next-three@1/three-waves.min.js
  # canvas_lines: //cdn.jsdelivr.net/gh/theme-next/theme-next-three@1/canvas_lines.min.js
  # canvas_sphere: //cdn.jsdelivr.net/gh/theme-next/theme-next-three@1/canvas_sphere.min.js
  three: //cdn.jsdelivr.net/gh/theme-next/theme-next-three@1/three.min.js
  three_waves: //cdn.jsdelivr.net/gh/theme-next/theme-next-three@1/three-waves.min.js
  canvas_lines: //cdn.jsdelivr.net/gh/theme-next/theme-next-three@1/canvas_lines.min.js
  canvas_sphere: //cdn.jsdelivr.net/gh/theme-next/theme-next-three@1/canvas_sphere.min.js

  # Internal version: 1.0.0
  # canvas_ribbon: //cdn.jsdelivr.net/gh/theme-next/theme-next-canvas-ribbon@1/canvas-ribbon.js
  canvas_ribbon: //cdn.jsdelivr.net/gh/theme-next/theme-next-canvas-ribbon/canvas-ribbon.js
```
