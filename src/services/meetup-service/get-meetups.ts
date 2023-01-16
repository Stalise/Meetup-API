import type { QueryResult } from 'pg';

import db from 'helpers/init-db';
import createSqlGetMeetups from 'utils/create-sql-search-get-meetups';
import type { IExtendedMeetup, IQueryGetMeetups } from 'types/meetups';

type GetMeetupsType = (data: IQueryGetMeetups) => Promise<IExtendedMeetup[]>;

export const getMeetups: GetMeetupsType = async (data) => {
  let sql = `
    SELECT *,
    array(select tags.name from tags where meetup_id = meetups.id) AS tags
    FROM meetups
  `;

  sql = createSqlGetMeetups(sql, data);

  const response: QueryResult<IExtendedMeetup> = await db.query(
    `${sql}
    ORDER BY id ASC`
  );

  const meetups = response.rows;

  return meetups;
};
