---
title: 英伟达Jetson Nano常用命令及软件详解
tags:
  - jetson nano
  - linux
  - 教程
  - nvidia
  - python
keywords:
  - 英伟达
  - jetson nano
  - 软件安装
  - TensorFlow
categories:
  - jetson nano
hide: false
comments: true
katex: false
date: 2021-02-11 16:41:08
updated: 2021-02-11 16:41:08
description: 汇集各种jetson nano常用命令及软件
---

{% note info %}

## 注意

本文章在`Jetpack4.4`下通过测试，请根据您使用的版本进行调整，并留意本文章更新时间（即本文列出的方法可能已经不适用于最新的系统）

{% endnote %}

## 更换软件源

首先对`/etc/apt/sources.list`进行更改

```bash
sudo vi /etc/apt/sources.list
```

将原本的内容全部删去，替换为以下内容（清华源）

```
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ bionic main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ bionic main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ bionic-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ bionic-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ bionic-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ bionic-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ bionic-security main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ bionic-security main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ bionic-proposed main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ bionic-proposed main restricted universe multiverse
```

更新所有软件

```bash
sudo apt update && sudo apt upgrade
```

## 更换`pip`源

```bash
sudo python3 -m pip install -i https://pypi.tuna.tsinghua.edu.cn/simple pip -U
sudo python3 -m pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

## CUDA

由于`CDUA`本身已经随系统安装好了，所以我们只需要导入`CUDA`即可

修改`.bashrc`，在末尾加入

```bash
export CUDA_HOME=/usr/local/cuda-10.2
export LD_LIBRARY_PATH=$CUDA_HOME/lib64:$LD_LIBRARY_PATH
export PATH=$CUDA_HOME/bin:$PATH
```

此时再执行`nvcc -V`时输出如下

```bash
bmyjacks@Jetson-nano:~$ nvcc -V
nvcc: NVIDIA (R) Cuda compiler driver
Copyright (c) 2005-2019 NVIDIA Corporation
Built on Wed_Oct_23_21:14:42_PDT_2019
Cuda compilation tools, release 10.2, V10.2.89
```

## cuDNN

系统也随同附带了`cuDNN`，我们将其进行测试

进入目录并运行样例

```bash
cd /usr/src/cudnn_samples_v8/mnistCUDNN
sudo make
./mnistCUDNN
```

输出如下即表明`cuDNN`已成功配置

```bash
bmyjacks@Jetson-nano:/usr/src/cudnn_samples_v8/mnistCUDNN$ ./mnistCUDNN
Executing: mnistCUDNN
cudnnGetVersion() : 8000 , CUDNN_VERSION from cudnn.h : 8000 (8.0.0)
Host compiler version : GCC 7.5.0

There are 1 CUDA capable devices on your machine :
device 0 : sms  1  Capabilities 5.3, SmClock 921.6 Mhz, MemSize (Mb) 3964, MemClock 12.8 Mhz, Ecc=0, boardGroupID=0
Using device 0

Testing single precision
Loading binary file data/conv1.bin
Loading binary file data/conv1.bias.bin
Loading binary file data/conv2.bin
Loading binary file data/conv2.bias.bin
Loading binary file data/ip1.bin
Loading binary file data/ip1.bias.bin
Loading binary file data/ip2.bin
Loading binary file data/ip2.bias.bin
Loading image data/one_28x28.pgm
Performing forward propagation ...
Testing cudnnGetConvolutionForwardAlgorithm_v7 ...
^^^^ CUDNN_STATUS_SUCCESS for Algo 1: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 0: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 2: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 7: -1.000000 time requiring 2057744 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 4: -1.000000 time requiring 184784 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 5: -1.000000 time requiring 178432 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 6: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 3: -1.000000 time requiring 0 memory
Testing cudnnFindConvolutionForwardAlgorithm ...
^^^^ CUDNN_STATUS_SUCCESS for Algo 0: 0.426146 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 1: 0.434375 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 2: 1.096771 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 4: 6.034271 time requiring 184784 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 5: 6.524843 time requiring 178432 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 7: 11.360573 time requiring 2057744 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 6: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 3: -1.000000 time requiring 0 memory
Testing cudnnGetConvolutionForwardAlgorithm_v7 ...
^^^^ CUDNN_STATUS_SUCCESS for Algo 1: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 0: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 2: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 7: -1.000000 time requiring 1433120 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 4: -1.000000 time requiring 2450080 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 5: -1.000000 time requiring 4656640 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 6: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 3: -1.000000 time requiring 0 memory
Testing cudnnFindConvolutionForwardAlgorithm ...
^^^^ CUDNN_STATUS_SUCCESS for Algo 0: 4.602657 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 2: 4.620104 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 1: 4.664479 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 4: 6.318178 time requiring 2450080 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 7: 16.556978 time requiring 1433120 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 5: 20.708542 time requiring 4656640 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 6: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 3: -1.000000 time requiring 0 memory
Resulting weights from Softmax:
0.0000000 0.9999399 0.0000000 0.0000000 0.0000561 0.0000000 0.0000012 0.0000017 0.0000010 0.0000000
Loading image data/three_28x28.pgm
Performing forward propagation ...
Testing cudnnGetConvolutionForwardAlgorithm_v7 ...
^^^^ CUDNN_STATUS_SUCCESS for Algo 1: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 0: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 2: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 7: -1.000000 time requiring 2057744 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 4: -1.000000 time requiring 184784 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 5: -1.000000 time requiring 178432 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 6: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 3: -1.000000 time requiring 0 memory
Testing cudnnFindConvolutionForwardAlgorithm ...
^^^^ CUDNN_STATUS_SUCCESS for Algo 0: 0.506354 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 1: 0.516302 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 2: 1.093385 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 4: 6.042864 time requiring 184784 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 5: 6.673021 time requiring 178432 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 7: 11.380677 time requiring 2057744 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 6: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 3: -1.000000 time requiring 0 memory
Testing cudnnGetConvolutionForwardAlgorithm_v7 ...
^^^^ CUDNN_STATUS_SUCCESS for Algo 1: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 0: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 2: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 7: -1.000000 time requiring 1433120 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 4: -1.000000 time requiring 2450080 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 5: -1.000000 time requiring 4656640 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 6: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 3: -1.000000 time requiring 0 memory
Testing cudnnFindConvolutionForwardAlgorithm ...
^^^^ CUDNN_STATUS_SUCCESS for Algo 1: 4.674010 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 0: 4.696406 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 2: 5.993489 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 4: 6.664219 time requiring 2450080 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 7: 16.621042 time requiring 1433120 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 5: 20.584999 time requiring 4656640 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 6: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 3: -1.000000 time requiring 0 memory
Resulting weights from Softmax:
0.0000000 0.0000000 0.0000000 0.9999288 0.0000000 0.0000711 0.0000000 0.0000000 0.0000000 0.0000000
Loading image data/five_28x28.pgm
Performing forward propagation ...
Resulting weights from Softmax:
0.0000000 0.0000008 0.0000000 0.0000002 0.0000000 0.9999820 0.0000154 0.0000000 0.0000012 0.0000006

Result of classification: 1 3 5

Test passed!

Testing half precision (math in single precision)
Loading binary file data/conv1.bin
Loading binary file data/conv1.bias.bin
Loading binary file data/conv2.bin
Loading binary file data/conv2.bias.bin
Loading binary file data/ip1.bin
Loading binary file data/ip1.bias.bin
Loading binary file data/ip2.bin
Loading binary file data/ip2.bias.bin
Loading image data/one_28x28.pgm
Performing forward propagation ...
Testing cudnnGetConvolutionForwardAlgorithm_v7 ...
^^^^ CUDNN_STATUS_SUCCESS for Algo 1: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 0: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 2: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 7: -1.000000 time requiring 2057744 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 4: -1.000000 time requiring 184784 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 5: -1.000000 time requiring 178432 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 6: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 3: -1.000000 time requiring 0 memory
Testing cudnnFindConvolutionForwardAlgorithm ...
^^^^ CUDNN_STATUS_SUCCESS for Algo 1: 0.217812 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 0: 0.225937 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 2: 0.566198 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 4: 3.001250 time requiring 184784 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 5: 3.609010 time requiring 178432 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 7: 5.703125 time requiring 2057744 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 6: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 3: -1.000000 time requiring 0 memory
Testing cudnnGetConvolutionForwardAlgorithm_v7 ...
^^^^ CUDNN_STATUS_SUCCESS for Algo 1: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 0: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 2: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 7: -1.000000 time requiring 1433120 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 4: -1.000000 time requiring 2450080 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 5: -1.000000 time requiring 4656640 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 6: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 3: -1.000000 time requiring 0 memory
Testing cudnnFindConvolutionForwardAlgorithm ...
^^^^ CUDNN_STATUS_SUCCESS for Algo 0: 2.546094 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 2: 2.612812 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 1: 2.616927 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 4: 3.377396 time requiring 2450080 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 7: 9.275365 time requiring 1433120 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 5: 10.506875 time requiring 4656640 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 6: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 3: -1.000000 time requiring 0 memory
Resulting weights from Softmax:
0.0000001 1.0000000 0.0000001 0.0000000 0.0000563 0.0000001 0.0000012 0.0000017 0.0000010 0.0000001
Loading image data/three_28x28.pgm
Performing forward propagation ...
Testing cudnnGetConvolutionForwardAlgorithm_v7 ...
^^^^ CUDNN_STATUS_SUCCESS for Algo 1: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 0: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 2: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 7: -1.000000 time requiring 2057744 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 4: -1.000000 time requiring 184784 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 5: -1.000000 time requiring 178432 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 6: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 3: -1.000000 time requiring 0 memory
Testing cudnnFindConvolutionForwardAlgorithm ...
^^^^ CUDNN_STATUS_SUCCESS for Algo 0: 0.319896 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 1: 0.347083 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 2: 0.665052 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 4: 3.052240 time requiring 184784 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 5: 3.391302 time requiring 178432 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 7: 5.694531 time requiring 2057744 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 6: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 3: -1.000000 time requiring 0 memory
Testing cudnnGetConvolutionForwardAlgorithm_v7 ...
^^^^ CUDNN_STATUS_SUCCESS for Algo 1: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 0: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 2: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 7: -1.000000 time requiring 1433120 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 4: -1.000000 time requiring 2450080 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 5: -1.000000 time requiring 4656640 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 6: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 3: -1.000000 time requiring 0 memory
Testing cudnnFindConvolutionForwardAlgorithm ...
^^^^ CUDNN_STATUS_SUCCESS for Algo 1: 2.624948 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 0: 2.650052 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 2: 2.670677 time requiring 0 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 4: 3.380937 time requiring 2450080 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 7: 8.219323 time requiring 1433120 memory
^^^^ CUDNN_STATUS_SUCCESS for Algo 5: 10.516041 time requiring 4656640 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 6: -1.000000 time requiring 0 memory
^^^^ CUDNN_STATUS_NOT_SUPPORTED for Algo 3: -1.000000 time requiring 0 memory
Resulting weights from Softmax:
0.0000000 0.0000000 0.0000000 1.0000000 0.0000000 0.0000714 0.0000000 0.0000000 0.0000000 0.0000000
Loading image data/five_28x28.pgm
Performing forward propagation ...
Resulting weights from Softmax:
0.0000000 0.0000008 0.0000000 0.0000002 0.0000000 1.0000000 0.0000154 0.0000000 0.0000012 0.0000006

Result of classification: 1 3 5

Test passed!
```

## TensorRT

### 安装依赖

```bash
python3 -m pip install pillow
```

### 下载`mnist`数据集

```bash
cd /usr/src/tensorrt/data/mnist
sudo python3 download_pgms.py
```

### 编译文件

```bash
cd /usr/src/tensorrt/samples/sampleMNIST
sudo make
```

### 运行样例

```bash
cd /usr/src/tensorrt/bin
./sample_mnist
```

输出（由于是随机选取数字，所以输出的数字可能不一样，但是最后显示`PASSED`即可）

```bash
bmyjacks@Jetson-nano:/usr/src/tensorrt/bin$ ./sample_mnist
&&&& RUNNING TensorRT.sample_mnist # ./sample_mnist
[02/11/2021-16:07:00] [I] Building and running a GPU inference engine for MNIST
[02/11/2021-16:07:20] [I] [TRT] Detected 1 inputs and 1 output network tensors.
[02/11/2021-16:07:20] [I] Input:
@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@==-%-  =@@@@
@@@@@@@@%%*--     .-  :#@@@@
@@@@@@@#          ***#%@@@@@
@@@@@@@@.     ::  @@@@@@@@@@
@@@@@@@@*-+  .@@%-@@@@@@@@@@
@@@@@@@@@@@- *@@@@@@@@@@@@@@
@@@@@@@@@@@= :@@@@@@@@@@@@@@
@@@@@@@@@@@@: #@@@@@@@@@@@@@
@@@@@@@@@@@@% .-+@@@@@@@@@@@
@@@@@@@@@@@@@*   +%@@@@@@@@@
@@@@@@@@@@@@@@%:  =%@@@@@@@@
@@@@@@@@@@@@@@@@*  :@@@@@@@@
@@@@@@@@@@@@@@@@@   #@@@@@@@
@@@@@@@@@@@@@@%=:  .@@@@@@@@
@@@@@@@@@@@@%=.    :@@@@@@@@
@@@@@@@@@@%+.    :*@@@@@@@@@
@@@@@@@@%#.    :*@@@@@@@@@@@
@@@@@@@-.    :*@@@@@@@@@@@@@
@@@@#-.     =@@@@@@@@@@@@@@@
@@@@=   .==@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@

[02/11/2021-16:07:20] [I] Output:
0:
1:
2:
3:
4:
5: **********
6:
7:
8:
9:

&&&& PASSED TensorRT.sample_mnist # ./sample_mnist
```

## VisionWorks

进入目录

```bash
cd /usr/share/visionworks
```

TODO

## OpenCV

TODO

## TensorFlow(GPU)

### 更新系统

```bash
sudo apt update && sudo apt upgrade -y
```

### 安装依赖

```bash
sudo apt install libhdf5-serial-dev hdf5-tools libhdf5-dev zlib1g-dev zip libjpeg8-dev liblapack-dev libblas-dev gfortran python3-pip
```

### 安装`python`依赖

```bash
sudo python3 -m pip install -U pip futures protobuf pybind11 testresources setuptools numpy==1.16.1 future==0.17.1 mock==3.0.5 h5py==2.9.0 keras_preprocessing==1.0.5 keras_applications==1.0.8 gast==0.2.2
```

### 安装`TensorFlow`

```bash
# TF-2.x
sudo python3 -m pip install --pre --extra-index-url https://developer.download.nvidia.com/compute/redist/jp/v44 tensorflow==2.3.1+nv20.12
# TF-1.15
sudo python3 -m pip install --pre --extra-index-url https://developer.download.nvidia.com/compute/redist/jp/v44 ‘tensorflow<2’
```

## Keras

```bash
python3 -m pip install keras
```

## Pandas

```bash
python3 -m pip install pandas
```

## sklearn

```bash
python3 -m pip install sklearn
```
