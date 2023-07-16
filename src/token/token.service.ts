import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { TokenTypeEnum } from '../utils/enums/token_type.enum';
import { CreateTokenInput } from './dto/create-token.input';
import { UpdateTokenInput } from './dto/update-token.input';
import { Token, TokenReturn, Tokens } from './entities/token.entity';
import dayjs from 'dayjs';
import { EnvVariables } from '../configurations/configuration.interface';
import { ConfigService } from '@nestjs/config';
import { Account } from '../account/entities/account.entity';
import { AccountService } from '../account/account.service';
import { LoginDto } from './dto/login.input';
import { ErrorsEnum } from '../utils/enums/errors.enum';
import { compare } from 'bcrypt';

@Injectable()
export class TokenService {
  private logger;
  constructor(
    private readonly accountService: AccountService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvVariables>,
  ) {
    this.logger = new Logger('Token Service');
  }

  async create(
    createTokenInput: CreateTokenInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      return (await prisma.token.create({
        data: { ...createTokenInput },
      })) as Token;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    filter: Prisma.tokenWhereInput,
    page: number,
    pageSize: number,
  ) {
    try {
      return prisma.token.findMany({
        where: { ...filter },
        ...(page && {
          ...(page && {
            skip: Number(pageSize) * (page - 1),
            take: Number(pageSize),
          }),
        }),
      });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      return await prisma.token.findUnique({ where: { id } });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateTokenInput: UpdateTokenInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      return await prisma.token.update({
        where: { id },
        data: { ...updateTokenInput },
      });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      return await prisma.token.delete({ where: { id } });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async validateAccessRefreshToken(payload: {
    data: string;
    token_id: number;
  }): Promise<boolean | Account> {
    try {
      return await this.prismaService.$transaction(
        async (prisma) => {
          const token = await prisma.token.findFirst({
            where: {
              id: payload.token_id,
              expiry_date: { gte: new Date() },
            },
          });

          if (!token?.account_id) return false;

          this.logger.log(
            `${TokenTypeEnum[token.token_type]} Token has been validated`,
          );

          const account = (await this.accountService.findOne(
            token.account_id,
            prisma,
          )) as Account;

          if (!account) return false;

          return account;
        },
        { timeout: 100000000, maxWait: 100000000 },
      );
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  JWTSign(
    payload: { data: string; token_id: number; device_id: number },
    expiry: string,
  ): string {
    try {
      const token = this.jwtService.sign(
        {
          ...payload,
          data: payload.data?.toLocaleLowerCase(),
        },
        { expiresIn: expiry, secret: this.configService.get('JWT_SECRET') },
      );
      this.logger.log('Token has been signed');
      return token;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async generateAccessRefreshTokens(
    account_id: number | null,
    payload: {
      data: string;
      device_id: number;
    },
    prisma: Prisma.TransactionClient,
    guest_id?: number | null,
  ): Promise<Tokens> {
    try {
      const tokens = await this.generateAccessRefreshTokensDocuments(
        account_id,
        prisma,
        guest_id,
      );

      const signedAccessToken = this.JWTSign(
        { token_id: tokens.access_token.id, ...payload },
        this.configService.get('ENV') === 'development' ? '30d' : '24h',
      );

      const signedRefreshToken = this.JWTSign(
        { token_id: tokens.refresh_token.id, ...payload },
        '30d',
      );

      await this.updateTokens(
        {
          access_token: signedAccessToken,
          refresh_token: signedRefreshToken,
        },
        prisma,
        tokens.access_token,
        tokens.refresh_token,
      );

      await prisma.device.update({
        where: { id: payload.device_id },
        data: { account_id, guest_id },
      });

      return {
        access_token: signedAccessToken,
        refresh_token: signedRefreshToken,
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async generateAccessRefreshTokensDocuments(
    account_id: number | null,
    prisma: Prisma.TransactionClient,
    guest_id?: number | null,
  ): Promise<{ access_token: Token; refresh_token: Token }> {
    try {
      const accessToken: Token = await this.create(
        {
          account_id,
          expiry_date: dayjs().add(24, 'h').toDate(),
          token_type: TokenTypeEnum.access,
          guest_id,
        },
        prisma,
      );

      const refreshToken: Token = await this.create(
        {
          account_id,
          related_token_id: accessToken.id,
          expiry_date: dayjs().add(30, 'd').toDate(),
          token_type: TokenTypeEnum.refresh,
          guest_id,
        },
        prisma,
      );

      return {
        access_token: accessToken,

        refresh_token: refreshToken,
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async updateTokens(
    { ...updateTokens }: UpdateTokenInput,
    prisma: Prisma.TransactionClient,
    access_token?: Token,
    refresh_token?: Token,
    temp_token?: Token,
  ): Promise<boolean> {
    try {
      if (access_token) {
        await prisma.token.update({
          where: { id: access_token.id },
          data: {
            token_data: updateTokens.access_token,
          },
        });
      }

      if (refresh_token) {
        await prisma.token.update({
          where: { id: refresh_token.id },
          data: {
            token_data: updateTokens.refresh_token,
          },
        });
      }

      if (temp_token) {
        await prisma.token.update({
          where: { id: temp_token.id },
          data: {
            token_data: updateTokens.temp_token,
          },
        });
      }

      return true;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async refreshToken(
    account: Account,
    device_id: number,
    prisma: Prisma.TransactionClient,
  ): Promise<TokenReturn> {
    try {
      this.logger.verbose('REFRESH TOKEN TRIGGERED');
      const tokens = await this.generateAccessRefreshTokens(
        account.id,
        {
          data: account.mobile,
          device_id,
        },
        prisma,
      );

      this.logger.log(
        `Access Token and refresh token for account with id of ${account.id} have been refreshed`,
      );

      return { result: !!tokens, tokens };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async login(
    loginInput: LoginDto,
    deviceId: number,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      let account: Account;
      if (loginInput.mobile || loginInput.email) {
        account = (await prisma.account.findFirst({
          where: {
            is_deleted: false,
            OR: [{ mobile: loginInput.mobile }, { email: loginInput.email }],
          },
        })) as Account;

        if (!loginInput.password) {
          throw new Error(ErrorsEnum.password_is_required);
        }

        if (!(await compare(loginInput.password, account.password))) {
          throw new Error(ErrorsEnum.invalid_password);
        }
      }

      if (!account) throw new Error(ErrorsEnum.account_not_found);

      const tokens = await this.generateAccessRefreshTokens(
        account.id,
        {
          data: loginInput?.mobile ? loginInput.mobile : loginInput.email,
          device_id: +deviceId,
        },
        prisma,
        null,
      );

      return {
        ...account,
        tokens,
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async logout(
    token: string,
    prisma: Prisma.TransactionClient,
    device_id: string,
  ) {
    try {
      const account_id = (
        await prisma.token.findFirst({
          where: { token_data: token },
        })
      ).account_id;

      await prisma.token.updateMany({
        where: { account_id, token_data: token },
        data: { expiry_date: dayjs().toDate() },
      });

      await prisma.device.update({
        where: { id: +device_id },
        data: { account_id: null },
      });

      return true;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
