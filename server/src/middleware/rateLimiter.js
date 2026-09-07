import rateLimit from 'express-rate-limit';

const isPublicReadRequest = (req) => {
  if (req.method === 'OPTIONS') {
    return true;
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return false;
  }

  const path = req.path || req.url || '';

  if (path.startsWith('/api/v1/admin/')) {
    return false;
  }

  return (
    path.startsWith('/api/v1/catalog/') ||
    path.startsWith('/api/v1/homepage/') ||
    path.startsWith('/api/v1/festivals/') ||
    path.startsWith('/api/v1/site/')
  );
};

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  skip: isPublicReadRequest,
  message: {
    success: false,
    message: 'Too many requests, please try again later',
  },
});

export default rateLimiter;
