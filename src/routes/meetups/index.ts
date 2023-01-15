import express from 'express';

import {
  validationBody,
  validationParams,
} from 'middlewares/requests-validation';
import meetupController from 'controllers/meetup/meetup-controller';
import {
  createMeetupSchema,
  updateMeetupSchema,
  meetupIdSchema,
} from 'data/request-validation';
import { IMeetup, IMeetupForUpdate, IParamsId } from 'types/meetups';

const router = express.Router();

router.post(
  '/',
  validationBody<IMeetup>(createMeetupSchema),
  meetupController.createMeetup
);

router.get('/', meetupController.getMeetups);

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
