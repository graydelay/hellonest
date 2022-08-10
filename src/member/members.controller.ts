import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {} // DI(Dependency Injection)

  @Get()
  findAll(): Member[] {
    return this.membersService.findAll();
  }

  @Get(':id')
  findById(@Param('id') memberId: number): Member {
    return this.membersService.findById(memberId);
  }

  @Post()
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.join(createMemberDto);
  }

  @Delete(':id')
  delete(@Param('id') memberId: number) {
    return this.membersService.deleteById(memberId);
  }

  @Patch(':id')
  update(@Param('id') memberId: number, @Body() updateData: UpdateMemberDto) {
    return this.membersService.updateById(memberId, updateData);
  }
}
