import express from 'express';

import { validationBody } from 'middlewares/validation-requests';
import meetupController from 'controllers/meetup/meetup-controller';
import { createMeetupSchema, updateMeetupSchema } from 'data/validation-shemas';
import { IMeetup, IMeetupForUpdate } from 'types/meetups';

const router = express.Router();

router.post(
  '/',
  validationBody<IMeetup>(createMeetupSchema),
  meetupController.createMeetup
);
router.get('/', meetupController.getMeetups);
router.get('/:id', meetupController.getMeetup);
router.put(
  '/',
  validationBody<IMeetupForUpdate>(updateMeetupSchema),
  meetupController.updateMeetup
);
router.delete('/:id', meetupController.deleteMeetup);

export default router;
