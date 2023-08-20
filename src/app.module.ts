import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoController } from './demo/demo.controller';
import { UserService } from './demo/user.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController, DemoController],
  providers: [AppService, UserService, PrismaService],
})
export class AppModule {}
