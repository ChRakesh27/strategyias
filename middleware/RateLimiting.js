import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';

const getIP = request =>
  request.ip ||
  request.headers['x-forwarded-for'] ||
  request.headers['x-real-ip'] ||
  request.connection.remoteAddress;

const getRateLimitMiddlewares = ({
  limit = 10,
  windowMs = 60 * 1000,
  delayAfter = Math.round(limit / 2),
  delayMs = 500,
} = {}) => [
  slowDown({ keyGenerator: getIP, windowMs, delayAfter, delayMs }),
  rateLimit({ keyGenerator: getIP, windowMs, max: limit }),
];

export default getRateLimitMiddlewares;