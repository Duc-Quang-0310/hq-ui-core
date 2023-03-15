import React from 'react';

export type HQTitleVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'h7'
  | 'h8'
  | 'h9';

export interface HQTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: HQTitleVariant;
  children: React.ReactNode;
}

export const Title = React.forwardRef<HTMLDivElement, HQTitleProps>(
  ({ variant = 'h2', children, ...other }, ref) => (
    <div {...other} data-title-variant={variant} ref={ref}>
      {children}
    </div>
  )
);

Title.displayName = 'Title';
