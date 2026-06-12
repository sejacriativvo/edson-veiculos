import type { Metadata } from "next";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { Instagram, Facebook } from "@/components/SocialIcons";
import { site, whatsappLink } from "@/data/site";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contato",
  description: `Fale com a ${site.name}. ${site.addressFull}. WhatsApp ${site.whatsapp}.`,
};

export default function ContatoPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-edson-radial pt-28 text-white lg:pt-36">
        <div className="aurora pointer-events-none absolute inset-0 opacity-30" />
        <div className="container-x relative py-16 md:py-20">
          <Reveal>
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Fale com a gente</h1>
            <p className="mt-3 max-w-xl text-lg text-white/65">
              Estamos prontos para te atender. Escolha o canal que preferir, respondemos rápido.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Info + map */}
          <div className="flex flex-col gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <ContactCard
                icon={MessageCircle}
                title="WhatsApp"
                value={site.whatsapp}
                href={whatsappLink(`Olá! Vim pelo site da ${site.name}.`)}
                accent
              />
              <ContactCard icon={Phone} title="Telefone" value={site.phone} href={`tel:${site.phoneRaw}`} />
              <ContactCard icon={MapPin} title="Endereço" value={site.addressFull} href={site.mapLink} />
              <div className="rounded-3xl border border-line bg-white p-6 shadow-soft">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Clock className="size-5" />
                </span>
                <p className="mt-3 text-sm font-semibold text-ink">Horário</p>
                {site.hours.map((h) => (
                  <p key={h.d} className="text-sm text-muted">
                    {h.d}: {h.h}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <SocialLink href={site.instagram} label="Instagram">
                <Instagram className="size-5" /> {site.instagramHandle}
              </SocialLink>
              <SocialLink href={site.facebook} label="Facebook">
                <Facebook className="size-5" /> Facebook
              </SocialLink>
            </div>

            <div className="overflow-hidden rounded-3xl border border-line shadow-soft">
              <div className="relative aspect-[16/10]">
                <iframe
                  title="Localização Edson Veículos"
                  src={site.mapEmbed}
                  className="absolute inset-0 size-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  icon: Icon,
  title,
  value,
  href,
  accent,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  href: string;
  accent?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group rounded-3xl border p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift ${
        accent ? "border-[#1FAF53]/30 bg-[#1FAF53]/5" : "border-line bg-white"
      }`}
    >
      <span
        className={`inline-flex size-11 items-center justify-center rounded-xl ${
          accent ? "bg-[#1FAF53] text-white" : "bg-brand/10 text-brand"
        }`}
      >
        <Icon className="size-5" />
      </span>
      <p className="mt-3 text-sm font-semibold text-ink">{title}</p>
      <p className="text-sm text-muted">{value}</p>
    </a>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-line bg-white py-3.5 text-sm font-medium text-ink transition-colors hover:border-brand-300 hover:text-brand-600"
    >
      {children}
    </a>
  );
}
