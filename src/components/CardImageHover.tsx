"use client";

import { useState } from "react";
import Image from "@/components/Img";

export function CardImageHover({
  fotos,
  alt,
  sizes,
}: {
  fotos: string[];
  alt: string;
  sizes?: string;
}) {
  const imgs = fotos.slice(0, 3);
  const [idx, setIdx] = useState(0);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (imgs.length < 2) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const seg = Math.floor((x / rect.width) * imgs.length);
    setIdx(Math.min(imgs.length - 1, Math.max(0, seg)));
  }

  return (
    <div className="absolute inset-0" onMouseMove={onMove} onMouseLeave={() => setIdx(0)}>
      {imgs.map((f, i) => (
        <Image
          key={f}
          src={f}
          alt={alt}
          fill
          sizes={sizes}
          className={`object-cover transition-opacity duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {imgs.length > 1 && (
        <div className="pointer-events-none absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {imgs.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full bg-white transition-all duration-200 ${
                i === idx ? "w-5 opacity-100" : "w-1.5 opacity-50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
