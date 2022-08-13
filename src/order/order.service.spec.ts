import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { CreateMemberDto } from '../member/dto/create-member.dto';
import { MembersService } from '../member/members.service';
import { RateDiscountService } from '../ratediscount/ratediscount.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrderService', () => {
  let orderService: OrderService;
  let memberService: MembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService, MembersService, RateDiscountService],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
    memberService = module.get<MembersService>(MembersService);
  });

  it('should be defined', () => {
    expect(orderService).toBeDefined();
  });

  describe('createOrder', () => {
    it('should create new order', () => {
      const member: CreateMemberDto = { name: 'memberA', grade: 'VIP' };
      memberService.join(member);

      const orderData: CreateOrderDto = {
        memberId: 1,
        itemName: 'itemA',
        itemPrice: 20000,
      };

      const order: Order = orderService.createOrder(orderData);

      expect(order.discountPrice).toEqual(2000);
    });
  });
});
