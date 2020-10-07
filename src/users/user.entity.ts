import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { IUser } from './interface/user.interface';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export enum UserStatus {
  PENDING = 'pending',
  CONFIRM = 'confirm',
}

@Entity()
export class User implements IUser {
  constructor(data: IUser) {
    if (!!data) {
      this.id = data.id;
      this.firstname = data.firstname;
      this.lastname = data.lastname;
      this.email = data.email;
      this.password = data.password;
      this.role = data.role;
      this.status = data.status;
    }
  }

  @PrimaryGeneratedColumn('uuid') public id: string;

  @Column() public firstname: string;

  @Column() public lastname: string;

  @Column() public email: string;

  @Column() public password: string;

  @Column() public role: UserRole;

  @Column() public status: UserStatus;
}
