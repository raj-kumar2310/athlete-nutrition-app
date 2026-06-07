import React, { Suspense, lazy } from 'react';

/**
 * Helper to lazily import heavy components such as charts or modals.
 * Usage:
 *   const LazyChart = lazyLoad(() => import('@/components/charts/WeeklyChart'));
 *   <Suspense fallback={<div className="skeleton" />}> <LazyChart /> </Suspense>
 */
export function lazyLoad<T extends React.ComponentType<unknown>>(factory: () => Promise<{ default: T }>): React.LazyExoticComponent<T> {
  return lazy(factory);
}

/**
 * Preconfigured Suspense wrapper with a shimmer placeholder.
 */
export const LazyWrapper: React.FC<{ fallback?: React.ReactNode; children?: React.ReactNode }> = ({
  children,
  fallback,
}) =>
  React.createElement(
    Suspense,
    {
      fallback:
        fallback ??
        React.createElement('div', {
          className: 'skeleton h-48 w-full rounded-lg bg-gray-200 dark:bg-gray-800',
        }),
    },
    children
  );
