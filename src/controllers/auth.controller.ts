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
      console.log("HIII");
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
      console.log("BIN IM MSAL CALLBACK", req.query);
      const code: string = req.query.code as string;
      console.log("CODE", code);
      const foundUser: AuthenticationResult = await this.authService.msalCallback(code);
      console.log('FOUND USER', foundUser);
      res.send("EINGELOGGT");
    } catch (error) {
      next(error);
    }
  };

  /**
   *  @group Routes
   */
  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
