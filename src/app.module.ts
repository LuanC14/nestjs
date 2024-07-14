import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './controllers/auth.controller';
import { QuestionController } from './controllers/question.controller';

@Module({
  // ForRoot possibilita passar configurações extras para o módulo
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true
    }),
    AuthModule
  ],
  controllers: [UserController, AuthController, QuestionController],
  providers: [PrismaService],
})
export class AppModule { }
