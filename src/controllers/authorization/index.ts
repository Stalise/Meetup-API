import type { Request, Response } from 'express';

import { registration, login, logout } from 'services/authorization-service';
import { decodeToken } from 'services/jwt-service';
import ApiError from 'helpers/api-error';
import responseMessages from 'data/messages/response';
import { jwtLimits } from 'data/jwt/limits';
import type { IRequestBody, IControllerResponse } from 'types/controllers';
import type { IAuthorization } from 'types/authorization';

const authorizationController = {
  async registration(
    req: IRequestBody<IAuthorization>,
    res: Response<IControllerResponse>
  ) {
    try {
      const token = await registration(req.body);

      res.cookie('token', token, {
        maxAge: jwtLimits.tokenCookieLifetime,
        httpOnly: true,
      });

      return res
        .status(201)
        .json({ message: responseMessages.successfulRegistration });
    } catch (error) {
      if (error instanceof ApiError) {
        return res.status(error.code).json({ message: error.message });
      }

      return res.status(500).json({ message: responseMessages.unexpected });
    }
  },

  async login(
    req: IRequestBody<IAuthorization>,
    res: Response<IControllerResponse>
  ) {
    try {
      const token = await login(req.body);

      res.cookie('token', token, {
        maxAge: jwtLimits.tokenCookieLifetime,
        httpOnly: true,
      });

      return res
        .status(200)
        .json({ message: responseMessages.successfulLogin });
    } catch (error) {
      if (error instanceof ApiError) {
        return res.status(error.code).json({ message: error.message });
      }

      return res.status(500).json({ message: responseMessages.unexpected });
    }
  },

  async logout(req: Request, res: Response<IControllerResponse>) {
    try {
      const { mail } = decodeToken(req.cookies.token);

      await logout(mail);

      res.clearCookie('token');

      return res
        .status(205)
        .json({ message: responseMessages.successfulLogout });
    } catch (error) {
      return res.status(500).json({ message: responseMessages.unexpected });
    }
  },
};

export default authorizationController;
