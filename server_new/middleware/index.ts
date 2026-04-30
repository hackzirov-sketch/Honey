// =============================================================================
// Honey — Middleware Barrel Export
// =============================================================================

export {
  authenticate as authRequired,
  optionalAuth,
  requireRole,
  authorizeResource,
} from './auth';

export {
  authRateLimiter,
  apiRateLimiter,
  createRateLimiter,
  socketRateLimiter,
} from './rateLimit';

export { validate } from './validation';

export { requestLogger } from './requestLogger';
