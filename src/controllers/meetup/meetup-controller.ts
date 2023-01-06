import type { QueryResult } from 'pg';
import type { Request, Response } from 'express';

import db from 'services/db-service';
import createTagsValues from 'utils/create-tags-values';
import responseMessages from 'constants/response-messages';
import type { IRequestBody, IRequestParams } from 'types/controllers';

import type {
  IMeetup,
  IExtendedMeetup,
  IMeetupResponseBody,
  IGetMeetupsResponseBody,
} from './types';

const meetupController = {
  async createMeetup(
    req: IRequestBody<IMeetup>,
    res: Response<IMeetupResponseBody>
  ) {
    const { theme, description, tags, venue } = req.body;

    try {
      const response: QueryResult<Omit<IExtendedMeetup, 'tags'>> =
        await db.query(
          `INSERT INTO meetups (theme, description, venue)
          VALUES ($1, $2, $3) RETURNING *`,
          [theme, description, venue]
        );

      const meetupId = response.rows[0].id;

      if (tags?.length) {
        const values = createTagsValues(tags);

        await db.query(
          `INSERT INTO tags (name, meetup_id)
          VALUES ${values}`,
          [meetupId]
        );
      }

      const meetup: IExtendedMeetup = { ...req.body, id: meetupId };

      return res
        .status(200)
        .json({ message: responseMessages.meetupCreated, meetup });
    } catch (error) {
      return res.status(500).json({ message: responseMessages.unexpected });
    }
  },

  async getMeetups(req: Request, res: Response<IGetMeetupsResponseBody>) {
    try {
      const response: QueryResult<IExtendedMeetup> = await db.query(
        `SELECT *, array(select tags.name from tags where meetup_id = meetups.id) AS tags
        FROM meetups
        ORDER BY id ASC`
      );

      const meetups = response.rows;

      return res
        .status(200)
        .json({ message: responseMessages.meetupsList, meetups });
    } catch (error) {
      return res.status(500).json({ message: responseMessages.unexpected });
    }
  },

  async getMeetup(
    req: IRequestParams<{ id: string }>,
    res: Response<IMeetupResponseBody>
  ) {
    try {
      const meetupId = req.params.id;

      const response: QueryResult<IExtendedMeetup> = await db.query(
        `SELECT *, array(select tags.name from tags where meetup_id = meetups.id) AS tags
        FROM meetups
        WHERE id = $1
        ORDER BY id ASC`,
        [meetupId]
      );

      const meetup = response.rows[0];

      if (!meetup) {
        return res
          .status(404)
          .json({ message: responseMessages.meetupNotExist });
      }

      return res.status(200).json({ message: responseMessages.meetup, meetup });
    } catch (error) {
      return res.status(500).json({ message: responseMessages.unexpected });
    }
  },
};

export default meetupController;
