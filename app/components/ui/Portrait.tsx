import { cn } from "~/lib/cn";
import type { Pending } from "~/content/types";
import { WellPlate } from "../well-plate";
import { TodoMark } from "./TodoMark";

/** Output of a vite-imagetools `?as=picture` import. */
export interface PictureSource {
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
}

interface PortraitProps {
  picture: PictureSource | Pending;
  alt: string;
  /** Above the fold: load eagerly with high priority. */
  priority?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * Black-and-white portrait in the poster style. Until a photo is supplied it
 * renders a clearly marked placeholder at the same 4:5 ratio, so layout holds.
 */
export function Portrait({
  picture,
  alt,
  priority = false,
  sizes = "(min-width: 48rem) 40vw, 100vw",
  className,
}: PortraitProps) {
  if ("todo" in picture) {
    return (
      <div
        data-tone="ink"
        className={cn(
          "relative flex aspect-[4/5] flex-col justify-between p-6",
          className,
        )}
      >
        <WellPlate rows={10} cols={8} fills={{}} size="100%" />
        <TodoMark item={picture} />
      </div>
    );
  }
  const { sources, img } = picture;
  return (
    <picture className={cn("block", className)}>
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
        className="aspect-[4/5] h-auto w-full object-cover grayscale"
      />
    </picture>
  );
}
