import Joi from 'joi';

import { IMeetup } from 'types/meetups';

export const createMeetupSchema = Joi.object<IMeetup>({
  theme: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(3).max(150).required(),
  time: Joi.string()
    .pattern(/^(20\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d).(\d{3}Z)$/)
    .required()
    .messages({
      'string.pattern.base': `The string must be in the format 'YYYY-MM-DDTHH:mm:ss.sssZ'.`,
    }),
  venue: Joi.string().min(3).max(100).required(),
  tags: Joi.array().items(Joi.string().min(1).max(15)).max(10),
});
