---
title: NPM Audit
date: 2022-05-05 17:22:23
sidebar: auto
tags:
  - NPM
categories:
  - 技术漫谈
---

当我们在使用 NPM 安装模块时，它会自动检查我们所安装的模块是否存在已知的漏洞，这个过程就是 npm audit。npm audit 可以帮助我们找出项目中存在的潜在漏洞，并给出相应的修复建议，从而提高项目的安全性。

具体来说，当我们在项目根目录下运行 `npm audit` 命令时，NPM 会扫描项目中所有依赖的模块，检查每个模块的安全漏洞情况，然后生成一个漏洞报告，包括严重程度、漏洞描述、受影响的模块等信息。如果发现了漏洞，我们可以通过运行 `npm audit fix` 命令来自动修复其中一些漏洞，或者手动更新受影响的模块版本来解决问题。

## npm audit

```bash
npm audit

# 没有安全漏洞
found 0 vulnerabilities

# 有安全漏洞
109 vulnerabilities (1 low, 29 moderate, 61 high, 18 critical)

# 那么可以用 npm audit --json > audit.json 命令生成报告，查看安全漏洞的信息
npm audit --json > audit.json
```

::: code-group

```json [Danger Demo]
{
  "auditReportVersion": 2,
  "vulnerabilities": {
    "webpack-bundle-analyzer": {
      "name": "webpack-bundle-analyzer",
      "severity": "critical",
      "isDirect": true,
      "via": ["ejs"],
      "effects": [],
      "range": "1.3.0 - 3.9.0",
      "nodes": ["node_modules/webpack-bundle-analyzer"],
      "fixAvailable": {
        "name": "webpack-bundle-analyzer",
        "version": "4.8.0",
        "isSemVerMajor": true
      }
    }
    //...
  },
  "metadata": {
    "vulnerabilities": {
      "info": 0,
      "low": 1,
      "moderate": 29,
      "high": 61,
      "critical": 18,
      "total": 109
    },
    "dependencies": {
      "prod": 1610,
      "dev": 61,
      "optional": 70,
      "peer": 0,
      "peerOptional": 0,
      "total": 1738
    }
  }
}
```

```json [Safe Demo]
{
  "auditReportVersion": 2,
  "vulnerabilities": {},
  "metadata": {
    "vulnerabilities": {
      "info": 0,
      "low": 0,
      "moderate": 0,
      "high": 0,
      "critical": 0,
      "total": 0
    },
    "dependencies": {
      "prod": 68,
      "dev": 919,
      "optional": 41,
      "peer": 0,
      "peerOptional": 0,
      "total": 986
    }
  }
}
```

:::

## npm aduit fix

::: code-group

```bash
npm aduit fix

72 vulnerabilities (1 low, 22 moderate, 39 high, 10 critical)
```

```bash [其他命令]
# 运行audit fix，但是只更新pkglock， 不更新node_modules：
$ npm audit fix --package-lock-only

# 只更新dependencies中安装的包，跳过devDependencies中的包：
$ npm audit fix --only=prod

# 运行命令，得到audit fix将会更新的内容，并且输出json格式的安装信息，但是并不真的安装更新
$ npm audit fix --dry-run --json
```

:::

即使运行 `npm audit fix` 命令，有时候还会出现未修复的漏洞。这种情况通常是由于以下原因之一：

1. 漏洞修复需要手动更改代码：有些漏洞可能需要通过手动修改代码来修复。在这种情况下，运行 `npm audit fix` 只会更新你的依赖项到最新版本，但不会自动更改代码。
2. 版本锁定：如果你在项目中使用了特定版本的依赖项，并且该版本中存在漏洞，则 `npm audit fix` 无法解决此问题。这是因为 `npm audit fix` 将更新依赖项到最新版本，而不是更新到修补漏洞的版本。
3. 漏洞修复尚未发布：有时，漏洞被发现后，尚未发布修复程序。在这种情况下，`npm audit fix` 无法帮助你修复漏洞，直到修复程序可用并发布到 npm 上。

如果你确定执行了 `npm audit fix` 并且有未修复的漏洞，建议手动查看漏洞报告，并尝试手动修复或等待修复程序发布。

我们可以输出报告，进一步 fix 问题，比如

```json
{
  "webpack-bundle-analyzer": {
    "name": "webpack-bundle-analyzer",
    "severity": "critical",
    "isDirect": true,
    "via": ["ejs"],
    "effects": [],
    "range": "1.3.0 - 3.9.0",
    "nodes": ["node_modules/webpack-bundle-analyzer"],
    "fixAvailable": {
      "name": "webpack-bundle-analyzer",
      "version": "4.8.0",
      "isSemVerMajor": true
    }
  }
}
```

- 当前版本：`"webpack-bundle-analyzer": "^3.5.0"`，
- 报告提示：`fixAvailable "version": "4.8.0"`

那么可以手动安装 `4.8.0` 版本来修复这个问题

```bash
npm i -D webpack-bundle-analyzer@4.8.0

# 结果
70 vulnerabilities (1 low, 22 moderate, 39 high, 8 critical)
```

可以明显发现 critical 数量明显减少了！

## Fix 情况

```json
{
  "shell-quote": {
    "name": "shell-quote",
    "severity": "critical",
    "isDirect": false,
    "via": [
      {
        "source": 1091418,
        "name": "shell-quote",
        "dependency": "shell-quote",
        "title": "Improper Neutralization of Special Elements used in a Command in Shell-quote",
        "url": "https://github.com/advisories/GHSA-g4rg-993r-mgx7",
        "severity": "critical",
        "range": "<=1.7.2"
      }
    ],
    "effects": ["react-dev-utils"],
    "range": "<=1.7.2",
    "nodes": ["node_modules/shell-quote"],
    "fixAvailable": {
      "name": "react-dev-utils",
      "version": "12.0.1",
      "isSemVerMajor": true
    }
  }
}
```

这个 audit report 中描述的是一个名为 "shell-quote" 的软件包存在一个严重的漏洞。该漏洞可能会导致恶意用户在执行命令时注入恶意代码，从而导致系统被攻击者接管或敏感信息泄露。

根据报告，这个漏洞出现在 shell-quote 版本 1.7.2 及以下版本中。如果您的项目中使用了受影响的版本，则需要对其进行升级以修复此漏洞。

报告中提到，已经发布了 react-dev-utils 版本 12.0.1，其中包含了修复此漏洞的更新。因此，建议您将依赖项 react-dev-utils 升级至 12.0.1 或更高版本，以解决这个问题。
