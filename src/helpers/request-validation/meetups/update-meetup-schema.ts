import Joi from 'joi';

import {
  requestValidationMessages,
  JoiValidationsMessages,
} from 'data/messages/request-validation';
import { ISODateRegex } from 'data/constants/regex';
import type { IMeetupForUpdate } from 'types/meetups';

export const updateMeetupSchema = Joi.object<IMeetupForUpdate>({
  id: Joi.number().integer().greater(0).required(),
  theme: Joi.string().trim().min(3).max(50),
  description: Joi.string().trim().min(3).max(150),
  time: Joi.string()
    .pattern(ISODateRegex)
    .messages({
      [JoiValidationsMessages.stringPatternBase]:
        requestValidationMessages.invalidTime,
    }),
  venue: Joi.string().trim().min(3).max(100),
  tags: Joi.array().items(Joi.string().trim().min(1).max(15)).max(10),
});
