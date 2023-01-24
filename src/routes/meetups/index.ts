import express from 'express';

import { authorization, role } from 'middlewares';
import {
  validationBody,
  validationParams,
  validationQuery,
} from 'middlewares/requests-validation';
import meetupController from 'controllers/meetup';
import {
  createMeetupSchema,
  updateMeetupSchema,
  meetupIdSchema,
  getMeetupsSchema,
} from 'helpers/request-validation/meetups';
import {
  IMeetup,
  IMeetupForUpdate,
  IParamsId,
  IQueryGetMeetups,
} from 'types/meetups';

const router = express.Router();

router.post(
  '/',
  authorization,
  role,
  validationBody<IMeetup>(createMeetupSchema),
  meetupController.createMeetup
);

router.post(
  '/signup/:id',
  authorization,
  validationParams<IParamsId>(meetupIdSchema),
  meetupController.signupMeetup
);

router.get(
  '/',
  validationQuery<IQueryGetMeetups>(getMeetupsSchema),
  meetupController.getMeetups
);

router.get(
  '/:id',
  validationParams<IParamsId>(meetupIdSchema),
  meetupController.getMeetup
);

router.put(
  '/',
  authorization,
  role,
  validationBody<IMeetupForUpdate>(updateMeetupSchema),
  meetupController.updateMeetup
);

router.delete(
  '/:id',
  authorization,
  role,
  validationParams<IParamsId>(meetupIdSchema),
  meetupController.deleteMeetup
);

export default router;
