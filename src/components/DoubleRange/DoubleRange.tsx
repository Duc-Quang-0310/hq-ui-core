import React from 'react';

export type HQDoubleRangeValue = {
  start?: number;
  end?: number;
};

export interface HQDoubleRangeProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'width' | 'height' | 'value' | 'min' | 'max' | 'onChange'
  > {
  children: React.ReactNode;
  width?: number | string;
  height?: number;
  thumbSize?: number;
  trackColor?: string;
  trackBGColor?: string;
  value?: HQDoubleRangeValue;
  min?: number;
  max?: number;
  onChange?: (value: HQDoubleRangeValue) => void;
  valueGap?: number;
  disabled?: boolean;
}

export const DoubleRange = React.forwardRef<HTMLDivElement, HQDoubleRangeProps>(
  (
    {
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
      valueGap = 3,
      className,
      disabled,
      ...other
    },
    ref
  ) => {
    const [slide, setSlide] = React.useState<HQDoubleRangeValue>({
      end: value?.end || max,
      start: value?.start || min,
    });

    const handleChangeRangeStart = (value: number) => {
      if (slide?.end === undefined || slide?.start === undefined) {
        return null;
      }
      const isAtValueGap = slide.end - value <= valueGap;
      if (isAtValueGap) {
        return setSlide(prev => ({
          ...prev,
          start: prev?.end ? prev?.end - valueGap : prev?.start,
        }));
      }

      setSlide(prev => ({ ...prev, start: value }));
    };

    const handleChangeRangeEnd = (value: number) => {
      if (slide?.end === undefined || slide?.start === undefined) {
        return null;
      }
      const isAtValueGap = value - slide.start <= valueGap;
      if (isAtValueGap) {
        return setSlide(prev => ({
          ...prev,
          end: prev?.start ? prev?.start + valueGap : prev?.end,
        }));
      }
      setSlide(prev => ({ ...prev, end: value }));
    };

    const userStyle = React.useMemo(
      () =>
        ({
          '--dbrange-width': width,
          '--dbrange-height': `${height}px`,
          '--dbrange-color': trackColor,
          '--dbrange-track-bg-color': trackBGColor,
          '--dbrange-thumb-size': `${thumbSize}px`,
          '--dbrange-thumb-border': `${Math.round(thumbSize / 6)}px`,
        } as React.CSSProperties),
      [width, height, trackColor, trackBGColor, thumbSize]
    );

    const calculatedStyle = React.useMemo(
      () =>
        ({
          '--dbrange-percent-start': slide?.start
            ? `${Math.round((slide?.start / max) * 100)}%`
            : '',
          '--dbrange-percent-finish': slide?.end
            ? `${Math.round((slide?.end / max) * 100)}%`
            : '',
        } as React.CSSProperties),
      [slide, max]
    );

    return (
      <div
        className={`hq-double-range_container ${className}`}
        style={{ ...userStyle, ...style }}
        ref={ref}
        {...other}
      >
        <div
          className="slider-track"
          data-dbrange-disabled={disabled}
          style={{ ...userStyle, ...calculatedStyle }}
        />
        <input
          data-type="hq-double-range"
          type="range"
          min={min}
          max={max}
          value={slide?.start}
          onChange={e => handleChangeRangeStart(Number(e.target.value))}
          style={{ ...userStyle }}
          disabled={disabled}
        />
        <input
          data-type="hq-double-range"
          type="range"
          min={min}
          max={max}
          value={slide?.end}
          onChange={e => handleChangeRangeEnd(Number(e.target.value))}
          style={{ ...userStyle }}
          disabled={disabled}
        />
      </div>
    );
  }
);

DoubleRange.displayName = 'DoubleRange';
