---
title: C++输入输出性能对比测试
tags:
  - 教程
keywords:
  - C++
  - 信息学竞赛
  - OI
  - 输入输出
  - 快读快写
description: 各种C++中的输入输出方式的性能对比测试
categories:
  - 教程
sticky: 0
hide: false
comments: true
katex: true
sitemap: true
date: 2021-04-10 14:06:39
updated: 2021-04-10 14:06:39
---

## 朴素方式

这种方法也是**最朴素**（应该是 C++最初就学习的吧）的一种输入与输出

### 输入

```cpp
cin >> a >> b;
```

### 输出

```cpp
cout << a << b;
```

## 借助 C 语言优势

这在信息学竞赛中就比较常见了，作为 C 语言的输入输出，自然要比`cin`（未解锁）时更快一些。

### 输入

```cpp
scanf("%d%d", &a, &b);
```

### 输出

```cpp
printf("%d%d", a, b);
```

## 使用 C++自身优势

话说 C++中的默认的输入输出怎么能比 C 语言还慢呢？这不，解个锁速度就上来了。

### 解锁

```cpp
ios::sync_with_stdio(false);
cin.tie(nullptr);
cout.tie(nullptr);
```

剩下的就和默认一样使用就好了。

### 输入

```cpp
cin >> a >> b;
```

### 输出

```cpp
cout << a << b;
```

## 快读/快写

祖传信息学竞赛快读快写（卡常）方法。优点就不多介绍了。

### 输入

```cpp
inline int read() {
    register int x = 0, inv = 1;
    register char c = getchar();

    while (c < '0' || c > '9') {
        if (c == '-') {
            inv = -1;
        }

        c = getchar();
    }

    while (c >= '0' && c <= '9') {
        x = x * 10 + c - '0';
        c = getchar();
    }

    return x * inv;
}
```

### 输出

```cpp
inline void write(register int x) {
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
#include <iostream>
#include <random>

const unsigned int NUMBER_SIZE = 1e7;

int main() {

  std::mt19937 rng(std::random_device{}());
  for (unsigned int i = 1; i <= NUMBER_SIZE; ++i) {
    std::cout << rng() << std::endl;
  }

  return 0;
}

```

先随机生成 $10^{7}$ 个`unsigned int`类型的数据进行测试。

文件大小：$117413596$ 字节

编译选项

```bash
g++ -std=c++11 -O2 -march=native
```

测试平台信息如下：

|          | 1 号测试机              | 2 号测试机                   |
| -------- | ----------------------- | ---------------------------- |
| CPU      | i5-8400                 | ARM Cortex-A57               |
| 内存     | DDR4 3200Mhz            | 64-bit LPDDR4 25.6GB/s       |
| 硬盘     | Intel 760p              | SanDisk Extreme Pro 64GB V30 |
| GCC 版本 | `10.2.0 (Rev10, MSYS2)` | `7.5.0 (Ubuntu 18.04)`       |

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
