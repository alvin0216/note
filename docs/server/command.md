---
title: linux 常用命令
date: 2019-12-30 09:07:08
---

## linux 常用命令

> 类似 ls cd xxx 的简单命令这里也不一一列举了

### 查看目录

- `ls`：列出目录内容
- `ls -a`: 所有文件和目录 包括隐藏的文件

### 切换目录

- `cd ~`: 当前用户主目录
- `cd -`: 上一次访问的目录

### 创建文件/目录

- `mkdir -pv aa/bb` : 创建多级目录 `aa/bb`
  - `-p`：父目录不存在情况下先生成父目录
  - `-v`显示命令执行过程中的详细信息
- `touch`
  - `touch src/test.js`: 在 `src` 目录下创建 `test.js`

### 删除文件/目录

- `rm filename`: 删除文件
- `rm -rf filepath`: 删除目录

### 查看/复制/拷贝

- `cat filename`：浏览文件内容
- `cp a.js b.js`：复制 `a.js` 到 `b.js`
- `cp -r src test`: 递归复制 `src` 下的所有文件到 `test` 文件夹 `-r` 递归处理
- `mv`: 剪切 重命名
  - `mv ./1.txt /root`: 将当前目录下的 `1.txt` 文件 剪切到 `root` 目录下
  - `mv ./1.txt ./2.txt`: 将当前目录下的 `1.txt` 文件重命名为 `2.txt`

### grep

用于过滤/搜索特定字符。可使用正则表达式 能多种命令配合使用
格式：`grep [option] pattern [file]` grep 参数 过滤条件 文件 （-i 或 --ignore-case 忽略字符大小写的差别）
例如：`cat package.json | grep -i docs` 在 cat 命令输出结果基础上，进行过滤

```bash
"docs:dev": "vuepress dev docs",
"docs:build": "vuepress build docs",
"dev": "npm run docs:dev",
"build": "npm run docs:build"
```

### 系统命令/进程

- `ps [参数]`
- `ps -ef`: 查看当前所有进程
  - `-e` 此参数的效果和指定“A”参数相同，显示所有程序
  - `-f` 显示 UID,PPIP,C 与 STIME 栏位
- `ps | grep -i mysql` 过滤出 mysql 这个进程

- `kill -9`: 表示强制终止
- `kill -9 pid`: 可先通过 `ps -ef` 查找出所要删除的进程 `pid`，再通过 `kill -9 pid` 终止进程

### 压缩解压

tar 功能：文件备份压缩

- 格式：

  - tar  参数 压缩后的文件名 被压缩的文件名
  - tar  参数     被解压的文件名   -C  指定目录（如果省略 -C 指定目录，则解压到当前文件夹）

- `-c` 建立一个压缩文件的参数指令（create）--压缩
- `-x` 解开一个压缩文件的参数指令（extract）--解压
- `-z` 是否需要用 gzip 压缩
- `-v` 压缩的过程中显示文件（verbose）
- `-f` 使用档名，在 f 之后要立即接档名（file）

常用解压参数组合：zxvf

常用压缩参数组合：zcvf

例如：

`tar -zcvf /root/1.tar /root/a` 将 root 目录下的 a 文件夹压缩成 1.tar,放在 root 目录下。

`tar -zxvf ./1.tar` 将当前目录下的 1.tar 文件解压缩

### 关机/重启

- `Linux centos` 重启命令：`reboot`
- `Linux centos` 关机命令：`halt`

### 和远程的交互

`scp`

- `scp root@12.34.56.78:/home/1.text /`: 拷贝远程 `1.text` 到本地目录 `/`
- `scp /1.text root@12.34.56.78:/home`: 上传 `1.text` 文件到远程
- `scp /data root@12.34.56.78:/home` `: 上传文件夹以及内容到远程

## yum 常用命令

- **查看是否安装了软件包**

  - `yum list`: 显示所有已经安装和可以安装的程序包
  - `yum list <package_name>`
  - `yum info <package_name>`

- **删除软件包**: `yum remove <package_name>`

- **查找软件包**: `yum search <keyword>`

- **安装软件包**

  - `yum install <package_name>`
  - `yum install -y <package_name>`: 自动安装

- **更新**

  - `yum check-update`: 检查可更新的程序
  - `yum update <package_name>`: 更新某个包
  - `yum update`: 全部更新，升级所有包

- **清除缓存**
  - `yum clean packages`: 清除缓存目录下的软件包
  - `yum clean headers`: 清除缓存目录下的 headers
  - `yum clean oldheaders`: 清除缓存目录下旧的 headers
