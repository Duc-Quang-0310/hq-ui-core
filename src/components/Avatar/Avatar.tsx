import React from 'react';

export type HQAvatarSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl ';

export interface HQAvatar extends React.ImgHTMLAttributes<HTMLImageElement> {
  placeholderSrc?: string;
  useLoadingSkeleton?: boolean;
  useLoadingFallback?: boolean;
  avatarSize?: HQAvatarSize;
}

export const Avatar = React.forwardRef<HTMLImageElement, HQAvatar>(
  (
    {
      placeholderSrc,
      className,
      src,
      useLoadingSkeleton = true,
      useLoadingFallback = false,
      width,
      height,
      style,
      avatarSize = 'md',
      ...other
    },
    ref
  ) => {
    const [imgSource, setImgSource] = React.useState(placeholderSrc || src);
    const [loading, setLoading] = React.useState(
      useLoadingSkeleton || useLoadingFallback
    );

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

    if (loading && useLoadingSkeleton) {
      return (
        <div
          data-avatar={avatarSize}
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
        data-avatar={avatarSize}
        {...other}
      />
    );
  }
);

Avatar.displayName = 'Avatar';
