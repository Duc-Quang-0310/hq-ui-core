import React from 'react';

export type HQInputSize = 'sm' | 'md' | 'lg';

export type HQInputType = 'default' | 'borderless';

export type HQInputStatus = 'error' | 'warning' | 'success' | 'default';

export type HQLabelPlacement = 'left' | 'right' | 'top' | 'bottom';

export interface HQInput
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'size' | 'prefix' | 'label'
  > {
  width?: number | string;
  height?: number | string;
  colorSchema?: string;
  size?: HQInputSize;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  showCount?: boolean;
  errMessage?: React.ReactNode;
  type?: HQInputType;
  status?: HQInputStatus;
  label?: React.ReactNode;
  labelPlacement?: HQLabelPlacement;
}

export const Input = React.forwardRef<HTMLInputElement, HQInput>(
  (
    {
      children,
      width = '100%',
      colorSchema = '#2196F3',
      height,
      className,
      disabled = false,
      size = 'md',
      placeholder,
      style,
      prefix,
      suffix,
      onChange,
      min,
      max,
      maxLength,
      minLength,
      showCount = false,
      errMessage,
      type = 'default',
      status = 'default',
      label,
      labelPlacement = 'top',
      ...other
    },
    ref
  ) => {
    const [countChar, setCountChar] = React.useState(0);

    const userStyle = React.useMemo(() => {
      const getBasicTemplate = () => {
        if (errMessage || status === 'error') {
          return '#e14337';
        }

        if (status === 'success') {
          return '#39ac6d';
        }

        if (status === 'warning') {
          return '#fc6b03';
        }

        return undefined;
      };

      return {
        '--input-color': getBasicTemplate() || colorSchema,
      } as React.CSSProperties;
    }, [colorSchema, errMessage, status]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      setCountChar(e.target.value.length);
    };

    return (
      <div
        className={`${
          label ? 'hq-input-label_wrap' : ''
        } hq-input-label-${labelPlacement}`}
        style={{ width, height }}
      >
        {label ? <label className="hq-input-label">{label}</label> : null}
        <div style={{ flex: label && labelPlacement ? 1 : undefined }}>
          <div className={`hq-input-container ${className}`}>
            {prefix ? <span className="hq-input-prefix">{prefix}</span> : null}
            <input
              className="hq-input"
              data-input-size={size}
              ref={ref}
              placeholder={placeholder}
              data-input-isError={!!errMessage}
              data-input-status={status}
              data-input-type={type}
              style={{
                ...userStyle,
                height: '100%',
                paddingLeft: prefix ? '2.5em' : undefined,
                paddingRight: suffix ? '2.5em' : undefined,
                ...style,
              }}
              disabled={disabled}
              onChange={handleChange}
              min={min}
              max={max}
              maxLength={maxLength}
              minLength={minLength}
              {...other}
            />
            {suffix ? <span className="hq-input-suffix">{suffix}</span> : null}
          </div>
          <div className="additional-info">
            {errMessage ? <p className="hq-err-message">{errMessage}</p> : null}
            {showCount && maxLength ? (
              <p className="hq-count-char">{`${countChar} / ${maxLength}`}</p>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';
