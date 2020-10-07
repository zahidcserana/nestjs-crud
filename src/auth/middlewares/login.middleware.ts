import * as passport from 'passport';

import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/user.entity';


@Injectable()
export class LogInMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    passport.authenticate(
      'local',
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
