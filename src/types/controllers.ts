import type { Request } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';

export interface IRequestBody<T> extends Request {
  body: T;
}

export interface IRequestParams<T extends ParamsDictionary> extends Request {
  params: T;
}

export interface IControllerResponse {
  message?: string;
}
