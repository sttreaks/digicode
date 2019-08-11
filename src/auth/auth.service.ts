import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginRs } from './rs/login-rs';
import { User } from '../users/user';
import { RegisterRs } from './rs/register-rs';
import { JwtPayload } from './jwt/jwt-payload';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async register(login: string, password: string): Promise<RegisterRs> {
        if (await this.usersService.addOne(login, password)) {
            const user: User = await this.usersService.findOne(login);
            return new RegisterRs(user.userId, user.username, `user ${login} register OK`);
        }
        return new RegisterRs(-1, '', `user ${login} register ERROR`);
    }

    async login(login: string, password: string): Promise<LoginRs> {
        const user: User = await this.usersService.findOne(login);
        if (user && user.password === password) {
            const payload: JwtPayload = { username: login };
            const token = this.jwtService.sign(payload);
            return new LoginRs(token, `user ${login} successfully logged in`);
        }
        return new LoginRs('', `user ${login} logging in ERROR`);
    }

    async validate(username: string): Promise<RegisterRs | null> {
        const user: User = await this.usersService.findOne(username);
        if (user) {
            return new RegisterRs(user.userId, user.username);
        }
        return null;
    }

}
