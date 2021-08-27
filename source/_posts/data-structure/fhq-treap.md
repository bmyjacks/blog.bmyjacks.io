---
title: FHQ Treap学习笔记
tags:
  - FHQ Treap
  - Treap
  - 平衡树
  - 数据结构
categories: 数据结构
keywords:
  - FHQ Treap
  - Treap
  - 平衡树
  - 数据结构
description: FHQ Treap学习笔记
hide: false
comments: true
katex: true
sticky: 0
sitemap: true
date: 2021-08-23 21:24:14
---

{% note info %}
本文章最后更新日期为：2021-08-24
{% endnote %}

## FHQ Treap 是什么

要明白这个问题，我们首先得明白 Treap 是什么。

{% note info %}
树堆（Treap），是有一个随机附加域满足堆的性质的二叉搜索树，其结构相当于以随机数据插入的二叉搜索树。相对于其他的平衡二叉搜索树，Treap 的特点是实现简单，且能基本实现随机平衡的结构。（摘录自百度百科）
{% endnote %}

那就十分奇怪了，Treap 之前的 FHQ 又是什么意思呢？
**注意：FHQ Treap 是 FHQ 神犇发明的！**

FHQ Treap 相比普通的 Treap 的不同点：

- 不需要进行旋转
- 可以进行可持久化
- 易于理解
- 但常数比普通的 Treap 大

## FHQ Treap 用来干什么

FHQ Treap 支持以下操作：

- 插入 $x$
- 删除一个 $x$
- 查询排名为 $k$ 的数
- 查询 $x$ 的排名
- 查询 $x$ 的前驱（最大的小于 $x$ 的数）
- 查询 $x$ 的后继（最小的大于 $x$ 的数）
- 区间翻转（本文暂时不涉及）
- 可持久化（本文暂时不涉及）

普通 Treap 可以干的活 FHQ Treap 也可以！

## FHQ Treap 的主要思想

### 组成部分

节点、节点数值、节点左右儿子、随机权值、子树大小、目前节点总数量、FHQ Treap 的根节点。

```cpp
node, val[node], son[node][0], son[node][1], rnd[node], treeSize[node], cnt, root
```

### 更新

一般的更新为更新节点的子树的大小：

$$
size_{node} \gets size_{node.leftSon} + size_{node.rightSon} + 1
$$

将节点`node`的左儿子的子树大小与右儿子的子树大小相加之后再增加 $1$（还有`node`自己）之后就是`node`子树的大小了。

```cpp
inline void update(int node) {
  treeSize[node] = treeSize[son[node][0]] + treeSize[son[node][1]] + 1;
}
```

### 分裂

#### 根据数值进行分裂（常用）

`void split(int node, int y, int &left, int &right)`为数值分裂函数。
其中`node`表示需要分裂的 Treap 的根，`y`为分裂的数值，`left`为左边部分（左子树）的根，`right`为右边部分（右子树）的根。
将 Treap 分为两部分，左子树 $val_{node} \leqslant y$，右子树 $val_{node} > y$。

为了进行数值分裂，需要进行以下步骤：

1. 判断`node`是否存在，若不存在则返回（`return`）。
2. 如果`node`的值**小于等于** $y$ 则将`node`分配到左子树，并且以`node`作为左子树的根，由于**左子树的最大值小于等于**根，所以把`node`的右子树再次进行分裂（将**小于等于** $y$ 的分裂到左子树的根（`left`）的左儿子（`son[left][0]`），而**大于** $y$ 的仍然分裂到右子树`right`。想一想，为什么？）。

{% note info 原因 %}
由于我们在构建 Treap（马上就会讲到）时将节点根据平衡树原则进行分配，所以节点`node`的**左儿子的值小于等于本身**，**右儿子的值大于等于本身**。所以可以确定`node`的左儿子及左儿子的子树中所有的值都小于等于 $y$ ，但无法确定`node`的右儿子中是否存在值大于 $y$ 的情况，于是对右儿子`son[node][1]`进行分裂。分裂时由于先前已经分出左子树，所以我们只需要将右子树中小于等于 $y$ 的分配到左子树根节点的右儿子（因为右子树的值毕竟大于`node`，所以不能分配到左子树根节点`left`的左儿子，我们已经把`node`赋值给了`left`，所以此时`node`和`left`应该是相等的），而大于 $y$ 的部分分配到先前的`right`右子树上去即可。
{% endnote %}

1. 如果`node`的值**大于**`y`则将`node`分配到右子树，并且以`node`作为右子树，由于**右子树的最小值小于**根，所以把左子树再次进行分裂（原因同上）。
2. 更新`node`。

进行数值分裂之后`left`就代表整棵 Treap 中小于等于 $y$ 的树的根节点，而`right`就代表整棵 Treap 中大于 $y$ 的树的根节点。

```cpp
void split(int node, int y, int &left, int &right) {
  if (!node) {
    left = 0;
    right = 0;
    return;
  }

  if (num[node] <= y) {
    left = node;
    split(son[node][1], y, son[left][1], right);
  } else {
    right = node;
    split(son[node][0], y, left, son[right][0]);
  }

  update(node);
}
```

#### 根据子树大小进行分裂

同样的，`void split(int node, int k, int &left, int &right)`为子树大小分裂函数（好像就一个字母的区别）。
函数中的`k`代表根据前 $k$ 个来进行分裂，将前 $k$ 个分裂进入`left`，其他的分入`right`。

步骤：

1. 同样判断`node`是否存在。
2. 如果`node`的左子树大小小于 $k$ 就将`node`设为左子树的根节点，对`node`的右子树进行分裂。
3. 否则将`node`设为右子树的根节点，对`node`的左子树进行分裂。

{% note info 为什么 $k$ 会变化？ %}
我们分裂左子树的时候由于整个左子树的大小小于 $k$，所以将整个左子树分到左边部分，而这时候左边部分的`treeSize`仍然小于 $k$，于是我们需要到右子树进行分裂，而所需要的数量为 $k-size_{node.leftSon}-1$，想一想为什么还需要再减 $1$ 呢？
{% endnote %}

```cpp
void split(int node, int k, int &left, int &right) {
  if (!node) {
    left = 0;
    right = 0;
    return;
  }

  if (treeSize[son[node][0]] < k) {
    left = node;
    split(son[node][1], k - treeSize[son[node][0]] - 1, son[left][1], right);
  } else {
    right = node;
    split(son[node][0], k, left, son[right][0]);
  }

  update(node);
}
```

### 合并

从名字上就可以知道合并是将分裂出来的两颗子树在合并回去。

步骤：

1. 仍然是判断两棵树是否存在。
2. 如果`x`的随机权值小于`y`的随即权值就将`y`合并到`x`的右子树去。
3. 否则将`x`合并到`y`的左子树去。
4. 记得更新`x`和`y`。

{% note info 为什么要基于随机权值？ %}
首先需要明白的是，在 Treap 中，左儿子的值一定小于等于本身的值，而合并时的随机权值决定的只是整个 Treap 的结构。

为了保证整棵树趋于平衡（不然也不会叫平衡树了），我们就需要对每一个节点赋予一定的权值，这个权值与本身的值并没有必然联系，但可以保证我们整个 Treap 趋于平衡。这也是我们不在 merge 中直接随机分配的原因。
{% endnote %}

为了使用方便，我们将合并起来的两棵树的根节点作为合并函数的返回值（优点大大的有）。

```cpp
int merge(int x, int y) {
  if (!x || !y) {
    return x ^ y; // 返回 x 和 y 其中不为 0 的数
  }
  if (rnd[x] < rnd[y]) {
    son[x][1] = merge(son[x][1], y);
    update(x);
    return x;
  } else {
    son[y][0] = merge(x, son[y][0]);
    update(y);
    return y;
  }
}
```

### 获取随机数

喂喂喂！现在都什么年代了还在`srand`呢？新神器来了！**C++11** 中隆重登场的`random`库解君愁（如果不能用 C++11 就当我没说。。。）

```cpp
#include <random>

std::mt19937 rng(std::random_device{}());

rnd[node] = rng() % std::numeric_limits<int>::max();
```

至于为什么要取模，因为曾经被溢出支配。

## 其他的操作

有了以上的几种函数，我们就可以进行一些其他的操作了。

### 插入

插入一个新的数 $x$ 需要两个函数：创建节点 `x` 和将 `x` 合并进入 Treap 中。

创建节点十分的简单：

```cpp
int addNode(int x) {
  num[++cnt] = x;
  treeSize[cnt] = 1;
  rnd[cnt] = rng() % std::numeric_limits<int>::max();
  return cnt;
}
```

将节点合并进入 Treap 也十分简单：

```cpp
void insert(int x) {
  int left, right;
  split(root, x, left, right);
  root = merge(merge(left, addNode(x)), right);
}
```

你是不是一下就明白其中的道理了？那么这个`root`又是什么东西？没错，正是整棵 Treap 的根节点！

### 删除

对于**您这种神犇**来说肯定不在话下：

```cpp
void eraser(int x) {
  int left, right, leftRight;
  split(root, x, left, right);
  split(left, x - 1, left, leftRight);
  leftRight = merge(son[leftRight][0], son[leftRight][1]);
  root = merge(merge(left, leftRight), right);
}
```

其实就是合并的时候不把`x`合并就好了。

### 查询 x 的排名

为了获取 $x$ 的排名，我们需要将整棵 Treap 分为两部分，左子树小于等于 $x - 1$，右子树自然就是大于等于 $x$ 的了。
之后我们获取左子树的大小再 $+1$ 就是 $x$ 在整个 Treap 中的排名了！

{% note info 为什么不从 $x$ 进行分裂？ %}
如果分裂时选择将小于等于 $x$ 的分到左子树中，那么如果存在多个 $x$ 的情况下我们就无法知道第一个 $x$ 的排名，同时排名也定义为比 $x$ 小的数字个数加 $1$，那么我们就可以直接按照定义来进行分裂。
{% endnote %}

```cpp
int get_x_k_th(int x) {
  int left, right, kth;
  split(root, x - 1, left, right);
  kth = treeSize[left] + 1;
  root = merge(left, right);
  return kth;
}
```

如果 Treap 里的数**各不相同**，那么就可以联合数值分裂来打败子树大小分裂了！

### 查询排名为 k 的数

几乎同样的步骤：

1. 先看看`node`的左子树的大小，如果为 $k-1$ 那么`node`就是我们要找的数。
2. 如果左子树的大小大于等于 $k$， 那么就在左子树中寻找。
3. 如果左子树的大小小于 $k$，就在右子树中寻找 $k-size_{node.leftSon}-1$ 名。

{% note info 为什么 $k$ 又变了？ %}
当左子树的大小小于 $k$ 时，说明我们需要找的数在右子树中，而我们需要在右子树中查找的排名已经不是 $k$ 了，需要去掉左子树以及`node`。
{% endnote %}

```cpp
int k_th(int node, int k) {
  if (treeSize[son[node][0]] + 1 == k) {
    return num[node];
  } else if (treeSize[son[node][0]] >= k) {
    return k_th(son[node][0], k);
  } else {
    return k_th(son[node][1], k - treeSize[son[node][0]] - 1);
  }
}
```

### 前驱

```cpp
int get_precursor(int x) {
  int left, right, precursor;
  split(root, x - 1, left, right);
  precursor = k_th(left, treeSize[left]);
  root = merge(left, right);
  return precursor;
}
```

### 后继

```cpp
int get_successor(int x) {
  int left, right, successor;
  split(root, x, left, right);
  successor = k_th(right, 1);
  root = merge(left, right);
  return successor;
}
```

{% note warning %}

## 注意事项

在每一次对子树进行修改之后需要进行`update`，否则会遇到一些奇奇怪怪的 bug（有可能样例并未存在这种 bug，当然对拍是个好东西）。
{% endnote %}

## 时间复杂度

巨坑待填

## 最后有亿些比较简单的练习

- [洛谷 P3369 【模板】普通平衡树](https://www.luogu.com.cn/problem/P3369)
- [洛谷 P6136 【模板】普通平衡树（数据加强版）](https://www.luogu.com.cn/problem/P6136)
- [洛谷 P3391 【模板】文艺平衡树](https://www.luogu.com.cn/problem/P3391)
- [洛谷 P2234 [HNOI2002]营业额统计](https://www.luogu.com.cn/problem/P2234)

加油，奥里给！
