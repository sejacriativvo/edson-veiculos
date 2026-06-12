"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";

export function Seal({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 26, ry: px * 26 });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      style={{ perspective: 700 }}
      className={className}
    >
      <motion.div
        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ type: "spring", stiffness: 200, damping: 16 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative size-full [filter:drop-shadow(0_18px_28px_rgba(10,12,28,0.45))]"
      >
        <svg viewBox="0 0 200 200" className="size-full" role="img" aria-label="30 anos de mercado">
          <defs>
            <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f0d488" />
              <stop offset="0.5" stopColor="#c9a24b" />
              <stop offset="1" stopColor="#9c7a2c" />
            </linearGradient>
            {/* brilho metálico estático no topo do anel */}
            <linearGradient id="goldShine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff6d8" stopOpacity="0.9" />
              <stop offset="0.35" stopColor="#fff6d8" stopOpacity="0" />
            </linearGradient>
            <path id="sealTop" d="M 34,100 A 66,66 0 0 1 166,100" fill="none" />
            <path id="sealBot" d="M 36,102 A 64,64 0 0 0 164,102" fill="none" />
          </defs>

          {/* anéis */}
          <circle cx="100" cy="100" r="96" fill="url(#goldGrad)" />
          <circle cx="100" cy="100" r="96" fill="url(#goldShine)" />
          <circle cx="100" cy="100" r="88" fill="#1f3554" />
          <circle cx="100" cy="100" r="82" fill="none" stroke="#c9a24b" strokeWidth="1" opacity="0.55" />

          {/* texto curvo */}
          <text fill="#f0d488" fontSize="13" fontWeight="700" letterSpacing="3">
            <textPath href="#sealTop" startOffset="50%" textAnchor="middle">
              EDSON VEÍCULOS
            </textPath>
          </text>
          <text fill="#f0d488" fontSize="11" fontWeight="600" letterSpacing="2">
            <textPath href="#sealBot" startOffset="50%" textAnchor="middle">
              TRADIÇÃO E CONFIANÇA
            </textPath>
          </text>

          {/* separadores laterais */}
          <circle cx="34" cy="100" r="2" fill="#c9a24b" />
          <circle cx="166" cy="100" r="2" fill="#c9a24b" />

          {/* centro */}
          <text
            x="100"
            y="108"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="52"
            fontWeight="800"
            fontFamily="var(--font-sora), sans-serif"
          >
            30
          </text>
          <text x="100" y="130" textAnchor="middle" fill="#f0d488" fontSize="13" fontWeight="700" letterSpacing="6">
            ANOS
          </text>
        </svg>
      </motion.div>
    </motion.div>
  );
}
