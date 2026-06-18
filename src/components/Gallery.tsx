"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "@/components/Img";
import { AnimatePresence, motion, useMotionValue } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

export function Gallery({ fotos, alt }: { fotos: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const dragX = useMotionValue(0);

  const go = useCallback(
    (dir: number) => setActive((i) => (i + dir + fotos.length) % fotos.length),
    [fotos.length],
  );

  useEffect(() => { dragX.set(0); }, [active, dragX]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, go]);

  return (
    <div className="flex flex-col gap-3">
      <div className="group relative aspect-video touch-pan-y overflow-hidden rounded-3xl bg-paper md:aspect-[16/9]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={active}
            style={{ x: dragX }}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={fotos[active]}
              alt={`${alt} — foto ${active + 1}`}
              fill
              priority
              draggable={false}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="select-none object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {/* camada de arraste — deslizar pro lado troca a foto */}
        {fotos.length > 1 && (
          <motion.div
            className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            dragSnapToOrigin
            style={{ x: dragX }}
            onDrag={(_, info) => { dragX.set(info.offset.x); }}
            onDragEnd={(_, info) => {
              dragX.set(0);
              if (info.offset.x < -60 || info.velocity.x < -400) go(1);
              else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
            }}
          />
        )}

        <button
          onClick={() => setOpen(true)}
          aria-label="Ampliar imagem"
          className="absolute right-3 top-3 z-20 inline-flex size-10 items-center justify-center rounded-full glass-dark text-white opacity-0 transition-opacity group-hover:opacity-100"
        >
          <Expand className="size-5" />
        </button>

        {fotos.length > 1 && (
          <>
            <NavBtn side="left" onClick={() => go(-1)} />
            <NavBtn side="right" onClick={() => go(1)} />
            <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full glass-dark px-3 py-1 text-xs font-medium text-white">
              {active + 1} / {fotos.length}
            </div>
          </>
        )}
      </div>

      {fotos.length > 1 && (
        <div className="hide-scrollbar flex gap-2.5 overflow-x-auto pb-1">
          {fotos.map((f, i) => (
            <button
              key={f}
              onClick={() => setActive(i)}
              className={`relative aspect-video w-24 shrink-0 overflow-hidden rounded-xl transition-all ${
                i === active
                  ? "ring-2 ring-brand-500 ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={f} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4"
            onClick={() => setOpen(false)}
          >
            <button
              aria-label="Fechar"
              className="absolute right-5 top-5 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="size-6" />
            </button>
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              drag={fotos.length > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              dragSnapToOrigin
              onDragEnd={(_, info) => {
                if (info.offset.x < -60 || info.velocity.x < -400) go(1);
                else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
              }}
              className="relative h-[80vh] w-full max-w-5xl cursor-grab active:cursor-grabbing"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={fotos[active]} alt={alt} fill draggable={false} sizes="90vw" className="select-none object-contain" />
            </motion.div>
            {fotos.length > 1 && (
              <>
                <NavBtn side="left" onClick={() => go(-1)} light onPointerDown={(e) => e.stopPropagation()} />
                <NavBtn side="right" onClick={() => go(1)} light onPointerDown={(e) => e.stopPropagation()} />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavBtn({
  side,
  onClick,
  light,
  onPointerDown,
}: {
  side: "left" | "right";
  onClick: () => void;
  light?: boolean;
  onPointerDown?: (e: React.PointerEvent) => void;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      aria-label={side === "left" ? "Anterior" : "Próxima"}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerDown={onPointerDown}
      className={`absolute top-1/2 ${
        side === "left" ? "left-3" : "right-3"
      } z-20 -translate-y-1/2 inline-flex size-11 items-center justify-center rounded-full transition-all hover:scale-105 ${
        light ? "bg-white/10 text-white hover:bg-white/20" : "glass-dark text-white"
      }`}
    >
      <Icon className="size-6" />
    </button>
  );
}
