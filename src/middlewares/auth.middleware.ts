import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { UserEntity } from '@/models/users.model';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';

/**
 * It checks if the user has a valid token, if so, it adds the user to the request object and calls the
 * next middleware
 * @param {RequestWithUser} req - RequestWithUser - this is the request object that is passed to the
 * middleware. We are extending it with a user property.
 * @param {Response} res - Response - the response object
 * @param {NextFunction} next - NextFunction - a function that will be called when the middleware is
 * done.
 */
const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const { id } = (await verify(Authorization, secretKey)) as DataStoredInToken;
      const findUser = await UserEntity.findOne(id, { select: ['id', 'email', 'password'] });

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
