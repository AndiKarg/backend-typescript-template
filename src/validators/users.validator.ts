import { IsEmail, IsString } from 'class-validator'; //--eslint-disable

export class UserValidator {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}