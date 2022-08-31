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
    this.router.get(`${this.path}/microsoft`, this.authController.msalLogin);

    /**
     * @group Auth
     */
    this.router.get(`${this.path}/microsoft/callback`, this.authController.msalCallback);

  }
}

export default AuthRoute;
