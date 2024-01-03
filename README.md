# nestjs-module-loader

NestJS 的 Module 不支持配置指定某个路径导入所有的内容，受 `TypeORM` 的启发，这是一个集成`glob`语法的 Module 装饰器，仅支持同步模块的导入。

# Install

```bash
npm i nestjs-module-loader -S
```

# Usage

EnhancedModule 装饰器是对 NestJS 自有的 Module 装饰器的增强，所以它完全兼容 Module 装饰器的语法，它重写了 Module 装饰器的每一项，使得您可以继续使用原有的语法，或者使用 EnhancedModule 的增强语法。

## 例 1

```ts
// import { Module } from '@nestjs/common';
import { EnhancedModule } from "nestjs-module-loader";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
@EnhancedModule({
  imports: [
    {
      pattern: "modules/**/*.module.js",
      ctxDir: __dirname,
    },
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## 例 2

使用对象形式导入指定目录下面的所有 controller 文件

```ts
import { Module } from "@nestjs/common";
import { Test1Controller } from "./test1.controller";
import { EnhancedModule } from "nestjs-module-loader";

@EnhancedModule({
  controllers: {
    pattern: "*.controller.js",
    ctxDir: __dirname,
  },
})
export class Test1Module {}
```

# API

```ts
interface ComponentEnhanceLoadType {
  /**
   * 指定匹配的路径
   */
  pattern: string;
  /**
   * 指定glob匹配模式的上下文路径
   */
  ctxDir: string;
  /**
   * 排除的路径
   */
  exclude?: string | string[];
}
```
