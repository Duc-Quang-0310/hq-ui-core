import React from 'react';

export interface HQImage extends React.ImgHTMLAttributes<HTMLImageElement> {
  useLoadingSkeleton?: boolean;
  useLoadingFallback?: boolean;
}

export const Images = React.forwardRef<HTMLImageElement, HQImage>(
  (
    {
      className,
      src,
      useLoadingSkeleton = true,
      useLoadingFallback = false,
      width,
      height,
      style,
      ...other
    },
    ref
  ) => {
    const [loading, setLoading] = React.useState(
      useLoadingSkeleton || useLoadingFallback
    );
    const [imgSource, setImgSource] = React.useState<string>('');

    React.useEffect(() => {
      const image = new Image();
      if (src) {
        image.src = src;
        image.onload = () => {
          setImgSource(src);
          setLoading(false);
        };
      }
    }, [src]);

    if (loading && useLoadingSkeleton && !imgSource) {
      return (
        <div
          className="hq-skeleton"
          style={{
            width,
            height,
            ...style,
          }}
        />
      );
    }

    return (
      <img
        className={`${className} ${
          loading && useLoadingFallback
            ? 'hq-avatar-loading'
            : 'hq-avatar-loaded'
        } `}
        src={imgSource}
        ref={ref}
        style={{
          width,
          height,
          ...style,
        }}
        {...other}
      />
    );
  }
);

Images.displayName = 'Avatar';
