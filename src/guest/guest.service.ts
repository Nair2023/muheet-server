import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateGuestInput } from './dto/create-guest.input';
import { UpdateGuestInput } from './dto/update-guest.input';
import { Prisma } from '@prisma/client';
import { TokenService } from '../token/token.service';
import {
  TokenReturn,
  TokenReturnWithGuestId,
} from '../token/entities/token.entity';
import dayjs from 'dayjs';

@Injectable()
export class GuestService {
  private logger;
  constructor(private readonly tokenService: TokenService) {
    this.logger = new Logger('Guest Service');
  }

  async create(
    createGuestInput: CreateGuestInput,
    device_id: number,
    prisma: Prisma.TransactionClient,
  ): Promise<TokenReturnWithGuestId> {
    try {
      const guest = await prisma.guest.create({
        data: {
          ...createGuestInput,
        },
      });

      const loginGuest = await this.guestLogin(
        guest.guest_id,
        device_id,
        prisma,
      );

      return {
        guest_id: guest.guest_id,
        id: guest.id,
        ...loginGuest,
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.guestWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.guestWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const guest = await prisma.guest.findMany({
        where,
        ...(page && {
          ...(page && {
            skip: Number(pageSize) * (page - 1),
            take: Number(pageSize),
          }),
        }),
        orderBy: {
          id: 'desc',
        },
      });

      return guest;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const guests = await prisma.guest.findFirst({
        where: {
          id,
        },
      });

      return guests;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateGuestInput: UpdateGuestInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const guest = await prisma.guest.update({
        where: {
          id,
        },
        data: {
          ...updateGuestInput,
        },
      });

      return guest;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const guest = await prisma.guest.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return guest;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async guestLogin(
    guestId: string,
    device_id: number,
    prisma: Prisma.TransactionClient,
  ): Promise<TokenReturn> {
    const guest = await prisma.guest.findUnique({
      where: {
        guest_id: guestId,
      },
    });

    const tokens = await this.tokenService.generateAccessRefreshTokens(
      null,
      {
        data: guest.guest_id,
        device_id: device_id,
      },
      prisma,
      guest.id,
    );

    return {
      result: true,
      tokens,
    };
  }

  async logoutGuest(
    token: string,
    prisma: Prisma.TransactionClient,
    device_id: string,
  ) {
    try {
      const guest_id = (
        await prisma.token.findFirst({
          where: { token_data: token },
        })
      ).guest_id;

      await prisma.token.updateMany({
        where: { guest_id, token_data: token },
        data: { expiry_date: dayjs().toDate() },
      });

      await prisma.device.update({
        where: { id: +device_id },
        data: { guest_id: null },
      });

      return true;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
