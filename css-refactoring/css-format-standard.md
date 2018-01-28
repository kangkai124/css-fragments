#### 1. 注释

（1）易混淆的属性，应注释

```css
.tab-group {
  display: block;
  margin-left: -12px;  /* 清除父容器padding值 */
}
```

（2）不应继续使用的废弃样式，应注释

#### 2. 格式

（1）规则集满足

- 有多个属性时，每个属性占一行
- 规则集声明块中每条声明缩进2个空格

（2）声明语句满足

- 冒号有加1个空格
- 必须以分号结尾

```css
.selector {
  property1: value;
  property2: value;
}
```

#### 3. 选择器命名

（1）只允许使用小写字母

（2）选择器命名有意义

（3）多个单词使用减号`-`连接

```css
.selector-with-multiple-words {
  ...
}
```

（4）禁止为 id 添加样式，应使用类。

```css
/* not recommended */
#main {
  ...
}
/* recommended */
.main {
  ...
}
```

（5）用 JavaScript 修改样式，必须通过增加或删除类来完成

（6）用作 JavaScript 选择器的类和 id，必须添加 `js-` 前缀，并严禁在样式表中使用

```css
/* not recommended */
$('.item').on('click', function (e) {
  $(this).css('background-color', '#ff0');
});
/* recommended */
$('.js-item').on('click', function (e) {
  $(this).addClass('highlighted');
});
```

#### 4. 属性

（1）属性的简写形式只用于 border、margin、padding

```css
/* not recommended */
.main {
  border: 1px solid #333;
  font: 14px Arial, sans-serif;
}
/* recommended */
.main {
  border: 1px solid #333;
  font-family: Arial, sans-serif;
  font-size: 14px;
}
```

（2）属性按照首字母顺序排序

```css
.main {
  border: 1px solid #333;
  background-color: #2ee;
  margin: 0;
  padding: 0;
}
```

（3）属性值为0，省略单位