---
title: 单调栈学习笔记
tags:
  - 单调栈
  - 数据结构
categories: 数据结构
keywords:
  - 单调栈
  - 数据结构
description: 单调栈学习笔记
hide: false
comments: true
katex: false
sticky: 0
sitemap: true
date: 2021-08-23 19:26:07
updated: 2021-08-23 19:26:07
---

## 单调栈是什么

从名字上来看**单调栈**与[**单调队列**](../monotonic-queue/)十分的相似，同样的它们的具体内容也十分的相似。单调栈本质上是一个**栈**，这个栈中的元素是**严格有序**（即不存在相等元素）的，所以栈顶元素总是比栈里的元素大或小，用公式表达如下：

$$
\forall i \in \left[0, n\right) \begin{cases}
  Stack_{i + 1} > Stack_{i}, & NGE \\
  Stack_{i + 1} < Stack_{i}, & NLE
\end{cases}
$$

其中**NGE**指的是 Next Greater Element，即下一个比它大的元素，而**NLE**指的是 Next lower Element，即下一个比它小的元素。

## 单调栈用来干什么

解决 NGE、NLE 问题。

## 如何维护单调栈

以 NGE 问题为例。

{% note info %}
例题：[洛谷 P5788 【模板】单调栈](https://www.luogu.com.cn/problem/P5788)
{% endnote %}

我们需要获取序列中第$i$个元素之后第一个大于$a_{i}$的元素的**下标**，联想到单调栈的性质即使用单调栈解决此题。

我们维护一个栈`stack`，遍历序列$a$时进行如下操作：

1. 检查`stack`是否为空，如果是则将`i`入栈并进行下一次判断（`continue`）。
2. 不断检查`stack`的栈顶元素（下标）在$a$中的取值并且如果$a\left[i\right] > a\left[stack.top\right]$，就将`stack.top`的答案设置为`i`，因为`i`为下一个比它大的元素。

不难发现，经过以上的维护，栈`stack`内的元素始终是有序的，所以答案的正确性也就得到了保证。

code:

```cpp
#include <iostream>
#include <stack>

using namespace std;

const uint32_t MAX_N = 3e6 + 10;

uint32_t n;
uint32_t a[MAX_N], ans[MAX_N];
stack<uint32_t> stk;

int main() {
  ios::sync_with_stdio(false);

  cin >> n;
  for (uint32_t i = 1; i <= n; ++i) {
    cin >> a[i];
  }

  for (uint32_t i = 1; i <= n; ++i) {
    while (stk.size() && a[stk.top()] < a[i]) {
      ans[stk.top()] = i;
      stk.pop();
    }
    stk.push(i);
  }

  for (uint32_t i = 1; i <= n; ++i) {
    cout << ans[i] << ' ';
  }
  cout << endl;

  return 0;
}

```
