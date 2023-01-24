import type { QueryResult } from 'pg';

import db from 'helpers/init-db';
import ApiError from 'helpers/api-error';
import responseMessages from 'data/messages/response';
import type { IParticipant } from 'types/participants';

export const signupMeetup = async (id: string, mail: string) => {
  const checkParticipation: QueryResult<IParticipant> = await db.query(
    `SELECT *
    FROM participants
    WHERE user_mail = $1
    AND meetup_id = $2`,
    [mail, id]
  );

  if (checkParticipation.rows.length) {
    throw new ApiError(responseMessages.alreadyParticipant, 409);
  }

  await db.query(
    `INSERT INTO participants (user_mail, meetup_id)
    VALUES ($1, $2)`,
    [mail, id]
  );
};
