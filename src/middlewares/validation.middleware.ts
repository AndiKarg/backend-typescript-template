import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { HttpException } from '@exceptions/HttpException';

/**
 * It takes a TypeScript class, a request property (body, query, params), and some validation options,
 * and returns a middleware function that validates the request property against the class
 * @param {any} type - The class that you want to validate.
 * @param {string | 'body' | 'query' | 'params'} [value=body] - The value to validate.
 * @param [skipMissingProperties=false] - If true, skip validation of missing properties.
 * @param [whitelist=true] - If true, validation will only validate properties that exist in the class,
 * otherwise it will validate all properties.
 * @param [forbidNonWhitelisted=true] - If true, validation will fail if there are properties in the
 * object that were not specified in the class-validator constraints.
 * @returns A function that takes in a request, response, and next function.
 */
const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => {
  return (req, res, next) => {
    validate(plainToClass(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
        next(new HttpException(400, message));
      } else {
        next();
      }
    });
  };
};

export default validationMiddleware;
