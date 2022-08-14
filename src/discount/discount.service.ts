import { Inject } from '@nestjs/common';
import { Member } from '../member/entities/member.entity';

export interface DiscountService {
  discount(member: Member, price: number);
}
