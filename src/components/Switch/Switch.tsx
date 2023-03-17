import React from 'react';

export type HQLabelPosition = 'left' | 'right' | 'top' | 'bottom';

export interface HQSwitch
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'width' | 'height' | 'color'
  > {
  width?: number | string;
  height?: number | string;
  color?: string;
  label?: React.ReactNode;
  containerClassname?: string;
  labelPosition?: HQLabelPosition;
}

export const Switch = React.forwardRef<HTMLInputElement, HQSwitch>(
  (
    {
      width = '65px',
      height = '34px',
      color = '#366AE2',
      style,
      label,
      disabled,
      containerClassname,
      className,
      labelPosition = 'left',
      ...other
    },
    ref
  ) => (
    <div
      className={`${containerClassname} ${
        label ? `hq-switch hq-switch_${labelPosition}` : ''
      }`}
    >
      <span className="hq-switch_label">{label}</span>
      <label
        className={className}
        data-type="switch"
        style={{ color, width, height, ...style }}
        data-switch-disable={disabled}
      >
        <input type="checkbox" disabled={disabled} ref={ref} {...other} />
        <span className="slider round" />
      </label>
    </div>
  )
);

Switch.displayName = 'Switch';
