/* eslint-disable max-classes-per-file */

export interface PatternError {
  readonly type: string;
  readonly status: number;
  readonly errors: {
    readonly title: string;
    readonly detail?: string;
    readonly instance: string;
  }[]
}

export interface ApiErrorDetails {
  readonly type?: string;
  readonly status?: number;
  readonly errors: {
    readonly title: string;
    readonly detail?: string;
    readonly instance: string;
  }[]
}

export class ApiError extends Error {
  public readonly error: PatternError;

  constructor(error: PatternError) {
    super();
    this.error = error;
  }
}

export class BadRequestError extends ApiError {
  constructor(details: ApiErrorDetails) {
    super({
      type: 'ValidationError' || details.type,
      status: 400,
      errors: details.errors,
    });
  }
}

export class NotFoundError extends ApiError {
  constructor(details: ApiErrorDetails) {
    super({
      type: 'NotFound' || details.type,
      status: 404,
      errors: details.errors,
    });
  }
}
