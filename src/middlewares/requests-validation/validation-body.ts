import { Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

import type { IRequestBody, IControllerResponse } from 'types/controllers';
import type { IMeetup, IMeetupForUpdate } from 'types/meetups';

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
