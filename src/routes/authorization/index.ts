import express from 'express';

import authorizationController from 'controllers/authorization';
import { validationBody } from 'middlewares/requests-validation';
import { authorizationSchema } from 'helpers/request-validation/authorization/authorization-schema';
import type { IUser } from 'types/users';

const router = express.Router();

router.post(
  '/registration',
  validationBody<IUser>(authorizationSchema),
  authorizationController.registration
);

export default router;
