import { Injectable } from '@nestjs/common';
import { Member } from 'src/member/entities/member.entity';

@Injectable()
export class RateDiscountService {
  readonly discountPercent = 10; // 할인율 10%

  /**
   * 고정 할인을 적용한다.
   *
   * @param {Member} member
   * @param {number} price
   * @return null
   */
  discount(member: Member, price: number) {
    if (member.grade == 'VIP') {
      return (price * this.discountPercent) / 100;
    }

    return 0;
  }
}
