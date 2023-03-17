import React from 'react';

interface ErrorFilledProps extends React.HTMLAttributes<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  fill?: string;
}

export const ErrorFilled: React.FC<ErrorFilledProps> = ({
  width = '30',
  height = '30',
  fill = '#E14337',
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
      d="M15 0.416504C12.1157 0.416504 9.29611 1.2718 6.8979 2.87424C4.49968 4.47668 2.6305 6.75428 1.52672 9.41904C0.422945 12.0838 0.134146 15.016 0.696847 17.8449C1.25955 20.6738 2.64848 23.2723 4.68799 25.3118C6.72751 27.3513 9.32601 28.7402 12.1549 29.3029C14.9838 29.8657 17.916 29.5769 20.5808 28.4731C23.2455 27.3693 25.5231 25.5001 27.1256 23.1019C28.728 20.7037 29.5833 17.8841 29.5833 14.9998C29.5721 11.1355 28.032 7.43273 25.2995 4.70026C22.5671 1.96778 18.8643 0.427726 15 0.416504V0.416504ZM21.0156 19.2971L19.2972 21.0155L15 16.7182L10.7027 21.0155L8.98434 19.2971L13.2816 14.9998L8.98434 10.7026L10.7027 8.98421L15 13.2814L19.2972 8.98421L21.0156 10.7026L16.7184 14.9998L21.0156 19.2971Z"
      fill={fill}
    />
  </svg>
);
