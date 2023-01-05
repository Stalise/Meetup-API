import type { QueryResult } from 'pg';
import type { Response } from 'express';

import db from 'services/db-service';
import createTagsValues from 'utils/create-tags-values';
import responseMessages from 'constants/response-messages';
import type { IRequestBody } from 'types/controllers';

import { IMeetup, IExtendedMeetup, ICreateMeetupResponseBody } from './types';

const meetupController = {
  async createMeetup(
    req: IRequestBody<IMeetup>,
    res: Response<ICreateMeetupResponseBody>
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

      res.status(200).json({ message: responseMessages.meetupCreated, meetup });
    } catch (error) {
      res.status(500).json({ message: responseMessages.unexpected });
    }
  },
};

export default meetupController;
