import { api } from '@/services/api';

export const analyticsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    recordSiteVisit: builder.mutation({
      query: () => ({
        url: '/analytics/visit',
        method: 'POST',
      }),
    }),
    recordProductView: builder.mutation({
      query: (productId) => ({
        url: `/analytics/products/${productId}/view`,
        method: 'POST',
      }),
    }),
    getAdminVisitorAnalytics: builder.query({
      query: () => '/admin/analytics/visitors',
      providesTags: [{ type: 'Analytics', id: 'VISITORS' }],
    }),
  }),
});

export const {
  useRecordSiteVisitMutation,
  useRecordProductViewMutation,
  useGetAdminVisitorAnalyticsQuery,
} = analyticsApi;
