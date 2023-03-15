import React from 'react';
export interface HQButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  prefixEl?: React.ReactNode;
  surfixEl?: React.ReactNode;
  size?: 'xs' | 's' | 'md' | 'lg';
  variant?: 'solid' | 'ghost' | 'dash' | 'text';
  btnType?: 'primary' | 'success' | 'warning' | 'error';
  disabled?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, HQButtonProps>(
  (
    {
      children,
      surfixEl,
      prefixEl,
      size = 'md',
      variant = 'solid',
      btnType = 'primary',
      disabled = false,
      type = 'button',
      className,
      ...other
    },
    ref
  ) => (
    <button
      {...other}
      data-size={size}
      data-variant={variant}
      data-type={btnType}
      className={` ${size} ${variant} ${btnType} button-default ${
        disabled ? 'disableBtn' : ''
      } ${className}`}
      type={type}
      ref={ref}
    >
      <span className="prefix">{prefixEl}</span>
      {children}
      <span className="surfix">{surfixEl}</span>
    </button>
  )
);

Button.displayName = 'Button';
