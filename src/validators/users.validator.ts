import { IsEmail, IsString } from 'class-validator'; //--eslint-disable

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
