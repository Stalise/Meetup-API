import type { QueryResult } from 'pg';

import db from 'helpers/init-db';
import type { IExtendedMeetup } from 'types/meetups';

export const getMeetups = async (): Promise<IExtendedMeetup[]> => {
  const response: QueryResult<IExtendedMeetup> = await db.query(
    `SELECT *, array(select tags.name from tags where meetup_id = meetups.id) AS tags
    FROM meetups
    ORDER BY id ASC`
  );

  const meetups = response.rows;

  return meetups;
};
