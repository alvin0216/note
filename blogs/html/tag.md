---
title: 语义化标签
date: 2019-07-15 13:00:28
sidebar: 'auto'
tags:
  - HTML
  - 语义化标签
categories:
  - HTML & CSS
---

:::: tabs

::: tab 概览
![](https://gitee.com/alvin0216/cdn/raw/master/images/html5-layout.png)
:::

::: tab 代码

```html
<head>
  <title>语义化HTML</title>
</head>

<body>
  <header>头部</header>

  <aside>
    <!-- 侧边栏 -->
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/new">new</a></li>
      </ul>
    </nav>
  </aside>

  <main>
    <article>
      <!-- hgroup 对h1-h6标签进行分组。内含一个或多个h1-h6标签。示例：文章主标题和副标题 -->
      <hgroup>
        <h2>主标题</h2>
        <h3>副标题</h3>
      </hgroup>

      <p>你好，我是文章的内容</p>

      <section>
        <!-- 定义文档中的节（section、区段），一般包含标题或页眉 -->
        文本字体元素：

        <time datetime="2020-02-15" pubdate>2012年02月15日</time>
        <strong>加粗字体</strong>
        <u>下划线字体</u>
        <em
          >斜体：em
          是句意强调，加与不加会引起语义变化，也可以理解为局部强调，用在语句某个单词上来改变句子的侧重。</em
        >
        <cite>斜体：用于定义引用内容出自书籍或杂志等的标题，不允许其他信息，如作者，日期等。</cite>
        <abbr title="xx">定义一个缩写文本，建议在 abbr 的 title 属性中描述缩写的全称</abbr>
      </section>

      <section>
        分组元素标签：

        <!-- 富文本 图片+描述 -->
        <figure>
          <img src="https://gitee.com/alvin0216/cdn/raw/master/images/html5-layout.png" />
          <figcaption>照片描述</figcaption>
        </figure>

        <blockquote>引用：标记一段长引文。标记短引文（行内引文），应采用 q 元素！</blockquote>

        <pre>
          <code>代码</code>
        </pre>
      </section>
    </article>

    <form action="#" id="iform" method="post">
      <fieldset>
        <!-- fieldset 元素可将表单内的相关元素分组。 比较少用 -->
        <legend>表单标题</legend>
        <label for="tel">电话：</label><input type="tel" id="tel" />
      </fieldset>

      <label for="email">邮箱：</label><input type="email" id="email" autofocus />

      <label for="dt">datetime：</label><input type="datetime" id="dt" required />

      <button type="submit">submit</button>
    </form>
  </main>

  <footer>
    <address>
      地址：代表区块容器，必须是作为联系信息出现，邮编地址、邮件地址等等,一般出现在footer
    </address>
  </footer>
</body>
```

:::

::::

## figure

```html
<!-- 富文本 图片+描述 -->
<figure>
  <img src="https://gitee.com/alvin0216/cdn/raw/master/images/html5-layout.png" />
  <figcaption>照片描述</figcaption>
</figure>
```
