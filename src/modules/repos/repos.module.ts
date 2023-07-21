import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ReposController } from './repos.controller';
import { ReposService } from './repos.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [HttpModule, UsersModule],
  controllers: [ReposController],
  providers: [ReposService],
})
export class ReposModule {}
