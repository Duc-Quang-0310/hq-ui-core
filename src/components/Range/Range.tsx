import React from 'react';

export interface HQRangeProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'width' | 'height' | 'value' | 'min' | 'max'
  > {
  children: React.ReactNode;
  width?: number | string;
  height?: number;
  thumbSize?: number;
  trackColor?: string;
  trackBGColor?: string;
  value?: number;
  min?: number;
  max?: number;
}

export const Range = React.forwardRef<HTMLInputElement, HQRangeProps>(
  (
    {
      children,
      style,
      width = '100%',
      height = 6,
      thumbSize = 16,
      trackColor = '#366AE2',
      trackBGColor = '#E6EAF0',
      onChange,
      value,
      min = 1,
      max = 100,
      disabled,
      ...other
    },
    ref
  ) => {
    const [slide, setValue] = React.useState(value || min);

    const userStyle = React.useMemo(
      () =>
        ({
          '--range-width': width,
          '--range-height': `${height}px`,
          '--range-color': trackColor,
          '--range-track-bg-color': trackBGColor,
          '--range-thumb-size': `${thumbSize}px`,
          '--range-thumb-border': `${Math.round(thumbSize / 6)}px`,
          '--range-percent': `${Math.round((slide / max) * 100)}%`,
        } as React.CSSProperties),
      [width, height, trackColor, trackBGColor, thumbSize, slide, max]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      setValue(Number(e.target.value));
    };

    React.useEffect(() => {
      setValue(value || min);
    }, [value, min]);

    return (
      <input
        type="range"
        min={min}
        max={max}
        value={slide}
        data-type="hq-range-slide"
        className="slider"
        onChange={handleChange}
        disabled={disabled}
        style={{
          ...userStyle,
          ...style,
        }}
        ref={ref}
        {...other}
      />
    );
  }
);

Range.displayName = 'Range';
