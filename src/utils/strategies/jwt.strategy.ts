import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenService } from '../../token/token.service';
import { EnvVariables } from '../../configurations/configuration.interface';
import { Account } from '../../account/entities/account.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService<EnvVariables>,
    private tokenService: TokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: {
    data: string;
    token_id: number;
    device_id: number;
  }): Promise<boolean | Account> {
    const account = await this.tokenService.validateAccessRefreshToken(payload);

    return account;
  }
}
