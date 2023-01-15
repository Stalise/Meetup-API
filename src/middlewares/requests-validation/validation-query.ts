import { Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

import type { IControllerResponse, IRequestQuery } from 'types/controllers';
import type { IQueryGetMeetups } from 'types/meetups';

type QueryType = IQueryGetMeetups;

export const validationQuery =
  <Q extends QueryType>(schema: ObjectSchema<Q>) =>
  (
    req: IRequestQuery<Q>,
    res: Response<IControllerResponse>,
    next: NextFunction
  ) => {
    // console.log(req.query);
    const { error, value } = schema.validate(req.query);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    if (value) {
      req.query = value;
    }
    next();
  };
