import Joi from 'joi';

import {
  requestValidationMessages,
  JoiValidationsPatterns,
} from 'data/messages/request-validation';
import {
  themeLimits,
  descriptionLimits,
  venueLimits,
  tagLimits,
} from 'data/request-validation/meetups-limits';
import { ISODateRegex } from 'data/constants/regex';
import type { IMeetup } from 'types/meetups';

export const createMeetupSchema = Joi.object<IMeetup>({
  theme: Joi.string()
    .trim()
    .min(themeLimits.minLength)
    .max(themeLimits.maxLength)
    .required(),
  description: Joi.string()
    .trim()
    .min(descriptionLimits.minLength)
    .max(descriptionLimits.maxLength)
    .required(),
  time: Joi.string()
    .pattern(ISODateRegex)
    .required()
    .messages({
      [JoiValidationsPatterns.stringPatternBase]:
        requestValidationMessages.invalidTime,
    }),
  venue: Joi.string()
    .trim()
    .min(venueLimits.minLength)
    .max(venueLimits.maxLength)
    .required(),
  tags: Joi.array()
    .items(
      Joi.string().trim().min(tagLimits.minLength).max(tagLimits.maxLength)
    )
    .max(tagLimits.maxCount),
});
