import express from 'express';

import { authorization } from 'middlewares';
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
  validationBody<IMeetup>(createMeetupSchema),
  meetupController.createMeetup
);

router.get(
  '/',
  authorization,
  validationQuery<IQueryGetMeetups>(getMeetupsSchema),
  meetupController.getMeetups
);

router.get(
  '/:id',
  authorization,
  validationParams<IParamsId>(meetupIdSchema),
  meetupController.getMeetup
);

router.put(
  '/',
  authorization,
  validationBody<IMeetupForUpdate>(updateMeetupSchema),
  meetupController.updateMeetup
);

router.delete(
  '/:id',
  authorization,
  validationParams<IParamsId>(meetupIdSchema),
  meetupController.deleteMeetup
);

export default router;
