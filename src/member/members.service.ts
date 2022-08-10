import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';

@Injectable()
export class MembersService {
  private members: Member[] = [];

  /**
   * 회원 DB에 있는 모든 회원 정보를 조회한다.
   *
   * @returns {Member[]}
   */
  findAll(): Member[] {
    return this.members;
  }

  /**
   * 회원 Id에 해당하는 회원 정보를 조회한다
   *
   * @param {number} memberId - 회원 Id
   * @returns {Member}
   */
  findById(memberId: number): Member {
    const member = this.members.find((member) => member.id === memberId);
    if (!member) {
      throw new NotFoundException(`Member with ID ${memberId} not found.`);
    }

    return member;
  }

  /**
   * 회원를 생성한다.
   *
   * @param {Member} member
   * @returns Promise<Member>
   */
  join(memberData: CreateMemberDto) {
    this.members.push({
      id: this.members.length + 1,
      ...memberData,
    });
  }

  /**
   * 회원 Id에 해당하는 회원 정보를 삭제한다
   *
   * @param {number} memberId
   * @returns null
   */
  deleteById(memberId: number) {
    this.findById(memberId);
    this.members = this.members.filter((member) => member.id !== memberId);
  }

  /**
   * 회원 Id에 해당하는 회원 정보를 업데이트 한다
   *
   * @param {number} memberId
   * @returns null
   */
  updateById(memberId: number, updateData: UpdateMemberDto) {
    const member = this.findById(memberId);
    this.deleteById(memberId);
    this.members.push({
      ...member,
      ...updateData,
    });
  }
}
