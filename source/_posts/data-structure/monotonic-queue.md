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
updated: 2021-08-26 19:31:13
---

## 单调队列是什么

与[单调栈](../monotonic-stack/)类似，单调队列同样本质上仍任是一个队列，不过队列中的元素是有序的。

## 单调队列用来干什么

众所周知，单调队列主要用来解决滑动窗口问题。

{% note info %}
滑动窗口问题所指的是在给定的序列 $m$ 中寻找所有长度为 $k$ 连续区域 $\left[l, r\right]$ 内的最大值/最小值问题。
{% endnote %}

而使用单调队列解决滑动窗口的时间复杂度为 $O(n)$，比 ST 表、线段树、树状数组、[平衡树](../fhq-treap/)更优。

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

{% note info 为啥要又弹又加的？ %}
为了确保两个`deque`中元素之中按照一定的顺序进行排列，我们在添加之前需要将不符合顺序的元素弹出（当然因为我们求的是最大值/最小值，所以弹出不是最大值/最小值的元素对答案并无影响）。
{% endnote %}

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

## 时间复杂度的小小说明

什么？你说`for`里套了一个`while`复杂度就是 $O(n^{2})$ 了？ 非也非也。
`deque`中的数是我们之前所添加进来的，也就是说每一个数只会进入 deque 中一次，所以只要`while`或者不在 $k$ 的范围内了就会被弹出。
所以即使`while`在`for`里，单调队列的时间复杂度依然是 $O(n)$ 。

什么？神犇你说太简单了？那么来点更刺激的行不行？

## 二维滑动窗口

以[洛谷 P2216 [HAOI2007]理想的正方形](https://www.luogu.com.cn/problem/P2216)为例，来看看二维的滑动窗口应该如何是好。

我们需要在一个二维的矩阵中计算最大值与最小值，显然可以使用滑动窗口来解决，但是现在还不是说“就这？”的时候，我们仍然需要仔细思考这个二维的滑动窗口问题。

如果将一维的滑动窗口模版套上你会发现这是行不通的。

{% note info 为什么行不通？ %}
当我们直接使用一维的模版时，每一个元素不仅仅进入队列中一次，而是多次进入队列（当需要更换行数，比如从第二行到第三行时），导致性能下降。
{% endnote %}

经过我们的苦思冥想，终于发现：我们并不需要直接进行二维的滑动窗口，一维一维的做不就行了？

首先在这个 $a \times b$ 的矩阵中，我们需要找出 $n \times n$ 的一个区域（其实 $n \times m$，这一题的 $m = n$），计算最大最小值。

$$
\begin{matrix}
 1 & 2 & 5 & 6 \\
 0 & 17 & 16 & 0 \\
 16 & 17 & 2 & 1 \\
 2 & 10 & 2 & 1 \\
 1 & 2 & 2 & 2
\end{matrix}
$$

为了求出 $\left(2, 2 \right)$ 到 $\left(3, 3 \right)$ 这段区间的最大最小值：

$$
\begin{matrix}
 1 & 2 & 5 & 6 \\
 0 & \colorbox{RoyalBlue}{\color{Red}{17}} & \colorbox{RoyalBlue}{\color{Red}{16}} & 0 \\
 16 & \colorbox{RoyalBlue}{\color{Red}{17}} & \colorbox{RoyalBlue}{\color{Red}{2}} & 1 \\
 2 & 10 & 2 & 1 \\
 1 & 2 & 2 & 2
\end{matrix}
$$

我们需要分别知道 $\left(2, 2\right)$ 到 $\left(2, 3\right)$ 的最大最小值，与 $\left(3, 2\right)$ 到 $\left(3, 3\right)$ 的最大最小值即可。

$$
\begin{matrix}
 1 & 2 & 5 & 6 \\
 0 & \colorbox{Orange}{\color{Red}{17}} & \colorbox{Orange}{\color{Red}{16}} & 0 \\
 16 & \colorbox{Purple}{\color{Red}{17}} & \colorbox{Purple}{\color{Red}{2}} & 1 \\
 2 & 10 & 2 & 1 \\
 1 & 2 & 2 & 2
\end{matrix}
$$

将样例的进行每一行的单调队列处理之后的结果：

$$
max_{row_{i, j}} \gets \max_{x \in \left(i - n, i\right]}\left(num_{x, j}\right)

\newline

max_{row}: \quad
\begin{matrix}
 0 & 2 & 5 & 6 \\
 0 & 17 & 17 & 16 \\
 0 & 17 & 17 & 2 \\
 0 & 10 & 10 & 2 \\
 0 & 2 & 2 & 2
\end{matrix}
$$

$$
max_{row_{i, j}} \gets \min_{x \in \left(i - n, i\right]}\left(num_{x, j}\right)

\newline

min_{row}: \quad
\begin{matrix}
 0 & 1 & 2 & 5 \\
 0 & 0 & 16 & 0 \\
 0 & 16 & 2 & 1 \\
 0 & 2 & 2 & 1 \\
 0 & 1 & 2 & 2
\end{matrix}
$$

在此基础上构建每一列的滑动窗口：

$$
max_{column_{i, j}} \gets \max_{x \in \left(j - n, j\right]}\left(max_{row_{i, x}}\right)

\newline

max_{column}: \quad
\begin{matrix}
 0 & 0 & 0 & 0 \\
 0 & 17 & 17 & 16 \\
 0 & 17 & 17 & 16 \\
 0 & 17 & 17 & 2 \\
 0 & 10 & 10 & 2
\end{matrix}
$$

$$
min_{column_{i, j}} \gets \min_{x \in \left(j - n, j\right]}\left(min_{row_{i, x}}\right)

\newline

min_{column}: \quad
\begin{matrix}
 0 & 0 & 0 & 0 \\
 0 & 0 & 2 & 0 \\
 0 & 0 & 2 & 0 \\
 0 & 2 & 2 & 1 \\
 0 & 1 & 2 & 1
\end{matrix}
$$

所以`ans`的结果：

$$
ans_{i,j} \gets max_{column_{i, j}} - min_{column_{i, j}}

\newline

ans: \quad
\begin{matrix}
 0 & 0 & 0 & 0 \\
 0 & 17 & 15 & 16 \\
 0 & 17 & 15 & 16 \\
 0 & 15 & 15 & 1 \\
 0 & 9 & 8 & 1
\end{matrix}
$$

所以二维滑动窗口简要步骤如下：

1. 先对二维的其中一维进行滑动窗口处理。
2. 接着在另一维对已经处理过的那一维进行再次处理。

code：

```cpp
#include <climits>
#include <deque>
#include <iostream>

using namespace std;

const int32_t MAX_A = 1000 + 10;

class Num {
 public:
  int32_t id;
  int32_t val;
  Num(const int32_t id, const int32_t val) {
    this->id = id;
    this->val = val;
  }
};

int32_t a, b, n;

int32_t ability[MAX_A][MAX_A];
int32_t preMaxLine[MAX_A][MAX_A], preMinLine[MAX_A][MAX_A];
int32_t preMaxCol[MAX_A][MAX_A], preMinCol[MAX_A][MAX_A];

int32_t ans = INT32_MAX;
deque<Num> deq[2];  // 0max 1min

int main() {
  ios::sync_with_stdio(false);

  cin >> a >> b >> n;
  for (int32_t i = 1; i <= a; ++i) {
    for (int32_t j = 1; j <= b; ++j) {
      cin >> ability[i][j];
    }
  }

  Num tmp = Num(0, 0);
  for (int32_t i = 1; i <= a; ++i) {
    deq[0].clear();
    deq[1].clear();
    for (int32_t j = 1; j <= b; ++j) {
      tmp = Num(j, ability[i][j]);

      while (deq[0].size() && (ability[i][j] >= deq[0].back().val)) {
        deq[0].pop_back();
      }
      while (deq[1].size() && (ability[i][j] <= deq[1].back().val)) {
        deq[1].pop_back();
      }

      deq[0].push_back(tmp);
      deq[1].push_back(tmp);

      while ((j - n) >= deq[0].front().id) {
        deq[0].pop_front();
      }
      while ((j - n) >= deq[1].front().id) {
        deq[1].pop_front();
      }

      if (j >= n) {
        preMaxLine[i][j] = deq[0].front().val;
        preMinLine[i][j] = deq[1].front().val;
      }
    }
  }

  Num tmpMax = Num(0, 0), tmpMin = Num(0, 0);
  for (int32_t j = 1; j <= b; ++j) {
    deq[0].clear();
    deq[1].clear();
    for (int32_t i = 1; i <= a; ++i) {
      tmpMax = Num(i, preMaxLine[i][j]);
      tmpMin = Num(i, preMinLine[i][j]);

      while (deq[0].size() && (preMaxLine[i][j] >= deq[0].back().val)) {
        deq[0].pop_back();
      }
      while (deq[1].size() && (preMinLine[i][j] <= deq[1].back().val)) {
        deq[1].pop_back();
      }

      while (deq[0].size() && ((i - n) >= deq[0].front().id)) {
        deq[0].pop_front();
      }
      while (deq[1].size() && ((i - n) >= deq[1].front().id)) {
        deq[1].pop_front();
      }

      deq[0].push_back(tmpMax);
      deq[1].push_back(tmpMin);

      if (i >= n) {
        preMaxCol[i][j] = deq[0].front().val;
        preMinCol[i][j] = deq[1].front().val;
      }
    }
  }

  for (int32_t i = n; i <= a; ++i) {
    for (int32_t j = n; j <= b; ++j) {
      ans = min(ans, (preMaxCol[i][j] - preMinCol[i][j]));
    }
  }

  cout << ans << endl;

  return 0;
}

```

## 最后再来亿点点练习

- [洛谷 P1886 滑动窗口 /【模板】单调队列](https://www.luogu.com.cn/problem/P1886)
- [洛谷 P1440 求 m 区间内的最小值](https://www.luogu.com.cn/problem/P1440)
- [洛谷 P2032 扫描](https://www.luogu.com.cn/problem/P2032)
- [洛谷 P2251 质量检测](https://www.luogu.com.cn/problem/P2251)
