import React from 'react';

export interface HQRadio
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  labelSize?: number | string;
  colorSchema?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, HQRadio>(
  (
    {
      children,
      width = '20px',
      height = '20px',
      labelSize = '20px',
      colorSchema = '#2196F3',
      className,
      disabled = false,
      ...other
    },
    ref
  ) => (
    <label
      className={className}
      data-container="hq-radio-button"
      style={{
        fontSize: labelSize,
      }}
      data-radio-disabled={disabled}
    >
      {children}
      <input type="radio" ref={ref} {...other} className="hq-radio-input" />
      <span
        className="checkmark-radio"
        style={{
          width,
          height,
          fontSize: width,
          color: colorSchema,
        }}
      />
    </label>
  )
);

Radio.displayName = 'Radio';
