import { Controller, Post, Body } from "@nestjs/common";
import { IFilteredUser, IResponse } from "src/types";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register") // @POST - public - /api/auth/register
  register(
    @Body() registerDto: RegisterDto,
  ): Promise<IResponse<IFilteredUser>> {
    return this.authService.register(registerDto);
  }
}
