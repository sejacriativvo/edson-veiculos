/**
 * Wrapper de <img> para GitHub Pages.
 * next/image não aplica basePath no client com static export + Turbopack,
 * então usamos um <img> simples com o prefixo embutido em build time.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

interface ImgProps {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
  width?: number;
  height?: number;
  draggable?: boolean;
}

export default function Img({
  src,
  alt,
  fill,
  priority,
  className,
  width,
  height,
  draggable,
}: ImgProps) {
  const finalSrc = src.startsWith("/") ? `${BASE}${src}` : src;

  if (fill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={finalSrc}
        alt={alt}
        draggable={draggable}
        loading={priority ? "eager" : "lazy"}
        className={className}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={finalSrc}
      alt={alt}
      width={width}
      height={height}
      draggable={draggable}
      loading={priority ? "eager" : "lazy"}
      className={className}
    />
  );
}
