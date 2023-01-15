import type { Request } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';
import type { ParsedQs } from 'qs';

export interface IRequestBody<B> extends Request {
  body: B;
}

export interface IRequestParams<P extends ParamsDictionary> extends Request {
  params: P;
}

export interface IRequestQuery<Q extends ParsedQs> extends Request {
  query: Q;
}

export interface IControllerResponse {
  message?: string;
}
