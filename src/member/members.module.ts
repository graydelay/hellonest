import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';

@Module({
  controllers: [MembersController],
  providers: [MembersService],
  exports: [MembersService], // 다른 모듈에서 해당 모듈을 사용하고자 할 때 필요
})
export class MembersModule {
  // constructor(private membersService: MembersService) {} // DI(Dependency injection)
}
