---
title: webpack 雪碧图
date: 2020-09-17 11:05:28
---

```js
npm i webpack-spritesmith -D
```

目录

```bash
├── assets
│   └─ images
│       ├── icons # 存放 icons 的文件夹
│       └── sprites # 添加配置后 生成的雪碧图的文件夹
```

```js
const SpritesmithPlugin = require('webpack-spritesmith')

module.exports = {
  resolve: {
    modules: ['node_modules', 'assets/images/sprites'), // 添加解析路径
  },

  plugins: [
     new SpritesmithPlugin({
        // 设置源icons,即icon的路径，必选项
        src: {
        cwd: path.resolve(paths.appSrc, './assets/images/icons'),
        glob: '*.png'
      },
      //设置导出的sprite图及对应的样式文件，必选项
      target: {
        image: path.resolve(paths.appSrc, './assets/images/sprites/sprite.png'),
        css: path.resolve(paths.appSrc, './assets/images/sprites/sprite.css')  // 生成对应的 less 文件
      },
      //设置sprite.png的引用格式
      apiOptions: {
        cssImageRef: '~sprite.png'  //cssImageRef为必选项
      },
        //配置spritesmith选项，非必选
      spritesmithOptions: {
        algorithm: 'top-down'//设置图标的排列方式
      }
    })
  ]
}
```

生成的文件为

```bash
├── sprite.css
└── sprite.png
```

生成的 css 文件：

```css
/*
Icon classes can be used entirely standalone. They are named after their original file names.

Example usage in HTML:

`display: block` sprite:
<div class="icon-home"></div>

To change `display` (e.g. `display: inline-block;`), we suggest using a common CSS class:

// CSS
.icon {
  display: inline-block;
}

// HTML
<i class="icon icon-home"></i>
*/
.icon-tips {
  background-image: url(~sprite.png);
  background-position: 0px 0px;
  width: 32px;
  height: 32px;
}
.icon-rotate {
  background-image: url(~sprite.png);
  background-position: 0px -32px;
  width: 130px;
  height: 130px;
}
.icon-scale {
  background-image: url(~sprite.png);
  background-position: 0px -162px;
  width: 132px;
  height: 132px;
}
```

直接使用即可。更多配置详见插件介绍。

- [webpack-spritesmith](https://github.com/mixtur/webpack-spritesmith)
- [webpack 雪碧图生成](https://juejin.im/post/6844903714935799822)
