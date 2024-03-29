---
title: Markdown使用语法
tags: [markdown, GitHub, blog, hexo, git]
categories: [markdown]
description: Markdown的使用语法
keywords: [markdown, github, gitee, osc, opensource, 使用方法, 正确语法, 代码, blog, blogger, 博客, hexo]
date: 2020-03-22 11:45:15
updated: 2020-03-22 11:45:15
---

![](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20200322113727.jpg?x-oss-process=style/img)

## 标题

```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

## 段落

```markdown
这是第一段
这是第二段

这是第三段
```

这是第一段  
这是第二段
这是第三段

## 字体

```markdown
*斜体*
_斜体_
**粗体**
__粗体__
***粗斜体***
___粗斜体___
```

_斜体_
_斜体_
**粗体**
**粗体**
**_粗斜体_**
**_粗斜体_**

## 分割

```markdown
***

* * *

*****

- - -

----------
```

---

---

---

---

---

## 删除

```markdown
~~这是删除线~~
```

~~这是删除线~~

## 下划线

```markdown
<u>这是下划线</u>
```

<u>这是下划线</u>

## 标注

```markdown
这是要标记的[^文本]
[^文本] : 这是标记内容
```

{% note info %}

### 信息

由于本博客使用 pangu 分割中英文，所以无法显示标注，请见谅
{% endnote %}

## 列表

### 无序列表

```markdown
* 1
* 2
* 3

+ 1
+ 2
+ 3

- 1
- 2
- 3
```

- 1
- 2
- 3

* 1
* 2
* 3

- 1
- 2
- 3

### 有序列表

```markdown
1. 1
2. 2
3. 3
```

1. 1
2. 2
3. 3

### 列表嵌套

```markdown
1. 1
    - 1.1
    - 1.2
2. 2
    - 2.1
    - 2.2
```

1. 1
   - 1.1
   - 1.2
2. 2
   - 2.1
   - 2.2

## 区块

### 标准区块

```markdown
> 1
> 2
> 3
```

> 1
> 2
> 3

### 嵌套区块

```markdown
> 1
>> 2
>>> 3
```

> 1
>
> > 2
> >
> > > 3

## 代码

```markdown
这是`句子中的代码`。
    这是空四格代码print("Hello")
```

![](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20200322143630.png?x-oss-process=style/img)

这是`句子中的代码`。

```
这是空四格代码print("Hello")
```

```
这是代码快
```

还可以指定编程语言来启用语法高亮例如在 **```** 后方加上 markdown

## 链接

### 基本链接

```markdown
[文字链接](链接地址)
![图片alt](链接地址)
```

[文字链接](https://www.bmyjacks.cn/2020/markdown.html#文字连接)
![图片链接](https://cdn-bmyjacks-io.oss-accelerate.aliyuncs.com/img/20200322144321.png?x-oss-process=style/img)

### 高级链接

```markdown
这是一条[高级链接][1]
然后在结尾处为变量赋值
[1](链接地址)
```

{% note info %}

#### 信息

由于本博客使用 pangu 分割中英文，所以无法显示高级链接，请见谅
{% endnote %}

## 表格

### 绘制表格

```markdown
| 表头   | 表头    |
| ------ | ------ |
| 单元格  | 单元格 |
| 单元格  | 单元格 |
```

| 表头   | 表头   |
| ------ | ------ |
| 单元格 | 单元格 |
| 单元格 | 单元格 |

### 对齐方式

```markdown
| 左对齐     | 右对齐    | 居中对齐     |
| :---------| --------: | :---------: |
| 这是左对齐 | 这是右对齐 | 这是居中对齐 |
| 这是左对齐 | 这是右对齐 | 这是居中对齐 |
```

{% note info %}

#### 信息

本博客由于特殊原因无法显示对齐表格，请见谅
{% endnote %}

## 按键

```markdown
这是一个<kbd>Ctrl</kbd>和<kbd>enter</kbd>
```

这是一个<kbd>Ctrl</kbd>和<kbd>enter</kbd>

## 转义符号

```markdown
在以下字符前插入反斜杠\来帮助转意
\   反斜线
`   反引号
*   星号
_   下划线
{}  花括号
[]  方括号
()  小括号
#   井字号
+   加号
-   减号
.   英文句点
!   感叹号
```

\\ 反斜线 \` 反引号 \* 星号 \_ 下划线 \{} 花括号 \[] 方括号 \() 小括号 \# 井字号 \+ 加号 \- 减号 \. 英文句点 \! 感叹号

## 数学公式以及图像

有待补充
