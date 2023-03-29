import React from 'react';

export type HQTooltipPosition =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'right'
  | 'left'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right';

export type HQTooltipMode = 'click' | 'hover';

export interface HQTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: HQTooltipPosition;
  mode?: HQTooltipMode;
  openWhenClicked?: boolean;
  tooltipBG?: string;
}

export const Tooltip = React.forwardRef<HTMLDivElement, HQTooltipProps>(
  (
    {
      children,
      content,
      position = 'top',
      mode = 'hover',
      tooltipBG = 'rgba(0, 0, 0, 0.85)',
      openWhenClicked,
      className,
      style,
      ...other
    },
    ref
  ) => {
    const [toggle, setToggle] = React.useState(openWhenClicked);

    const userStyle = React.useMemo(
      () =>
        ({
          '--tooltip-bg': tooltipBG,
        } as React.CSSProperties),
      [tooltipBG]
    );

    const handleToggle = () => {
      if (mode === 'click') setToggle(prev => !prev);
    };

    return (
      <div
        className="hq-tooltip"
        ref={ref}
        data-type="tooltip"
        data-tooltip-mode={mode}
        onClick={handleToggle}
      >
        {children}
        <div
          className={`tooltip-text ${
            toggle && mode === 'click' ? 'visibility-open' : ''
          } ${className}`}
          {...other}
          data-tooltip-position={position}
          style={{ ...userStyle, ...style }}
        >
          {content}
        </div>
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';
