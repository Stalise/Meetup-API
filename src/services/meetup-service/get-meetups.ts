import type { QueryResult } from 'pg';

import db from 'helpers/init-db';
import createSqlSearchGetMeetups from 'utils/create-sql-search-get-meetups';
import createSqlFiltersGetMeetups from 'utils/create-sql-filters-get-meetups';
import createSqlSortGetMeetups from 'utils/create-sql-sort-get-meetups';
import type { IExtendedMeetup, IQueryGetMeetups } from 'types/meetups';

type GetMeetupsType = (data: IQueryGetMeetups) => Promise<IExtendedMeetup[]>;

export const getMeetups: GetMeetupsType = async (data) => {
  let sql = `
    SELECT *,
    array(SELECT tags.name FROM tags WHERE meetup_id = meetups.id) AS tags
    FROM meetups
  `;

  sql = createSqlSearchGetMeetups(sql, data);
  sql = createSqlFiltersGetMeetups(sql, data);
  sql = createSqlSortGetMeetups(sql, data);

  const response: QueryResult<IExtendedMeetup> = await db.query(`${sql}`);

  const meetups = response.rows;

  return meetups;
};
