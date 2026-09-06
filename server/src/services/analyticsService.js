import crypto from 'crypto';
import prisma from '../config/prisma.js';
import config from '../config/index.js';
import ApiError from '../utils/ApiError.js';
import { verifyAdminToken } from '../utils/jwt.js';

export const VISITOR_COOKIE = 'hs_vid';
const COOKIE_MAX_AGE_MS = 365 * 2 * 24 * 60 * 60 * 1000;

const getVisitDateKey = (date = new Date()) => date.toISOString().slice(0, 10);

const getMonthStartKey = (date = new Date()) =>
  `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-01`;

const getWeekStartKey = (date = new Date()) => {
  const weekStart = new Date(date);
  weekStart.setUTCDate(weekStart.getUTCDate() - 6);
  return getVisitDateKey(weekStart);
};

const setVisitorCookie = (res, visitorKey) => {
  res.cookie(VISITOR_COOKIE, visitorKey, {
    httpOnly: true,
    secure: config.env === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE_MS,
  });
};

const resolveAuthenticatedAdmin = async (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = verifyAdminToken(token);

    if (decoded.role !== 'admin' || decoded.stage !== 'authenticated') {
      return null;
    }

    return prisma.admin.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true },
    });
  } catch {
    return null;
  }
};

export const recordSiteVisit = async (req, res) => {
  let visitorKey = req.cookies[VISITOR_COOKIE];

  if (!visitorKey || typeof visitorKey !== 'string') {
    visitorKey = crypto.randomUUID();
    setVisitorCookie(res, visitorKey);
  }

  const admin = await resolveAuthenticatedAdmin(req);

  const visitor = await prisma.visitor.upsert({
    where: { visitorKey },
    create: {
      visitorKey,
      adminId: admin?.id ?? null,
      name: admin?.name ?? null,
    },
    update: {
      lastSeenAt: new Date(),
      ...(admin
        ? {
            adminId: admin.id,
            name: admin.name,
          }
        : {}),
    },
  });

  const visitDate = getVisitDateKey();

  await prisma.visitorDailyVisit.upsert({
    where: {
      visitorId_visitDate: {
        visitorId: visitor.id,
        visitDate,
      },
    },
    create: {
      visitorId: visitor.id,
      visitDate,
    },
    update: {},
  });

  return { recorded: true };
};

export const recordProductView = async (req, res, productId) => {
  const product = await prisma.product.findFirst({
    where: { id: productId, isActive: true },
    select: { id: true },
  });

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  let visitorKey = req.cookies[VISITOR_COOKIE];

  if (!visitorKey || typeof visitorKey !== 'string') {
    visitorKey = crypto.randomUUID();
    setVisitorCookie(res, visitorKey);
  }

  const admin = await resolveAuthenticatedAdmin(req);

  const visitor = await prisma.visitor.upsert({
    where: { visitorKey },
    create: {
      visitorKey,
      adminId: admin?.id ?? null,
      name: admin?.name ?? null,
    },
    update: {
      lastSeenAt: new Date(),
      ...(admin
        ? {
            adminId: admin.id,
            name: admin.name,
          }
        : {}),
    },
  });

  const visitDate = getVisitDateKey();

  await prisma.visitorDailyVisit.upsert({
    where: {
      visitorId_visitDate: {
        visitorId: visitor.id,
        visitDate,
      },
    },
    create: {
      visitorId: visitor.id,
      visitDate,
    },
    update: {},
  });

  await prisma.productView.upsert({
    where: {
      visitorId_productId: {
        visitorId: visitor.id,
        productId: product.id,
      },
    },
    create: {
      visitorId: visitor.id,
      productId: product.id,
    },
    update: {},
  });

  return { recorded: true };
};

export const getVisitorAnalytics = async () => {
  const now = new Date();
  const today = getVisitDateKey(now);
  const weekStart = getWeekStartKey(now);
  const monthStart = getMonthStartKey(now);

  const [daily, weeklyGroups, monthlyGroups, overall] = await Promise.all([
    prisma.visitorDailyVisit.count({
      where: { visitDate: today },
    }),
    prisma.visitorDailyVisit.groupBy({
      by: ['visitorId'],
      where: { visitDate: { gte: weekStart } },
    }),
    prisma.visitorDailyVisit.groupBy({
      by: ['visitorId'],
      where: { visitDate: { gte: monthStart } },
    }),
    prisma.visitor.count(),
  ]);

  return {
    daily,
    weekly: weeklyGroups.length,
    monthly: monthlyGroups.length,
    overall,
  };
};
