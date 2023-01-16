import { IQueryGetMeetups } from 'types/meetups';

const searchValues = ['theme', 'description', 'time', 'venue'];

const createSqlSearchGetMeetups = (
  sql: string,
  data: IQueryGetMeetups
): string => {
  const existSearchValues = Object.keys(data).filter((value) =>
    searchValues.includes(value)
  );

  if (existSearchValues.length === 1) {
    const value = existSearchValues[0];

    sql += ` WHERE ${value} = '${data[value]}'`;
  } else if (existSearchValues.length > 1) {
    const values = existSearchValues.map(
      (value) => `${value} = '${data[value]}'`
    );

    sql += ' WHERE ' + values.join(' AND ');
  }

  return sql;
};

export default createSqlSearchGetMeetups;
