import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService], // 다른 모듈에서 해당 모듈을 사용하고자 할 때 필요
})
export class CatsModule {
  // constructor(private catsService: CatsService) {} // DI(Dependency injection)
}
