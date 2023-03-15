import React from 'react';

export type HQDensity = '4' | '8' | '12' | '16' | '24' | '32' | '40' | '42';
export type HQDirection = 'row' | 'column';

export interface HQSpacingProps extends React.HTMLAttributes<HTMLDivElement> {
  density?: HQDensity;
  direction?: HQDirection;
  children: React.ReactNode;
}

export const Spacing = React.forwardRef<HTMLDivElement, HQSpacingProps>(
  (
    { density = '8', direction = 'row', children, className, ...other },
    ref
  ) => (
    <div
      className={`spacing spacing${density} spacing${direction} ${className}`}
      {...other}
      ref={ref}
    >
      {children}
    </div>
  )
);

Spacing.displayName = 'Spacing';
