import Joi from 'joi';

import { validationMessages } from 'data/constants';
import type { IMeetup, IMeetupForUpdate } from 'types/meetups';

export const createMeetupSchema = Joi.object<IMeetup>({
  theme: Joi.string().trim().min(3).max(50).required(),
  description: Joi.string().trim().min(3).max(150).required(),
  time: Joi.string()
    .pattern(/^(20\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d).(\d{3}Z)$/)
    .required()
    .messages({
      'string.pattern.base': validationMessages.invalidTime,
    }),
  venue: Joi.string().trim().min(3).max(100).required(),
  tags: Joi.array().items(Joi.string().trim().min(1).max(15)).max(10),
});

export const updateMeetupSchema = Joi.object<IMeetupForUpdate>({
  id: Joi.number().integer().greater(0).required(),
  theme: Joi.string().trim().min(3).max(50),
  description: Joi.string().trim().min(3).max(150),
  time: Joi.string()
    .pattern(/^(20\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d).(\d{3}Z)$/)
    .messages({
      'string.pattern.base': validationMessages.invalidTime,
    }),
  venue: Joi.string().trim().min(3).max(100),
  tags: Joi.array().items(Joi.string().trim().min(1).max(15)).max(10),
});
