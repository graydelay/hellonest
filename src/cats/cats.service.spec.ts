import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';

describe('CatsService', () => {
  let catsService: CatsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsService],
    }).compile();

    catsService = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(catsService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array', () => {
      const result = catsService.findAll();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('create', () => {
    it('should create a cat', () => {
      const beforeCreate = catsService.findAll().length;
      catsService.create({
        name: 'bora',
        age: 4,
        breed: false,
      });
      const afterCreate = catsService.findAll().length;

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });

    it('should be find created cats', () => {
      const result = catsService.findAll();

      expect(result).toEqual([{ name: 'bora', age: 4, breed: false }]);
    });
  });
});
