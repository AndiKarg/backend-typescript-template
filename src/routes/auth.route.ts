import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';

class AuthRoute implements Routes {
  public path = '/auth';
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
     * @group Auth
     */
    this.router.get(`${this.path}/msauth/login`, this.authController.msalLogin);

    /**
     * @group Auth
     */
    this.router.get(`${this.path}/msauth/callback`, this.authController.msalCallback);

    /**
     * @group Auth
     */
    this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;
