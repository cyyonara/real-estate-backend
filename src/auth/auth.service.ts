import { ConflictException, Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { RegisterDto } from "./dto/register.dto";
import { IFilteredUser, IResponse } from "src/types";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(registerDto: RegisterDto): Promise<IResponse<IFilteredUser>> {
    const userWithSameEmail = await this.usersService.findByEmail(
      registerDto.email,
    );

    if (userWithSameEmail) {
      throw new ConflictException("Email already in use");
    }

    const { password, createdAt, updatedAt, isDeleted, ...rest } =
      await this.usersService.create(registerDto);

    return {
      message: "User successfully registered.",
      data: rest,
    };
  }
}
