import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { CreateUserDto } from '@validators/users.validator';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  /**
   * This comment _supports_ [Markdown](https://marked.js.org/)
   */
  private initializeRoutes() {
    /**
     * This comment _supports_ [Markdown](https://marked.js.org/)
     */
    this.router.post(`${this.path}signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);

    /**
     * Tries to log a User in and saves a cookie in the User storage (for the session).
     *
     * @group Auth
     * @param lol lol
     * @param {String} lol2 lol2
     * @example
     *
     *   axios.post(`${backend}/employees/login`, {
            "email": "andreas.karg@digital-rally.de",
            "password": "nudel666"
          }, {withCredentials: true})
    */
    this.router.post(`${this.path}login`, validationMiddleware(CreateUserDto, 'body'), this.authController.logIn);

    /**
     * @group Auth
     */
    this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;
