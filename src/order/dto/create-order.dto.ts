import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  readonly memberId: number;

  @IsString()
  readonly itemName: string;

  @IsNumber()
  readonly itemPrice: number;
}
