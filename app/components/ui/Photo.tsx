import { cn } from "~/lib/cn";
import type { PictureSource } from "./Portrait";

interface PhotoProps {
  picture: PictureSource;
  alt: string;
  /** Above the fold: load eagerly with high priority. */
  priority?: boolean;
  sizes?: string;
  /** Classes for the wrapping <picture>, e.g. its size or aspect ratio. */
  className?: string;
  /** Classes for the <img>, e.g. object position. */
  imgClassName?: string;
}

/**
 * A responsive photograph that fills its box. Size the box with className
 * (an aspect ratio or an explicit height); the image covers it.
 */
export function Photo({
  picture,
  alt,
  priority = false,
  sizes = "100vw",
  className,
  imgClassName,
}: PhotoProps) {
  const { sources, img } = picture;
  return (
    <picture className={cn("block overflow-hidden", className)}>
      {sources.avif && (
        <source type="image/avif" srcSet={sources.avif} sizes={sizes} />
      )}
      {sources.webp && (
        <source type="image/webp" srcSet={sources.webp} sizes={sizes} />
      )}
      <img
        src={img.src}
        width={img.w}
        height={img.h}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </picture>
  );
}
