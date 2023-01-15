import Joi from 'joi';

import {
  requestValidationMessages,
  JoiValidationsMessages,
} from 'data/messages/request-validation';
import { ISODateRegex } from 'data/constants/regex';
import type { IMeetup } from 'types/meetups';

export const createMeetupSchema = Joi.object<IMeetup>({
  theme: Joi.string().trim().min(3).max(50).required(),
  description: Joi.string().trim().min(3).max(150).required(),
  time: Joi.string()
    .pattern(ISODateRegex)
    .required()
    .messages({
      [JoiValidationsMessages.stringPatternBase]:
        requestValidationMessages.invalidTime,
    }),
  venue: Joi.string().trim().min(3).max(100).required(),
  tags: Joi.array().items(Joi.string().trim().min(1).max(15)).max(10),
});
