"use client";

import { useRef } from "react";
import Image from "@/components/Img";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

export function ParallaxImage({
  src,
  alt,
  className = "object-cover",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-[-8%]">
        <Image src={src} alt={alt} fill priority sizes="100vw" className={className} />
      </motion.div>
    </div>
  );
}
