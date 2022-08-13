import { Test, TestingModule } from '@nestjs/testing';
import { Member } from 'src/member/entities/member.entity';
import { RateDiscountService } from './ratediscount.service';

describe('RateDiscountService', () => {
  let rateDiscountService: RateDiscountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RateDiscountService],
    }).compile();

    rateDiscountService = module.get<RateDiscountService>(RateDiscountService);
  });

  it('should be defined', () => {
    expect(rateDiscountService).toBeDefined();
  });

  it('should be "VIP" member discount price 1000', () => {
    // given
    const member: Member = { id: 1, name: 'memberA', grade: 'VIP' };
    // when
    const discount = rateDiscountService.discount(member, 20000);
    // then
    expect(discount).toEqual(2000);
  });

  it('should be "BASIC" member discount price 1000', () => {
    // given
    const member: Member = { id: 1, name: 'memberA', grade: 'BASIC' };
    // when
    const discount = rateDiscountService.discount(member, 20000);
    // then
    expect(discount).toEqual(0);
  });
});
