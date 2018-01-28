![椰子狸](http://img.hb.aicdn.com/8882b7ccdd937e91122d695a7650e680a0c7a92a928c3-qKJpjv_fw658)

## 1. 重构和架构

**重构**是指在不改变代码行为的前提下，重写代码，使其更加简洁、易于复用。

**架构**是指软件项目的各个不同部件之间的组合方式。

优秀的架构：

1. 可预测：可以对软件的工作方式和结构做出准确的假设
2. 可复用：在多处使用同一代码，无需重写
3. 可扩展：比较容易的增加新内容
4. 可维护：修改一处代码不用大规模的改动其他代码



## 2. CSS选择器的优先级

用（a, b, c, d）表示，优先级 a>>b>>c>>d，其中：

1. 有行内 style 属性时，a=1,否则 a=0
2. b 为 ID 选择器的数量
3. c 为类选择器、属性选择器、伪类的数量
4. d 为类型选择器、伪元素的数量

（ps：[伪类和伪元素的区别](https://swordair.com/origin-and-difference-between-css-pseudo-classes-and-pseudo-elements/)）

*!important* 优先级最高，可覆盖行内样式。不可以添加到行内样式属性中。



## 3. 如何编写优质的 CSS

#### 使用注释

注释记录的内容包括：

- 文件内容
- 选择器的依赖、用法
- 使用特定声明的原因（hack等）
- 不应继续使用的废弃样式

```css
/*
* 导航链接样式
*
* @see templates/nav.html
*/
.nav-link {
  ...
}

.nav-link:hover {
  border-bottom: 4px solid #333;
  /* 防止增加了4px下边框导致元素移动 */
  padding-bottom: 0;
}

/* @deprecated */
.nav-link {
  ...
}
```

#### 保持选择器的简单

```css
/* 不推荐 */
div > nav > ul > li > a {}
/* 不推荐 */
a.nav-link {}
/* 推荐 */
.nav-link {}
```

但是并不是任何场景都应遵循该推荐，如下为输入框的文本和边框增加样式。

```css
.error {
  color: #f00;
}
input.error {
  border-color: #f00;
}
```

#### 分离 CSS 和 JavaScript

JavaScript 中用来选择元素的类和 ID，**不应该**再用来为元素添加样式。用 JavaScript 修改元素样式时，应该通过增加和删除**类**来实现。

推荐在只用于 JavaScript 的类和 ID 前添加 `js-`，或者 ID 只用于 JavaScript 选择元素，类用于样式。

#### ID和类名要有意义

#### 创建更好的盒子

盒子的尺寸计算方法有`content-box`和`border-box`，推荐在一个项目中坚持使用一种方法，例如：

```css
*,
*::after,
*::before {
}
```

(ps: `::after`表示法是在 CSS3 中引入的，`::`符号是用来区分[伪类](https://developer.mozilla.org/zh-CN/CSS/Pseudo-classes)和伪元素的。支持CSS3的浏览器同时也都支持CSS2中引入的表示法`:after`，IE8仅支持`:after`)



## 为样式分类

按用途定义样式，有助于创建更优秀的架构，因为将样式组织为不同的类别，促使代码可预测性更强，更易于复用。

#### 通用样式

因为不同浏览器的默认样式有些许差别，所以需要**通用样式**为各种元素的属性设置默认值样式，使其在不同浏览器

表现一致。

推荐 Nicolas Gallagher 和 Jonathan Neal 开发的 [normalize.css](https://necolas.github.io/normalize.css)，可根据自己的项目适当删减。

#### 基础样式

用类型选择器和结合符（例如，ul ul表示ul下面的ul）或者伪类为 HTML 元素添加更加细致的样式。比如：`color`、`font-family`、`font-size`、`letter-spacing`、`line-height`、`margin`、`padding`等。

HTML 元素可分为：区块元素、标题和文本元素、锚点元素、文本语义元素、列表、表格、表单等等，不同的元素在基础样式的设置上稍有不同，可参考 [元素基础样式表](https://github.com/kangkai124/css-fragments/blob/master/css%20refactoring/common.css)。

#### 组件样式

组件重要的是可复用性，如：按钮、下拉菜单、模态框、选项卡等。

1. 定义需要实现的行为，即该组件达到的效果，组织 HTML 结构
2. 为组件里的元素增加样式，确保复用性
3. 根据需要，改写元素容器的样式。如确认按钮，警告按钮，成功按钮等，定义组件的容器元素不同的类名
4. 尺寸在组件的父元素中设置

#### 功能样式

合理使用 `!important` 定义类属性，在 JavaScript 操作样式时使用。如添加下面这个类来实现元素隐藏：

```css
.hidden {
  display: none !important;
}
```

#### 浏览器特定样式

尽管未来浏览器行为趋于统一，但目前一些老的浏览器仍然有怪癖行为。我们不得不使用一些 hack 的样式来解决这些怪癖行为，推荐将这些样式单独放在一个样式表中，并用**条件注释**添加引用。

```html
<!--[if IE 8]>
  <link rel="stylesheet" href="ie8.css" />
<![endif]-->
```



## 维护代码

#### 代码规范

代码规范是将良好的代码编写方法记录下来形成指南，以鼓励团队所有成员以相同的方法编写代码。规范应定期审阅和更新。CSS 代码规范通常指定了注释、格式、命名、选择器用法等方便的规范。

可参考 [CSS 代码规范](https://github.com/kangkai124/css-fragments/blob/master/css%20refactoring/css-format-standard.md)。

#### 模式库

模式库是网站使用的一组用户界面模式，将所有组件汇集在一起。好处就是参与项目的成员都能了解到搭建网站的各个模块，熟悉背后的原理，并且有助于保证用户界面的一致性。

推荐几个优秀的模式库：

- [Mailchimp's Pattern Library](http://ux.mailchimp.com/patterns/)
- [[Carbon Design System](http://carbondesignsystem.com/)](http://carbondesignsystem.com/style/color/swatches)
- [Code For America](http://codeforamerica.clearleft.com/)



## 代码的组织和重构策略

#### 按照样式从最不精确到最精确组织 CSS

之前我们为样式分类，现在我们按照产生作用的顺序再来组织一下 CSS 代码：

1. 通用样式：设定基准，消除不同浏览器之间的不一致性
2. 基础样式：为网站所有元素提供基本的样式，如颜色、间距、行高、字体等，不需要重写
3. 组件及容器样式：以上一步的基础样式为基础，用类定义样式
4. 结构化样式：该样式常用来创建布局，定义尺寸等
5. 功能样式：最精确的样式，满足单一目的而实现的样式，如警告框样式
6. 浏览器特定样式

PS：媒体查询要靠近相关声明块，这样做可以为样式是如何起作用的提供更多的背景信息。

#### 重构前审查 CSS

如下审查非常有助于重构：

- 所用到的属性列表
- 颜色数量
- 使用的最高和最低选择器优先级
- 选择器长度

CSS Dig 是 Google Chrome 的一款插件，可以帮助获取以上信息。

#### 重构策略

推荐多次小范围重构，避免大范围重构引入错误。

（1）删除僵尸代码：

没有使用的声明块、重复的声明块和声明语句。

（2）分离 CSS 和 JavaScript

（3）分离基础样式

如果一个类型选择器使用过多次，新建一条规则集，找到最常用的属性，添加到新的规则集。从其他规则集删除重复的属性，因为它们可以继承新定义的基础样式。

```css
/* 重构前 */
body > div > h1 {
  color: #000;
  font-size: 32px;
  margin-bottom: 12px;
}

.section-condensed h1 {
  color: #000;
  font-size: 16px;
}

.order-form h1 {
  color: #333;
  text-decoration: underline;
}

/* 重构后 */
h1 {
  color: #000;
  font-family: Helvetica, san-serif;
  font-size: 32px;
  line-height: 1.2;
}

body > div > h1 {
  margin-bottom: 12px;
}

.section-condensed h1 {
  font-size: 16px;
}

.order-form h1 {
  color: #333;
  text-decoration: underline;
}
```

（4）删除冗余的 ID

```css
/* 不推荐 */
#main-header ul#main-menu {}
/* 推荐 */
#main-menu {}
```

（5）定义可复用的组件，删除重复的 CSS

（6）删除行内 CSS
