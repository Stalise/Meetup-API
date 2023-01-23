import jwt from 'jsonwebtoken';

import jwtMessages from 'data/messages/jwt';
import { jwtLimits } from 'data/jwt/limits';
import type { ITokenPayload } from 'types/authorization';

export const generateRefreshToken = (payload: ITokenPayload) => {
  const secretRefreshJWT = process.env.SECRET_REFRESH_JWT;

  if (secretRefreshJWT) {
    const token = jwt.sign(payload, secretRefreshJWT, {
      expiresIn: jwtLimits.expiresRefreshToken,
    });

    return token;
  }

  throw console.error(jwtMessages.missingSecretRefreshJWT);
};
