---
title: pb_ds 库介绍
tags:
  - 数据结构
  - C++-library
categories: C++-library
keywords:
  - pb_ds
  - gnu
  - oi
  - 信息学竞赛
  - 数据结构
description: pb_ds 库介绍
hide: false
comments: true
katex: true
sticky: 0
sitemap: true
date: 2021-09-17 19:42:03
---

{% note info %}
本文章最后更新日期为：2021-09-23
{% endnote %}

## 什么是 `pb_ds`？

`pb_ds` 库全称 `Policy-Based Data Structures`，翻译后就是“基于策略的数据结构”。

在这个库中包含了哈希（Hash）表，平衡树，字典树（Trie 树），堆（优先队列）等数据结构，可以（~~或许~~）在竞赛中使用（请参考以下的使用条件）。

## 使用的条件

官方已经在以下编译器进行测试：

- g++ version: 3.3.1, 3.4.4, 4.0, 4.1, 4.2
- Intel icpc 8.1 与 9
- Visual C++ .Net 2005

博主已在以下编译器进行编译测试：

- g++ version: 6, 7, 8, 9, 10, 11
- clang version: 3, 4, 5, 6, 7, 8, 9, 10, 11

## 命名空间

```cpp
namespace __gnu_pbds
```

后文默认为已使用命名空间`__gnu_pbds`但未使用`std`

## tree

`pb_ds`库中的`tree`均为平衡树，且支持多种底层数据结构。

### 头文件

```cpp
#include <ext/pb_ds/assoc_container.hpp>  // tree的定义
#include <ext/pb_ds/tree_policy.hpp>      // 节点更新函数的定义
```

### 模板

```cpp
template <typename Key, typename Mapped, typename Cmp_Fn = std::less<Key>,
          typename Tag = rb_tree_tag,
          template <typename Const_Node_Iterator, typename Node_Iterator,
                    typename Cmp_Fn_, typename Allocator_>
          class Node_Update = null_tree_node_update,
          typename Allocator = std::allocator<char> >
class tree;
```

#### 模板参数

- `Key`指存储的数据类型（由于不支持存储一样的数，所以经常使用`double`）
- `Mapped`指的是映射的对象的类型，如果不需要映射就使用`null_type`，而版本号低（待补充）的`g++`需要使用`null_mapped_type`
- `Cmp_Fn`为存储类型的比较函数，可以自行编写或使用`std::less<Key>`或`std::greater<Key>`
- `Tag`选择底层数据结构的类型，分别为：
  - `rb_tree_tag`红黑树
  - `splay_tree_tag`
  - `ov_tree_tag`有序向量树
- `Node_Update`节点更新策略，如果要查询某个数的排名或查询某个排名的数可使用`tree_order_statistics_node_update`

#### 构造例子

```cpp
tree<double, null_type, std::less<double>, rb_tree_tag,
     tree_order_statistics_node_update>
    balancedTree;
```

#### 成员函数

- `insert(x)`插入数 $x$，返回值类型为 `St4pairIN10__gnu_pbds6detail25bin_search_tree_const_it_IPNS1_13rb_tree_node_IdmSaIcEEEdPdPKdRdRS8_Lb1ES4_EEbE `
- `erase(x)`从树中删除数 $x$ 或迭代器 $x$，返回值类型为 `bool`
- `order_of_key(x)`查询 $x$ 的排名（可近似认为以`Cmp_Fn`来排序后的排名）
- `find_by_order(x)`查询排名为 $x$ 的元素（同样以`Cmp_Fn`来排名），从 $0$ 开始
- `lower_bound(x)`返回不小于 $x$ 的元素的迭代器
- `upper_bound(x)`返回大于 $x$ 的元素的迭代器
- `join(x)`如果两树类型相同则将 $x$ 树并入当前的树，并入后 $x$ 树被删除
- `split(x, t)`以 `Cmp_Fn`进行比较后，小于等于 $x$ 的元素保留至当前的树，其他则属于树 $t$
- `empty()`判断树是否为空
- `size()`返回树的大小

{% note info ### 例子：[洛谷 P6136 【模板】普通平衡树（数据加强版）](https://www.luogu.com.cn/problem/P6136) %}

```cpp
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>
#include <iostream>

using namespace std;
using namespace __gnu_pbds;

constexpr double EPS = 1e-7;

int n, m;
int last = 0, ans = 0;
tree<double, null_type, less<double>, rb_tree_tag,
     tree_order_statistics_node_update>
    num;

int main() {
  ios::sync_with_stdio(false);
  cin >> n >> m;

  for (int i = 1, tmp; i <= n; ++i) {
    cin >> tmp;
    num.insert(tmp + i * EPS);
  }

  int x;
  for (int i = 1, op; i <= m; ++i) {
    cin >> op >> x;
    x ^= last;
    switch (op) {
      case 1:
        num.insert(x + (i + n) * EPS);
        break;
      case 2:
        num.erase(num.lower_bound(x));
        break;
      case 3:
        last = num.order_of_key(x) + 1;
        ans ^= last;
        break;
      case 4:
        last = *num.find_by_order(x - 1);
        ans ^= last;
        break;
      case 5:
        last = *(--num.lower_bound(x));
        ans ^= last;
        break;
      case 6:
        last = *(num.lower_bound(x + 1));
        ans ^= last;
        break;
    }
  }

  cout << ans << endl;

  return 0;
}

```

{% endnote %}

<!--

### 性能测试

又到了喜闻乐见的性能测试环节，本次测试机配置如下：

- CPU: i5-7500 @ 3.40GHz
- MEM: 16G DDR4 @ 2666MHz
- OS: Manjaro Linux kernel 5.14.2
- Compiler: clang version 12.0.1

编译命令：`clang++ -std=c++20 -O2 test.cpp -o test.exe`

![tree-insert](https://cdn-bmyjacks-io.oss-cn-shenzhen.aliyuncs.com/img/pb_ds-library/tree-insert.png?x-oss-process=style/img)

-->

## trie

trie 为字典树。

### 头文件

```cpp
#include <ext/pb_ds/assoc_container.hpp>  // trie的定义
#include <ext/pb_ds/trie_policy.hpp>      // 节点更新函数的定义
```

### 模板

```cpp
template <typename Key, typename Mapped, typename Cmp_Fn = std::less<Key>,
          typename Tag = pat_trie_tag,
          template <typename Const_Node_Iterator, typename Node_Iterator,
                    typename E_Access_Traits_, typename Allocator_>
          class Node_Update = null_trie_node_update,
          typename Allocator = std::allocator<char> >
class trie;
```

#### 模板参数

- `Key`指存储的数据类型（建议使用`std::string`）
- `Mapped`指的是映射的对象的类型，如果不需要映射就使用`null_type`，而版本号低（待补充）的`g++`需要使用`null_mapped_type`
- `Cmp_Fn`为存储类型的比较函数，可以自行编写或使用`std::less<Key>`或`std::greater<Key>`
- `Tag`选择底层数据结构的类型，建议使用`pat_trie_tag`
- `Node_Update`节点更新策略

#### 构造例子

```cpp
trie<string, null_type, trie_string_access_traits<>, pat_trie_tag,
     trie_prefix_search_node_update>
    tree;
```

#### 成员函数

- `insert(x)`插入字符串 $x$
- `erase(x)`删除字符串 $x$
- `x.join(y)`将 $y$ 并入 $x$ 并清空 $y$
