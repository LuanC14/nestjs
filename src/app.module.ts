import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [PrismaService],
})
export class AppModule {}
