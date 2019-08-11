import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './jwt-sensetive';
import { RegisterRs } from '../rs/register-rs';
import { AuthService } from '../auth.service';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: JwtPayload): Promise<boolean> {
        const username: string = payload.username;

        const user: RegisterRs = await this.authService.validate(username);
        if (!user) {
            throw new UnauthorizedException();
        }
        return true;
    }
}
