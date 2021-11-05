---
title: C++输入输出性能对比测试
tags:
  - cpp
keywords:
  - C++
  - 信息学竞赛
  - OI
  - 输入输出
  - 快读快写
description: 各种 C++ 中的输入输出方式的性能对比测试
categories:
  - 算法
sticky: 0
hide: false
comments: true
katex: true
sitemap: true
date: 2021-04-10 00:00:00
updated: 2021-11-05 00:00:00
---

## 朴素方式

这种方法也是**最朴素**（应该是 C++最初就学习的吧）的一种输入与输出

```cpp
cin >> a >> b;
cout << a << b;
```

## 借助 C 语言优势

这在信息学竞赛中就比较常见了，作为 C 语言的输入输出，自然要比未解锁同步流的 `cin` 更快一些。

```cpp
scanf("%d%d", &a, &b);
printf("%d%d", a, b);
```

## 使用 C++ 自身优势

C++ 中的默认的输入输出怎么能比 C 语言还慢呢？这不，取消与 C 的输入输出同步流之后速度就上来了。

```cpp
ios::sync_with_stdio(false); // 取消同步
cin.tie(nullptr); // 取消 cin 与 cout 的绑定
cout.tie(nullptr);

cin >> a >> b;
cout << a << b;
```

但需注意解锁同步流之后就不能与 C 的输入输出混用了。

## 快读/快写

竞赛中常见的快读快写（卡常）方法。

```cpp
template <typename T>
void read(T &x) {
  x = 0;
  T inv = 1;
  auto ch = getchar();
  while (!isdigit(ch)) {
    if (ch == '-') {
      inv = -1;
    }
    ch = getchar();
  }
  while (isdigit(ch)) {
    x = x * 10 + ch - '0';
    ch = getchar();
  }
  x *= inv;
}

template <typename T>
void write(T x) {
  if (x < 0) {
    putchar('-');
    x = -x;
  }

  if (x > 9) {
    write(x / 10);
  }

  putchar(x % 10 + '0');
}
```

## 性能对比

测试用的随机生成代码如下：

```cpp
#include <climits>
#include <ctime>
#include <iostream>
#include <random>

using namespace std;

constexpr int MAX_N = (int)1e7;

int main() {
  mt19937 rng((int64_t)time(nullptr));
  uniform_int_distribution<long long> dist(INT64_MIN, INT64_MAX);

  for (int i = 1; i <= MAX_N; ++i) {
    cout << dist(rng) << '\n';
  }

  return 0;
}

```

先随机生成 $10^{7}$ 个`long long`类型的数据进行测试。

文件大小：$213796511$ 字节

编译选项：

```bash
g++ -std=c++11 -O2 -march=native
```

测试平台信息如下：

|          | 1 号测试机              | 2 号测试机                       | 3 号测试机                    |
| -------- | ----------------------- | -------------------------------- | ----------------------------- |
| CPU      | i5-8400                 | NVIDIA Tegra X1 (ARM Cortex-A57) | i5-7500                       |
| 硬盘     | Intel 760p              | SanDisk Extreme Pro 64GB         | Intel Optane 16G              |
| GCC 版本 | `10.2.0 (Rev10, MSYS2)` | `7.5.0 (Ubuntu 18.04)`           | `gcc version 9.2.0 (tdm64-1)` |

### 1 号测试机

|           | 读入(s)  | 输出(s)  |
| --------- | -------- | -------- |
| 朴素方式  | $15.028$ | $39.006$ |
| C 语言    | $6.429$  | $3.137$  |
| C++解锁   | $2.336$  | $39.293$ |
| 快读/快写 | $2.803$  | $2.852$  |

### 2 号测试机

|           | 读入(s)  | 输出(s)  |
| --------- | -------- | -------- |
| 朴素方式  | $11.035$ | $75.731$ |
| C 语言    | $4.168$  | $4.855$  |
| C++解锁   | $3.753$  | $68.040$ |
| 快读/快写 | $1.254$  | $2.219$  |

### 3 号测试机

|           | 读入(s) | 输出(s) |
| --------- | ------- | ------- |
| 朴素方式  | $29.19$ | $64.45$ |
| C 语言    | $11.21$ | $7.36$  |
| C++解锁   | $4.048$ | $7.31$  |
| 快读/快写 | $5.766$ | $7.004$ |
