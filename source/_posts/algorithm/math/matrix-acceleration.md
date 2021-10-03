---
title: 矩阵加速学习笔记
tags:
  - 矩阵
categories:
  - 算法笔记
keywords:
  - 矩阵
  - 矩阵快速幂
  - 算法竞赛
description: 矩阵加速学习笔记
hide: false
comments: true
katex: true
sticky: 0
sitemap: true
date: 2021-10-02 17:22:32
---

{% note info %}
本文章最后更新日期为：2021-10-02
{% endnote %}

{% note info %}
前置知识：矩阵乘法，快速幂
{% endnote %}

## 引入

当我们在做题时，常常发现对于某个问题而言可以轻而易举地推出求解的递推式，但如何快速求解就像时挡在我们面前的一座大山，现在我门就来系统的说说如何通过矩阵来加速此类运算。

## 例子：斐波那契数列

递推式:

$$
f_{i} =
\begin{cases}
  1, & i \leq 2 \\
  f_{i - 1} + f_{i - 2}, & otherwise
\end{cases}
$$

当需要求解的范围在$10^{7}$内时我们可以使用$O(n)$的方法来进行求解，但是如果$n \geq 10^{7}$ 时就显得心有余而力不足了，这时候**矩阵快速幂**就可以解决此类问题。

我们定义一个 $1 \times 2$ 的矩阵

$$
m_{i} =
\begin{bmatrix}
  f_{i} & f_{i - 1}
\end{bmatrix}
$$

则：

$$
m_{i - 1} =
\begin{bmatrix}
  f_{i - 1} & f_{i - 2}
\end{bmatrix}
$$

不难发现，

$$
m_{i} = m_{i - 1} \times
\begin{bmatrix}
  1 & 1 \\
  1 & 0
\end{bmatrix}
$$

那么：

$$
m_{i} = m_{2} \times
\begin{bmatrix}
  1 & 1 \\
  1 & 0
\end{bmatrix}^{i - 2}
$$

{% note info Talk is cheap. Show me the code. %}

[洛谷 P1962 斐波那契数列](https://www.luogu.com.cn/problem/P1962)

```cpp
#include <cstdint>
#include <cstring>
#include <iostream>

using namespace std;

typedef int_fast64_t int64;

constexpr int64 MOD = 1e9 + 7;

int64 n;

class Matrix {
 public:
  int64 row, col;
  int64 num[2][2];
  Matrix(const int64 row, const int64 col) {
    this->row = row;
    this->col = col;
    memset(num, 0, sizeof(num));
  }
};

inline Matrix operator*(const Matrix &lMat, const Matrix &rMat) {
  Matrix res(lMat.row, rMat.col);
  for (int64 i = 0; i < res.row; ++i) {
    for (int64 k = 0; k < lMat.col; ++k) {
      for (int64 j = 0; j < res.col; ++j) {
        res.num[i][j] =
            (res.num[i][j] + (lMat.num[i][k] * rMat.num[k][j]) % MOD) % MOD;
      }
    }
  }
  return res;
}

Matrix base(2, 2), ans(1, 2);

void qpow(int64 y) {
  while (y) {
    if (y & 1) {
      ans = ans * base;
    }
    base = base * base;
    y >>= 1;
  }
}

int main() {
  ios::sync_with_stdio(false);

  cin >> n;

  if (n <= 2) {
    cout << 1 << endl;
    return 0;
  }

  base.num[0][0] = 1;
  base.num[0][1] = 1;
  base.num[1][0] = 1;

  ans.num[0][0] = 1;
  ans.num[0][1] = 1;

  qpow(n - 2);
  cout << ans.num[0][0] % MOD << endl;

  return 0;
}

```

{% endnote %}

## 如何构造常系数矩阵

在我们推导出递推式后，如何构造一个矩阵来进行矩阵快速幂就成为难点，以下总结了一些常用的方法来构造这个常数矩阵。

### 无常数项

例子：

$$
f_{i} = f_{i - 1} + f_{i - 3}
$$

由于 $f_{i}$ 与 $f_{i - 1}$ 和 $f_{i - 3}$ 有关，并没有其中的 $f_{i - 2}$，如果我们将矩阵设置为：

$$
m_{i} =
\begin{bmatrix}
  f_{i} & f_{i - 3}
\end{bmatrix}
$$

那么就无法通过左乘另一个矩阵来获取 $m_{i + 1}$

我们换一种角度思考，当我们需要获取 $f_{i}$ 时，需要知道 $f_{i - 1}$ 与 $f_{i - 3}$，那么我们就必须要在 $m_{i - 1}$ 这个矩阵中包含 $f_{i - 1}$ 与 $f_{i - 3}$，则一种新的设计为：

$$
m_{i} =
\begin{bmatrix}
  f_{i} & f_{i - 2}
\end{bmatrix}
$$

那么 $f_{i - 2}$ 需要知道 $f_{i - 5}$，这又令我们难受了，于是我们再次重新设计：

$$
m_{i} =
\begin{bmatrix}
  f_{i} & f_{i - 1} & f_{i - 2}
\end{bmatrix}
$$

那么这一次惊喜地发现

$$
m_{i - 1} =
\begin{bmatrix}
  f_{i - 1} & f_{i - 2} & f_{i - 3}
\end{bmatrix}
$$

似乎可以构造常系数矩阵了？

设常系数矩阵为：

$$
K =
\begin{bmatrix}
  k_{0, 0} & k_{0, 1} & k_{0, 2} \\
  k_{1, 0} & k_{1, 1} & k_{1, 2} \\
  k_{2, 0} & k_{2, 1} & k_{2, 2}
\end{bmatrix}
$$

那么就可以使用如下方法计算 $m_{i}$ (由于无法使用双下标，所以这里的 $M(i, j)$ 表示的是 $M$ 矩阵的元素)

$$
m_{i} =
\begin{bmatrix}
  f_{i - 1} + f_{i - 3} = \sum_{j = 0}^{2}{m_{i - 1}(0, j) * K(j, 0)} & f_{i - 2} = \sum_{j = 0}^{2}{m_{i - 1}(1, j) * K(j, 1)} & f_{i - 3} = \sum_{j = 0}^{2}{m_{i - 1}(2, j) * K(j, 2)}
\end{bmatrix}
$$

可以得出

$$
K =
\begin{bmatrix}
  1 & 1 & 0 \\
  0 & 0 & 1 \\
  1 & 0 & 0
\end{bmatrix}
$$

### 常数项与 n 无关

$$
f_{i} = f_{i - 1} + f_{i - 2} + 1
$$

易得:

$$
m_{i - 1} =
\begin{bmatrix}
  f_{i - 1} & f_{i - 2} & f_{i - 3} & 1
\end{bmatrix}
$$

$$
K =
\begin{bmatrix}
  1 & 1 & 0 & 0 \\
  1 & 0 & 1 & 0 \\
  0 & 0 & 0 & 0 \\
  1 & 0 & 0 & 1 \\
\end{bmatrix}
$$

### 常数项与 $n^{1}$ 有关

$$
f_{i} = f_{i - 1} + f_{i - 2} + i - 2
$$

由于矩阵 $m_{i - 1}$ 需要包含 $f_{i - 1}$、$f_{i - 2}$ 和 $i - 2$，可知 $m_{i}$ 需要包含 $f_{i}$、$f_{i - 1}$ 与 $i - 1$：

$$
m_{i} =
\begin{bmatrix}
  f_{i} & f_{i - 1} & i - 1
\end{bmatrix} \\

m_{i - 1} =
\begin{bmatrix}
  f_{i - 1} & f_{i - 2} & i - 2
\end{bmatrix}
$$

转移的时候需要将 $i - 2$ 变换为 $i - 1$，只需要在矩阵中在添加一个元素 $1$ 即可，最终的矩阵如下：

$$
m_{i} =
\begin{bmatrix}
  f_{i} & f_{i - 1} & i - 1 & 1
\end{bmatrix}
$$

常系数矩阵如下：

$$
K =
\begin{bmatrix}
  1 & 1 & 0 & 0 \\
  1 & 0 & 0 & 0 \\
  1 & 0 & 1 & 0 \\
  0 & 0 & 1 & 1
\end{bmatrix}
$$
