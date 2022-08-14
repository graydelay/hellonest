import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './logger.middleware';
import { MembersModule } from './member/members.module';
import { OrderService } from './order/order.service';
import { RateDiscountService } from './discount/ratediscount.service';

@Module({
  imports: [CatsModule, MembersModule], // Provider를 가지고 있는 다른 모듈 가져오기
  controllers: [AppController],
  providers: [
    AppService,
    OrderService,
    { provide: 'DiscountService', useClass: RateDiscountService },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'cats', method: RequestMethod.ALL });
  }
}
