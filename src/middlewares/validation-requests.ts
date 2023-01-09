import { Response, NextFunction } from 'express';

import { createMeetupSchema } from 'data/validation-shemas';
import type { IRequestBody, IControllerResponse } from 'types/controllers';
import type { IMeetup } from 'types/meetups';

export const createMeetupValidation = (
  req: IRequestBody<IMeetup>,
  res: Response<IControllerResponse>,
  next: NextFunction
) => {
  const { error, value } = createMeetupSchema.validate(req.body as IMeetup);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  if (value) {
    req.body = value;
  }

  next();
};
