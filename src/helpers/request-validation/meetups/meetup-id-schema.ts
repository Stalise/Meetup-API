import Joi from 'joi';

import { idLimits } from 'data/request-validation/meetups-limits';
import type { IParamsId } from 'types/meetups';

export const meetupIdSchema = Joi.object<IParamsId>({
  id: Joi.number()
    .integer()
    .greater(idLimits.greater)
    .custom((value: number) => value.toString())
    .required(),
});
