import type { QueryResult } from 'pg';

import db from 'helpers/init-db';
import ApiError from 'helpers/api-error';
import responseMessages from 'data/messages/response';
import type { IExtendedMeetup } from 'types/meetups';

export const deleteMeetupById = async (
  id: string
): Promise<IExtendedMeetup> => {
  const response: QueryResult<IExtendedMeetup> = await db.query(
    `DELETE FROM meetups
    WHERE id = $1
    RETURNING *`,
    [id]
  );

  const meetup = response.rows[0];

  if (!meetup) {
    throw new ApiError(responseMessages.meetupNotExist, 404);
  }

  return meetup;
};
