import React from 'react';

export type HQSkeletonShape = 'round' | 'default';

export interface HQSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  loading?: boolean;
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  type?: HQSkeletonShape;
}

export const Skeleton = React.forwardRef<HTMLDivElement, HQSkeletonProps>(
  (
    {
      loading,
      children,
      width = '100%',
      height = '100px',
      style,
      type = 'default',
      className,
      ...other
    },
    ref
  ) => {
    if (loading) {
      return (
        <div
          className={`hq-skeleton ${className}`}
          data-skeleton-type={type}
          ref={ref}
          style={{ width, height, ...style }}
          {...other}
        />
      );
    }

    return <>{children}</>;
  }
);

Skeleton.displayName = 'Skeleton';
