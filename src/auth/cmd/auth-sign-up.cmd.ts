
import { ApiProperty } from '@nestjs/swagger';
import { IUser } from 'src/users/interface/user.interface';

export class AuthSignUpCmd implements IUser {
  constructor(data: IUser) {
    this.email = data.email;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.password = data.password;
  }
  @ApiProperty() email: string;
  @ApiProperty() firstname: string;
  @ApiProperty() lastname: string;
  @ApiProperty() password: string;
}
