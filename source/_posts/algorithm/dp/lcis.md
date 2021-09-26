---
title: LCIS 最长公共上升子序列学习笔记
tags:
  - dp动态规划
  - LIS
  - LCS
categories:
  - 算法笔记
keywords:
  - dp动态规划
  - LIS
  - LCS
description: LCIS 最长公共上升子序列学习笔记
hide: false
comments: true
katex: true
sticky: 0
sitemap: true
date: 2021-09-26 20:13:45
---

{% note info %}
本文章最后更新日期为：2020-09-26
{% endnote %}

## 什么是 LCIS

LCIS 是建立在 LIS 与 LCS 的基础之上的问题。需要我们求解不同序列的公共子序列中的最长上升子序列等问题。

### 例子

假设我们拥有以下两个序列：

$$
a : 2 \ 2 \ 1 \ 3 \\
b : 2 \ 1 \ 2 \ 3
$$

那么这两个序列的最长公共上升子序列就是 $1 \ 3$，长度为 $2$

## 解决方法

### 状态设计

习惯性写下了状态的表示：

$$
dp_{i, j} \text{ 表示 } a_{1 \sim i} \text{ 与 } b_{1 \sim j} \text{ 的 LCIS 的长度 }
$$

### 初始化

由于当子序列长度为 $1$ 时并不存在 LCIS，所以进行如下初始化：

$$
dp_{1, 1} = \infty
$$

### 转移

- 当 $a_{i} \neq b_{j}$ 时，由于我们外层循环为 $i$，所以此时 $dp_{i, j} = dp_{i - 1, j}$
- 当 $a_{i} = b_{j}$ 时，我们需要选出一个 $1 \leq k < j$ 且 $b_{k} < a_{i}$ 使得 $dp_{i, k}$ 最大，则此时这个最大值为
  $$
  dp_{i, j} = \max \limits_{2 \leq k < j \land b_{k} < a_{i}}(dp_{i - 1, k}) + 1
  $$

综上，转移如下：

$$
dp_{i, j} =
\begin{cases}
  dp_{i - 1, j}, & a_{i} \neq b_{i} \\
  \max \limits_{2 \leq k < j \land b_{k} < a_{i}}(dp_{i - 1, k}) + 1, &\text{otherwise}
\end{cases}
$$

此时就可以使用三重循环来计算

```cpp
for (int i = 2; i <= n; ++i) {
  for (int j = 2; j <= n; ++j) {
    if (a[i] != b[j]) {
      dp[i][j] = dp[i - 1][j];
    } else {
      int maxVal = 0;
      for (int k = 2; k < j; ++k) {
        if (b[k] < a[i]) {
          maxVal = max(maxVal, dp[i - 1][k]);
        }
      }
      dp[i][j] = maxVal + 1;
    }
  }
}
```

但是这样的时间复杂度为 $O(n^{3})$，能不能对其进行优化呢？

我们发现当计算到 $a_{i} = b_{j}$ 时需要使用第三层循环来寻找 $k$，那么有没有一种方法能够快速寻找 $\max \limits_{2 \leq k < j \land b_{k} < a_{i}}(dp_{i - 1, k})$。

基于以上想法，我们拥有两种常见思路：

- 构建 ST 表来做 RMQ，但对于每一个 $i$ 都需要重新构建一次，复杂度为 $O(n \log_{2}n)$，比原先的暴力循环更慢
- 滑动窗口（单调队列）求最大值，同样对于每一个 $i$ 都需要重新计算区间最值，同时区间长度不定，与暴力循环无区别

以上常见的方法都不行，那我们从转移本身进行思考，对于每一对 $i, j$，当内层对 $j$ 循环时外层的 $i$ 保持不变，则我们在循环 $i$ 时记录一个变量 `maxVal` 表示 $\max \limits_{2 \leq k < j \land b_{k} < a_{i}}(dp_{i - 1, k})$，当 $j$ 增加 $1$ 时对新的 $b_{j}$ 进行判断是否需要更新 `maxVal` 即可。时间复杂度为 $O(1)$。

{% note info 优化后的代码 %}

```cpp
int maxVal = 0;
for (int i = 2; i <= n; ++i) {
  maxVal = 0;
  if (a[i] > b[1]) {
    maxVal = dp[i - 1][1];
  }
  for (int j = 2; j <= n; ++j) {
    if (a[i] == b[j]) {
      dp[i][j] = maxVal + 1;
    } else {
      dp[i][j] = dp[i - 1][j];
    }
    if (a[i] > b[j]) {
      maxVal = max(maxVal, dp[i - 1][j]);
    }
  }
}
```

{% endnote %}

### 时间复杂度

综上，整体时间复杂度为 $O(n^{2})$，1s 内 $n$ 的最大值约为 $10^{4}$

## 类似练习

- [AcWing 272. 最长公共上升子序列](https://www.acwing.com/problem/content/description/274/)
