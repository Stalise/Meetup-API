import type { QueryResult } from 'pg';

import db from 'helpers/init-db';
import createSqlSearchGetMeetups from 'utils/create-sql-search-get-meetups';
import createSqlFiltersGetMeetups from 'utils/create-sql-filters-get-meetups';
import createSqlSortGetMeetups from 'utils/create-sql-sort-get-meetups';
import type {
  IExtendedMeetup,
  IQueryGetMeetups,
  GetMeetupServiceType,
} from 'types/meetups';

type GetMeetupsType = (data: IQueryGetMeetups) => Promise<GetMeetupServiceType>;

export const getMeetups: GetMeetupsType = async (data) => {
  let sqlTotalMeetups = `SELECT COUNT(*) FROM meetups`;

  sqlTotalMeetups = createSqlSearchGetMeetups(sqlTotalMeetups, data);
  sqlTotalMeetups = createSqlFiltersGetMeetups(sqlTotalMeetups, data);

  const responseTotalMeetups: QueryResult<{ count: string }> = await db.query(
    `${sqlTotalMeetups}`
  );

  const meetupsTotal = Number(responseTotalMeetups.rows[0].count);

  let sqlMeetups = `
    SELECT *,
    array(SELECT tags.name FROM tags WHERE meetup_id = meetups.id) AS tags
    FROM meetups
  `;

  sqlMeetups = createSqlSearchGetMeetups(sqlMeetups, data);
  sqlMeetups = createSqlFiltersGetMeetups(sqlMeetups, data);
  sqlMeetups = createSqlSortGetMeetups(sqlMeetups, data);

  const offset = Number(data.page) * Number(data.limit) - Number(data.limit);

  sqlMeetups += ` OFFSET ${offset} LIMIT ${data.limit}`;

  const responseMeetups: QueryResult<IExtendedMeetup> = await db.query(
    `${sqlMeetups}`
  );

  const result: GetMeetupServiceType = {
    meetups: responseMeetups.rows,
    page: Number(data.page),
    limit: Number(data.limit),
    pages: Math.ceil(meetupsTotal / Number(data.limit)),
    total: meetupsTotal,
  };

  return result;
};
