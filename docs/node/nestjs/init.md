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

# 创建出的文件夹
.
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts
└── modules
    └── user
        ├── user.controller.spec.ts
        ├── user.controller.ts
        ├── user.module.ts
        ├── user.service.spec.ts
        └── user.service.ts
```

## 路由和请求处理

点击查看 [Nest 对请求的处理](https://docs.nestjs.cn/7/controllers?id=request)

controller 控制器中 `@Controller()` 装饰器对路由进行了包装了。比如如下

```ts
import { Body, Controller, Delete, Get, Headers, HttpCode, Param, Patch, Post } from '@nestjs/common'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {} // 注入服务

  @Get()
  fetch() {
    return '获取用户列表'
  }

  @Post()
  create(@Body() body: CreateUerDTO) {
    return '创建用户'
  }

  @Patch(':id')
  @HttpCode(204)
  update(@Param() { id }, @Body() {}): string {
    return 'patch'
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() { id }, @Headers('token') token): string {
    return 'delete'
  }
}
```

访问 `/user/***`

## DTO 定义数据传输格式

比如：`src/modules/user/user.dto.ts`

```ts
import { ApiProperty } from '@nestjs/swagger'

export enum UserRole {
  buyer = 1,
  seller = 2
}

export class CreateUerDTO {
  username: string
  password: string
  phone: number
  role: UserRole
}
```
