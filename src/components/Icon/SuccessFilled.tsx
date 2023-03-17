import React from 'react';

interface SuccessFilledProps extends React.HTMLAttributes<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  fill?: string;
}

export const SuccessFilled: React.FC<SuccessFilledProps> = ({
  width = '30',
  height = '30',
  fill = '#39AC6D',
  ...other
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...other}
  >
    <path
      d="M15 0.416504C12.1157 0.416504 9.29611 1.2718 6.8979 2.87424C4.49968 4.47668 2.6305 6.75428 1.52672 9.41904C0.422945 12.0838 0.134146 15.016 0.696847 17.8449C1.25955 20.6738 2.64848 23.2723 4.68799 25.3118C6.72751 27.3513 9.32601 28.7402 12.1549 29.3029C14.9838 29.8657 17.916 29.5769 20.5808 28.4731C23.2455 27.3693 25.5231 25.5001 27.1256 23.1019C28.728 20.7037 29.5833 17.8841 29.5833 14.9998C29.5721 11.1355 28.032 7.43273 25.2995 4.70026C22.5671 1.96778 18.8643 0.427726 15 0.416504V0.416504ZM12.5694 21.5793L5.98989 14.9998L7.7083 13.2814L12.5694 18.1425L22.2916 8.42032L24.01 10.1387L12.5694 21.5793Z"
      fill={fill}
    />
  </svg>
);
