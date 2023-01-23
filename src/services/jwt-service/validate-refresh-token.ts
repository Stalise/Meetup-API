import jwt from 'jsonwebtoken';
import type { QueryResult } from 'pg';

import db from 'helpers/init-db';
import { decodeToken } from 'services/jwt-service';
import jwtMessages from 'data/messages/jwt';

export const validateRefreshToken = async (accessToken: string) => {
  const secretRefreshJWT = process.env.SECRET_REFRESH_JWT;

  if (secretRefreshJWT) {
    try {
      const accessTokenPayload = decodeToken(accessToken);

      const getRefreshToken: QueryResult<{ token: string }> = await db.query(
        `SELECT token
        FROM users
        WHERE mail = $1`,
        [accessTokenPayload.mail]
      );

      const refreshToken = getRefreshToken.rows[0].token;

      if (!refreshToken) {
        return jwtMessages.needAuth;
      }

      const refreshTokenPayload = decodeToken(refreshToken);

      // if username access and refresh tokens are not equal, then the user is trying to use
      // the access token to get the data of another user
      if (accessTokenPayload.mail !== refreshTokenPayload.mail) {
        return jwtMessages.needAuth;
      }

      jwt.verify(refreshToken, secretRefreshJWT);

      return jwtMessages.tokenIsValid;
    } catch (error) {
      return jwtMessages.needAuth;
    }
  }

  throw console.error(jwtMessages.missingSecretRefreshJWT);
};
