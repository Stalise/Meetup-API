import db from 'helpers/init-db';

export const logout = async (mail: string) => {
  await db.query(
    `UPDATE users
    SET token = ''
    WHERE mail = $1`,
    [mail]
  );
};
