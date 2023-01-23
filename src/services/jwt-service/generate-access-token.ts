import jwt from 'jsonwebtoken';

import jwtMessages from 'data/messages/jwt';
import { jwtLimits } from 'data/jwt/limits';
import type { ITokenPayload } from 'types/authorization';

export const generateAccessToken = (payload: ITokenPayload) => {
  const secretAccessJWT = process.env.SECRET_ACCESS_JWT;

  if (secretAccessJWT) {
    const token = jwt.sign(payload, secretAccessJWT, {
      expiresIn: jwtLimits.expiresAccessToken,
    });

    return token;
  }

  throw console.error(jwtMessages.missingSecretAccessJWT);
};
