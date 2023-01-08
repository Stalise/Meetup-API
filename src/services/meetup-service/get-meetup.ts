import type { QueryResult } from 'pg';

import db from 'helpers/init-db';
import type { IExtendedMeetup } from 'types/meetups';

export const getMeetup = async (id: string): Promise<IExtendedMeetup> => {
  const response: QueryResult<IExtendedMeetup> = await db.query(
    `SELECT *, array(select tags.name from tags where meetup_id = meetups.id) AS tags
    FROM meetups
    WHERE id = $1`,
    [id]
  );

  const meetup = response.rows[0];

  return meetup;
};
