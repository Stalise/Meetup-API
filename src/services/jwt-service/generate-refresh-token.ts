import jwt from 'jsonwebtoken';

import jwtMessages from 'data/messages/jwt';
import { jwtLimits } from 'data/jwt/limits';
import type { IAuthorization } from 'types/authorization';

export const generateRefreshToken = (payload: Pick<IAuthorization, 'mail'>) => {
  const secretRefreshJWT = process.env.SECRET_REFRESH_JWT;

  if (secretRefreshJWT) {
    const token = jwt.sign(payload, secretRefreshJWT, {
      expiresIn: jwtLimits.expiresAccessToken,
    });

    return token;
  }

  throw console.error(jwtMessages.missingSecretRefreshJWT);
};
