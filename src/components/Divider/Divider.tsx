import React from 'react';

export type HQDividerPlacement = 'start' | 'end' | 'center';

export interface HQDivider extends React.HTMLAttributes<HTMLHRElement> {
  label?: React.ReactNode;
  placement?: HQDividerPlacement;
}

export const Divider = React.forwardRef<HTMLHRElement, HQDivider>(
  ({ label, placement = 'start', className, style, ...other }, ref) => (
    <div
      data-type="divider"
      className={className}
      style={style}
      data-divider-placement={placement}
    >
      {label ? <span>{label}</span> : null}
      <hr {...other} ref={ref} />
    </div>
  )
);
