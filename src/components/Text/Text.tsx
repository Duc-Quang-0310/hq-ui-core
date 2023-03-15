import React from 'react';

export type HQTextVariant =
  | 'subtitle1'
  | 'subtitle2'
  | 'subtitle3'
  | 'subtitle4'
  | 'subtitle5'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'button1'
  | 'button2'
  | 'button3'
  | 'button4'
  | 'button5'
  | 'button6'
  | 'label1'
  | 'label2'
  | 'label3'
  | 'label4'
  | 'label5'
  | 'placeholder1'
  | 'placeholder2'
  | 'hightlight1'
  | 'hightlight2'
  | 'hightlight3'
  | 'hightlight4'
  | 'hightlight5'
  | 'hightlight6';

export interface HQTextProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: HQTextVariant;
  children: React.ReactNode;
}

export const Text = React.forwardRef<HTMLDivElement, HQTextProps>(
  ({ variant = 'subtitle1', children, ...other }, ref) => (
    <div {...other} data-text-variant={variant} ref={ref}>
      {children}
    </div>
  )
);

Text.displayName = 'Text';
