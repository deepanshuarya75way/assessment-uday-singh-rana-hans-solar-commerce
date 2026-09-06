import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecordSiteVisitMutation } from '@/services/analyticsApi';

export default function VisitorTracker() {
  const location = useLocation();
  const [recordSiteVisit] = useRecordSiteVisitMutation();
  const lastTrackedPath = useRef('');

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) {
      return;
    }

    if (lastTrackedPath.current === location.pathname) {
      return;
    }

    lastTrackedPath.current = location.pathname;
    recordSiteVisit();
  }, [location.pathname, recordSiteVisit]);

  return null;
}
