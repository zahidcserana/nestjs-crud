import { UserRole, UserStatus } from '../user.entity';

import { ApiProperty } from '@nestjs/swagger';

export interface IChangePasswordCmd {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export class ChangePasswordCmd {
  constructor(data: IChangePasswordCmd) {
    this.email = data.email;
    this.oldPassword = data.oldPassword;
    this.newPassword = data.newPassword;
  }
  @ApiProperty() email: string;
  @ApiProperty() oldPassword: string;
  @ApiProperty() newPassword: string;
}
