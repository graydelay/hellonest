import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MembersService } from './members.service';

describe('MembersService', () => {
  let membersService: MembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MembersService],
    }).compile();

    membersService = module.get<MembersService>(MembersService);
    membersService.join({
      name: 'memberA',
      grade: 'BASIC',
    });
  });

  it('should be defined', () => {
    expect(membersService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array', () => {
      const result = membersService.findAll();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('join', () => {
    it('should join a member', () => {
      const beforeJoin = membersService.findAll().length;
      membersService.join({
        name: 'memberB',
        grade: 'VIP',
      });
      const afterJoin = membersService.findAll().length;

      expect(afterJoin).toBeGreaterThan(beforeJoin);
    });
  });

  describe('findById', () => {
    it('should return a member', () => {
      const member = membersService.findById(1);

      expect(member).toBeDefined();
      expect(member.id).toEqual(1);
    });

    it('should throw a NotFoundException', () => {
      try {
        membersService.findById(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Member with ID 999 not found.');
      }
    });
  });

  describe('updateById', () => {
    it('should update a member', () => {
      membersService.updateById(1, { name: 'Update Name' });
      const member = membersService.findById(1);

      expect(member.name).toEqual('Update Name');
    });

    it('should throw a NotFoundException', () => {
      try {
        membersService.updateById(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Member with ID 999 not found.');
      }
    });
  });

  describe('deleteById', () => {
    it('should delete a member', () => {
      const beforeDelete = membersService.findAll().length;
      membersService.deleteById(1);
      const afterDelete = membersService.findAll().length;

      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it('should throw a NotFoundException', () => {
      try {
        membersService.deleteById(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Member with ID 999 not found.');
      }
    });
  });
});
