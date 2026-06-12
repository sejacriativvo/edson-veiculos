import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "dark" | "ghost" | "outline" | "whatsapp";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-[0_10px_30px_-8px_rgba(46,49,146,0.6)] hover:bg-brand-600 hover:shadow-[0_16px_40px_-8px_rgba(46,49,146,0.7)] hover:-translate-y-0.5",
  dark: "bg-ink text-white hover:bg-ink-soft hover:-translate-y-0.5",
  ghost: "text-ink hover:bg-mist",
  outline: "border border-line bg-white text-ink hover:border-brand-400 hover:text-brand-600",
  whatsapp:
    "bg-[#1FAF53] text-white shadow-[0_10px_30px_-8px_rgba(31,175,83,0.6)] hover:bg-[#199648] hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.95rem]",
  lg: "h-14 px-8 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  href,
  external,
  ...props
}: CommonProps & { href: string; external?: boolean } & Omit<ComponentProps<typeof Link>, "href">) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...props}>
      {children}
    </Link>
  );
}
