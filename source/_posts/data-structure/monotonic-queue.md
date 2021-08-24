---
title: 单调队列学习笔记
tags:
  - 单调队列
  - 数据结构
categories: 数据结构
keywords:
  - 单调队列
  - 数据结构
description: 单调队列学习笔记
hide: false
comments: true
katex: true
sticky: 0
sitemap: true
date: 2021-08-24 19:31:13
---

{% note info %}
本文章最后更新日期为：2021-08-24
{% endnote %}

## 单调队列是什么
与[单调栈](../monotonic-stack/)类似，单调队列同样本质上仍任是一个队列，不过队列中的元素是有序的。

## 单调队列用来干什么
众所周知，单调队列主要用来解决滑动窗口问题。

{% note info %}
滑动窗口问题所指的是在给定的序列 $m$ 中寻找所有长度为 $k$ 连续区域 $\left[l, r\right]$ 内的最大值/最小值问题。
{% endnote %}

而使用单调队列解决滑动窗口的时间复杂度为 $O(n)$，比ST表、线段树、树状数组、[平衡树](../fhq-treap/)更优。

## 单调队列的思想
以[洛谷 P1886 滑动窗口 /【模板】单调队列](https://www.luogu.com.cn/problem/P1886)为例子介绍。

创建两个`deque`作为单调队列（一个存储最大值，另一个最小值）。

样例：
当我们读入整个序列之后，开始遍历，初始时 $i$ 的位置如下：

$$
a: \colorbox{RoyalBlue}{\color{Red}{1}} \quad 3 \quad -1 \quad -3 \quad 5 \quad 3 \quad 6 \quad 7 \newline
deque_{max}: \text{empty} \newline
deque_{min}: \text{empty}
$$

由于此时的长度还不满足 $k$，并且两个`deque`都为空，所以将 $1$ 的下表`1`加入两个`deque`。接着将`i`自增。

{% note info 为什么是添加下标到队列中而不是值？ %}
为了在长度超过 $k$ 时对队列进行元素弹出，所以添加下标进入队列中以便判断，并且也可以通过下标访问对应的值，但通过值查找下标就显得十分不便。 
{% endnote %}

$$
a: \colorbox{RoyalBlue}{1 \quad \color{Red}{3}} \quad -1 \quad -3 \quad 5 \quad 3 \quad 6 \quad 7 \newline
deque_{max}: 1 \newline
deque_{min}: 1
$$

当我们将要把 $3$ 加入`dequeMax`时，发现里边已经非空，于是进行以下操作：
1. 判断新加入的 $x$ 与`deque`的最后一位 $end$ 对应的 $a_{end}$ 进行比较，如果 $x \geqslant a_{end}$ 就将 $end$ 弹出，并且重复此操作直到 $x < a_{end}$。
2. 加入 $x$ 的下标`i`到`deque`中。

最小值同理。

进行完以上操作后结果如下：
$$
a: \colorbox{RoyalBlue}{1 \quad \color{Red}{3}} \quad -1 \quad -3 \quad 5 \quad 3 \quad 6 \quad 7 \newline
deque_{max}: 2 \newline
deque_{min}: 1
$$

继续进行下一次操作，操作完成之后：
$$
a: \colorbox{RoyalBlue}{1 \quad 3 \quad \color{Red}{-1}} \quad -3 \quad 5 \quad 3 \quad 6 \quad 7 \newline
deque_{max}: 2 \newline
deque_{min}: 3
$$

继续！
$$
a: \colorbox{Salmon}{1} \quad \colorbox{RoyalBlue}{3 \quad -1 \quad \color{Red}{-3}} \quad 5 \quad 3 \quad 6 \quad 7 \newline
deque_{max}: 2 \newline
deque_{min}: 3
$$

此时发现长度大于 $k$ 了，进行以下操作：
1. 先判断 $x$ 加入`deque`中。
2. 如果`deque`的开头的元素的下标 $start$ 小于等于 $i - k$，说明该下标所对应的值不再被包含在区间之内，将 $start$ 从`deque`中弹出。

最小值同理。

那么如何维护答案呢？
我们惊讶的发现，当 $i \geqslant k$ 时，需要输出此时的答案，那么此时的答案也正好为两个`deque`的队列头部。
所以将他们添加到答案序列`ans`中（并不弹出）。

最后是每一步的状态示意：
$$
a: \colorbox{RoyalBlue}{1 \quad 3 \quad \color{Red}{-1}} \quad -3 \quad 5 \quad 3 \quad 6 \quad 7 \newline
deque_{max}: 2 \newline
deque_{min}: 3 \newline
ans_{max}: a_{2} \newline
ans_{min}: a_{3}
$$

$$
a: 1 \quad \colorbox{RoyalBlue}{3 \quad -1 \quad \color{Red}{-3}} \quad 5 \quad 3 \quad 6 \quad 7 \newline
deque_{max}: 2 \newline
deque_{min}: 4 \newline
ans_{max}: a_{2} \quad a_{2} \newline
ans_{min}: a_{3} \quad a_{4}
$$

$$
a: 1 \quad 3 \quad \colorbox{RoyalBlue}{-1 \quad -3 \quad \color{Red}{5}} \quad 3 \quad 6 \quad 7 \newline
deque_{max}: 5 \newline
deque_{min}: 4 \newline
ans_{max}: a_{2} \quad a_{2} \quad a_{5} \newline
ans_{min}: a_{3} \quad a_{4} \quad a_{4}
$$

$$
a: 1 \quad 3 \quad -1 \quad \colorbox{RoyalBlue}{-3 \quad 5 \quad \color{Red}{3}} \quad 6 \quad 7 \newline
deque_{max}: 5 \newline
deque_{min}: 4 \newline
ans_{max}: a_{2} \quad a_{2} \quad a_{5} \quad a_{5} \newline
ans_{min}: a_{3} \quad a_{4} \quad a_{4} \quad a_{4}
$$

$$
a: 1 \quad 3 \quad -1 \quad -3 \quad \colorbox{RoyalBlue}{5 \quad 3 \quad \color{Red}{6}} \quad 7 \newline
deque_{max}: 7 \newline
deque_{min}: 6 \newline
ans_{max}: a_{2} \quad a_{2} \quad a_{5} \quad a_{5} \quad a_{7} \newline
ans_{min}: a_{3} \quad a_{4} \quad a_{4} \quad a_{4} \quad 1_{6}
$$

$$
a: 1 \quad 3 \quad -1 \quad -3 \quad 5 \quad \colorbox{RoyalBlue}{3 \quad 6 \quad \color{Red}{7}} \newline
deque_{max}: 8 \newline
deque_{min}: 6 \newline
ans_{max}: a_{2} \quad a_{2} \quad a_{5} \quad a_{5} \quad a_{7} \quad a_{8} \newline
ans_{min}: a_{3} \quad a_{4} \quad a_{4} \quad a_{4} \quad 1_{6} \quad a_{6}
$$

最后的答案序列也就是：
$$
ans_{max}: 3 \quad 3 \quad 5 \quad 5 \quad 6 \quad 7 \newline
ans_{min}: -1 \quad -3 \quad -3 \quad -3 \quad 3 \quad 3
$$

code：
```cpp
#include <deque>
#include <iostream>
#include <vector>

using namespace std;

class Num {
 public:
  int32_t id, val;

  Num(const int32_t id, const int32_t val) {
    this->id = id;
    this->val = val;
  }
};

int32_t n, k;
deque<Num> deq[2];
vector<int32_t> ans[2];

int main() {
  cin >> n >> k;

  Num tmp = Num(0, 0);
  for (int32_t i = 1, x; i <= n; ++i) {
    cin >> x;
    tmp = Num(i, x);
    while (deq[0].size() && x >= deq[0].back().val) {
      deq[0].pop_back();
    }
    while (deq[1].size() && x <= deq[1].back().val) {
      deq[1].pop_back();
    }

    deq[0].push_back(tmp);
    deq[1].push_back(tmp);

    while (i - k >= deq[0].front().id) {
      deq[0].pop_front();
    }
    while (i - k >= deq[1].front().id) {
      deq[1].pop_front();
    }

    if (i >= k) {
      ans[0].push_back(deq[1].front().val);
      ans[1].push_back(deq[0].front().val);
    }
  }

  for (auto i : ans[0]) {
    cout << i << ' ';
  }
  cout << endl;
  for (auto i : ans[1]) {
    cout << i << ' ';
  }
  cout << endl;

  return 0;
}

```

什么？神犇你说太简单了？那么来点更刺激的行不行？
## 二维滑动窗口
（浅坑，待填）

## 最后再来亿点点练习
* [洛谷 P1886 滑动窗口 /【模板】单调队列](https://www.luogu.com.cn/problem/P1886)
* [洛谷 P1440 求m区间内的最小值](https://www.luogu.com.cn/problem/P1440)
