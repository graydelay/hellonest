import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { CreateMemberDto } from '../member/dto/create-member.dto';
import { MembersService } from '../member/members.service';
import { RateDiscountService } from '../discount/ratediscount.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { FixDiscountService } from '../discount/fixdiscount.service';

describe('OrderService', () => {
  let orderService: OrderService;
  let memberService: MembersService;

  describe('FixDiscountService createOrder', () => {
    beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          OrderService,
          MembersService,
          { provide: 'DiscountService', useClass: FixDiscountService },
        ],
      }).compile();

      orderService = module.get<OrderService>(OrderService);
      memberService = module.get<MembersService>(MembersService);
    });

    it('should be defined', () => {
      expect(orderService).toBeDefined();
    });

    it('should create new order', () => {
      const member: CreateMemberDto = { name: 'memberA', grade: 'VIP' };
      memberService.join(member);

      const orderData: CreateOrderDto = {
        memberId: 1,
        itemName: 'itemA',
        itemPrice: 20000,
      };

      const order: Order = orderService.createOrder(orderData);

      expect(order.discountPrice).toEqual(1000);
    });
  });

  describe('RateDiscountService createOrder', () => {
    beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          OrderService,
          MembersService,
          { provide: 'DiscountService', useClass: RateDiscountService },
        ],
      }).compile();

      orderService = module.get<OrderService>(OrderService);
      memberService = module.get<MembersService>(MembersService);
    });

    it('should be defined', () => {
      expect(orderService).toBeDefined();
    });

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
