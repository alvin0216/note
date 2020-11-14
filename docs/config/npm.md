---
title: npm、yarn
---

```bash
# 查看缓存目录
npm config get cache
yarn cache dir

# 清理缓存包
npm cache clean --force
yarn cache clean

# 查看当前源
npm get registry
yarn config get registry

# 设置镜像源
npm config set registry http://registry.npm.taobao.org/
yarn config set registry http://registry.npm.taobao.org/

# 安装淘宝的cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org

# 安装tyarn
npm i yarn tyarn -g

# yarn中global包升级
yarn global upgrade

# yarn中特定包升级
yarn upgrade -lastest umi
yarn upgrade umi@3.0.0
```
