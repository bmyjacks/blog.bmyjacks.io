---
title: ST表学习笔记
tags:
  - ST表
  - 数据结构
categories: 数据结构
keywords:
  - ST表
  - 数据结构
description: ST表学习笔记
hide: false
comments: true
katex: true
sticky: 0
sitemap: true
date: 2021-08-25 10:50:54
---

{% note info %}
本文章最后更新日期为：2021-08-25
{% endnote %}

## ST 表是什么

简单来说，ST 表就是一个二维数组，使用这个数组来存储需要的信息。

## ST 表能干什么

ST 表**主要**用来处理**静态区间**的 RMQ 问题。

其他可用 ST 表处理的问题：

- 最大公因数（gcd）
- 最小公倍数（lcm）
- $\cdots$

{% note info %}
所谓 RMQ 问题指的是区间的最大/最小值查询（Range Maximum/Minimum Query）。
{% endnote %}

朴素的 RMQ 问题算法时间复杂度为 $O(n^{2})$，而使用 ST 表可以做到 $O(n\log{n})$ 预处理、$O(1)$ 查询。

## 怎么使用 ST 表

### 二维数组的开辟

由于 ST 表使用了倍增的思想，所以创建的二维数组十分“有精神”

```cpp
int32_t st[MAX_N][(int32_t)std::log2(MAX_N) + 1];
```

含义：`st[i][j]`表示在区间 $\left[i, i + 2^{j}\right)$ 中的最大值/最小值。
即：

$$
st_{i,j} = \text{RMQ}(i, i + 2^{j} - 1)
$$

由于 $st_{i, 0}$ 表示 $\text{RMQ}(i, i + 2^{0} - 1)$，所以可以将原序列存入 $st_{i, 0}$

### 预处理

code（以最大值为例）：

```cpp
for (int32_t p = 1; p <= (int32_t)std::log2(MAX_N); ++p) {
  for (int32_t i = 1; i + (1 << p) <= n + 1; ++i) {
    st[i][p] = std::max(st[i][p - 1], st[i + (1 << (p - 1))][p - 1]);
  }
}
```

由于我们计算倍增时需要使用到上一级计算的结果，所以将`p`放在最外层循环。

为了计算 $st_{i, p}$，需要知道 $st_{i, p-1}$ 与 $st_{i + 2^{p - 1}, p - 1}$

他们之间的关系如下（以 $st_{1, 2}$ 为例）：

$$
st_{1, 2} = \max\left(st_{1, 1}, st_{3, 1}\right)
$$

$$
\underbrace{\overbrace{s_{1} \quad s_{2}}^{st_{1, 1}} \quad \overbrace{s_{3} \quad s_{4}}^{st_{3, 1}}}_{st_{1, 2}} \quad s_{5} \quad \cdots \quad s_{n}
$$

这样是不是就很显然了？

### 查询

当我们需要查询 $RMQ(l, r)$ 时，需要寻找两个区间 $\left[l_{1}, l_{1} + 2^{k_{1}}\right)$ 与 $\left[l_{2}, l_{2} + 2^{k_{2}}\right)$ ，使得这两个区间的并集刚好为 $\left[l, r\right]$

{% note info 为什么是并集？为什么中间不能断开或者超过 $\left[l, r\right]$？ %}

- 并集是因为在 $st_{l_{1}, l_{1} + 2^{k_{1}}}$ 中保存了最值，而在 $st_{l_{2}, l_{2} + 2^{k_{2}}}$ 中也保存了最值，所以将他们取并集刚好能够满足 $\left[l, r\right]$ 时只需要对这两个值再取最值即可。
- 不能断开因为如果 $\left[l, r\right]$ 中间有一部分为包含在并集内就无法判断整个 $\left[l, r\right]$ 内的最值。
- 不能超过 $\left[l, r\right]$ 是因为一旦并集包含了 $\left[l, r\right]$ 以外的区域，那么这个并集内的最值同样为整个区域的最值而不是 $\left[l, r\right]$ 内的最值。
  {% endnote %}

所以我们需要

$$
l_{1} \gets l \newline
l_{2}+2^{k_{2}} \gets r + 1
$$

在此基础上使 $l_{1}+2^{k_{1}}$ 尽量靠近 $r$，使 $l_{2}$ 尽量靠近 $l$。

由于预处理 ST 表时已经处理出所有的 $st_{i, k}, k \in \left[0, \log_{2}{MAX\_N}\right]$。所以我们直接将 $l_{1}$ 设为 $l$，现在只需要尽量使得 $l_{1}+2^{k_{1}}$ 靠近 $r$ 即可。

那么可以使用对数计算这个区间的长度，即

$$
k_{1} = \log_{2}(r - l + 1) \newline
k_{2} = k_{1}
$$

{% note info $\log$ 是啥？ %}
我们已经学过幂运算，形如 $a^{b}$，那么如果我们知道幂运算的结果和底数如何知道指数呢？

没错，通过对数运算，我们就可以知道指数了。

$$
\log_{a}{a^{b}} = b, a \neq 0
$$

{% endnote %}

code:

```cpp
int32_t query(const int32_t l, const int32_t r) {
  int32_t k = std::log2(r - l + 1);
  return max(st[l][k], st[r - (1 << k) + 1][k]);
}
```

## 最后仍然是亿些练习

其实基本上[滑动窗口/单调队列](../monotonic-queue)的题都可使用 ST 表（时间允许的情况下）

- [洛谷 P3865 【模板】ST 表](https://www.luogu.com.cn/problem/P3865)
- [洛谷 P2880 [USACO07JAN]Balanced Lineup G](https://www.luogu.com.cn/problem/P2880)
- [洛谷 P1816 忠诚](https://www.luogu.com.cn/problem/P1816)
- [洛谷 P1886 滑动窗口 /【模板】单调队列](https://www.luogu.com.cn/problem/P1886)
