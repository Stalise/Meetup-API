import type { Response } from 'express';

import { registration, login } from 'services/authorization-service';
import ApiError from 'helpers/api-error';
import responseMessages from 'data/messages/response';
import type { IRequestBody, IControllerResponse } from 'types/controllers';
import type { IAuthorization } from 'types/authorization';

const authorizationController = {
  async registration(
    req: IRequestBody<IAuthorization>,
    res: Response<IControllerResponse>
  ) {
    try {
      await registration(req.body);

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
      await login(req.body);

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
};

export default authorizationController;
