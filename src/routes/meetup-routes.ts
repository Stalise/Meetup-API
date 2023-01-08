import express from 'express';

import meetupController from 'controllers/meetup/meetup-controller';
import { createMeetupValidation } from 'middlewares/validation-requests';

const router = express.Router();

router.post('/', createMeetupValidation, meetupController.createMeetup);
router.get('/', meetupController.getMeetups);
router.get('/:id', meetupController.getMeetup);
router.put('/', meetupController.updateMeetup);
router.delete('/:id', meetupController.deleteMeetup);

export default router;
