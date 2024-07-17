import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { AuthModule } from './modules/auth/auth.module';
import { QuestionController } from './controllers/question/question.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { UserController } from './controllers/user/user.controller';

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
