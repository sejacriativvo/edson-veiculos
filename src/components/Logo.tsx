import Image from "@/components/Img";
import Link from "next/link";

export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="Edson Veículos — início" className={`inline-flex items-center ${className}`}>
      <Image
        src="/brand/edson-logo.png"
        alt="Edson Veículos"
        width={330}
        height={110}
        priority
        className={`h-10 w-auto md:h-11 transition-[filter] duration-300 ${
          light ? "[filter:brightness(0)_invert(1)]" : ""
        }`}
      />
    </Link>
  );
}
