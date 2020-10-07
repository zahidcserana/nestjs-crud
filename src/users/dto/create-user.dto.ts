
import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../interface/user.interface';

export class CreateUserDto implements IUser {
  constructor(data: IUser) {
    this.email = data.email;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
  }
  @ApiProperty() email: string;
  @ApiProperty() firstname: string;
  @ApiProperty() lastname: string;
}
