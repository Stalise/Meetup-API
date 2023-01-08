import type { Request, Response } from 'express';

import {
  createMeetup,
  getMeetups,
  getMeetup,
  updateMeetup,
  deleteMeetup,
} from 'services/meetup-service';
import responseMessages from 'data/constants';
import type {
  IRequestBody,
  IRequestParams,
  IControllerResponse,
} from 'types/controllers';
import type { IMeetup, IMeetupForUpdate } from 'types/meetups';

import type { IMeetupResponseBody, IMeetupsResponseBody } from './types';

const meetupController = {
  async createMeetup(
    req: IRequestBody<IMeetup>,
    res: Response<IMeetupResponseBody>
  ) {
    try {
      const meetup = await createMeetup(req.body);

      return res.status(201).json({ meetup });
    } catch (error) {
      return res.status(500).json({ message: responseMessages.unexpected });
    }
  },

  async getMeetups(req: Request, res: Response<IMeetupsResponseBody>) {
    try {
      const meetups = await getMeetups();

      return res.status(200).json({ meetups });
    } catch (error) {
      return res.status(500).json({ message: responseMessages.unexpected });
    }
  },

  async getMeetup(
    req: IRequestParams<{ id: string }>,
    res: Response<IMeetupResponseBody>
  ) {
    try {
      const meetup = await getMeetup(req.params.id);

      if (!meetup) {
        return res
          .status(404)
          .json({ message: responseMessages.meetupNotExist });
      }

      return res.status(200).json({ meetup });
    } catch (error) {
      return res.status(500).json({ message: responseMessages.unexpected });
    }
  },

  async updateMeetup(
    req: IRequestBody<IMeetupForUpdate>,
    res: Response<IMeetupResponseBody>
  ) {
    try {
      const meetup = await updateMeetup(req.body);

      return res.status(200).json({ meetup });
    } catch (error) {
      return res.status(500).json({ message: responseMessages.unexpected });
    }
  },

  async deleteMeetup(
    req: IRequestParams<{ id: string }>,
    res: Response<IControllerResponse>
  ) {
    try {
      const meetup = deleteMeetup(req.params.id);

      if (!meetup) {
        return res
          .status(404)
          .json({ message: responseMessages.meetupNotExist });
      }

      return res.status(200).json({ message: responseMessages.meetupDeleted });
    } catch (error) {
      return res.status(500).json({ message: responseMessages.unexpected });
    }
  },
};

export default meetupController;
