import Joi from 'joi';

import type { IParamsId } from 'types/meetups';

export const meetupIdSchema = Joi.object<IParamsId>({
  id: Joi.number()
    .integer()
    .greater(0)
    .custom((value: number) => value.toString())
    .required(),
});
