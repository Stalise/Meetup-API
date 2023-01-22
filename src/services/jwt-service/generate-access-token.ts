import jwt from 'jsonwebtoken';

import jwtMessages from 'data/messages/jwt';
import { jwtLimits } from 'data/jwt/limits';
import type { IAuthorization } from 'types/authorization';

export const generateAccessToken = (payload: Pick<IAuthorization, 'mail'>) => {
  const secretAccessJWT = process.env.SECRET_ACCESS_JWT;

  if (secretAccessJWT) {
    const token = jwt.sign(payload, secretAccessJWT, {
      expiresIn: jwtLimits.expiresAccessToken,
    });

    return token;
  }

  throw console.error(jwtMessages.missingSecretAccessJWT);
};
