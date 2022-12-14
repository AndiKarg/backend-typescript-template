import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { UserValidator } from '@validators/users.validator';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers);
    this.router.get(`${this.path}/info`, this.usersController.getUsersInfo);
    this.router.get(`${this.path}/:id(\\d+)`, this.usersController.getUserById);
    this.router.delete(`${this.path}/:id(\\d+)`, this.usersController.deleteUser);
  }
}

export default UsersRoute;
