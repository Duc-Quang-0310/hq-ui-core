import React from 'react';

export interface HQCheckBox
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  indeterminate?: boolean;
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  labelSize?: number | string;
  colorSchema?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, HQCheckBox>(
  (
    {
      indeterminate = false,
      children,
      className,
      width = '20px',
      height = '20px',
      labelSize = '20px',
      colorSchema = '#2196F3',
      disabled,
      ...other
    },
    ref
  ) => (
    <label
      className={className}
      data-container="hq-checkbox-container"
      style={{
        fontSize: labelSize,
      }}
      data-checkbox-disabled={disabled}
    >
      {children}
      <input type="checkbox" ref={ref} {...other} checked />
      <span
        className="checkmark"
        style={{
          width,
          height,
          fontSize: width,
          color: colorSchema,
        }}
        data-indeterminate={indeterminate}
      />
    </label>
  )
);
