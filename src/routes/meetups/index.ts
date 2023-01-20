import express from 'express';

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
  validationBody<IMeetup>(createMeetupSchema),
  meetupController.createMeetup
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
  validationBody<IMeetupForUpdate>(updateMeetupSchema),
  meetupController.updateMeetup
);

router.delete(
  '/:id',
  validationParams<IParamsId>(meetupIdSchema),
  meetupController.deleteMeetup
);

export default router;
