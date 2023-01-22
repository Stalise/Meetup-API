const thirtyDaysMilliseconds = 30 * 24 * 60 * 60 * 1000;

export const jwtLimits = {
  expiresAccessToken: '10m',
  expiresRefreshToken: '30d',
  tokenCookieLifetime: thirtyDaysMilliseconds,
};
