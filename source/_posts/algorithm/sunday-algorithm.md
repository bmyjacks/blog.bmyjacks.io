---
title: Sunday 算法快速入门
tags:
  - 字符串
  - 算法
categories:
  - 算法笔记
keywords:
  - sunday算法
  - 字符串匹配
  - kmp
description: 十分钟带你学会 Sunday 算法
sticky: 0
hide: false
comments: true
katex: false
sitemap: true
date: 2021-04-14 09:19:29
---

Sunday算法是Daniel M.Sunday于1990年提出的**字符串模式匹配**算法，该算法的核心思想与BM算法类似。

{% note info 通过本文章我可以学到什么 %}

1. `Sunday`算法

   * 思想

   * 实现

   * 优点

   * 局限性


{% endnote %}


## 举个栗子

Sunday算法匹配方式如下：

### 例1

* 令字符串`txt`为`ABCDABA`
* 令模式串`pat`为`ABA`

则刚开始匹配时`txt`与`pat`左端对齐

![](https://cdn.bmyjacks.io/img/20210414094226.png?x-oss-process=style/style)

此时我们从`pat`的左端开始向右匹配，当匹配到第三位时`txt`与`pat`的内容不同：

![](https://cdn.bmyjacks.io/img/20210414094739.png?x-oss-process=style/style)

接着检查`txt`中`pat`的长度下一位字母在`pat`中有没有出现过。

发现 $D$ 并没有在`pat`中出现，便将整个`pat`向后移动 $len(pat) + 1$ 位：

![](https://cdn.bmyjacks.io/img/20210414095137.png?x-oss-process=style/style)

此时便匹配成功。

### 例2

* `txt = ABBBABBABA`
* `pat = ABA`

初始状态：

![](https://cdn.bmyjacks.io/img/20210414095821.png?x-oss-process=style/style)

匹配时发现在第 $4$ 位时`txt`与`pat`不一样，于是便比较`txt`的 $len(pat) + 1$ 位，发现 $A$ 在`pat`中出现过，于是便将该处 $A$ 与`pat`中最接近末尾的 $A$ 对齐：

![](https://cdn.bmyjacks.io/img/20210414100219.png?x-oss-process=style/style)

匹配时发现匹配失败了，于是检查下一位 $B$ 在`pat`中出现过，将它与`pat`中最靠近末尾的  $B$ 对齐：

![](https://cdn.bmyjacks.io/img/20210414100553.png?x-oss-process=style/style)

检查下一位，对齐：

![](https://cdn.bmyjacks.io/img/20210414100712.png?x-oss-process=style/style)

匹配成功。

## 算法思想

* 从头开始匹配
* 匹配到不一样时对比`txt`中整个`pat`长度的下一位是否在`pat`中出现过
  * 出现则跳到离末端最近
  * 未出现则整个`pat`跳过

## 时间复杂度

$O(n)$

## 代码实现

令`nowTxt`代表目前`txt`中匹配对应`pat`的首字母所在的位置，`nowPat`为匹配到的`pat`的第几位。

`pat`匹配

```cpp
while (txt[nowTxt + nowPat] == pat[nowPat]) {
  ++nowPat; // 对应位置匹配后将 检测的位置 向后移动

  if (nowPat == pat.length()) { // 完全匹配整个pat字符串则返回对应的pat所在位置
    return nowTxt;
    break;
  }
}
```

移动位数

```cpp
array<int, 26> sundayArray; // 一共26个字母，则开数组为26即可（可以根据自己需要进行修改）
inline void getSundayArray(const string &pat) {
  int len = pat.length(); // 获取pat的长度

  fill(sundayArray.begin(), sundayArray.end(), -1); // 初始化数组为 -1

  for (int i = len - 1, cnt = 0; i >= 0 && cnt < 26; ++i) { // 倒叙枚举，保证正确性（使对应字母离尾端的距离位最小值）
    int j = pat[i] - 'A'; // 获取pat对应位上的字母编号

    if (sundayArray[j] == -1) { // 如果之前并未修改，说明之前并没有出现对应字母
      sundayArray[j] = len - i; // 修改
      ++cnt; // 计数，如果已经拥有26个字母则跳出
    }
  }
}
```

进行匹配

```cpp
inline int sunday(const string &txt, const string &pat) {
  int n = txt.length(); // 获取txt长度
  int m = pat.length(); // 获取pat长度

  int nowTxt = 0, nowPat;   // 定义变量（指针）
  while (nowTxt + m <= n) { // 直到不能匹配为止
    nowPat = 0;             // 初始化pat对应位置位开头（即0）

    while (txt[nowTxt + nowPat] == pat[nowPat]) {
      ++nowPat;

      if (nowPat == m) {
        return nowTxt;
      }
    }

    if (nowTxt + m >= n) { // 超限则输出无解(-1)
      return -1;
    }

    if (sundayArray[txt[nowTxt + m] - 'A'] != -1) {
      nowTxt += sundayArray[txt[nowTxt + m] - 'A'];
    } else {
      nowTxt += m + 1;
    }
  }
}
```

{% note warning %}

## 局限性

当字符串`txt`与模式串`pat`具有特定的关系时，`Sunday`算法的**时间复杂度**可能会退化为$O(n \times m)$
{% endnote %}
