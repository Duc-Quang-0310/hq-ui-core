import React from 'react';

type NumberOfStars = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type MergedStarProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>;

export interface HQRatingProps extends MergedStarProps {
  numberOfStar?: NumberOfStars;
  starGap?: number | string;
  defaultValue?: number;
  value?: number;
  onChangeRate?: (star: number) => void;
  allowClear?: boolean;
  width?: number | string;
  height?: number | string;
  fill?: string;
}

export const Rating = React.forwardRef<HTMLDivElement, HQRatingProps>(
  (
    {
      numberOfStar = 5,
      width = 25,
      height = 25,
      fill = 'gold',
      starGap = 3,
      defaultValue,
      value,
      style,
      onChangeRate,
      allowClear = false,
      ...other
    },
    ref
  ) => {
    const uniqueId = React.useMemo(
      () =>
        String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now(),
      []
    );
    const [star, setStar] = React.useState<number>(value || defaultValue || 0);
    const [hoverStar, setHoverStar] = React.useState(0);
    const handleOnClick = React.useCallback(
      (index: number) => {
        if (allowClear && index === star - 1) {
          setStar(0);
          onChangeRate?.(0);
        } else {
          setStar(index + 1);
          onChangeRate?.(index + 1);
        }
      },
      [onChangeRate, allowClear, star]
    );

    return (
      <div
        ref={ref}
        data-rating
        style={{
          gap: starGap,
          ...style,
        }}
        {...other}
      >
        {new Array(numberOfStar).fill('star').map((s, index) => (
          <svg
            key={`${s}-${uniqueId + index}`}
            width={width}
            height={height}
            viewBox="0 0 18 17"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => handleOnClick(index)}
            onMouseEnter={() => setHoverStar(index + 1)}
            onMouseLeave={() => setHoverStar(0)}
            data-hover={index <= hoverStar - 1}
            data-filled={hoverStar ? 'false' : !!star && index <= star - 1}
            color={fill}
          >
            <path
              d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z"
              color={fill}
              fill="#9FB0C7"
            />
          </svg>
        ))}
      </div>
    );
  }
);
