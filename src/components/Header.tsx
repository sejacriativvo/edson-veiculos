"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Phone, Search } from "lucide-react";
import { Instagram, Facebook } from "./SocialIcons";
import { Logo } from "./Logo";
import { ButtonLink } from "./Button";
import { LiveSearch } from "./LiveSearch";
import { nav, site, whatsappLink } from "@/data/site";

const topBarItems = [
  "Há mais de 30 anos em Araras",
  "Financiamento em até 60x",
  "Aceitamos seu usado na troca",
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  const transparent = isHome && !scrolled && !open;
  const light = transparent;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Top bar — slim, clean, cor da marca (sem linha branca) */}
      <div className="hidden bg-brand text-white lg:block">
        <div className="container-x flex h-9 items-center justify-between gap-8">
          <div className="relative max-w-xl flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_92%,transparent)]">
            <div className="animate-marquee flex w-max items-center whitespace-nowrap text-[0.8rem] font-medium tracking-wide text-white/80">
              {[...topBarItems, ...topBarItems].map((t, i) => (
                <span key={i} className="inline-flex items-center">
                  <span className="size-1 shrink-0 rounded-full bg-accent" />
                  <span className="px-7">{t}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-5">
            <a
              href={`tel:${site.phoneRaw}`}
              className="inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-white/80 transition-colors hover:text-white"
            >
              <Phone className="size-3.5 text-accent" />
              {site.phone}
            </a>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/70 transition-colors hover:text-white">
              <Instagram className="size-4" />
            </a>
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/70 transition-colors hover:text-white">
              <Facebook className="size-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`transition-all duration-500 ${
          transparent ? "bg-transparent" : "border-b border-line bg-white shadow-[0_4px_30px_-12px_rgba(10,12,28,0.25)]"
        }`}
      >
        <div className="container-x flex h-[68px] items-center justify-between md:h-20">
          <Logo light={light} />

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const active = item.href === pathname;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    light
                      ? "text-white/80 hover:text-white"
                      : active
                        ? "text-brand-600"
                        : "text-ink/70 hover:text-ink"
                  }`}
                >
                  {item.label}
                  {active && !light && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand-500"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar veículos"
              className={`inline-flex size-11 items-center justify-center rounded-full transition-colors ${
                light ? "text-white hover:bg-white/10" : "text-ink/70 hover:bg-mist hover:text-ink"
              }`}
            >
              <Search className="size-5" />
            </button>
            <a
              href={`tel:${site.phoneRaw}`}
              className={`hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors md:inline-flex lg:hidden ${
                light ? "text-white/85 hover:text-white" : "text-ink/70 hover:text-ink"
              }`}
            >
              <Phone className="size-4" />
              {site.phone}
            </a>
            <ButtonLink
              href={whatsappLink(`Olá! Vim pelo site da ${site.name} e gostaria de atendimento.`)}
              external
              variant="whatsapp"
              size="sm"
              className="hidden sm:inline-flex"
            >
              WhatsApp
            </ButtonLink>
            <button
              aria-label="Abrir menu"
              onClick={() => setOpen((v) => !v)}
              className={`inline-flex size-11 items-center justify-center rounded-full lg:hidden ${
                light ? "text-white" : "text-ink"
              }`}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass border-b border-line lg:hidden"
          >
            <nav className="container-x flex flex-col gap-1 py-4">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-4 py-3 text-lg font-medium text-ink/80 transition-colors hover:bg-mist hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-2 px-1">
                <ButtonLink href={whatsappLink(`Olá! Vim pelo site da ${site.name}.`)} external variant="whatsapp" size="md">
                  Falar no WhatsApp
                </ButtonLink>
                <a
                  href={`tel:${site.phoneRaw}`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-line text-sm font-medium text-ink"
                >
                  <Phone className="size-4" /> {site.phone}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay de busca */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-ink/60 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          >
            <div className="container-x flex justify-center pt-24 md:pt-28">
              <motion.div
                initial={{ opacity: 0, y: -16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl overflow-hidden rounded-[1.6rem] border border-line bg-white shadow-lift"
              >
                <LiveSearch variant="overlay" autoFocus onNavigate={() => setSearchOpen(false)} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
