import type { QueryResult } from 'pg';

import db from 'helpers/init-db';
import ApiError from 'helpers/api-error';
import responseMessages from 'data/messages/response';
import createTagsValues from 'utils/create-tags-values';
import type { IMeetupForUpdate, IExtendedMeetup } from 'types/meetups';

type UpdateMeetupType = (data: IMeetupForUpdate) => Promise<IExtendedMeetup>;

export const updateMeetup: UpdateMeetupType = async (data) => {
  const { id } = data;

  for (const value of Object.keys(data)) {
    if (value !== 'id' && value !== 'tags') {
      await db.query(`UPDATE meetups SET ${value} = $1 WHERE id = $2`, [
        data[value],
        id,
      ]);
    }
  }

  if (data.tags?.length) {
    await db.query(
      `DELETE FROM tags
      WHERE meetup_id = $1`,
      [id]
    );

    const values = createTagsValues(data.tags);

    await db.query(
      `INSERT INTO tags (name, meetup_id)
      VALUES ${values}`,
      [id]
    );
  }

  const response: QueryResult<IExtendedMeetup> = await db.query(
    `SELECT *, array(select tags.name from tags where meetup_id = meetups.id) AS tags
    FROM meetups
    WHERE id = $1`,
    [id]
  );

  const meetup = response.rows[0];

  if (!meetup) {
    throw new ApiError(responseMessages.meetupNotExist, 404);
  }

  return meetup;
};
