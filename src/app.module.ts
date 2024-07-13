import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';

@Module({
  // ForRoot possibilita passar configurações extras para o módulo
  imports: [ConfigModule.forRoot({
    validate: env => envSchema.parse(env),
    isGlobal: true
  })], 
  controllers: [UserController],
  providers: [PrismaService],
})
export class AppModule {}
