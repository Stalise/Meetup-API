import express from 'express';

import authorizationController from 'controllers/authorization';
import { validationBody } from 'middlewares/requests-validation';
import { authorizationSchema } from 'helpers/request-validation/authorization/authorization-schema';
import type { IAuthorization } from 'types/authorization';

const router = express.Router();

router.post(
  '/registration',
  validationBody<IAuthorization>(authorizationSchema),
  authorizationController.registration
);

router.post(
  '/login',
  validationBody<IAuthorization>(authorizationSchema),
  authorizationController.login
);

export default router;
