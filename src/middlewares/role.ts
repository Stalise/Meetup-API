import { Request, Response, NextFunction } from 'express';

import { decodeToken } from 'services/jwt-service';
import responseMessages from 'data/messages/response';

export const role = async (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const { role } = decodeToken(req.cookies.token);

    if (role !== 'admin') {
      return res.status(403).json({ message: responseMessages.forbidden });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: responseMessages.unexpected });
  }
};
