import express from 'express';

import meetupController from 'controllers/meetup/meetup-controller';

const router = express.Router();

router.post('/', meetupController.createMeetup);
router.get('/', meetupController.getMeetups);

export default router;
