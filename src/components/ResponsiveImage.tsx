import React, { useEffect, useRef, useState } from 'react';

/**
 * ResponsiveImage Component
 * Provides responsive image loading with lazy loading support
 * Automatically generates appropriate srcset based on screen size
 * 
 * Usage:
 * <ResponsiveImage
 *   src="/image-md.webp"
 *   alt="Description"
 *   srcSet="/image-sm.webp 480w, /image-md.webp 768w, /image-lg.webp 1024w"
 *   sizes="(max-width: 480px) 100vw, (max-width: 768px) 90vw, 100vw"
 * />
 */

interface ResponsiveImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
  lazy?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function ResponsiveImage({
  src,
  alt,
  srcSet,
  sizes,
  lazy = true,
  width,
  height,
  className = '',
  onLoad,
  onError,
  ...props
}: ResponsiveImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(!lazy);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    if (!img || !lazy) return;

    // Use Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            img.src = src;
            if (srcSet) {
              img.srcSet = srcSet;
            }
            setIsLoaded(true);
            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before visible
      }
    );

    observer.observe(img);

    return () => {
      observer.unobserve(img);
    };
  }, [src, srcSet, lazy]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setError(true);
    onError?.();
  };

  return (
    <img
      ref={imgRef}
      src={!lazy ? src : undefined}
      srcSet={!lazy && srcSet ? srcSet : undefined}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={lazy ? 'lazy' : 'eager'}
      onLoad={handleLoad}
      onError={handleError}
      className={`
        responsive-image
        ${isLoaded ? 'loaded' : ''}
        ${error ? 'error' : ''}
        ${className}
      `.trim()}
      {...props}
    />
  );
}

/**
 * Picture Component
 * Advanced responsive image with multiple sources
 * 
 * Usage:
 * <ResponsivePicture
 *   sources={[
 *     { srcSet: '/image-sm.webp', sizes: '(max-width: 480px) 100vw', media: '(max-width: 480px)' },
 *     { srcSet: '/image-md.webp', sizes: '(max-width: 768px) 100vw', media: '(max-width: 768px)' },
 *   ]}
 *   src="/image-lg.webp"
 *   alt="Description"
 * />
 */

interface SourceConfig {
  srcSet: string;
  sizes?: string;
  media?: string;
  type?: string;
}

interface ResponsivePictureProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  sources: SourceConfig[];
  src: string;
  alt: string;
  lazy?: boolean;
}

export function ResponsivePicture({
  sources,
  src,
  alt,
  lazy = true,
  ...props
}: ResponsivePictureProps) {
  const [isLoaded, setIsLoaded] = useState(!lazy);
  const pictureRef = useRef<HTMLPictureElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img || !lazy) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            img.src = src;
            setIsLoaded(true);
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: '50px' }
    );

    observer.observe(img);

    return () => {
      observer.unobserve(img);
    };
  }, [src, lazy]);

  return (
    <picture ref={pictureRef}>
      {sources.map((source, index) => (
        <source
          key={index}
          srcSet={source.srcSet}
          sizes={source.sizes}
          media={source.media}
          type={source.type}
        />
      ))}
      <img
        ref={imgRef}
        src={!lazy ? src : undefined}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`responsive-image ${isLoaded ? 'loaded' : ''}`}
        {...props}
      />
    </picture>
  );
}

export default ResponsiveImage;
