import type { QueryResult } from 'pg';

import db from 'helpers/init-db';
import createTagsValues from 'utils/create-tags-values';
import type { IMeetup, IExtendedMeetup } from 'types/meetups';

type CreateMeetupType = (data: IMeetup) => Promise<IExtendedMeetup>;

export const createMeetup: CreateMeetupType = async (data) => {
  const { theme, description, time, venue, tags } = data;

  const response: QueryResult<Omit<IExtendedMeetup, 'tags'>> = await db.query(
    `INSERT INTO meetups (theme, description, time, venue)
    VALUES ($1, $2, $3, $4) RETURNING *`,
    [theme, description, time, venue]
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

  const extendedMeetup: IExtendedMeetup = { ...data, id: meetupId };

  return extendedMeetup;
};
