---
title: 使用 travis 进行持续集成
date: 2019-07-15 13:00:30
sidebar: auto
tags:
  - travis
  - 持续集成
  - 前端工程化
categories:
  - 前端工程化
---

## 事前准备

进入 [travis-ci.com](https://travis-ci.com)，登录之后 Github 的 repo 授权给 travis，按照指示来即可。

## 部署到 github pages

在项目根目录配置 `.travis.yaml` 配置文件，配置 [github token](https://github.com/settings/tokens) 到 travis 项目的 settings 中 作为密钥

```bash
language: node_js

# 指定 NodeJs 版本，也可直接设为 12
node_js:
  - 'stable'

# 缓存依赖
cache:
  directories:
    - node_modules

# 使用 yarn 安装
install:
  - yarn

# 设置需要监听的分支
branches:
  only:
    - master

# 需要执行的脚本
script:
  - yarn build

deploy:
  provider: pages
  skip_cleanup: true
  github_token: $github_token # Set in the settings page of your repository, as a secure variable
  keep_history: true
  local_dir: public # 打包的地址
  on:
    branch: master
```

push 即可看到效果

## 配置到 CentOS 服务器

### 安装 travis

mac 下：

```bash
# 安装rvm
curl -sSL https://get.rvm.io | bash -s stable
# 安装完成后测试是否安装成功
rvm version

# 安装ruby
rvm install ruby

# 修改镜像源
gem sources -l
gem sources --add http://gems.ruby-china.org/ --remove https://rubygems.org/

# 安装travis命令行工具
gem install travis

# 切回travis用户，执行travis命令有以下输出说明安装成功
travis
Shell completion not installed. Would you like to install it now? |y| y...
```

### 添加 ssh 链接到服务器

```bash
ssh-keygen -t rsa # 会生成 id_rsa 当然你也可以选择文件名...
ssh-copy-id -i .ssh/id_rsa.pub <部署服务器用户名>@<部署服务器地址>
#  测试一下 SSH 免密登陆
ssh <部署服务器用户名>@<部署服务器地址>
```

### 加密 ssh 密钥

进入项目根目录，执行

```bash
# 登录 travis github token 自己拿
travis login --pro -g <github-token>

# 将 ssh 密钥写入 .travis.yaml
travis encrypt-file ~/.ssh/id_rsa --add

# 出现提示输入 y 之后会重新格式化 .travis.yaml 文件。
```

登录的配置可参考 [788 issue](https://github.com/travis-ci/travis.rb/issues/788#issuecomment-750927765)

打开 .travis.yaml 文件会看到多了以下内容

```bash
before_install:
  - openssl aes-256-cbc -K $encrypted_******_key -iv $encrypted_******_iv
    -in id_rsa.enc -out ~/.ssh/id_rsa -d
```

添加脚本

```bash
language: node_js

# 指定 NodeJs 版本，也可直接设为 12
node_js:
  - 'stable'

# 缓存依赖
cache:
  directories:
    - node_modules

# 使用 yarn 安装
install:
  - yarn

# 设置需要监听的分支
branches:
  only:
    - master

# 需要执行的脚本
script:
  - yarn test
  - yarn build

# 添加 SSH 信任列表（服务器的IP）
addons:
  ssh_known_hosts:
    - $remote_ip

before_install:
  # 用于 ssh 连接服务器
  - openssl aes-256-cbc -K $encrypted_f217180e22ee_key -iv $encrypted_f217180e22ee_iv
  -in id_rsa.enc -out ~/.ssh/id_rsa -d
  - chmod 600 ~/.ssh/id_rsa

# 执行部署脚本 （$remote_ip $remote_user $project_dir 在 travis 上配置即可）
after_success:
  - ssh $remote_user@$remote_ip -o StrictHostKeyChecking=no rm -rf $project_dir
  - scp -o StrictHostKeyChecking=no -r ./public $remote_user@$remote_ip:$project_dir
```

## 相关文章

- [Travis CI 自动部署 Github 项目至远程服务器](https://www.bluesdream.com/blog/travis-ci-auto-deployment-the-github-project-to-remote-server.html)
- [Travis-CI 自动化测试并部署至自己的 CentOS 服务器](https://juejin.cn/post/6844903570563858445)
- [用 Travis CI 打造大前端持续集成和自动化部署](https://juejin.cn/post/6844903808758185998)
