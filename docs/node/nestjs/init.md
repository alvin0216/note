---
title: 项目搭建
date: 2020-11-06 22:13:46
---

```bash
yarn global add @nestjs/cli
nest new nestdemo
cd nestdemo && yarn start:dev # 开发 热重启模式
```

## nest 命令

```bash
nest g module modules/user # 创建模块 user
nest g co modules/user # 创建 user controller
nest g service modules/user # 创建 user service

# 一键创建
nest g module modules/user && nest g co modules/user && nest g service modules/user

# 创建出的文件夹 位于 src 目录下
.
└── modules
    └── user
        ├── user.controller.spec.ts
        ├── user.controller.ts
        ├── user.module.ts
        ├── user.service.spec.ts
        └── user.service.ts
```

## 实现增删改查

点击查看 [Nest 对请求的处理](https://docs.nestjs.cn/7/controllers?id=request)

controller 控制器中 `@Controller()` 装饰器对路由进行了包装了。比如如下

```bash
├── user.controller.ts # 控制器
├── user.dto.ts # 定义数据传输对象
├── user.module.ts # 模型 在 app.module.ts 中注入
└── user.service.ts # 服务 一般用于做数据库的操作
```

`user.dto.ts`

```ts
export enum UserRole {
  seller,
  buyer
}

export class CreateUserDto {
  username: string
  password: string
  phone?: number
  role: UserRole
}
```

`user.controller.ts`

```ts
import { Body, Controller, Delete, Get, Headers, HttpCode, Param, Patch, Post } from '@nestjs/common'
import { CreateUserDto } from './user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {} // 注入服务 本例并无使用

  @Get()
  fetch() {
    return '获取用户列表' // 访问 /user
  }

  @Post()
  create(@Body() body: CreateUerDTO) {
    // body CreateUerDTO 来统一格式
    return '创建用户'
  }

  @Patch(':id')
  @HttpCode(204)
  update(@Param() { id }, @Body() {}): string {
    return 'patch'
  }

  @Delete(':id')
  remove(@Param() { id }): string {
    return 'delete'
  }

  @Get()
  @Redirect('https://nestjs.com', 301)
  jump() {}
}
```

访问 `/user/***`

<h3>Controller & Service</h3>

```ts
import { UserService } from './user.service'

@Controller('user')
export class UserController {}
```

如果想调用服务，需要做依赖注入

```ts
import { UserService } from './user.service'

export class UserController {
  constructor(private readonly userService: UserService) {}
}
```

`user.service.ts`

```ts
import { Injectable } from '@nestjs/common'
@Injectable()
export class UserController {}
```
