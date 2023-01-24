import type { Response } from 'express';

import {
  createMeetup,
  getMeetups,
  getMeetupById,
  updateMeetup,
  deleteMeetupById,
  signupMeetup,
} from 'services/meetup-service';
import { decodeToken } from 'services/jwt-service';
import ApiError from 'helpers/api-error';
import responseMessages from 'data/messages/response';
import type {
  IRequestBody,
  IRequestParams,
  IRequestQuery,
  IControllerResponse,
} from 'types/controllers';
import type {
  IMeetup,
  IMeetupForUpdate,
  IParamsId,
  IQueryGetMeetups,
} from 'types/meetups';

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

  async signupMeetup(
    req: IRequestParams<IParamsId>,
    res: Response<IControllerResponse>
  ) {
    try {
      const { id } = req.params;

      await getMeetupById(id);

      const { mail } = decodeToken(req.cookies.token);

      await signupMeetup(id, mail);

      return res.status(201).json({ message: responseMessages.signupMeetup });
    } catch (error) {
      if (error instanceof ApiError) {
        return res.status(error.code).json({ message: error.message });
      }

      return res.status(500).json({ message: responseMessages.unexpected });
    }
  },

  async getMeetups(
    req: IRequestQuery<IQueryGetMeetups>,
    res: Response<IMeetupsResponseBody>
  ) {
    try {
      const result = await getMeetups(req.query);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: responseMessages.unexpected });
    }
  },

  async getMeetup(
    req: IRequestParams<IParamsId>,
    res: Response<IMeetupResponseBody>
  ) {
    try {
      const meetup = await getMeetupById(req.params.id);

      return res.status(200).json({ meetup });
    } catch (error) {
      if (error instanceof ApiError) {
        return res.status(error.code).json({ message: error.message });
      }

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
      if (error instanceof ApiError) {
        return res.status(error.code).json({ message: error.message });
      }

      return res.status(500).json({ message: responseMessages.unexpected });
    }
  },

  async deleteMeetup(
    req: IRequestParams<IParamsId>,
    res: Response<IControllerResponse>
  ) {
    try {
      await deleteMeetupById(req.params.id);

      return res.status(200).json({ message: responseMessages.meetupDeleted });
    } catch (error) {
      if (error instanceof ApiError) {
        return res.status(error.code).json({ message: error.message });
      }

      return res.status(500).json({ message: responseMessages.unexpected });
    }
  },
};

export default meetupController;
