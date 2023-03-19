import React from 'react';

export type HQButtonType = 'primary' | 'success' | 'warning' | 'error';
export type HQButtonVariant = 'solid' | 'ghost' | 'dash' | 'text';
export type HQButtonSize = 'xs' | 's' | 'md' | 'lg';
export interface HQButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  prefixEl?: React.ReactNode;
  surfixEl?: React.ReactNode;
  size?: HQButtonSize;
  variant?: HQButtonVariant;
  btnType?: HQButtonType;
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
      color,
      style,
      ...other
    },
    ref
  ) => (
    <button
      {...other}
      data-size={size}
      data-variant={variant}
      data-type={btnType}
      data-color={color || 'null'}
      data-btn-disable={disabled}
      className={`${size} ${variant} ${btnType} button-default ${className}`}
      type={type}
      ref={ref}
      style={{
        color,
        ...style,
      }}
    >
      {prefixEl ? <span className="prefix">{prefixEl}</span> : null}
      <span
        style={{
          color: variant === 'solid' ? 'white' : color,
        }}
      >
        {children}
      </span>
      {surfixEl ? <span className="surfix">{surfixEl}</span> : null}
    </button>
  )
);

Button.displayName = 'Button';
