import jwt from 'jsonwebtoken';

import type { ITokenPayload } from 'types/authorization';

export const decodeToken = (token: string): ITokenPayload => {
  const decoded = jwt.decode(token) as ITokenPayload;

  return decoded;
};
