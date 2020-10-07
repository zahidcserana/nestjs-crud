import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole, UserStatus } from '../users/user.entity';
import { environment } from 'environment/environment.dev';
import { TokenUserPayload } from './dto/token-user-payload.dto';
import * as jwt from 'jsonwebtoken';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne({ email });
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    public async signUp(user: User) {
        user.role = UserRole.USER;
        user.status = UserStatus.PENDING;
        user = await this.usersService.create(user);
        return this.createToken(user);
    }
    public async createToken(signedUser: User) {
        const expiresIn = environment.JWT_EXPIRATION;
        const secretOrKey = environment.SECRET_KEY;
        const user = new TokenUserPayload(signedUser);
        const userPOJO = JSON.parse(JSON.stringify(user));
        const accessToken = jwt.sign(userPOJO, secretOrKey, { expiresIn });
        return new TokenDto({
            expiresIn,
            accessToken,
        });
    }
}