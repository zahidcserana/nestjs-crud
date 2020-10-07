import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

  public async create(user: User): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async findOne(params: DeepPartial<User>): Promise<User> {
    let user: User;
    try {
      user = await this.userRepository.findOne(params);
    } catch (error) { }
    if (!user) {
      throw new NotFoundException(`User with ${JSON.stringify(params)} does not exist`);
    }
    return user;
  }


  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }


  public async update(id: string, payload: User, password?: string): Promise<User> {
    const user = await this.findOne({ id });
    let isPasswordValid: boolean;
    try {
      isPasswordValid = await bcrypt.compare(payload.password, user.password);
    } catch (error) {
      throw new InternalServerErrorException(`An error occured during password comparison: ${error.toString()}`);
    }
    if (isPasswordValid === false) {
      throw new UnauthorizedException(`Invalid password for user ${user.firstname} ${user.lastname} (${user.email}).`);
    }
    let encryptedPassword: string;
    if (!!password && password.length) {
      try {
        encryptedPassword = await bcrypt.hash(password, 10);
      } catch (error) {
        throw new InternalServerErrorException(`An error occured during password hashing: ${error.toString()}`);
      }
    }
    try {
      return this.userRepository.save(!!encryptedPassword ? { ...user, password: encryptedPassword } : user);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  public async delete(params: DeepPartial<User>): Promise<User> {
    const user = await this.findOne(params);
    try {
      await this.userRepository.remove(user);
      return user;
    } catch (error) {
      throw new NotFoundException(`User with ${params.toString()} not found.`);
    }
  }

}