import type { QueryResult } from 'pg';

import db from 'helpers/init-db';
import ApiError from 'helpers/api-error';
import {
  generateAccessToken,
  generateRefreshToken,
} from 'services/jwt-service';
import responseMessages from 'data/messages/response';
import type { IAuthorization } from 'types/authorization';

export const registration = async ({ mail, password }: IAuthorization) => {
  const existMail: QueryResult<Pick<IAuthorization, 'mail'>> = await db.query(
    `SELECT mail
    FROM users
    WHERE mail = $1`,
    [mail]
  );

  if (existMail.rows.length) {
    throw new ApiError(responseMessages.existMail, 409);
  }

  const accessToken = generateAccessToken({ mail });
  const refreshToken = generateRefreshToken({ mail });

  await db.query(
    `INSERT INTO users (mail, password, token)
    values ($1, $2)`,
    [mail, password, refreshToken]
  );

  return accessToken;
};
