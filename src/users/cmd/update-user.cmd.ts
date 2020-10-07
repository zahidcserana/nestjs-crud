import { UserRole, UserStatus } from '../user.entity';

import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../interface/user.interface';

export class UpdateUserCmd {
  constructor(data: IUser) {
    this.id = data.id;
    this.email = data.email;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.password = data.password;
    this.role = data.role;
    this.status = data.status;
  }
  @ApiProperty() id: string;
  @ApiProperty() email: string;
  @ApiProperty() firstname: string;
  @ApiProperty() lastname: string;
  @ApiProperty() password: string;
  @ApiProperty() role: UserRole;
  @ApiProperty() status: UserStatus;
}
