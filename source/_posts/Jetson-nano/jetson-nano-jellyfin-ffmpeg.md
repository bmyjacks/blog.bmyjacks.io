---
title: 在jetson nano上使用硬件加速的jellyfin(失败)
tags:
  - nvidia
  - jetson nano
categories: jetson nano
description: 如何正确的在jetson nano上使用GPU硬件解码来流畅使用jellyfin呢？
keywords:
  - nvidia
  - jetson nano
  - 硬件解码
  - 硬件加速
hide: false
date: 2020-10-02 22:25:55
---

{% note info %}

### 信息

本次演示使用`Linux jetsonnano 4.9.140-tegra #1 SMP PREEMPT Thu Jun 25 21:25:44 PDT 2020 aarch64 aarch64 aarch64 GNU/Linux | Ubuntu 18.04.5 LTS (GNU/Linux 4.9.140-tegra aarch64) | Jetpack 4.4 L4T 32.4.3`系统。

{% endnote %}

## 首先我们看看不使用硬件解码的播放流畅度

使用的`ffmpeg`为 jellyfin 自带的 ffmpeg，并将转码线程数设置为 4，其他保持默认。

![](https://cdn.bmyjacks.io/img/20201002204342.png?x-oss-process=style/style)

### HEVC(h265)解码测试

文件信息![](https://cdn.bmyjacks.io/img/20201002204838.png?x-oss-process=style/style)

解码信息

![](https://cdn.bmyjacks.io/img/20201002205043.png?x-oss-process=style/style)

系统资源占用

![](https://cdn.bmyjacks.io/img/20201002205010.png?x-oss-process=style/style)

### MPEG4(DivX)解码测试

文件信息

![](https://cdn.bmyjacks.io/img/20201002205921.png?x-oss-process=style/style)

解码信息

![](https://cdn.bmyjacks.io/img/20201002210040.png?x-oss-process=style/style)

系统资源占用

![](https://cdn.bmyjacks.io/img/20201002210023.png?x-oss-process=style/style)

### MPEG4(Xvid)解码测试

文件信息

![](https://cdn.bmyjacks.io/img/20201002210539.png?x-oss-process=style/style)

解码信息

![](https://cdn.bmyjacks.io/img/20201002210629.png?x-oss-process=style/style)

系统资源占用

![](https://cdn.bmyjacks.io/img/20201002210617.png?x-oss-process=style/style)

### AVC(h264)解码测试

无需解码即可串流播放

### MPEG2 解码测试

文件信息

![](https://cdn.bmyjacks.io/img/20201002211204.png?x-oss-process=style/style)

解码信息

![](https://cdn.bmyjacks.io/img/20201002211246.png?x-oss-process=style/style)

系统资源占用

![](https://cdn.bmyjacks.io/img/20201002211318.png?x-oss-process=style/style)

## 解码性能低下原因解析（可能）

首先使用 jellyfin 自带的 ffmpeg 并且不开启硬件解码的情况下调用的是 CPU 编码，这颗 4 核`ARMv8`处理器性能可能比较低下，因为嵌入式设备限制性能。下面我们打开硬件解码试试看。

## 使用硬件解码但是继续使用 jellyfin 自带的 ffmpeg 播放测试

## OpenMAX(OMX)测试

设置信息

![](https://cdn.bmyjacks.io/img/20201002211744.png?x-oss-process=style/style)

播放

![](https://cdn.bmyjacks.io/img/20201002222332.png?x-oss-process=style/style)

boom！

### NVENC 测试

设置信息

![](https://cdn.bmyjacks.io/img/20201002211952.png?x-oss-process=style/style)

解码信息

![](https://cdn.bmyjacks.io/img/20201002222400.png?x-oss-process=style/style)

系统资源占用

![](https://cdn.bmyjacks.io/img/20201002212134.png?x-oss-process=style/style)

GPU 占用

![](https://cdn.bmyjacks.io/img/20201002222422.png?x-oss-process=style/style)

### VAAPI 测试

设置信息

![](https://cdn.bmyjacks.io/img/20201002212449.png?x-oss-process=style/style)

很容易就看出来会播放出错，但。。。

解码信息

![](https://cdn.bmyjacks.io/img/20201002212557.png?x-oss-process=style/style)

系统资源占用

![](https://cdn.bmyjacks.io/img/20201002212621.png?x-oss-process=style/style)

### Video Toolbox 测试

设置信息

![](https://cdn.bmyjacks.io/img/20201002222437.png?x-oss-process=style/style)

![](https://cdn.bmyjacks.io/img/20201002222332.png?x-oss-process=style/style)

boom！

## 既然使用 NVDEC 为什么 GPU 占用为 0%

首先怀疑的是 jellyfin 自带的 ffmpeg 并未对 jetson 系列的 GPU 进行适配，决定自行编译 ffmpeg 试试

## 自行编译 ffmpeg

## 首先安装好工具以及以依赖

由于这里使用的是最小化版本（无桌面）的系统，于是使用下面命令来安装编译工具

```bash
sudo apt -y install \
  autoconf \
  automake \
  build-essential \
  cmake \
  git-core \
  libass-dev \
  libfreetype6-dev \
  libgnutls28-dev \
  libtool \
  libvorbis-dev \
  pkg-config \
  texinfo \
  wget \
  yasm \
  zlib1g-dev
```

使用下方命令安装依赖

```bash
sudo apt -y install \
	libx264-dev \
	libzvbi-dev \
	libwebp-dev \
	libvorbis-dev \
	libtheora-dev \
	libfribidi-dev \
	libdrm-dev \
	libbluray-dev \
	libfontconfig-dev \
	libmp3lame-dev \
	libv4l-dev \
	libx264-dev \
	libopus-dev \
	libvpx-dev \
	libx265-dev \
```

## 之后添加 nvidia 官方给出的 jetson ffmpeg 库

新建`/etc/apt/sources.list.d/ffmpeg.list`文件并写入

```
deb https://repo.download.nvidia.com/jetson/ffmpeg main main
deb-src https://repo.download.nvidia.com/jetson/ffmpeg main main
```

请勿使用仓库自带的 ffmpeg，因为使用后无法播放文件，输出如下

![](https://cdn.bmyjacks.io/img/20201002213736.png?x-oss-process=style/style)

可以看出是未编译进解码器

### 下载源代码

```bash
sudo apt update && sudo apt source ffmpeg
```

过程中输出错误请不要管他，进入目录

```bash
cd ffmpeg-4.2.2
```

## 准备编译

查看 jellyfin 自带的 ffmpeg 编译代码

![](https://cdn.bmyjacks.io/img/20201002222459.png?x-oss-process=style/style)

```bash
configuration: --prefix=/usr/lib/jellyfin-ffmpeg --target-os=linux --disable-doc --disable-ffplay --disable-shared --disable-libxcb --disable-sdl2 --disable-xlib --enable-gpl --enable-version3 --enable-static --enable-libfontconfig --enable-fontconfig --enable-gmp --enable-gnutls --enable-libass --enable-libbluray --enable-libdrm --enable-libfreetype --enable-libfribidi --enable-libmp3lame --enable-libopus --enable-libtheora --enable-libvorbis --enable-libwebp --enable-libx264 --enable-libx265 --enable-libzvbi --toolchain=hardened --enable-cross-compile --enable-omx --enable-omx-rpi --arch=arm64 --cross-prefix=/usr/bin/aarch64-linux-gnu-
```

查看默认 nvidia 的 ffmpeg 编译代码

![](https://cdn.bmyjacks.io/img/20201002213736.png?x-oss-process=style/style)

```bash
configuration: --prefix=/usr --enable-nvv4l2dec --enable-libv4l2 --enable-shared --extra-libs='-L/usr/lib/aarch64-linux-gnu/tegra -lnvbuf_utils' --extra-cflags='-I /usr/src/jetson_multimedia_api/include/'
```

经整合后代码如下

```bash
sudo ./configure --prefix=$HOME/ffmpeg_build --target-os=linux --enable-libzvbi --enable-libwebp --enable-libvorbis --enable-libtheora --enable-libfribidi --enable-libdrm --enable-libbluray --enable-gmp --enable-gnutls --enable-libass --enable-version3 --enable-static  --enable-fontconfig --enable-gpl --enable-libfontconfig --enable-nvv4l2dec --enable-libmp3lame --enable-libv4l2 --enable-libx264 --enable-libopus --enable-libvpx --enable-nonfree --enable-libx265 --arch=arm64 --toolchain=hardened --enable-shared --extra-libs='-L/usr/lib/aarch64-linux-gnu/tegra -lnvbuf_utils' --extra-cflags='-I /usr/src/jetson_multimedia_api/include/'
```

### 进行编译

```
sudo make -j4
sudo make install
```

### 编译后进入目录运行

![](https://cdn.bmyjacks.io/img/20201002221408.png?x-oss-process=style/style)

出现异常

编辑`/etc/ld.so.conf`,加入以下行（请根据您的用户名修改）

```reStructuredText
/home/bmyjacks/ffmpeg_build/lib
```

执行

```bash
sudo ldconfig
```

![](https://cdn.bmyjacks.io/img/20201002221648.png?x-oss-process=style/style)

编译完成！

## 使用自己编译的 ffmpeg

设置信息

![](https://cdn.bmyjacks.io/img/20201002221754.png?x-oss-process=style/style)

接下来进行解码测试

![](https://cdn.bmyjacks.io/img/20201002221907.png?x-oss-process=style/style)

![](https://cdn.bmyjacks.io/img/20201002221854.png?x-oss-process=style/style)

？？？WHAT 怎么还是一样的

{% note warning %}

## 最后失败了

与软解完全一样的速度，如果有哪位大神知道怎么去设置或编译，请在评论区留言，我将不胜感激！
{% endnote %}
