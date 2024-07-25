/* eslint-disable max-classes-per-file */
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { ApiError, BadRequestError } from './errorAbst';

const errorMiddleware = (
  error: Error & ApiError,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    const errors = error.errors.map(({ path, message, code }) => ({
      title: code,
      detail: message,
      instance: path.join('.'),
    }));

    return response.status(400).json(new BadRequestError({
      type: 'validation_error',
      errors,
    }));
  }

  if (error instanceof ApiError) {
    return response.status(error.error.status).json(error);
  }

  return response.status(500).json(' =-=-= Internal Server Error =-=-= ');
};

export default errorMiddleware;
