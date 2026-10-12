"use client";

/**
 * Contact section — business details on the left, enquiry form on the right.
 *
 * Delivery (in order of preference, configured in lib/site.ts):
 *   1. `enquiryEndpoint`  — POSTs the enquiry as JSON to your own API/form service.
 *   2. WhatsApp number     — opens WhatsApp with the enquiry pre-filled.
 *   3. Email address       — opens the visitor's mail client with the enquiry pre-filled.
 * If none is configured, the form says so honestly instead of pretending it sent.
 */

import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { callLink, formatPhone, site, whatsappLink } from "@/lib/site";
import { serviceCategories } from "@/data/services";

type Fields = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  company: string; // honeypot — humans never fill this in
};

type Errors = Partial<Record<keyof Fields, string>>;

const initial: Fields = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
  company: "",
};

function validate(f: Fields): Errors {
  const e: Errors = {};

  if (!f.name.trim()) e.name = "Please enter your name.";
  else if (f.name.trim().length < 2) e.name = "That name looks too short.";

  const digits = f.phone.replace(/\D/g, "");
  if (!f.phone.trim()) e.phone = "Please enter a phone number.";
  else if (digits.length < 7 || digits.length > 15)
    e.phone = "That phone number doesn't look right.";

  if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim()))
    e.email = "Please enter a valid email (or leave it blank).";

  if (f.message.trim().length > 0 && f.message.trim().length < 10)
    e.message = "Please add a little more detail (at least 10 characters).";

  return e;
}

function enquiryText(f: Fields) {
  return [
    "Hello Bhavani Printing World, I'd like a quote.",
    "",
    `Name: ${f.name.trim()}`,
    `Phone: ${f.phone.trim()}`,
    f.email.trim() ? `Email: ${f.email.trim()}` : null,
    f.service ? `Service: ${f.service}` : null,
    f.message.trim() ? `Details: ${f.message.trim()}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

const inputClass =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-[15px] text-ink-900 outline-none transition placeholder:text-slate-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-500/10";

export default function Contact() {
  const [fields, setFields] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const [notice, setNotice] = useState<string>("");
  const [lastWaLink, setLastWaLink] = useState("");

  const whatsapp = whatsappLink(
    "Hello Bhavani Printing World, I'd like to know more about your services.",
  );

  function set(key: keyof Fields, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (status === "sending") return;

    // Honeypot: silently accept and pretend it worked.
    if (fields.company.trim()) {
      setStatus("done");
      return;
    }

    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      setNotice("");
      return;
    }

    setStatus("sending");
    setNotice("");
    setLastWaLink("");

    // 1) Form endpoint
    if (site.enquiryEndpoint) {
      try {
        const res = await fetch(site.enquiryEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: fields.name.trim(),
            phone: fields.phone.trim(),
            email: fields.email.trim(),
            service: fields.service,
            message: fields.message.trim(),
          }),
        });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        setStatus("done");
        setFields(initial);
        return;
      } catch {
        setStatus("error");
        setNotice(
          "We couldn't send that just now. Please try again, or reach us on WhatsApp.",
        );
        return;
      }
    }

    // 2) WhatsApp fallback — open WhatsApp with the enquiry pre-filled.
    if (site.whatsapp) {
      const wa = whatsappLink(enquiryText(fields));
      // Trigger like a real link click (more reliable than window.open).
      const anchor = document.createElement("a");
      anchor.href = wa;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setLastWaLink(wa);
      setStatus("done");
      setNotice("WhatsApp opened with your enquiry pre-filled — just press send. If nothing opened, tap the link below.");
      setFields(initial);
      return;
    }

    // 3) Email fallback
    if (site.email) {
      const subject = encodeURIComponent(
        `Enquiry: ${fields.service || "Printing service"}`,
      );
      const body = encodeURIComponent(enquiryText(fields));
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("done");
      setNotice("Your mail app opened with the enquiry ready to send.");
      setFields(initial);
      return;
    }

    // Nothing configured — be honest, never fake a success.
    console.warn(
      "[contact] No enquiryEndpoint, WhatsApp number, or email is configured in lib/site.ts — the message was NOT sent.",
    );
    setStatus("error");
    setNotice(
      "This form isn't connected yet, so your message was not sent. Please use the contact details on this page to reach us directly.",
    );
  }

  const infoRows = [
    {
      icon: Phone,
      label: "Phone",
      value: site.phone ? formatPhone(site.phone) : null,
      href: site.phone ? callLink() : null,
      fallback: "Add your phone number in lib/site.ts",
    },
    {
      icon: Mail,
      label: "Email",
      value: site.email || null,
      href: site.email ? `mailto:${site.email}` : null,
      fallback: "Add your email address in lib/site.ts",
    },
    {
      icon: MapPin,
      label: "Studio Address",
      value: site.address || null,
      href: null,
      fallback: "Add your studio address in lib/site.ts",
    },
    {
      icon: Clock,
      label: "Working Hours",
      value: site.hours || null,
      href: null,
      fallback: "Add your working hours in lib/site.ts",
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-24">
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-royal-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-700">
            Get in touch
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            Let&apos;s talk about your <span className="text-gradient">printing needs</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-500">
            Share what you need and we&apos;ll get back to you with options and a clear
            quote. No pressure, no obligation.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* ---------------- Left: details ---------------- */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.6)] sm:p-8">
              <h3 className="text-lg font-bold text-ink-900">Contact information</h3>
              <p className="mt-1 text-sm text-slate-500">
                Prefer to talk it through? Reach us the way that suits you.
              </p>

              <ul className="mt-6 space-y-5">
                {infoRows.map((row) => {
                  const missing = !row.value;
                  const value = missing ? row.fallback : row.value;
                  return (
                    <li key={row.label} className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-[0_8px_20px_-10px_rgba(0,0,0,0.45)]">
                        <row.icon className="h-5 w-5" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          {row.label}
                        </p>
                        {row.href ? (
                          <a href={row.href} className="block break-words">
                            <span className="text-[15px] font-medium text-ink-900 transition hover:text-brand-700">
                              {value}
                            </span>
                          </a>
                        ) : (
                          <span
                            className={
                              missing
                                ? "block break-words text-sm italic text-slate-400"
                                : "block break-words text-[15px] font-medium text-ink-900"
                            }
                          >
                            {value}
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>

              {site.whatsapp && (
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1EBE5A]"
                >
                  Chat on WhatsApp
                </a>
              )}
            </div>

            <div className="rounded-3xl border border-gold-200 bg-gold-50 p-6">
              <p className="text-sm font-medium text-ink-900">
                <span className="font-semibold">Tip:</span> Include the size, quantity and
                deadline in your message — we can quote faster.
              </p>
            </div>
          </div>

          {/* ---------------- Right: form ---------------- */}
          <div
            id="enquiry"
            className="scroll-mt-28 rounded-3xl border border-line bg-surface p-6 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.7)] sm:p-8 lg:p-10"
          >
            <h3 className="text-lg font-bold text-ink-900">Request a quote</h3>
            <p className="mt-1 text-sm text-slate-500">
              Fill in the form and we&apos;ll respond during working hours.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
              {/* honeypot */}
              <input
                type="text"
                name="company"
                value={fields.company}
                onChange={(e) => set("company", e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-semibold text-ink-900"
                  >
                    Full Name <span className="text-gold-600">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={fields.name}
                    onChange={(e) => set("name", e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    className={`${inputClass} ${errors.name ? "border-red-400 focus:border-red-500 focus:ring-red-500/10" : ""}`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600">
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-sm font-semibold text-ink-900"
                  >
                    Phone <span className="text-gold-600">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="e.g. 98765 43210"
                    value={fields.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                    className={`${inputClass} ${errors.phone ? "border-red-400 focus:border-red-500 focus:ring-red-500/10" : ""}`}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600">
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-semibold text-ink-900"
                  >
                    Email{" "}
                    <span className="font-normal text-slate-400">(optional)</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={fields.email}
                    onChange={(e) => set("email", e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    className={`${inputClass} ${errors.email ? "border-red-400 focus:border-red-500 focus:ring-red-500/10" : ""}`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600">
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="service"
                    className="mb-1.5 block text-sm font-semibold text-ink-900"
                  >
                    Service Required{" "}
                    <span className="font-normal text-slate-400">(optional)</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={fields.service}
                    onChange={(e) => set("service", e.target.value)}
                    className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%2F%3E%3C%2Fsvg%3E')] bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-10`}
                  >
                    <option value="">Select a service…</option>
                    {serviceCategories.map((c) => (
                      <option key={c.slug} value={c.title}>
                        {c.title}
                      </option>
                    ))}
                    <option value="Other / Not sure yet">Other / Not sure yet</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-semibold text-ink-900"
                  >
                    Message{" "}
                    <span className="font-normal text-slate-400">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Sizes, quantities, colours, deadline… anything that helps us quote."
                    value={fields.message}
                    onChange={(e) => set("message", e.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    className={`${inputClass} resize-y ${errors.message ? "border-red-400 focus:border-red-500 focus:ring-red-500/10" : ""}`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600">
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden />
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              {notice && (
                <div
                  role="status"
                  className={`flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm ${
                    status === "error"
                      ? "bg-red-500/10 text-red-400"
                      : "bg-emerald-500/10 text-emerald-400"
                  }`}
                >
                  {status === "error" ? (
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  ) : (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  )}
                  <span>
                    {notice}
                    {lastWaLink && status === "done" && (
                      <>
                        {" "}
                        <a
                          href={lastWaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-emerald-300 underline underline-offset-2 hover:text-emerald-200"
                        >
                          Open WhatsApp
                        </a>
                      </>
                    )}
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_34px_-16px_rgba(0,0,0,0.45)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {status === "sending" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Enquiry <Send className="h-4 w-4" aria-hidden />
                  </>
                )}
              </button>

              <p className="text-xs leading-relaxed text-slate-400">
                We only use your details to reply to this enquiry.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
