import { Inject, Injectable } from '@nestjs/common';
import { Member } from '../member/entities/member.entity';
import { MembersService } from '../member/members.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { DiscountService } from '../discount/discount.service';

@Injectable()
export class OrderService {
  constructor(
    private memberService: MembersService,
    // provide에서 설정한 string 값을 @Inject에 적어준다
    @Inject('DiscountService') private discountService: DiscountService,
  ) {} // DI(Dependency Injection)

  private order: Order[] = [];

  /**
   * 주문을 생성한다.
   *
   * @param {Order} order
   * @return {Order}
   */
  createOrder(orderData: CreateOrderDto): Order {
    const member: Member = this.memberService.findById(orderData.memberId);
    const discountPrice: number = this.discountService.discount(
      member,
      orderData.itemPrice,
    );

    const newOrder: Order = {
      orderId: this.order.length + 1,
      memberId: orderData.memberId,
      itemName: orderData.itemName,
      itemPrice: orderData.itemPrice - discountPrice,
      discountPrice: discountPrice,
    };

    this.order.push(newOrder);

    return newOrder;
  }
}
