import express from 'express';

import meetupController from 'controllers/meetup/meetup-controller';

const router = express.Router();

router.post('/', meetupController.createMeetup);

export default router;
