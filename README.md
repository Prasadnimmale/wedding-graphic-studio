# Bhavani Graphics Studio — Website

Modern, responsive marketing site for a local printing & graphic design studio.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide icons

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

---

## ⚙️ Configure the business (one file)

Everything business-specific lives in **`lib/site.ts`**. Nothing is invented — all
contact fields are intentionally **empty** until you fill in the real values, and the UI
falls back gracefully (placeholder rows, hidden buttons) instead of showing fake data.

| Field | Used by |
| --- | --- |
| `phone` | Contact section, footer, call buttons |
| `email` | Contact section, footer, form fallback |
| `address` | Contact section, map header, "Get Directions" link |
| `hours` | Contact section |
| `whatsapp` | Floating WhatsApp button, CTA, form fallback (no `+`, no spaces — e.g. `919876543210`) |
| `whatsappMessage` | Pre-filled message on every WhatsApp entry point |
| `social.instagram` / `social.facebook` | Footer social icons — **hidden until a URL is set** |
| `enquiryEndpoint` | Contact form POST target (e.g. `/api/enquiry`) |
| `mapEmbedUrl` | Google Maps embed (Share → Embed a map → copy `src`). Shows a styled placeholder while empty. |
| `url` | Canonical URLs, Open Graph tags, `sitemap.xml`, `robots.txt` — **set this to the real domain before launch** |

### Contact form delivery

The form validates on the client, then delivers in this order:

1. **`enquiryEndpoint`** — POSTs JSON `{ name, phone, email, service, message }`
2. **WhatsApp** — opens WhatsApp with the enquiry pre-filled
3. **Email** — opens the visitor's mail client with the enquiry pre-filled
4. If none is configured, it says so honestly (no fake success message).

---

## Structure

```
app/
  page.tsx            Home (all sections)
  about/  services/  gallery/  contact/
  layout.tsx          Fonts, metadata, navbar/footer shell
  globals.css         Theme tokens (brand, gold, ink…) + utility classes
  robots.ts  sitemap.ts
components/           One component per section (Navbar, Hero, Services, Gallery…)
data/
  services.ts         The 12 services (title, description, image, points)
  gallery.ts          Gallery items + filter tabs
lib/site.ts           ← single place for all business details
public/images/        Optimised WebP photos (credits in IMAGES.md)
scripts/              Image pipeline (manifest + build script)
```

### Editing content

- **Services:** `data/services.ts` — the `/services` page renders one anchored
  section (`#slug`) per entry, and the homepage grid pulls from the same list.
- **Gallery:** `data/gallery.ts` — items belong to a category; filters and the
  `?filter=` deep link derive from it.
- **Colours/typography:** `app/globals.css` (`@theme inline`) — dark + gold
  theme: near-black canvas (`#0a0a09`), dark surfaces, light ink text, gold
  accents (`brand`/`gold`), bronze glows (`royal`), Google Sans typography.
  `.bg-brand-gradient` is the gold action gradient (its text is always
  near-black).

### Adding images

Photos are generated from `scripts/images.manifest.json` (source URL + crop box)
via `node scripts/build-images.mjs`, which writes WebP files into `public/images/`.
Source photos are cached in `scripts/.cache/`. Credits/licensing notes: `IMAGES.md`.

---

## SEO

- Title: **Bhavani Graphics Studio | Printing & Graphic Design Services**
- Meta description, canonical URLs, Open Graph + Twitter cards (cover image:
  `public/images/og-cover.jpg`)
- `robots.txt` + `sitemap.xml` generated from `app/robots.ts` / `app/sitemap.ts`
- Semantic headings, meaningful `alt` text, `next/image` optimisation

> Set `site.url` in `lib/site.ts` to the production domain so canonicals,
> Open Graph URLs, the sitemap and robots entries point at the real site.

## Notes

- The site is fully static except `sitemap.xml`.
- Motion respects `prefers-reduced-motion`.
- No fake stats, fake reviews or invented contact details anywhere.
