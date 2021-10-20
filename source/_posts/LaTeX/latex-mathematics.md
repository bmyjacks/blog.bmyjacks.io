---
title: LaTeX数学公式指南（KaTeX版）
tags:
  - LaTeX
  - TeX
categories: LaTeX
keywords:
  - LaTeX
  - 数学公式
  - 洛谷
  - Markdown
description: LaTeX数学公式指南（KaTeX版）
hide: false
comments: true
katex: true
sticky: 0
sitemap: true
date: 2021-08-29 16:33:31
updated: 2021-08-29 16:33:31
---

## Powered by

$$
\TeX \quad \LaTeX \quad \KaTeX
$$

## 声调/变音/上下标/上下括号/向量

| $a'$ `a'`                     | $\tilde{a}$ `\tilde{a}`                               | $\mathring{g}$ `\mathring{g}`                   |
| ----------------------------- | ----------------------------------------------------- | ----------------------------------------------- |
| $a''$ `a''`                   | $\widetilde{ac}$ `\widetilde{ac}`                     | $\overgroup{AB}$ `\overgroup{AB}`               |
| $a^{\prime}$ `a^{\prime}`     | $\utilde{AB}$ `\utilde{AB}`                           | $\undergroup{AB}$ `\undergroup{AB}`             |
| $\acute{a}$ `\acute{a}`       | $\vec{F}$ `\vec{F}`                                   | $\Overrightarrow{AB}$ `\Overrightarrow{AB}`     |
| $\bar{y}$ `\bar{y}`           | $\overleftarrow{AB}$ `\overleftarrow{AB}`             | $\overrightarrow{AB}$ `\overrightarrow{AB}`     |
| $\breve{a}$ `\breve{a}`       | $\underleftarrow{AB}$ `\underleftarrow{AB}`           | $\underrightarrow{AB}$ `\underrightarrow{AB}`   |
| $\check{a}$ `\check{a}`       | $\overleftharpoon{ac}$ `\overleftharpoon{ac}`         | $\overrightharpoon{ac}$ `\overrightharpoon{ac}` |
| $\dot{a}$ `\dot{a}`           | $\overleftrightarrow{AB}$ `\overleftrightarrow{AB}`   | $\overbrace{AB}$ `\overbrace{AB}`               |
| $\ddot{a}$ `\ddot{a}`         | $\underleftrightarrow{AB}$ `\underleftrightarrow{AB}` | $\underbrace{AB}$ `\underbrace{AB}`             |
| $\grave{a}$ `\grave{a}`       | $\overline{AB}$ `\overline{AB}`                       | $\overlinesegment{AB}$ `\overlinesegment{AB}`   |
| $\hat{\theta}$ `\hat{\theta}` | $\underline{AB}$ `\underline{AB}`                     | $\underlinesegment{AB}$ `\underlinesegment{AB}` |
| $\widehat{ac}$ `\widehat{ac}` | $\widecheck{ac}$ `\widecheck{ac}`                     | $\underbar{X}$ `\underbar{X}`                   |

### 在`\text{...}`中的声调/变音符号

| $\text{\'{a}}$ `\'{a}` | $\text{\~{a}}$ `\~{a}` | $\text{\.{a}}$ `\.{a}` | $\text{\H{a}}$ `\H{a}` |
| ---------------------- | ---------------------- | ---------------------- | ---------------------- |
| $\text{\r{a}}$ `\r{a}` | $\text{\={a}}$ `\={a}` | $\text{\"{a}}$ `\"{a}` | $\text{\v{a}}$ `\v{a}` |
| $\text{\^{a}}$ `\^{a}` | $\text{\u{a}}$ `\u{a}` |                        |                        |

## 分隔符/括号/箭头

| $( )$ `( )`                     | $\lparen \rparen$ `\lparen \rparen` | $⌈ ⌉$ `⌈ ⌉` | $\lceil \rceil$ `\lceil \rceil`                     | $\uparrow$ `\uparrow`               |
| ------------------------------- | ----------------------------------- | ----------- | --------------------------------------------------- | ----------------------------------- | ------------------------------------------- | ------------------------- |
| $[ ]$ `[ ]`                     | $\lbrack \rbrack$ `\lbrack \rbrack` | $⌊⌋$ `⌊ ⌋`  | $\lfloor \rfloor$ `\lfloor \rfloor`                 | $\downarrow$ `\downarrow`           |
| $\{ \}$ `\{ \}`                 | $\lbrace \rbrace$ `\lbrace \rbrace` | $⎰⎱$ `⎰⎱`   | $\lmoustache \rmoustache$ `\lmoustache \rmoustache` | $\updownarrow$ `\updownarrow`       |
| $⟨ ⟩$ `⟨ ⟩`                     | $\langle \rangle$ `\langle \rangle` | $⟮ ⟯$ `⟮ ⟯` | $\lgroup \rgroup$ `\lgroup \rgroup`                 | $\Uparrow$ `\Uparrow`               |
| `                               | `$                                  | $           | $\vert$ `\vert`                                     | $┌ ┐$ `┌ ┐`                         | $\ulcorner \urcorner$ `\ulcorner \urcorner` | $\Downarrow$ `\Downarrow` |
| `\|`$\|$                        | $\Vert$ `\Vert`                     | $└ ┘$ `└ ┘` | $\llcorner \lrcorner$ `\llcorner \lrcorner`         | $\Updownarrow$ `\Updownarrow`       |
| $\lvert \rvert$ `\lvert \rvert` | $\lVert \rVert$ `\lVert \rVert`     | $$ ``       | $\left. \right.$ `\left. \right.`（相信眼睛）       | $\backslash$ `\backslash`           |
| $\lang \rang$ `\lang \rang`     | $\lt \gt$ `\lt \gt`                 | $⟦ ⟧$ `⟦ ⟧` | $\llbracket \rrbracket$``\llbracket \rrbracket      | $\lBrace \rBrace$ `\lBrace \rBrace` |

### 分隔符大小

$\left(\LARGE{AB}\right)$ `\left(\LARGE{AB}\right)`

$( \big( \Big( \bigg( \Bigg($ `( \big( \Big( \bigg( \Bigg(`

| `\left`   | `\big`  | `\bigl`  | `\bigm`  | `\bigr`  |
| --------- | ------- | -------- | -------- | -------- |
| `\middle` | `\Big`  | `\Bigl`  | `\Bigm`  | `\Bigr`  |
| `\right`  | `\bigg` | `\biggl` | `\biggm` | `\biggr` |
|           | `\Bigg` | `\Biggl` | `\Biggm` | `\Biggr` |

## 环境/形式

```tex
\begin{matrix}
 a & b \\
 c & d
\end{matrix}
or
\begin{array}{cc}
 a & b \\
 c & d
\end{array}
```

$$
\begin{matrix}
 a & b \\
 c & d
\end{matrix}
$$

```tex
\begin{pmatrix}
 a & b \\
 c & d
\end{pmatrix}
```

$$
\begin{pmatrix}
 a & b \\
 c & d
\end{pmatrix}
$$

```tex
\begin{bmatrix}
 a & b \\
 c & d
\end{bmatrix}
```

$$
\begin{bmatrix}
 a & b \\
 c & d
\end{bmatrix}
$$

```tex
\begin{vmatrix}
 a & b \\
 c & d
\end{vmatrix}
```

$$
\begin{vmatrix}
 a & b \\
 c & d
\end{vmatrix}
$$

```tex
\begin{Vmatrix}
 a & b \\
 c & d
\end{Vmatrix}
```

$$
\begin{Vmatrix}
 a & b \\
 c & d
\end{Vmatrix}
$$

```tex
\begin{Bmatrix}
 a & b \\
 c & d
\end{Bmatrix}
```

$$
\begin{Bmatrix}
 a & b \\
 c & d
\end{Bmatrix}
$$

```tex
\def\arraystretch{1.5}
 \begin{array}{c:c:c}
  a & b & c \\ \hline
  d & e & f \\
  \hdashline
  g & h & i
 \end{array}
```

$$
\def\arraystretch{1.5}
 \begin{array}{c:c:c}
  a & b & c \\ \hline
  d & e & f \\ \hdashline
  g & h & i
 \end{array}
$$

此处显示有误

```tex
x =
\begin{cases}
 a &\text{if } b \\
 c &\text{if } d
\end{cases}
```

$$
x =
\begin{cases}
 a &\text{if } b \\
 c &\text{if } d
\end{cases}
$$

```tex
\begin{rcases}
 a &\text{if } b \\
 c &\text{if } d
\end{rcases}
```

$$
\text{Error to display.(Will be fixed soon.)}
$$

```tex
\begin{smallmatrix}
 a & b \\
 c & d
\end{smallmatrix}
```

$$
\text{Error to display.(Will be fixed soon.)}
$$

```tex
\sum_{
\begin{subarray}{l}
 i\in\Lambda\\
 0<j<n
\end{subarray}
}
```

$$
\text{Error to display.(Will be fixed soon.)}
$$

## HTML

| $\href{https://katex.org/}{\KaTeX}$ | `\href{https://katex.org/}{\KaTeX}` |
| ----------------------------------- | ----------------------------------- |
| $\url{https://katex.org/}$          | `\url{https://katex.org/}`          |

## 字母与 Unicode

### 希腊字母

| $\Alpha$ `\Alpha`       | $\Beta$ `\Beta`             | $\Gamma$ `\Gamma`       | $\Delta$ `\Delta`         | $\Epsilon$ `\Epsilon`   | $\Zeta$ `\Zeta`   |
| ----------------------- | --------------------------- | ----------------------- | ------------------------- | ----------------------- | ----------------- |
| $\Eta$ `\Eta`           | $\Theta$ `\Theta`           | $\Iota$ `\Iota`         | $\Kappa$ `\Kappa`         | $\Lambda$ `\Lambda`     | $\Mu$ `\Mu`       |
| $\Nu$ `\Nu`             | $\Xi$ `\Xi`                 | $\Omicron$ `\Omicron`   | $\Pi$ `\Pi`               | $\Rho$ `\Rho`           | $\Sigma$ `\Sigma` |
| $\Tau$ `\Tau`           | $\Upsilon$ `\Upsilon`       | $\Phi$ `\Phi`           | $\Chi$ `\Chi`             | $\Psi$ `\Psi`           | $\Omega$ `\Omega` |
| $\varGamma$ `\varGamma` | $\varDelta$ `\varDelta`     | $\varTheta$ `\varTheta` | $\varLambda$ `\varLambda` | $\varXi$ `\varXi`       | $\varPi$ `\varPi` |
| $\varSigma$ `\varSigma` | $\varUpsilon$ `\varUpsilon` | $\varPhi$ `\varPhi`     | $\varPsi$ `\varPsi`       | $\varOmega$ `\varOmega` |                   |
| $\alpha$ `\alpha`       | $\beta$ `\beta`             | $\gamma$ `\gamma`       | $\delta$ `\delta`         | $\epsilon$ `\epsilon`   | $\zeta$ `\zeta`   |
| $\eta$ `\eta`           | $\theta$ `\theta`           | $\iota$ `\iota`         | $\kappa$ `\kappa`         | $\lambda$ `\lambda`     | $\mu$ `\mu`       |
| $\nu$ `\nu`             | $\xi$ `\xi`                 | $\omicron$ `\omicron`   | $\pi$ `\pi`               | $\rho$ `\rho`           | $\rho$ `\rho`     |
| $\sigma$ `\sigma`       | $\tau$ `\tau`               | $\upsilon$ `\upsilon`   | $\phi$ `\phi`             | $\chi$ `\chi`           | $\psi$ `\psi`     |
| $\omega$ `\omega`       | $\varepsilon$ `\varepsilon` | $\varkappa$ `\varkappa` | $\vartheta$ `\vartheta`   | $\thetasym$ `\thetasym` | $\varpi$ `\varpi` |
| $\varrho$ `\varrho`     | $\varsigma$ `\varsigma`     | $\varphi$ `\varphi`     | $\digamma$ `\digamma`     |                         |                   |

### 其他字母

| $\imath$ `\imath`       | $\nabla$ `\nabla`         | $\Im$ `\Im`             | $\Reals$ `\Reals`         | $\text{\OE}$ `\text{\OE}` | $\jmath$ `\jmath`         |
| ----------------------- | ------------------------- | ----------------------- | ------------------------- | ------------------------- | ------------------------- |
| $\partial$ `\partial`   | $\image$ `\image`         | $\wp$ `\wp`             | $\text{\o}$ `\text{\o}`   | $\aleph$ `\aleph`         | $\Game$ `\Game`           |
| $\Bbbk$ `\Bbbk`         | $\weierp$ `\weierp`       | $\text{\O}$ `\text{\O}` | $\alef$ `\alef`           | $\Finv$ `\Finv`           | $\N$ `\N`                 |
| $\Z$ `\Z`               | $\text{\ss}$ `\text{\ss}` | $\alefsym$ `\alefsym`   | $\cnums$ `\cnums`         | $\natnums$ `\natnums`     | $\text{\aa}$ `\text{\aa}` |
| $\text{\i}$ `\text{\i}` | $\beth$ `\beth`           | $\Complex$ `\Complex`   | $\R$ `\R`                 | $\text{\AA}$ `\text{\AA}` | $\text{\j}$ `\text{\j}`   |
| $\gimel$ `\gimel`       | $\ell$ `\ell`             | $\Re$ `\Re`             | $\text{\ae}$ `\text{\ae}` | $\daleth$ `\daleth`       | $\hbar$ `\hbar`           |
| $\real$ `\real`         | $\text{\AE}$ `\text{\AE}` | $\eth$ `\eth`           | $\hslash$ `\hslash`       | $\reals$ `\reals`         | $\text{\oe}$ `\text{\oe}` |

## 布局

### 注解

| $\cancel{5}$ `\cancel{5}`       | $\overbrace{a+b+c}^{\text{note}}$ `\overbrace{a+b+c}^{\text{note}}`   |
| ------------------------------- | --------------------------------------------------------------------- |
| $\bcancel{5}$ `\bcancel{5}`     | $\underbrace{a+b+c}_{\text{note}}$ `\underbrace{a+b+c}_{\text{note}}` |
| $\xcancel{ABC}$ `\xcancel{ABC}` | $\not =$ `\not =`                                                     |
| $\sout{abc}$ `\sout{abc}`       | $\boxed{\pi=\frac c d}$ `\boxed{\pi=\frac c d}`                       |

```tex
\tag{hi} x+y^{2x}
```

$$
\tag{hi} x+y^{2x}
$$

```tex
\tag*{hi} x+y^{2x}
```

$$
\tag*{hi} x+y^{2x}
$$

### 垂直

| $x_n$ `x_n`   | $\stackrel{!}{=}$ `\stackrel{!}{=}` | $a \atop b$ `a \atop b`             |
| ------------- | ----------------------------------- | ----------------------------------- |
| $e^x$ `e^x`   | $\overset{!}{=}$ `\overset{!}{=}`   | $\underset{!}{=}$ `\underset{!}{=}` |
| $_u^o$ `_u^o` |                                     |                                     |

### 重叠和间距

| ${=}\mathllap{/\,}$ `{=}\mathllap{/\,}` | $\left(x^{\smash{2}}\right)$ `\left(x^{\smash{2}}\right)` |
| --------------------------------------- | --------------------------------------------------------- |
| $\mathrlap{\,/}{=}$ `\mathrlap{\,/}{=}` | $\sqrt{\smash[b]{y}}$ `\sqrt{\smash[b]{y}}`               |

```tex
\sum_{\mathclap{1\le i\le j\le n}} x_{ij}
```

$$
\sum_{\mathclap{1\le i\le j\le n}} x_{ij}
$$

#### 间距

| 公式            | 结果                | 公式                 | 结果                      |
| :-------------- | :------------------ | :------------------- | :------------------------ |
| `\,`            | ³∕₁₈ em 空格        | `\kern{distance}`    | 空格，宽度 = _distance_   |
| `\thinspace`    | ³∕₁₈ em 空格        | `\mkern{distance}`   | 空格，宽度 = _distance_   |
| `\>`            | ⁴∕₁₈ em 空格        | `\mskip{distance}`   | 空格，宽度 = _distance_   |
| `\:`            | ⁴∕₁₈ em 空格        | `\hskip{distance}`   | 空格，宽度 = _distance_   |
| `\medspace`     | ⁴∕₁₈ em 空格        | `\hspace{distance}`  | 空格，宽度 = _distance_   |
| `\;`            | ⁵∕₁₈ em 空格        | `\hspace*{distance}` | 空格，宽度 = _distance_   |
| `\thickspace`   | ⁵∕₁₈ em 空格        | `\phantom{content}`  | 间隔 content 的宽度和高度 |
| `\enspace`      | ½ em 空格           | `\hphantom{content}` | 间隔 content 的宽度       |
| `\quad`         | 1 em 空格           | `\vphantom{content}` | 间隔 content 的高度       |
| `\qquad`        | 2 em 空格           | `\!`                 | – ³∕₁₈ em 空格            |
| `~`             | non-breaking 的空格 | `\negthinspace`      | – ³∕₁₈ em 空格            |
| `\<space>`      | 空格                | `\negmedspace`       | – ⁴∕₁₈ em 空格            |
| `\nobreakspace` | non-breaking 的空格 | `\negthickspace`     | – ⁵∕₁₈ em 空格            |
| `\space`        | 空格                | `\mathstrut`         | `\vphantom{(}`            |

## 逻辑与集合论

| $\forall$ `\forall`   | $\complement$ `\complement` | $\therefore$ `\therefore`           | $\emptyset$ `\emptyset`     |
| --------------------- | --------------------------- | ----------------------------------- | --------------------------- |
| $\exists$ `\exists`   | $\subset$ `\subset`         | $\because$ `\because`               | $\empty$ `\empty`           |
| $\exist$ `\exist`     | $\supset$ `\supset`         | $\mapsto$ `\mapsto`                 | $\varnothing$ `\varnothing` |
| $\nexists$ `\nexists` | $\mid$ `\mid`               | $\to$ `\to`                         | $\implies$ `\implies`       |
| $\in$ `\in`           | $\land$ `\land`             | $\gets$ `\gets`                     | $\impliedby$ `\impliedby`   |
| $\isin$ `\isin`       | $\lor$ `\lor`               | $\leftrightarrow$ `\leftrightarrow` | $\iff$ `\iff`               |
| $\notin$ `\notin`     | $\ni$ `\ni`                 | $\notni$ `\notni`                   | $\neg$ `\neg`或`\lnot`      |

## 宏

| $\def\foo{x^2} \foo + \foo$ | `\def\foo{x^2} \foo + \foo`                       |
| --------------------------- | ------------------------------------------------- |
|                             | `\gdef\bar#1{#1^2} \bar{y} + \bar{y}`             |
|                             | `\edef\macroname#1#2…{definition to be expanded}` |
|                             | `\xdef\macroname#1#2…{definition to be expanded}` |
|                             | `\let\foo=\bar`                                   |
|                             | `\futurelet\foo\bar x`                            |
|                             | `\global\def\macroname#1#2…{definition}`          |
|                             | `\newcommand\macroname[numargs]{definition}`      |
|                             | `\renewcommand\macroname[numargs]{definition}`    |
|                             | `\providecommand\macroname[numargs]{definition}`  |

## 运算符

### 巨大的运算符

| $\sum$ `\sum`         | $\prod$ `\prod`         | $\bigotimes$ `\bigotimes` | $\bigvee$ `\bigvee`     | $\int$ `\int`           |
| --------------------- | ----------------------- | ------------------------- | ----------------------- | ----------------------- |
| $\coprod$ `\coprod`   | $\bigoplus$ `\bigoplus` | $\bigwedge$ `\bigwedge`   | $\iint$ `\iint`         | $\intop$ `\intop`       |
| $\bigodot$ `\bigodot` | $\bigcap$ `\bigcap`     | $\iiint$ `\iiint`         | $\smallint$ `\smallint` | $\biguplus$ `\biguplus` |
| $\bigcup$ `\bigcup`   | $\oint$ `\oint`         | $\oiint$ `\oiint`         | $\oiiint$ `\oiiint`     | $\bigsqcup$ `\bigsqcup` |

### 二元运算符

## 单位

| KaTeX 单位 | 值                   | KaTeX 单位 | 值                  |
| :--------- | :------------------- | :--------- | :------------------ |
| em         | CSS em               | bp         | 1/72 inch × F × G   |
| ex         | CSS ex               | pc         | 12 KaTeX pt         |
| mu         | 1/18 CSS em          | dd         | 1238/1157 KaTeX pt  |
| pt         | 1/72.27 inch × F × G | cc         | 14856/1157 KaTeX pt |
| mm         | 1 mm × F × G         | nd         | 685/642 KaTeX pt    |
| cm         | 1 cm × F × G         | nc         | 1370/107 KaTeX pt   |
| in         | 1 inch × F × G       | sp         | 1/65536 KaTeX pt    |

其中的：

- F = (周围 HTML 文本的字体大小)/(10 pt)
- G = 默认为 1.21, 因为 KaTeX 的默认字体大小为 1.21 × 周围字体大小。这个值可以被 HTML 页面的 CSS 覆盖。
