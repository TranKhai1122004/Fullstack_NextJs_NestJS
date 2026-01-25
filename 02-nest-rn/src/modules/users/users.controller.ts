import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard';
import { RolesGuard } from '@/auth/passport/roles.guard';
import { Roles } from '@/decorator/roles.decorator';
import { ROLE } from '@/constants/role.enum';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Post()
  @UseGuards(RolesGuard)
  @Roles(ROLE.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  @Get()
  async findAllOrMe(
    @Query() query: string,
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,
    @Request() req,
  ) {
    const role = req.user.role;


    if (role === ROLE.USERS) {
      const me = await this.usersService.findOne(req.user._id);
      return {
        meta: {
          current: 1,
          pageSize: 1,
          pages: 1,
          total: 1,
        },
        users: [me],
      };
    }

    // 👑 ADMIN → FULL LIST
    return this.usersService.findAll(query, +current, +pageSize);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(ROLE.ADMIN)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }


  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(ROLE.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }


}
