import { IQueryGetMeetups } from 'types/meetups';

const createSqlFiltersGetMeetups = (
  sql: string,
  { theme, description, time, venue, filters }: IQueryGetMeetups
): string => {
  if (filters) {
    const checkTagsSql =
      'ANY(SELECT tags.name FROM tags WHERE meetup_id = meetups.id)';

    const existFilters = filters.split(',');

    const search = theme || description || time || venue ? 'AND' : 'WHERE';

    if (existFilters.length === 1) {
      sql += ` ${search} '${existFilters[0]}' = ${checkTagsSql}`;
    } else if (existFilters.length > 1) {
      const values = existFilters.map((filter, index) => {
        if (index === 0) {
          return ` ${search} '${filter}' = ${checkTagsSql}`;
        }

        return `AND '${filter}' = ${checkTagsSql}`;
      });

      sql += values.join(' ');
    }
  }

  return sql;
};

export default createSqlFiltersGetMeetups;
