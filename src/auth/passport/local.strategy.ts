import * as bcrypt from 'bcrypt';
import * as passport from 'passport';

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { Strategy } from 'passport-local';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends Strategy {
  constructor(private readonly userService: UsersService) {
    super(
      {
        usernameField: 'email',
        passReqToCallback: false,
      },
      async (email, password, done) => await this.logIn(email, password, done),
    );
    passport.use(this as Strategy);
  }

  public async logIn(email, password, done) {
    console.log('login');
    await this.userService
      .findOne({ email })
      .then(async user => {
        await bcrypt
          .compare(password, user.password)
          .then(isValid => {
            return isValid ? done(null, user) : Promise.reject('Invalid password');
          })
          .catch(err => Promise.reject(new UnauthorizedException(err.toString())));
      })
      .catch(err => done(err, false));
  }
}
