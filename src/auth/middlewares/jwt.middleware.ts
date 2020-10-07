import * as passport from 'passport';

import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { User } from '../../users/user.entity';


@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    passport.authenticate(
      'jwt',
      { session: false, failureRedirect: '/api/unauthorized' },
      value => {
        if (value) {
          next();
        } else {
          throw new UnauthorizedException();
        }
      },
    )(req, res, next);
  }
}
