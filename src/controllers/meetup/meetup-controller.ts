import type { QueryResult } from 'pg';
import type { Request, Response } from 'express';

import db from 'services/db-service';
import createTagsValues from 'utils/create-tags-values';
import responseMessages from 'constants/response-messages';
import type { IRequestBody, IRequestParams } from 'types/controllers';

import type {
  IMeetup,
  IExtendedMeetup,
  IMeetupForUpdate,
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
        .status(201)
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
    const meetupId = req.params.id;

    try {
      const response: QueryResult<IExtendedMeetup> = await db.query(
        `SELECT *, array(select tags.name from tags where meetup_id = meetups.id) AS tags
        FROM meetups
        WHERE id = $1`,
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

  async updateMeetup(req: IRequestBody<IMeetupForUpdate>, res: Response) {
    const meetupId = req.body.id;

    try {
      for (const value of Object.keys(req.body)) {
        if (value !== 'id' && value !== 'tags') {
          await db.query(`UPDATE meetups SET ${value} = $1 WHERE id = $2`, [
            req.body[value],
            meetupId,
          ]);
        }
      }

      if (req.body.tags?.length) {
        await db.query(
          `DELETE FROM tags
          WHERE meetup_id = $1`,
          [meetupId]
        );

        const values = createTagsValues(req.body.tags);

        await db.query(
          `INSERT INTO tags (name, meetup_id)
          VALUES ${values}`,
          [meetupId]
        );
      }

      const response: QueryResult<IExtendedMeetup> = await db.query(
        `SELECT *, array(select tags.name from tags where meetup_id = meetups.id) AS tags
        FROM meetups
        WHERE id = $1`,
        [meetupId]
      );

      const meetup = response.rows[0];

      return res
        .status(200)
        .json({ message: responseMessages.meetupUpdated, meetup });
    } catch (error) {
      return res.status(500).json({ message: responseMessages.unexpected });
    }
  },

  async deleteMeetup(
    req: IRequestParams<{ id: string }>,
    res: Response<Pick<IMeetupResponseBody, 'message'>>
  ) {
    const meetupId = req.params.id;

    try {
      const response: QueryResult<IExtendedMeetup> = await db.query(
        `DELETE FROM meetups
        WHERE id = $1
        RETURNING *`,
        [meetupId]
      );

      const meetup = response.rows[0];

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
