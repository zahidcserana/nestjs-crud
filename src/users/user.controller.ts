import * as jwt from 'jsonwebtoken';

import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';

import { ChangePasswordCmd } from './cmd/change-password.cmd';
import { DeleteUserDto } from './dto/delete-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserCmd } from './cmd/update-user.cmd';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: GetUserDto, isArray: true, description: 'Success!' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiOperation({ summary: 'Get all users', description: 'Get a list of all registered users.' })
  async findAll(): Promise<GetUserDto[]> {
    const userList = (await this.usersService.findAll()).map(user => new GetUserDto(user));
    return Promise.resolve(userList);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: GetUserDto, description: 'Success!' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiOperation({ summary: 'Get user', description: 'Get user matching route id.' })
  async findOne(@Param('id') id: string): Promise<GetUserDto> {
    const user = await this.usersService.findOne({ id });
    return new GetUserDto(user);
  }

  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: UpdateUserDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error.' })
  @ApiOperation({ summary: 'Update user', description: 'Update user matching route id.' })
  async updateOne(@Param('id') id: string, @Body() user: UpdateUserCmd): Promise<UpdateUserDto> {
    const updatedUser = await this.usersService.update(id, new User(user));
    return new UpdateUserDto(updatedUser);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: DeleteUserDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiOperation({ summary: 'Delete user', description: 'Delete user matching route id.' })
  async deleteOne(@Param('id') id: string): Promise<DeleteUserDto> {
    const deletedUser = await this.usersService.delete({ id });
    return new DeleteUserDto(deletedUser);
  }
}
