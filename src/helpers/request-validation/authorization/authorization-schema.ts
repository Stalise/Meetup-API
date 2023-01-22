import Joi from 'joi';

import { passwordLimits } from 'data/request-validation/authorization-limits';
import type { IAuthorization } from 'types/authorization';

export const authorizationSchema = Joi.object<IAuthorization>({
  mail: Joi.string().trim().email().required(),
  password: Joi.string()
    .trim()
    .min(passwordLimits.minLength)
    .max(passwordLimits.maxLength)
    .required(),
});
