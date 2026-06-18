"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "@/components/Img";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

const SWIPE_DIST = 60;
const SWIPE_VEL = 400;

const slideVariants = {
  enter: (dir: number) => ({ x: dir >= 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: "0%", opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? "-100%" : "100%", opacity: 0 }),
};

const slideTrans = {
  x: { type: "spring", stiffness: 280, damping: 28, mass: 0.8 },
  opacity: { duration: 0.12 },
};

export function Gallery({ fotos, alt }: { fotos: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const [open, setOpen] = useState(false);

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setActive((i) => (i + dir + fotos.length) % fotos.length);
    },
    [fotos.length],
  );

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

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
      if (info.offset.x < -SWIPE_DIST || info.velocity.x < -SWIPE_VEL) go(1);
      else if (info.offset.x > SWIPE_DIST || info.velocity.x > SWIPE_VEL) go(-1);
    },
    [go],
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="group relative aspect-video touch-pan-y overflow-hidden rounded-3xl bg-paper md:aspect-[16/9]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTrans}
            drag={fotos.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <Image
              src={fotos[active]}
              alt={`${alt} — foto ${active + 1}`}
              fill
              priority
              draggable={false}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="pointer-events-none select-none object-contain"
            />
          </motion.div>
        </AnimatePresence>

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
              onClick={() => {
                setDirection(i > active ? 1 : -1);
                setActive(i);
              }}
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
              className="absolute right-5 top-5 z-10 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="size-6" />
            </button>

            <div
              className="relative h-[80vh] w-full max-w-5xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={active}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={slideTrans}
                  drag={fotos.length > 1 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  className="absolute inset-0 cursor-grab active:cursor-grabbing"
                >
                  <Image
                    src={fotos[active]}
                    alt={alt}
                    fill
                    draggable={false}
                    sizes="90vw"
                    className="pointer-events-none select-none object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

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
