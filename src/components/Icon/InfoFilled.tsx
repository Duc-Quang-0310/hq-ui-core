import React from 'react';

interface InfoFilledProps extends React.HTMLAttributes<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  fill?: string;
}

export const InfoFilled: React.FC<InfoFilledProps> = ({
  width = '30',
  height = '30',
  fill = '#366AE2',
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
      d="M15.0001 0.416504C12.1158 0.416504 9.29624 1.2718 6.89802 2.87424C4.4998 4.47668 2.63062 6.75428 1.52684 9.41904C0.423067 12.0838 0.134268 15.016 0.696969 17.8449C1.25967 20.6738 2.6486 23.2723 4.68811 25.3118C6.72763 27.3513 9.32613 28.7402 12.155 29.3029C14.9839 29.8657 17.9161 29.5769 20.5809 28.4731C23.2456 27.3693 25.5232 25.5001 27.1257 23.1019C28.7281 20.7037 29.5834 17.8841 29.5834 14.9998C29.5792 11.1334 28.0414 7.42648 25.3074 4.69248C22.5734 1.95848 18.8665 0.420686 15.0001 0.416504V0.416504ZM16.2494 23.1714H13.7398V12.5693H16.2494V23.1714ZM16.0416 9.2382C15.9031 9.3651 15.7405 9.46279 15.5634 9.52543C15.3864 9.58807 15.1985 9.61438 15.011 9.60279C14.8201 9.61549 14.6286 9.58976 14.4479 9.52714C14.2671 9.46452 14.1007 9.36627 13.9586 9.2382C13.833 9.10303 13.7361 8.94392 13.6734 8.7704C13.6108 8.59688 13.5838 8.41251 13.594 8.22831C13.5813 8.03982 13.6071 7.85073 13.6697 7.67251C13.7324 7.4943 13.8307 7.33071 13.9586 7.19168C14.1011 7.06419 14.2675 6.9663 14.4482 6.90372C14.6289 6.84113 14.8202 6.81508 15.011 6.82709C15.1984 6.81619 15.3861 6.84282 15.5631 6.90543C15.74 6.96803 15.9027 7.06535 16.0416 7.19168C16.1695 7.33071 16.2678 7.4943 16.3304 7.67251C16.3931 7.85073 16.4189 8.03982 16.4062 8.22831C16.4164 8.41251 16.3894 8.59688 16.3268 8.7704C16.2641 8.94392 16.1671 9.10303 16.0416 9.2382Z"
      fill={fill}
    />
  </svg>
);