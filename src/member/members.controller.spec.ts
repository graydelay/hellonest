import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';

describe('MembersController', () => {
  let membersController: MembersController;
  let membersService: MembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembersController],
      providers: [MembersService],
    }).compile();

    membersService = module.get<MembersService>(MembersService);
    membersController = module.get<MembersController>(MembersController);
    membersController.create({
      name: 'memberA',
      grade: 'BASIC',
    });
  });

  it('should be defined', () => {
    expect(membersController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of members', async () => {
      const result = [{ id: 1, name: 'memberA', grade: 'BASIC' }];
      jest.spyOn(membersService, 'findAll').mockImplementation(() => result);

      expect(await membersController.findAll()).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a member', () => {
      const beforeCreate = membersController.findAll().length;
      membersController.create({
        name: 'memberB',
        grade: 'VIP',
      });
      const afterCreate = membersController.findAll().length;

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('findById', () => {
    it('should return a member', () => {
      const member = membersController.findById(1);

      expect(member).toBeDefined();
      expect(member.id).toEqual(1);
    });

    it('should throw a NotFoundException', () => {
      try {
        membersController.findById(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Member with ID 999 not found.');
      }
    });
  });

  describe('update', () => {
    it('should update a member', () => {
      membersController.update(1, { name: 'Update Name' });
      const member = membersController.findById(1);

      expect(member.name).toEqual('Update Name');
    });

    it('should throw a NotFoundException', () => {
      try {
        membersController.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Member with ID 999 not found.');
      }
    });
  });

  describe('delete', () => {
    it('should delete a member', () => {
      const beforeDelete = membersController.findAll().length;
      membersController.delete(1);
      const afterDelete = membersController.findAll().length;

      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it('should throw a NotFoundException', () => {
      try {
        membersController.delete(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Member with ID 999 not found.');
      }
    });
  });
});
