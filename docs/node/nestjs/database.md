---
title: 搭建 typeorm 和 mysql
---

自行安装 mysql，开启数据库`mysql.server start`

## 配置

```bash
├── app.controller.ts
├── config
│   └── database.ts
├── main.ts
└── modules
    └── user
        ├── user.controller.ts
        ├── user.dto.ts
        ├── user.entity.ts  # 实体文件
        ├── user.module.ts
        └── user.service.ts
```

`app.module.ts`

```ts
import { ConfigModule, ConfigService } from 'nestjs-config'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')), // 注入配置文件模块
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService] // inject 将外部的配置 注入TypeOrmModule中
    }),
    UserModule
  ]
})
export class AppModule {}
```

`src/config/database.ts`

```ts
import { join } from 'path'

export default {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'nest',
  entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')], // 自动读取 **.entity.ts 的实体
  synchronize: true
}
```

## 定义实体文件

`src/modules/user/user.entity.ts`

```ts
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 20 })
  username: string

  @Column('varchar')
  password: string

  @Column({ type: 'char', width: 11 })
  phone: number
}
```

## 注入服务

```ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UsersEntity } from './user.entity'
import { Repository, Connection, getRepository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private connection: Connection
  ) {}

  async create(body): Promise<UsersEntity[]> {
    const { username } = body
    const u = await getRepository(UsersEntity).findOne({ where: { username } })

    if (u) {
      throw new HttpException(
        { message: 'Input data validation failed', error: 'username must be unique.' },
        HttpStatus.BAD_REQUEST
      )
    }
    return await this.usersRepository.save(body)
  }
}
```

## 在控制器中调用

```ts
import { UserService } from './user.service'
import { CreateUserDto } from './user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body)
  }
}
```
