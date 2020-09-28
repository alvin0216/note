---
title: 实现弹框
---

DOM 结构

```html
<body>
  <button class="open-btn">点击弹框</button>
  <div class="modal-mask">
    <div class="modal">
      <button class="close-btn">点击关闭</button>
    </div>
  </div>
</body>
```

:::details css

```css
.modal-mask {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
}

.modal {
  width: 520px;
  height: 220px;
  padding: 20px;
  margin: 0 auto;
  position: relative;
  top: 100px;
  background-color: #fff;
}
```

:::

mask 覆盖全局。`mask: { width: 100vw, height: 100vh }`

点击 box 会触发 mask 上绑定的点击事件，所以要阻止 box 点击冒泡，这样就不会让窗关闭了。

```js
const $openBtn = document.querySelector('.open-btn')
const $closeBtn = document.querySelector('.close-btn')
const $modalMask = document.querySelector('.modal-mask')
const $modal = document.querySelector('.modal')

$modal.addEventListener('click', function(e) {
  e.stopPropagation() // 点击 modal 阻止冒泡
})

function toggleShow(show = true) {
  $modalMask.style.display = show ? 'block' : 'none'
}

$openBtn.addEventListener('click', toggleShow) // 点击

$closeBtn.addEventListener('click', () => toggleShow(false)) // 点击 mask 关闭
$modalMask.addEventListener('click', () => toggleShow(false))
```
