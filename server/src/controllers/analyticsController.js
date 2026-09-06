import catchAsync from '../utils/catchAsync.js';
import {
  getVisitorAnalytics,
  recordProductView,
  recordSiteVisit,
} from '../services/analyticsService.js';

export const recordSiteVisitHandler = catchAsync(async (req, res) => {
  await recordSiteVisit(req, res);

  res.status(200).json({
    success: true,
    data: { recorded: true },
  });
});

export const recordProductViewHandler = catchAsync(async (req, res) => {
  await recordProductView(req, res, req.params.productId);

  res.status(200).json({
    success: true,
    data: { recorded: true },
  });
});

export const getAdminVisitorAnalyticsHandler = catchAsync(async (_req, res) => {
  const stats = await getVisitorAnalytics();

  res.status(200).json({
    success: true,
    data: { stats },
  });
});
