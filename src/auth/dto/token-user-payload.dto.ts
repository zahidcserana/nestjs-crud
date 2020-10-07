
import { ApiProperty } from '@nestjs/swagger';
import { IUser } from 'src/users/interface/user.interface';
import { UserRole, UserStatus } from '../../users/user.entity';

export class TokenUserPayload {
  constructor(data: IUser) {
    this.sub = data.id;
    this.email = data.email;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.role = data.role;
    this.status = data.status;
  }
  @ApiProperty() sub: string;
  @ApiProperty() email: string;
  @ApiProperty() firstname: string;
  @ApiProperty() lastname: string;
  @ApiProperty() role: UserRole;
  @ApiProperty() status: UserStatus;
}
