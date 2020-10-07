import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginCmd {
  @ApiProperty() email: string;
  @ApiProperty() password: string;
}
