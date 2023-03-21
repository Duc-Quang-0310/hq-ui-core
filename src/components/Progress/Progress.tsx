import React from 'react';
import { SuccessFilled, WarningFilled, ErrorFilled } from '../Icon';

export interface HQProgress
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'value'> {
  //   strokeLinecap?: 'butt' | 'square' | 'round';
  width?: number | string;
  height?: number | string;
  value: number;
  total?: number;
  progressCircleWidth?: number | string;
  color?: string;
  labelClassname?: string;
  displayType?: 'line' | 'circle';
  disableSuccessStyle?: boolean;
  progressBG?: string;
  isError?: boolean;
  customError?: React.ReactNode;
  isWarning?: boolean;
  customWarning?: React.ReactNode;
  customSuccess?: React.ReactNode;
  label?: React.ReactNode;
}

export const Progress = React.forwardRef<HTMLDivElement, HQProgress>(
  (
    {
      //   strokeLinecap,
      width = '120px',
      height = '12px',
      value,
      total = 100,
      style,
      progressCircleWidth = '10px',
      label,
      labelClassname,
      color = '#366AE2',
      progressBG = '#F2F5F8',
      disableSuccessStyle,
      displayType = 'line',
      isError,
      isWarning,
      className,
      customError,
      customSuccess,
      customWarning,
      ...other
    },
    ref
  ) => {
    const userStyle = React.useMemo(
      () =>
        ({
          '--progress-color': color,
          '--progress-degree': `${Math.round((value * 360) / total)}deg`,
          '--progress-width': progressCircleWidth,
          '--progress-bgColor': progressBG,
          '--progress-percent': `${
            Math.round((value / total) * 100) >= 100
              ? 100
              : Math.round((value / total) * 100)
          }%`,
          '--progress-height': height,
        } as React.CSSProperties),
      [color, value, total, progressCircleWidth, progressBG, height]
    );

    const renderStatus = React.useMemo(() => {
      if (!disableSuccessStyle && value >= total) {
        return customSuccess || displayType === 'circle' ? (
          <SuccessFilled width="40%" height="40%" />
        ) : (
          <>
            <SuccessFilled width={height} height={height} />
            <span>{`${value}/${total}`}</span>
          </>
        );
      }

      if (isError) {
        return customError || displayType === 'circle' ? (
          <ErrorFilled width="40%" height="40%" />
        ) : (
          <>
            <ErrorFilled width={height} height={height} />
            <span>{`${value}/${total}`}</span>
          </>
        );
      }

      if (isWarning) {
        return customWarning || displayType === 'circle' ? (
          <WarningFilled width="40%" height="40%" />
        ) : (
          <>
            <WarningFilled width={height} height={height} />
            <span>{`${value}/${total}`}</span>
          </>
        );
      }

      return displayType === 'circle' ? `${value}%` : `${value}/${total}`;
    }, [
      disableSuccessStyle,
      total,
      value,
      isError,
      isWarning,
      customSuccess,
      customError,
      customWarning,
      displayType,
      height,
    ]);

    if (!value) return null;

    if (displayType === 'line') {
      return (
        <div
          data-progress={value}
          data-progress-display-type={displayType}
          data-display-warning={isWarning}
          data-display-error={isError}
          data-display-success={!disableSuccessStyle && value >= total}
          ref={ref}
          style={{
            ...style,
            ...userStyle,
          }}
        >
          <label className={`hq-progress-value ${labelClassname}`}>
            {label}
          </label>

          <section>
            <div
              className="hq-progress-line"
              style={{
                width,
                height,
              }}
            >
              <div />
            </div>
            <div className="hq-progress-static">{renderStatus}</div>
          </section>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        data-progress={value}
        data-progress-display-type={displayType}
        data-display-warning={isWarning}
        data-display-error={isError}
        data-display-success={!disableSuccessStyle && value >= total}
        style={{
          width,
          height,
          ...style,
          ...userStyle,
        }}
        className={className}
        {...other}
      >
        <div className={`hq-progress-value ${labelClassname}`}>
          {label || renderStatus}
        </div>
      </div>
    );
  }
);
