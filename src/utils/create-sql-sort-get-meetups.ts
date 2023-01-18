import { IQueryGetMeetups } from 'types/meetups';

const createSqlSortGetMeetups = (
  sql: string,
  { order, sort }: IQueryGetMeetups
): string => {
  sql += ` ORDER BY ${sort || 'id'} ${order || 'ASC'}`;

  return sql;
};

export default createSqlSortGetMeetups;
