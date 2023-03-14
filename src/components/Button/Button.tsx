import React, { FC, HTMLAttributes, ReactNode } from 'react';
export interface HQButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  prefixEl?: ReactNode;
  surfixEl?: ReactNode;
  size?: 'xs' | 's' | 'md' | 'lg';
  variant?: 'solid' | 'ghost' | 'dash' | 'text';
  type?: 'primary' | 'success' | 'warning' | 'error';
  disabled?: boolean;
}

export const Button: FC<HQButtonProps> = ({
  children,
  surfixEl,
  prefixEl,
  size = 'md',
  variant = 'solid',
  type = 'primary',
  disabled = false,
  className,
  ...other
}) => (
  <button
    {...other}
    data-size={size}
    data-variant={variant}
    data-type={type}
    className={` ${size} ${variant} ${type} button-default ${
      disabled ? 'disableBtn' : ''
    } ${className}`}
  >
    <span className="prefix">{prefixEl}</span>
    {children}
    <span className="surfix">{surfixEl}</span>
  </button>
);
