import NextImage, { ImageProps, ImageLoaderProps } from 'next/image';

const CloudinaryLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality}`;
};

export default function Image({
  className = 'Image',
  src,
  width,
  height,
  quality = 75,
  alt = '',
}: ImageProps) {
  return (
    <NextImage
      className={className}
      loader={CloudinaryLoader}
      src={src}
      alt={alt}
      width={width}
      height={height}
      quality={quality}
    />
  );
}
