import Link from "next/link";
import { MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";
import { Instagram, Facebook } from "./SocialIcons";
import { Logo } from "./Logo";
import { nav, site, whatsappLink } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-edson text-white/70">
      <div className="pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-brand/25 blur-[120px]" />
      <div className="container-x relative">
        <div className="grid gap-12 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-5">
            <Logo light />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-white/60">
              {site.description}
            </p>
            <div className="mt-6 flex gap-3">
              <SocialIcon href={site.instagram} label="Instagram">
                <Instagram className="size-5" />
              </SocialIcon>
              <SocialIcon href={site.facebook} label="Facebook">
                <Facebook className="size-5" />
              </SocialIcon>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Navegação
            </h4>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Contato
            </h4>
            <ul className="mt-5 space-y-4 text-[0.95rem]">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-brand-400" />
                <span>{site.addressFull}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-5 shrink-0 text-brand-400" />
                <a href={`tel:${site.phoneRaw}`} className="hover:text-white">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-brand-400" />
                <span>
                  {site.hours.map((h) => (
                    <span key={h.d} className="block">
                      {h.d}: <span className="text-white/80">{h.h}</span>
                    </span>
                  ))}
                </span>
              </li>
            </ul>
            <a
              href={whatsappLink(`Olá! Vim pelo site da ${site.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1FAF53] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#199648]"
            >
              {site.whatsapp} <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-sm text-white/45 md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
          </p>
          <p>
            Site desenvolvido por{" "}
            <span className="font-medium text-white/70">criativvo</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all hover:border-brand-400 hover:bg-brand/30 hover:text-white"
    >
      {children}
    </a>
  );
}
