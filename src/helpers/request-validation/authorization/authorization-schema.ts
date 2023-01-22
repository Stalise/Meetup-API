import Joi from 'joi';

import { passwordLimits } from 'data/request-validation/authorization-limits';
import type { IUser } from 'types/users';

export const authorizationSchema = Joi.object<IUser>({
  mail: Joi.string().trim().email().required(),
  password: Joi.string()
    .trim()
    .min(passwordLimits.minLength)
    .max(passwordLimits.maxLength)
    .required(),
});
