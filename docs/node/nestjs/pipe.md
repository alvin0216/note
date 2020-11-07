---
title: 使用管道进行类型转换和验证
date: 2020-11-07 19:34:43
---

## 类型转换

使用内置的管道：

```ts
import { RolesGuard } from 'src/common/guards/role.guard'
import { Controller, Param, ParseIntPipe, Patch } from '@nestjs/common'

@Controller('user')
export class UserController {
  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id) {
    console.log(typeof id) // string -> number
    return 123
  }
}
```

## 类型校验

`src/common/pipes/validation.pipe.ts`

```bash
yarn add class-transformer class-validator
```

```ts
import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform, Type } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    // tslint:disable-next-line
    console.log('校验参数', value)
    const { metatype } = metadata
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }
    const object = plainToClass(metatype, value)
    const errors = await validate(object)
    if (errors.length > 0) {
      const errObj = {}
      errors.forEach(err => {
        const { property, constraints } = err
        errObj[property] = Object.values(constraints)
      })
      throw new HttpException({ message: 'Request params validation failed', error: errObj }, HttpStatus.BAD_REQUEST)
    }
    return value
  }

  private toValidate(metatype: Type<any>): boolean {
    const types = [String, Boolean, Number, Array, Object]
    return !types.find(type => metatype === type)
  }
}
```

在全局使用：

```ts
import { ValidationPipe } from './common/pipes/validation.pipe'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe()) // 全局管道
  await app.listen(5000)
}
bootstrap()
```

Controller

```ts
import { RolesGuard } from 'src/common/guards/role.guard'
import { Controller, Param, ParseIntPipe, Post } from '@nestjs/common'
import { CreateUserDto } from './user.dto'

@Controller('user')
export class UserController {
  @Post()
  create(@Body() body: CreateUserDto) {
    return 123
  }
}
```

DTO 文件

```ts
import { IsString, IsInt, IsNotEmpty } from 'class-validator'

export enum UserRole {
  seller,
  buyer
}

export class CreateUserDto {
  @IsNotEmpty({ message: '真实姓名不能为空' })
  @IsString()
  username: string

  @IsString()
  password: string

  @IsInt()
  phone?: number

  @IsInt()
  role: UserRole
}
```
