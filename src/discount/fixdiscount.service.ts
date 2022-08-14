import { Injectable } from '@nestjs/common';
import { Member } from '../member/entities/member.entity';
import { DiscountService } from './discount.service';

@Injectable()
export class FixDiscountService implements DiscountService {
  readonly discountFixAmount = 1000; // 1000원 할인

  /**
   * 고정 할인을 적용한다.
   *
   * @param {Member} member
   * @param {number} price
   * @return null
   */
  discount(member: Member, price: number) {
    if (member.grade == 'VIP') {
      return this.discountFixAmount;
    }

    return 0;
  }
}
