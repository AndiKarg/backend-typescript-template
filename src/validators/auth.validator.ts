import { IsString } from 'class-validator'; //--eslint-disable

export class MsauthCallbackValidator {
  @IsString()
  public code: string;
}
