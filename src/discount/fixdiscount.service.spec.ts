import { Test, TestingModule } from '@nestjs/testing';
import { Member } from '../member/entities/member.entity';
import { FixDiscountService } from './fixdiscount.service';

describe('FixDiscountService', () => {
  let fixDiscountservice: FixDiscountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FixDiscountService],
    }).compile();

    fixDiscountservice = module.get<FixDiscountService>(FixDiscountService);
  });

  it('should be defined', () => {
    expect(fixDiscountservice).toBeDefined();
  });

  describe('discount', () => {
    it('should be "VIP" member discount price 1000', () => {
      // given
      const member: Member = { id: 1, name: 'memberA', grade: 'VIP' };
      // when
      const discount = fixDiscountservice.discount(member, 20000);
      // then
      expect(discount).toEqual(1000);
    });

    it('should be "BASIC" member discount price 1000', () => {
      // given
      const member: Member = { id: 1, name: 'memberA', grade: 'BASIC' };
      // when
      const discount = fixDiscountservice.discount(member, 20000);
      // then
      expect(discount).toEqual(0);
    });
  });
});
