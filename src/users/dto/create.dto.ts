import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsUrl,
} from "class-validator";

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsUrl()
  avatar: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: "password is too short" })
  password: string;
}
