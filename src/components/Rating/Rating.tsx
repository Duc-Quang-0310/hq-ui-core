import React from 'react';

interface StarProps {
  width?: number | string;
  height?: number | string;
  fill?: string;
  borderFill?: string;
}

type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

export interface HQRatingProps extends React.HTMLAttributes<HTMLDivElement> {
  numberOfStar?: IntRange<1, 100>;
}

const Star: React.FC<StarProps> = ({
  borderFill = '#9FB0C7',
  fill = 'none',
  height = '18',
  width = '17',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${height} ${width}`}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.99984 0.666992C9.28822 0.666992 9.55159 0.830722 9.6792 1.08933L11.8438 5.47606L16.6845 6.17939C16.9699 6.22086 17.207 6.42073 17.2961 6.69498C17.3852 6.96923 17.3109 7.27029 17.1044 7.47157L13.6017 10.886L14.4283 15.7071C14.4771 15.9913 14.3602 16.2786 14.1269 16.4481C13.8936 16.6175 13.5843 16.6399 13.329 16.5056L8.99984 14.229L4.67065 16.5056C4.41541 16.6399 4.10611 16.6175 3.87279 16.4481C3.63948 16.2786 3.52262 15.9913 3.57135 15.7071L4.39799 10.886L0.895293 7.47157C0.688804 7.27029 0.614494 6.96923 0.703608 6.69498C0.792722 6.42073 1.0298 6.22086 1.31517 6.17939L6.15583 5.47606L8.32047 1.08933C8.44809 0.830722 8.71146 0.666992 8.99984 0.666992ZM8.99984 3.13656L7.3383 6.50373C7.22795 6.72734 7.01463 6.88234 6.76786 6.91819L3.05207 7.45809L5.74078 10.079C5.91931 10.2531 6.00078 10.5038 5.95865 10.7495L5.32414 14.4501L8.64722 12.7025C8.86797 12.5864 9.13171 12.5864 9.35245 12.7025L12.6755 14.4501L12.041 10.7495C11.9989 10.5038 12.0804 10.2531 12.2589 10.079L14.9476 7.45809L11.2318 6.91819C10.985 6.88234 10.7717 6.72734 10.6614 6.50373L8.99984 3.13656Z"
        fill={borderFill}
      />
    </svg>
  );
};

export const Rating = React.forwardRef<HTMLDivElement, HQRatingProps>(
  ({ numberOfStar = 5, ...other }, ref) => {
    return <div ref={ref} {...other}></div>;
  }
);
