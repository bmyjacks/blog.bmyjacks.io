---
title: 并查集学习笔记
tags:
  - 并查集
  - 数据结构
categories: 数据结构
keywords:
  - 并查集
  - 数据结构
description: 并查集学习笔记
hide: false
comments: true
katex: true
sticky: 0
sitemap: true
date: 2021-08-26 10:04:30
---

{% note info %}
本文章最后更新日期为：2021-08-26
{% endnote %}

## 并查集是什么

**并查集**为一系列不相交的集合（disjoint set）。

## 并查集能干什么

并查集主要使用来解决**分类问题**。

## 如何维护并查集

以[洛谷 P3367 【模板】并查集](https://www.luogu.com.cn/problem/P3367)为例。

题目所需要支持的操作有两种：

- 将 $x$ 与 $y$ 所在的**集合合并**。
- 查询 $x$ 与 $y$ 是否在**同一个集合**内。

{% note info 什么是集合？ %}

集合（set）指的是由一系列元素组成的整体，在这个整体内**没有顺序**，同时**同一个元素在同一个集合内只能出现一次**。

即集合具有无序性、确定性、互异性。

{% endnote %}

为了解决这一种类的问题，我们引入**并查集**。

### 初始化

一开始时每一个点都相当于一个集合，集合中的元素为他们自己。为了形象的表示并查集的原理，我们将**每一个集合**比喻为一个**帮派**（通过看[其他的博客](https://zhuanlan.zhihu.com/p/93647900)发现的好比喻），而帮派的**老大**（最具有代表性的元素），记为`root`，每一个点都拥有`root`，就像每一个人所属于的帮派都拥有老大一样。

$$
root: 1 \quad 2 \quad 3 \quad 4
$$

那么刚开始的这些帮派里**只有一个人**，并且这个人就是他们自己（自己当自己的老大）。

![](https://cdn.bmyjacks.io/img/data-structure/disjoint-set/1.png?x-oss-process=style/img)

```cpp
for (int32_t i = 1; i <= n; ++i) {
    root[i] = i;
  }
```

### 合并

当我们需要合并某两个帮派时，将这两个帮派的老大连接到一起，比如合并 $1$ 与 $2$：

![](https://cdn.bmyjacks.io/img/data-structure/disjoint-set/2.png?x-oss-process=style/img)

这时由于同一个帮派**只能**有一个老大，所以从这两个人中随便选一个来当。

$$
root: 1 \quad 1 \quad 3 \quad 4
$$

```cpp
void merge(const int32_t x, const int32_t y) {
  root[x] = y;
}
```

{% note info 正确的code %}

```cpp
void merge(const int32_t x, const int32_t y) { root[findRoot(x)] = y; }
```

{% endnote %}

等等！直接把 $x$ 的老大设置为 $y$ 好像有点不对劲？可是又不知道为什么，那么看看这个例子：

一开始时的 $root$：

$$
root: 4 \quad 6 \quad 1 \quad 4 \quad 2 \quad 6 \quad
$$

![](https://cdn.bmyjacks.io/img/data-structure/disjoint-set/3.png?x-oss-process=style/img)

如果这时我们合并 $5$ 与 $3$ 时

$$
root: 4 \quad 3 \quad 1 \quad 4 \quad 2 \quad 6 \quad
$$

![](https://cdn.bmyjacks.io/img/data-structure/disjoint-set/4.png?x-oss-process=style/img)

就会发现原本与 $2$ 在同一个帮派（集合）内的 $6$ 现在竟然被独立出去了！

问题出现在哪里呢？当我们在合并之前并**不知道自己认为的老大是不是就是所在的帮派的老大**（帮派内可能还会有一些团体），所以我们需要一直询问下去，直到遇到某一个人说他自己就是他自己的帮派老大。就需要一个寻找最大的老大的函数来帮忙！

### 查询 root

```cpp
int32_t findRoot(const int32_t x) {
  if (root[x] == x) {
    return x;
  } else {
    findRoot(root[x]);
  }
}
```

代码是不是十分简单呢？当我们查询到的人的老大并不是自己时继续查询老大的老大，虽然听起来有一些绕，但是通过这样我们就可以寻找到整个帮派里最大的“头目”，在合并的时候将他合并到另一个帮派里就没有问题了。

### 解释

经过了刚刚十分形象的比喻，我们明白了维护并查集需要使用的几个函数以及数组：

- `root`数组用来存储同一个集合内具有代表性的元素。
- `findRoot`函数用来寻找同一集合内**最具代表性**的元素。
- `merge`函数用来合并两个集合。

## 那我们就来愉快的做题！

经过上面的学习，贴出 code

```cpp
#include <iostream>

using namespace std;

const uint32_t MAX_N = 1e4 + 5;

uint32_t root[MAX_N];

uint32_t findRoot(const uint32_t x) {
  if (x == root[x]) {
    return x;
  } else {
    return findRoot(root[x]);
  }
}

inline char check(const uint32_t x, const uint32_t y) {
  if (findRoot(x) == findRoot(y)) {
    return 'Y';
  } else {
    return 'N';
  }
}

inline void merge(const uint32_t x, const uint32_t y) { root[findRoot(x)] = y; }

uint32_t N = 0, M = 0;

int main() {
  cin >> N >> M;

  for (uint32_t i = 1; i <= N; ++i) {
    root[i] = i;
  }

  uint32_t Z, X, Y;
  for (uint32_t i = 1; i <= M; ++i) {
    cin >> Z >> X >> Y;

    if (Z == 1) {
      merge(X, Y);
    } else {
      cout << check(X, Y) << endl;
    }
  }

  return 0;
}
```

提交之后惊讶地发现竟然只有 $20$ 分，是时候来讲讲优化了。

## 优化

### 路径压缩

当我们在查询最大的头目时，需要一个个向上查找，为什么不在查找之后直接将自己的老大设为最大的头目呢？这样，路径压缩优化已经完美理解。

![](https://cdn.bmyjacks.io/img/data-structure/disjoint-set/5.png?x-oss-process=style/img)

当我们不使用路径压缩时，如果需要查询 $6$、$5$ 的最大头目时，需要向上查询 $9$ 次。

而我们使用路径压缩之后，查询 $6$ 的最大头目后整个集合变成了这样：

![](https://cdn.bmyjacks.io/img/data-structure/disjoint-set/6.png?x-oss-process=style/img)

这时查询 $6$ 和 $5$ 的查询次数就只有 $6$ 次了。

```cpp
uint32_t findRoot(const uint32_t x) {
  if (x == root[x]) {
    return x;
  } else {
    return root[x] = findRoot(root[x]);
  }
}
```

可惜使用了路径压缩后依然只有 $20$。

{% note info 之前的一个小问题 %}

我们在合并两个帮派时采用了“合并其中一个的最大头目到另一个帮派里”的方法，如果我们将两个帮派的最大头目合并起来是不是就会更快了呢？还顺便进行了路径压缩。

{% endnote %}

### 按秩合并

我们合并两个帮派的时候只是随意的将一个帮派的老大合并到另一个帮派里，那么可不可以将小帮派合并到大帮派里来提高速度呢？非常可以，这便是按秩合并。

#### 初始化

一开始时我们每一个人自成帮派时帮派的大小为 $1$。

$$
size_{x} = 1, x \in \left[1, n\right]
$$

```cpp
for (uint32_t i = 1; i <= n; ++i) {
    treeSize[i] = 1;
 }
```

#### 合并

合并时我们根据帮派的大小进行合并：

```cpp
void merge(const uint32_t x, const uint32_t y) {
	uint32_t xRoot = findRoot(x), yRoot = findRoot(y);

	if (treeSize[xRoot] > treeSize[yRoot]) {
		root[yRoot] = xRoot;
		treeSize[xRoot] += treeSize[yRoot];
	} else {
		root[xRoot] = yRoot;
		treeSize[yRoot] += treeSize[xRoot];
	}
}
```

这样交上去是不是就 $100$ 了呢。

## 亿些练习

- [洛谷 P3367 【模板】并查集](https://www.luogu.com.cn/problem/P3367)
- [洛谷 P1551 亲戚](https://www.luogu.com.cn/problem/P1551)
- [洛谷 P1396 营救](https://www.luogu.com.cn/problem/P1396)
