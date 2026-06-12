"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { whatsappLink } from "@/data/site";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nome: "", telefone: "", assunto: "", mensagem: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const msg = `Olá! Meu nome é ${form.nome}.${form.assunto ? ` Assunto: ${form.assunto}.` : ""}${
      form.mensagem ? ` ${form.mensagem}` : ""
    }${form.telefone ? ` Meu telefone: ${form.telefone}.` : ""}`;
    setSent(true);
    window.open(whatsappLink(msg), "_blank");
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-line bg-white p-10 text-center shadow-soft">
        <span className="inline-flex size-16 items-center justify-center rounded-2xl bg-[#1FAF53]/10 text-[#1FAF53]">
          <CheckCircle2 className="size-8" />
        </span>
        <h3 className="mt-5 font-display text-xl font-semibold text-ink">Tudo certo!</h3>
        <p className="mt-2 max-w-sm text-muted">
          Abrimos o WhatsApp com sua mensagem. Se não abriu, fale com a gente pelo botão flutuante.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink hover:bg-mist"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-line bg-white p-6 shadow-soft md:p-8">
      <h3 className="font-display text-xl font-semibold text-ink">Envie uma mensagem</h3>
      <p className="mt-1.5 text-sm text-muted">
        Preencha e continue a conversa no WhatsApp em segundos.
      </p>
      <div className="mt-6 grid gap-4">
        <Field label="Nome">
          <input required value={form.nome} onChange={set("nome")} placeholder="Seu nome" className={inputCls} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Telefone">
            <input
              value={form.telefone}
              onChange={set("telefone")}
              placeholder="(19) 99999-9999"
              className={inputCls}
            />
          </Field>
          <Field label="Assunto">
            <input
              value={form.assunto}
              onChange={set("assunto")}
              placeholder="Ex: financiamento, troca…"
              className={inputCls}
            />
          </Field>
        </div>
        <Field label="Mensagem">
          <textarea
            value={form.mensagem}
            onChange={set("mensagem")}
            rows={4}
            placeholder="Como podemos ajudar?"
            className={`${inputCls} resize-none`}
          />
        </Field>
      </div>
      <button
        type="submit"
        className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand font-medium text-white transition-all hover:bg-brand-600 hover:shadow-[0_12px_30px_-8px_rgba(46,49,146,0.7)] active:scale-[0.99]"
      >
        Enviar pelo WhatsApp
        <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}

const inputCls =
  "w-full rounded-xl border border-line bg-paper px-4 py-3 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-brand-400 focus:bg-white";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">{label}</span>
      {children}
    </label>
  );
}
