---
title: 构建项目团队规范
date: 2019-12-16
sidebar: 'auto'
tags:
  - 前端工程化
  - husky
categories:
  - 技术漫谈
---

- [husky](https://github.com/typicode/husky): 能让你更简单地使用 Git hooks。
- [lint-staged](https://github.com/okonet/lint-staged): 对变更的文件进行 lint 操作。

:::: tabs

::: tab husky

Husky 能让你更简单地使用 Git hooks，可以利用钩子在 git commit 之前校验或者格式化文件

简单用 `create-react-app` 搭建一个项目：

```bash
npx create-react-app --template --typescript
tyarn add -D husky
```

在 `package.json` 添加 `husky` 脚本：

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "CI=true react-scripts test", // CI=true 表示 no watch
  "eject": "react-scripts eject"
},
"husky": {
  "hooks": {
    "pre-commit": "npm run test", // 用的最多，在 commit 时拦截钩子，执行需要的命令
    "pre-push": "npm run test", // 在 push 之前的钩子
  }
}
```

:::

::: tab lint-staged

使用 `lint-staged` 可以做到只对 `git add` 在暂存区的文件进行 `lint`.

```bash
tyarn add -D lint-staged prettier
```

在 `package.json` 添加脚本

```js
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},·
"lint-staged": {
  "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": [
    "prettier --single-quote --write",
    "git add"
  ]
}
```

:::

::: tab eslint

为了让 vscode 的 eslint 插件启用 typescript 支持，需要添加下面的配置到 `.vscode/settings.json` 中。

```json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    { "language": "typescript", "autoFix": true },
    { "language": "typescriptreact", "autoFix": true }
  ]
}
```

参见 [AlloyTeam/eslint-config-alloy](https://github.com/AlloyTeam/eslint-config-alloy/blob/master/README.zh-CN.md#typescript-react)

:::

::: tab prettier

```bash
tyarn add -D prettier
```

新增 `.prettierrc.js`

```JS
module.exports = {
  printWidth: 100,           // 一行最多 100 字符
  jsxBracketSameLine: true,  // 多行JSX中的>放置在最后一行的结尾，而不是另起一行（默认false）
  semi: true,                // 默认添加分号
  singleQuote: true,         // 单引号
  trailingComma: 'all',      // 末尾需要有逗号
  bracketSpacing: true,      // 大括号内的首尾需要空格
  arrowParens: 'always',     // 箭头函数，只有一个参数的时候，也需要括号
}
```

修改 `package.json`

```js
"lint-staged": {
  "src/**/*.{js,jsx,ts,tsx}": [
    "prettier --write",
    "eslint --fix",
    "git add"
  ]
}
```

:::

::: tab stylelint

react-scripts@2.0.0 内置了 sass 支持，我们只需要安装 `node-sass` 依赖即可。

```bash
tyarn add node-sass stylelint stylelint-config-standard stylelint-config-recess-order stylelint-scss -D
```

- `stylelint-config-standard`： 官网提供的 css 标准
- `stylelint-config-recess-order`： 属性排列顺序
- `stylelint-scss`: lint scss

```js
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  plugins: ['stylelint-scss'],
  defaultSeverity: 'warning',
  rules: {
    // 校验规则略
  }
};
```

:::

::::

## 配置编码规范

```bash
tyarn add -D husky lint-staged npm-run-all

# eslint
tyarn add -D eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-config-alloy

# prettier stylelint
tyarn add -D prettier stylelint stylelint-config-recess-order stylelint-config-standard stylelint-order stylelint-scss node-sass
```

### .prettierrc.js

```JS
module.exports = {
  printWidth: 100,           // 一行最多 100 字符
  jsxBracketSameLine: true,  // 多行JSX中的>放置在最后一行的结尾，而不是另起一行（默认false）
  semi: true,                // 默认添加分号
  singleQuote: true,         // 单引号
  trailingComma: 'all',      // 末尾需要有逗号
  bracketSpacing: true,      // 大括号内的首尾需要空格
  arrowParens: 'always',     // 箭头函数，只有一个参数的时候，也需要括号
}
```

.prettierignore

### .eslintrc.js

```js
module.exports = {
  extends: ['alloy', 'alloy/react', 'alloy/typescript'],
  env: {
    // 你的环境变量（包含多个预定义的全局变量）
    //
    // browser: true,
    // node: true,
    // mocha: true,
    jest: true
    // jquery: true
  },
  globals: {
    // 你的全局变量（设置为 false 表示它不允许被重新赋值）
    //
    // myGlobal: false
  },
  rules: {
    // 自定义你的规则
  }
};
```

### .vscode/settings.json

```json
{
  "editor.tabSize": 2,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // 保存时自动修复 ESLint 错误
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "typescript",
      "autoFix": true
    },
    {
      "language": "typescriptreact",
      "autoFix": true
    }
  ]
}
```

### package.json

```json
"scripts": {
  "dev": "react-scripts start",
  "build": "react-scripts build",
  "test": "CI=true react-scripts test",
  "eject": "react-scripts eject",
  "lint": "npm-run-all --parallel lint:**",
  "lint:ts": "eslint --fix --ext .ts,.tsx src",
  "lint:style": "stylelint --fix .scss src "
},
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "src/**/*.scss": "stylelint --fix",
  "src/**/*.{js,jsx,ts,tsx}": [
    "prettier --write",
    "eslint --fix",
    "git add"
  ]
},
```

### 声明文件

src/typings.d.ts

```ts
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module '*.svg';
```

## 配置 Commit 规范

参考：[Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

### 提交规范

```bash
tyarn add -D @commitlint/cli @commitlint/config-conventional
```

`commitlint.config.js`

```js
const types = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'perf',
  'test',
  'build',
  'release',
  'chore',
  'revert'
];

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', types],
    'scope-case': [0, 'always'],
    'subject-empty': [2, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [2, 'always', 88]
  }
};
```

这样提交就做好限制了

### changelog 生成

```bash
tyarn add -D conventional-changelog
```

```json
"scripts": {
  "dev": "react-scripts start",
  "build": "react-scripts build",
  "test": "CI=true react-scripts test",
  "eject": "react-scripts eject",
  "lint": "npm-run-all --parallel lint:**",
  "lint:ts": "eslint --fix --ext .ts,.tsx src",
  "lint:style": "stylelint --fix .scss src ",
  "changelog": "conventional-changelog -p angular -i ./CHANGELOG.md -s -r 0"
},
"husky": {
  "hooks": {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
    "pre-commit": "lint-staged"
  }
},
```

### commitizen

全局安装这个 就可以使用 git cz 命令辅助提交代码了

```bash
tyarn global add commitizen
```

```bash
git add .
git cz --disable-emoji --scope=模块1
```
