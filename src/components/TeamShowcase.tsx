"use client";

import { useEffect, useRef, useState } from "react";
import Image from "@/components/Img";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { team } from "@/data/site";

export function TeamShowcase() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  // Detecta mobile/tablet (sem hover) → controle por scroll
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const apply = () => {
      setIsTouch(mq.matches);
      setActive(mq.matches ? 0 : null);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // No mobile, o funcionário "ativo" sobe conforme a rolagem da página
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!isTouch) return;
    // janela curta: os 4 ciclam com pouco scroll (Luiz aparece sem descer demais)
    const seg = (p - 0.2) / 0.3;
    const idx = Math.min(team.length - 1, Math.max(0, Math.floor(seg * team.length)));
    setActive(idx);
  });

  return (
    <div ref={wrapRef} className="relative mt-14 sm:mt-16 lg:mt-24">
      {/* halo de luz suave atrás do grupo */}
      <div className="pointer-events-none absolute left-1/2 top-2 z-0 h-[60%] w-[72%] -translate-x-1/2 rounded-[50%] bg-brand/10 blur-[80px]" />

      {/* Lineup ombro a ombro — recortes; o ativo cresce mantendo a base fixa */}
      <div
        className="relative z-20 flex items-end justify-center"
        onMouseLeave={() => !isTouch && setActive(null)}
      >
        {team.map((m, i) => {
          const isActive = i === active;
          // cards das pontas ancoram pra dentro pra não cortar na borda da tela
          const cardX =
            i === 0 ? "left-0" : i === team.length - 1 ? "right-0" : "left-1/2 -translate-x-1/2";
          return (
            <motion.button
              key={m.nome}
              onMouseEnter={() => !isTouch && setActive(i)}
              onFocus={() => !isTouch && setActive(i)}
              onClick={() => setActive(i)}
              aria-label={`${m.nome} — ${m.cargo}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative -mx-[5%] focus:outline-none sm:-mx-[3%]"
              style={{ zIndex: isActive ? 40 : 20 - Math.abs((active ?? 0) - i) }}
            >
              {/* cresce a partir da base (origin-bottom): base fixa, cabeça sobe */}
              <motion.div
                className="origin-bottom"
                animate={{ scale: isActive ? 1.1 : 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={m.foto}
                  alt={m.nome}
                  width={760}
                  height={1150}
                  priority={i === 0}
                  className="h-[196px] w-auto max-w-none select-none object-contain drop-shadow-[0_24px_30px_rgba(10,12,28,0.28)] sm:h-[410px] lg:h-[520px]"
                />
              </motion.div>

              {/* card flutuante acima da pessoa ativa */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.92 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className={`pointer-events-none absolute bottom-full z-50 mb-6 whitespace-nowrap rounded-2xl border border-line bg-white px-5 py-2.5 text-center shadow-lift sm:mb-12 lg:mb-16 ${cardX}`}
                  >
                    <p className="font-display text-[0.95rem] font-bold leading-tight text-ink">{m.nome}</p>
                    <p className="text-xs font-medium text-brand-600">{m.cargo}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

    </div>
  );
}
