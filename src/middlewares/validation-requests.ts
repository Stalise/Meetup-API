import { Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

import type {
  IRequestBody,
  IControllerResponse,
  IRequestParams,
} from 'types/controllers';
import type { IMeetup, IMeetupForUpdate, IParamsId } from 'types/meetups';

type ParamsType = IParamsId;
type BodyType = IMeetup | IMeetupForUpdate;

export const validationBody =
  <B extends BodyType>(schema: ObjectSchema<B>) =>
  (
    req: IRequestBody<B>,
    res: Response<IControllerResponse>,
    next: NextFunction
  ) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    if (value) {
      req.body = value;
    }
    next();
  };

export const validationParams =
  <P extends ParamsType>(schema: ObjectSchema<P>) =>
  (
    req: IRequestParams<P>,
    res: Response<IControllerResponse>,
    next: NextFunction
  ) => {
    const { error, value } = schema.validate(req.params);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    if (value) {
      req.params = value;
    }
    next();
  };
