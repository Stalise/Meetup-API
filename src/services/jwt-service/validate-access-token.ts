import jwt, { TokenExpiredError } from 'jsonwebtoken';

import jwtMessages from 'data/messages/jwt';

export const validateAccessToken = (token: string) => {
  const secretAccessJWT = process.env.SECRET_ACCESS_JWT;

  if (secretAccessJWT) {
    try {
      jwt.verify(token, secretAccessJWT);

      return jwtMessages.tokenIsValid;
    } catch (error) {
      // if the token is valid, but the time has expired
      if (error instanceof TokenExpiredError) {
        return jwtMessages.timeExpired;
      }

      return jwtMessages.needAuth;
    }
  }

  throw console.error(jwtMessages.missingSecretAccessJWT);
};
