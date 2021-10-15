---
title: 双端栈学习笔记
tags:
  - 双端栈
  - 数据结构
categories: 数据结构
keywords:
  - 双端栈
  - 数据结构
  - 信息学竞赛
  - 栈
description: 双端栈学习笔记——名字虽相似，但与双端队列完全不同
hide: false
comments: true
katex: true
sticky: 0
sitemap: true
date: 2021-08-24 16:33:23
---

{% note info %}
本文章最后更新日期为：2021-10-15
{% endnote %}

## 双端栈是什么

简要来说就是一个**数组**，这个数组**模拟**两个栈，这两个栈的**栈底**分别在数组的两端，而栈顶向数组中间延伸。

## 双端栈的用处

有效利用存储空间（**个人感觉根本没什么用处，建议不是学有余力就先学学其他的东西吧！**）。

## 如何维护双端栈

### 开辟数组作为双端栈的基础

根据需要进行调整。

```cpp
constexpr int MAX_N = 1e5 + 10;
int stk[MAX_N];
```

### 初始化

初始化时需要将**左侧的栈顶**初始化为 $-1$，将**右侧的栈顶**初始化为数组的尾部 $\text{MAX\_N}$

$$
\begin{cases}
  top_{l} &\gets -1 \\
  top_{r} &\gets MAX\_N
\end{cases}
$$

```cpp
int topL = -1;
int topR = MAX_N;
```

### 入栈

为了将某一元素 $x$ 压入栈中，我们根据常规写法将元素放入数组对应的位置并且将栈顶后移（前移）。

$$
\begin{cases}
  top_{1} \gets top_{1}+1, \ stk_{top_{1}} \gets x, & \text{add to stack 1} \\
  top_{2} \gets top_{2}-1, \ stk_{top_{2}} \gets x, & \text{add to stack 2}
\end{cases}
$$

```cpp
stk[++top1] = x;
stk[--top1] = x;
```

### 取栈顶

将`top1`或`top2`位置对应的值取出即为栈顶。

```cpp
return stk[top1];
return stk[top2];
```

### 出栈

将对应的栈顶减 $1$ 或加 $1$ 即可。
当然需要判断一下是否会溢出。

$$
\begin{cases}
  top_{1} \gets top_{1} - 1, & \text{pop from stack 1} \\
  top_{2} \gets top_{2} + 1, & \text{pop from stack 2}
\end{cases}
$$

```cpp
--top1;
++top2;
```

### 判断栈是否为空

直接根据栈顶`top1`与`top2`是否在初始位置即可判断栈是否为空。

```cpp
if (top1 == -1) {
  return STACK1_EMPTY;
}
if (top2 == MAX_N) {
  return STACK2_EMPTY;
}
```

### 判断是否栈满

由于两个栈共享同一个数组，所以栈满时当且仅当：

$$
top_{1} = top_{2} - 1
$$

```cpp
if (top1 == top2 - 1) {
  return STACK_FULL;
}
```

### 获取每个栈的长度

根据`top1`与`top2`可以知道每一个栈的长度。

$$
\begin{cases}
  length_{stack1} = top_{1} + 1 \\
  length_{stack2} = MAX\_N - top_{2}
\end{cases}
$$

### 清空栈

清空栈时只需要将栈顶初始化为原来的值 $-1$ 或 $MAX\_N$。

$$
\begin{cases}
  top_{1} \gets -1, & \text{clear stack 1} \\
  top_{2} \gets MAX\_N, & \text{clear stack 2}
\end{cases}
$$

```cpp
top1 = -1;
top2 = MAX_N;
```

## Code

{% note info 手写版code %}

```cpp
class DoubleEndedStack {
 public:
  std::vector<int32_t> doubleEndedStack;
  int32_t top1, top2, length;

  DoubleEndedStack(const int32_t length) {
    this->length = length;
    this->doubleEndedStack = std::vector<int32_t>(length);
    this->top1 = -1;
    this->top2 = length;
  }

  bool full() {
    if (this->top1 == this->top2 - 1) {
      return true;
    } else {
      return false;
    }
  }

  bool empty(const int32_t stack) {
    if (stack == 1) {
      if (this->top1 == -1) {
        return true;
      } else {
        return false;
      }
    } else {
      if (this->top2 == this->length) {
        return true;
      } else {
        return false;
      }
    }
  }

  bool push(const int32_t stack, const int32_t x) {
    if (full()) {
      return false;
    }

    if (stack == 1) {
      this->doubleEndedStack[++top1] = x;
    } else {
      this->doubleEndedStack[--top2] = x;
    }
    return true;
  }

  int32_t top(const int32_t stack) {
    if (!empty(stack)) {
      if (stack == 1) {
        return this->doubleEndedStack[top1];
      } else {
        return this->doubleEndedStack[top2];
      }
    } else {
      return 0;
    }
  }

  bool pop(const int32_t stack) {
    if (empty(stack)) {
      if (stack == 1) {
        --this->top1;
      } else {
        ++this->top2;
      }
      return true;
    } else {
      return false;
    }
  }

  int32_t len(const int32_t stack) {
    if (stack == 1) {
      return this->top1 + 1;
    } else {
      return this->length - this->top2;
    }
  }

  void clear(const int32_t stack) {
    if (stack == 1) {
      this->top1 = -1;
    } else {
      this->top2 = length;
    }
  }
};
```

{% endnote %}

{% note info STL版 %}

```cpp
class DoubleEndedStack {
 public:
  std::stack<int32_t> s1, s2;

  DoubleEndedStack() {}

  void push(const int32_t stk, const int32_t x) {
    if (stk == 1) {
      this->s1.push(x);
    } else {
      this->s2.push(x);
    }
  }

  int32_t top(const int32_t stk) {
    if (stk == 1) {
      return this->s1.top();
    } else {
      return this->s2.top();
    }
  }

  void pop(const int32_t stk) {
    if (stk == 1) {
      this->s1.pop();
    } else {
      this->s2.pop();
    }
  }

  bool empty(const int32_t stk) {
    if (stk == 1) {
      return this->s1.empty();
    } else {
      return this->s2.empty();
    }
  }

  int32_t len(const int32_t stk) {
    if (stk == 1) {
      return this->s1.size();
    } else {
      return this->s2.size();
    }
  }

  void clear(const int32_t stk) {
    std::stack<int32_t> s;
    if (stk == 1) {
      this->s1.swap(s);
    } else {
      this->s2.swap(s);
    }
  }
};
```

{% endnote %}
