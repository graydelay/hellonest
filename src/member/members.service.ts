import { Injectable } from '@nestjs/common';
import { Member } from './interfaces/member.interface';

@Injectable()
export class MemberService {
  private readonly members: Member[] = [];

  /**
   * 회원를 생성한다.
   *
   * @param {Member} member
   * @returns
   */
  createMember(member: Member) {
    this.members.push(member);
  }

  /**
   * 회원 Id에 해당하는 회원 정보를 조회한다.
   *
   * @param {number} memberId - 회원 Id
   * @returns {Member}
   */
  findById(memberId: number) {
    return this.members.filter((member) => member.id === memberId);
  }
}
