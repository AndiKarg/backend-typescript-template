import { NextFunction, Request, Response } from 'express';
import { MsauthCallbackValidator } from '@validators/auth.validator';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import { AuthenticationResult } from '@azure/msal-node';


class AuthController {
  public authService = new AuthService();

  /**
   * @group Routes
   */
  public msalLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authUrl: string = await this.authService.msalLogin();
      res.redirect(authUrl);
    } catch (error) {
      next(error);
    }
  };

  /**
   * @group Routes
   */
  public msalCallback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const code: string = req.query.code as string;
      const foundUser: AuthenticationResult = await this.authService.msalCallback(code);
      console.log("SESSION",req.session)
      req.session.user = {id: 1, email: foundUser.account.idTokenClaims.email as string, name: foundUser.account.name as string};
      res.send("EINGELOGGT");
    } catch (error) {
      next(error);
    }
  };

}

export default AuthController;
