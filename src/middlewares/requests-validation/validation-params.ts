import { Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

import type { IControllerResponse, IRequestParams } from 'types/controllers';
import type { IParamsId } from 'types/meetups';

type ParamsType = IParamsId;

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
