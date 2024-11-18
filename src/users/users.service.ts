import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { IUser } from "src/types";
import { CreateDto } from "./dto/create.dto";
import { hash } from "argon2";

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ password, ...rest }: CreateDto): Promise<IUser> {
    return this.prismaService.user.create({
      data: { ...rest, password: await hash(password) },
    });
  }

  findByEmail(email: string): Promise<IUser | null> {
    return this.prismaService.user.findUnique({ where: { email } });
  }
}
