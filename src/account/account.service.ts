import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  forwardRef,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { hash } from 'bcrypt';
import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';
import { ErrorsEnum } from '../utils/enums/errors.enum';
import { AccountTypeEnum } from '../utils/enums/account_type.enum';
import { TokenService } from '../token/token.service';
import { phoneNumberParser } from '../utils/helpers/phone-parser';

@Injectable()
export class AccountService {
  private logger;
  constructor(
    @Inject(forwardRef(() => TokenService))
    private readonly tokenService: TokenService,
  ) {
    this.logger = new Logger('Account Service');
  }

  async create(
    { admin_role, ...createAccountInput }: CreateAccountInput,
    deviceId: number,
    prisma: Prisma.TransactionClient,
    create_admin = false,
  ) {
    try {
      if (
        !create_admin &&
        createAccountInput.account_type === AccountTypeEnum.admin
      ) {
        throw new Error(ErrorsEnum.not_allowed_to_create_admin_account);
      }

      // TODO: Add social media signup and login

      let password = '';
      if (createAccountInput.email) {
        createAccountInput.email = createAccountInput.email.toLowerCase();
        const accountCheck = await prisma.account.findFirst({
          where: {
            email: createAccountInput.email,
          },
        });

        if (accountCheck) {
          throw new Error(ErrorsEnum.email_is_already_in_use);
        }
      }

      if (createAccountInput.mobile) {
        const phoneNumbers = phoneNumberParser(createAccountInput.mobile);
        createAccountInput.mobile = phoneNumbers;
        const accountCheck = await prisma.account.findFirst({
          where: {
            mobile: phoneNumbers,
          },
        });

        if (accountCheck) {
          throw new Error(ErrorsEnum.mobile_is_already_in_use);
        }
      }

      if (createAccountInput.password) {
        password = createAccountInput.password;
        createAccountInput.password = await hash(
          createAccountInput.password,
          10,
        );
      } else {
        throw new Error(ErrorsEnum.password_is_required);
      }

      const account = await prisma.account.create({
        data: {
          ...createAccountInput,
        },
      });

      const loginData = await this.tokenService.login(
        {
          email: createAccountInput.email,
          mobile: createAccountInput.mobile,
          password: password,
        },
        deviceId,
        prisma,
      );

      // TODO: Add Send OTP to mobile and email

      if (account.account_type === AccountTypeEnum.admin) {
        const admin = await prisma.admin.create({
          data: {
            account_id: account.id,
            role: admin_role,
          },
        });

        return {
          admin,
          ...loginData,
        };
      }

      if (account.account_type === AccountTypeEnum.user) {
        const user = await prisma.user.create({
          data: {
            account_id: account.id,
          },
        });

        return {
          user,
          ...loginData,
        };
      }
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.accountWhereInput,
    search?: string,
  ) {
    const where: Prisma.accountWhereInput = { ...filter };

    if (search) {
      search = JSON.parse(search);

      Object.keys(search).forEach((key) => {
        where[key] = { contains: search[key], mode: 'insensitive' };
      });
    }

    try {
      const accounts = await prisma.account.findMany({
        where,
        ...(page && {
          ...(page && {
            skip: Number(pageSize) * (page - 1),
            take: Number(pageSize),
          }),
        }),
      });

      return accounts;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const accounts = await prisma.account.findFirst({
        where: {
          id,
        },
      });

      return accounts;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateAccountInput: UpdateAccountInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const account = await prisma.account.update({
        where: {
          id,
        },
        data: {
          ...updateAccountInput,
        },
      });

      return account;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const account = await prisma.account.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return account;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
