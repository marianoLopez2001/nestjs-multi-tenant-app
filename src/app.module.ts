// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { PrismaService } from './prisma.service';
// import { ConfigModule } from '@nestjs/config';
// import config from './config/config';
// import { AuthModule } from '@thallesp/nestjs-better-auth';
// import { auth } from './lib/auth';
// import { BookModule } from './book/book.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//       load: [config]
//     }),
//     AuthModule.forRoot({auth}),
//     BookModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService, PrismaService],
// })
// export class AppModule { }

import { Module, DynamicModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { auth } from './lib/auth';
import { BookModule } from './book/book.module';

// ❌ ELIMINADO: import { AuthModule } from '@thallesp/nestjs-better-auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    
    // Envolvemos la carga del módulo ESM en una promesa que NestJS resolverá al arrancar
    {
      module: class {}, // Un módulo "falso" temporal
      imports: [
        // Usamos una función autoejecutable asíncrona para engañar al compilador de CommonJS
        (async (): Promise<DynamicModule> => {
          const { AuthModule } = await import('@thallesp/nestjs-better-auth');
          return AuthModule.forRoot({ auth });
        })() as any // Casteamos a any porque NestJS procesará la promesa internamente
      ]
    },

    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }