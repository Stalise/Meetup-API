import type { QueryResult } from 'pg';

import db from 'helpers/init-db';
import type { IExtendedMeetup } from 'types/meetups';

export const deleteMeetup = async (id: string): Promise<IExtendedMeetup> => {
  const response: QueryResult<IExtendedMeetup> = await db.query(
    `DELETE FROM meetups
    WHERE id = $1
    RETURNING *`,
    [id]
  );

  const meetup = response.rows[0];

  return meetup;
};
