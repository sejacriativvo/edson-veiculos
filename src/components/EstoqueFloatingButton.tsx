"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";

/**
 * Botão flutuante que aparece (mobile) só enquanto a seção alvo está visível.
 * Some com animação ao sair dela.
 */
export function EstoqueFloatingButton({ targetId = "destaques" }: { targetId?: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShow(entry.isIntersecting),
      { rootMargin: "-18% 0px -22% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [targetId]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 28, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 lg:hidden"
        >
          <Link
            href="/estoque"
            className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_44px_-8px_rgba(46,49,146,0.75)] ring-1 ring-white/15"
          >
            Ver estoque completo
            <ArrowRight className="size-4 transition-transform group-active:translate-x-0.5" />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
