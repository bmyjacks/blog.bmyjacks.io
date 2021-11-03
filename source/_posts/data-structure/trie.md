---
title: Trie 学习笔记
tags:
  - Trie
  - 字符串
categories:
  - 数据结构
keywords:
  - trie
  - 字符串
  - 数据结构
description: Trie 学习笔记
sticky: 0
comments: true
katex: true
sitemap: true
date: 2021-11-03 20:27:01
updated: 2021-11-03 21:19:45
---

## Trie 是什么

Trie （字典树）为一种用来快速检索字符串的树形结构。可视化样式如下：

## Trie 能做什么

- 查询某个字符串是否出现（词频统计）
- 查询某字符串是否为出现过的字符串的前缀（前缀匹配）
- 对字符串按字典序排序
- 作为其他算法的辅助结构（AC 自动机）

## Trie 的特点

以空间换时间

## 如何维护 Trie

### Trie 的思想

构建一颗**有根树**，每一条边相当于一个字符，每一个点存储是否为字符串的末尾。则一个字符串为从根节点走到该字符串末尾节点的路径上所有边的字符按顺序拼接而成。

### 初始化

一颗空的 Trie 仅包含根节点，此时根节点并未连接任意的边，且并未标记为字符串的末尾。

代码中我们使用 `trie` 数组来保存 Trie，使用 `cnt` 来保存目前 Trie 树中一共保存了多少个**节点**。

```cpp
constexpr int MAX_LEN = 1e5;
constexpr int CHARSET_SIZE = 26;
constexpr int MIN_CHAR = 'a';

int cnt = 1;
int trie[MAX_LEN][CHARSET_SIZE];
bool isEnd[MAX_LEN];
```

### 插入

当我们需要插入一个字符串 $S$ 时，我们令一个指针指向根节点，然后依次遍历 $S$ 中的每个字符 $C$：

- 如果目前指针指向的节点并没有代表 $C$ 字符的边，那么新建一个节点，连边，将该边的代表字符设为 $C$。
- 否则将目前指针指向的节点更新为当前节点**连出**的代表 $C$ 字符的边的终点。
- 当遍历完毕 $S$ 字符串后，将当前指针指向的节点标记为字符串末尾。

```cpp
void insert(const string &x) {
  int p = 1;
  for (auto &&i : x) {
    if (trie[p][i - MIN_CHAR] == 0) {
      trie[p][i - MIN_CHAR] = ++cnt;
    }
    p = trie[p][i - MIN_CHAR];
  }
  isEnd[p] = true;
}
```

### 查找

同样对于一个字符串 $S$，令一个指针指向根节点，依次遍历 $S$，中的字符 $C$：

- 若指针指向的节点没有连出的代表字符 $C$ 的边，则说明 $S$ 并未存在 Trie 中。
- 若指针指向的节点拥有连出的代表字符 $C$ 的边，则移动指针至该边的终点。
- 当遍历完 $S$ 中的所有字符时，若指针指向的节点为末尾节点，则 $S$ 在 Trie 中，否则不在。

```cpp
bool find(const string &x) {
  int p = 1;
  for (auto &&i : x) {
    p = trie[p][i - MIN_CHAR];

    if (p == 0) {
      return false;
    }
  }

  return isEnd[p];
}
```

{% note info 完整代码 %}

```cpp
constexpr int MAX_LEN = 1e5;
constexpr int CHARSET_SIZE = 26;
constexpr int MIN_CHAR = 'a';

int cnt = 1;
int trie[MAX_LEN][CHARSET_SIZE];
bool isEnd[MAX_LEN];

void insert(const string &x) {
  int p = 1;
  for (auto &&i : x) {
    if (trie[p][i - MIN_CHAR] == 0) {
      trie[p][i - MIN_CHAR] = ++cnt;
    }
    p = trie[p][i - MIN_CHAR];
  }
  isEnd[p] = true;
}

bool find(const string &x) {
  int p = 1;
  for (auto &&i : x) {
    p = trie[p][i - MIN_CHAR];

    if (p == 0) {
      return false;
    }
  }

  return isEnd[p];
}
```

{% endnote %}

~~其实 Trie 的很多题目都可以用 Hash 水过，所以就不展示例题了。~~

## 复杂度

### 时间复杂度

- 初始化：$O(1)$
- 插入：$O(n)$
- 查找：$O(n)$

{% note info 分析 %}
插入与查找时都需要对字符串进行遍历，所以时间复杂度均为 $O(n)$。
{% endnote %}

### 空间复杂度

令 $n$ 为 Trie 在极限情况下的节点个数，$c$ 为字符集（就是字符串中可能出现的字符的种类的数量）的大小。

空间复杂度为：$O(nc)$
