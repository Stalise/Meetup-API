import { Request, Response, NextFunction } from 'express';

import {
  generateAccessToken,
  validateAccessToken,
  validateRefreshToken,
  decodeToken,
} from 'services/jwt-service';
import jwtMessages from 'data/messages/jwt';
import { jwtLimits } from 'data/jwt/limits';
import responseMessages from 'data/messages/response';

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const accessToken = req.cookies.token;

    if (!accessToken) {
      return res.status(401).json({ message: jwtMessages.needAuth });
    }

    const verifyAccessToken = validateAccessToken(accessToken);

    if (verifyAccessToken === jwtMessages.needAuth) {
      return res.status(401).json({ message: jwtMessages.needAuth });
    }

    if (verifyAccessToken === jwtMessages.timeExpired) {
      const verifyRefreshToken = await validateRefreshToken(accessToken);

      if (verifyRefreshToken === jwtMessages.needAuth) {
        return res.status(401).json({ message: jwtMessages.needAuth });
      }

      const decode = decodeToken(accessToken);
      const token = generateAccessToken(decode);

      res.cookie('token', token, {
        maxAge: jwtLimits.tokenCookieLifetime,
        httpOnly: true,
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: responseMessages.unexpected });
  }
};
