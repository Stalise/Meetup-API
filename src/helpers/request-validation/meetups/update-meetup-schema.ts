import Joi from 'joi';

import {
  requestValidationMessages,
  JoiValidationsPatterns,
} from 'data/messages/request-validation';
import {
  idLimits,
  themeLimits,
  descriptionLimits,
  venueLimits,
  tagLimits,
} from 'data/request-validation/meetups-limits';
import { ISODateRegex } from 'data/constants/regex';
import type { IMeetupForUpdate } from 'types/meetups';

export const updateMeetupSchema = Joi.object<IMeetupForUpdate>({
  id: Joi.number().integer().greater(idLimits.greater).required(),
  theme: Joi.string()
    .trim()
    .min(themeLimits.minLength)
    .max(themeLimits.maxLength),
  description: Joi.string()
    .trim()
    .min(descriptionLimits.minLength)
    .max(descriptionLimits.maxLength),
  time: Joi.string()
    .pattern(ISODateRegex)
    .messages({
      [JoiValidationsPatterns.stringPatternBase]:
        requestValidationMessages.invalidTime,
    }),
  venue: Joi.string()
    .trim()
    .min(venueLimits.minLength)
    .max(venueLimits.maxLength),
  tags: Joi.array()
    .items(
      Joi.string().trim().min(tagLimits.minLength).max(tagLimits.maxLength)
    )
    .max(tagLimits.maxCount),
});
