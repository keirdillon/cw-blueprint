# Coastal Blueprint — Build & Deploy Playbook
### Same stack as Summit Series & Foundations

---

## Pre-Flight Checklist

Before starting, make sure you have:

1. **The approved HTML mockup** — `coastal-blueprint-v4.html` (save it into `~/Projects/training-blueprint/`)
2. **Railway** — Create a new PostgreSQL database in your Railway dashboard (click "+ New" → "Database" → "PostgreSQL"). Copy the `DATABASE_URL` from the Variables tab.
3. **Resend** — Your existing API key works. The `mycoastalwealth.com` domain is already verified. We'll send from `blueprint@mycoastalwealth.com`.
4. **GitHub** — Create a new repo at `github.com/keirdillon/cw-blueprint`

---

## Prompt 1 — Scaffold the Project

Open Claude Code:
```
cd ~/Projects/training-blueprint && claude
```

Paste this:

> Create a new Next.js 14 app with App Router in this directory (~/Projects/training-blueprint).
>
> First, read the HTML mockup at `~/Projects/training-blueprint/coastal-blueprint-v4.html` — this is the approved design. Port the exact CSS, colors, fonts, layout, sections, and animations from this file into the Next.js landing page. Match it pixel-for-pixel.
>
> **Design System — Coastal Precision v6:**
> - Colors: coastal-900 (#252f4a), coastal-800 (#3c506f), coastal-700 (#5d7fa0), coastal-600 (#6b95ba), coastal-400 (#89adc8), coastal-200 (#c9dce8), sand-100 (#faf7f2), sand-200 (#f3ede4), gray-200 (#e8e8e8), gray-400 (#a3a3a3), gray-500 (#737373)
> - Fonts: Marlide Display (via Typekit `https://use.typekit.net/tpw8nnl.css`), Minion Pro (Typekit), Neue Haas Grotesk (Typekit). Google Fonts fallbacks: Playfair Display, Source Serif 4, DM Sans.
> - CSS font variables: `--font-display: 'marlide', 'Playfair Display', Georgia, serif;` / `--font-body-serif: 'minion-pro', 'Source Serif 4', Georgia, serif;` / `--font-ui: 'neue-haas-grotesk-display', 'DM Sans', -apple-system, sans-serif;`
> - Zero border-radius on all buttons and form inputs
> - Shadows: shadow-sm through shadow-xl per design system
> - Motion: ease-out cubic-bezier(0.16, 1, 0.3, 1), 200ms for hovers, 400ms for reveals
>
> **Sections to port from the HTML mockup (in order):**
> 1. Nav — transparent on load, solid coastal-900 on scroll. Logo (22px height). "Register Now" CTA button.
> 2. Hero — Full-bleed overlay with water background image. "Sales Training Program" overline (left-aligned), "Coastal Blueprint" title with italic accent, "Built for momentum. Built for you." tagline in Minion Pro italic, body copy, 3-stat meta bar (10 Sessions / Virtual / Apr–Jun 2026), two buttons (accent + white outline).
> 3. Overview split — Meeting photo left, sand-100 content right with 3 numbered pillar items (01/02/03).
> 4. Stats dark bar — 4-column: 10 Weekly Sessions / 100% Virtual / Q2 2026 Series / Year 1 Advisors.
> 5. Schedule — 2-column grid of 10 session cards. Each has number (coastal-200), date (coastal-600), title (Neue Haas 18px), description (Minion Pro 15px). Gradient top-border on hover.
> 6. Coastal parallax divider — 70vh, background-attachment: fixed, centered italic quote "Start your journey with clarity and purpose" + "COASTAL WEALTH" overline.
> 7. Registration form — sand-100 section, white card. Fields: First Name, Last Name, Email, Phone, Office Location (dropdown: Fort Lauderdale, Boca Raton, Miami, Tampa, Other), Start Date at Coastal Wealth. Submit button: "Register for the Full Series". Success state after submission.
> 8. Footer — Dark mega footer with logo, tagline, address, watermark.
>
> Extract all base64 images from the HTML and save them as files in `/public/images/`. Reference them normally in the JSX.
>
> **Prisma schema** — `Registration` model:
> - id (cuid)
> - firstName (String)
> - lastName (String)
> - email (String)
> - phone (String, optional)
> - office (String)
> - startDate (String, optional)
> - status (String, default "New")
> - contactedAt (DateTime, optional)
> - confirmedAt (DateTime, optional)
> - notes (String, optional)
> - createdAt (DateTime, default now)
>
> Use PostgreSQL.
>
> **Resend** for transactional email (package: `resend`).
>
> **API routes:**
> - `POST /api/register` — create registration, send confirmation email to registrant, send admin notification to all comma-separated ADMIN_EMAIL addresses
> - `GET /api/register` — list all registrations (sorted by createdAt desc)
> - `PATCH /api/register/[id]` — update status, notes, contactedAt, confirmedAt
> - `DELETE /api/register/[id]` — delete registration
>
> **Admin panel at `/admin`:**
> - Summary cards at top: Total Registrations, New, Contacted, Confirmed (with counts)
> - Table with columns: Name, Email, Office, Start Date, Status, Registered Date, Actions
> - Status badges: gray=New, amber=Contacted, green=Confirmed
> - Action buttons: Mark Contacted (sets contactedAt), Mark Confirmed (sets confirmedAt), Delete (with confirmation dialog)
> - Notes field per registration (editable inline or via modal)
> - Export to CSV button
> - Style with Tailwind, match Coastal Precision colors
>
> **Email templates:**
> - Registrant confirmation:
>   - Subject: "You're Registered — Coastal Blueprint"
>   - From: "Blueprint Program <blueprint@mycoastalwealth.com>"
>   - Body: Thank them by first name, confirm they're registered for the full 10-session Coastal Blueprint series, mention virtual access details and calendar invites will follow, signed by Kristin Dorm (VP Training & Development)
> - Admin notification:
>   - Subject: "New Blueprint Registration: [FirstName] [LastName]"
>   - From: "Blueprint Program <blueprint@mycoastalwealth.com>"
>   - Body: Show all registration details (name, email, phone, office, start date), include direct link to admin dashboard
>
> **Favicon:** Navy blue circle — use inline SVG data URI in metadata:
> `icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%23252f4a'/></svg>"`
>
> **Env vars needed:** DATABASE_URL, RESEND_API_KEY, ADMIN_EMAIL
>
> Initialize git repo. Do NOT push yet.

---

## Prompt 2 — Database Setup

After Prompt 1 completes, paste this:

> Set up the database. Create a `.env` file with:
> ```
> DATABASE_URL="[paste your Railway PostgreSQL URL here]"
> RESEND_API_KEY="[paste your Resend API key here]"
> ADMIN_EMAIL="kdillon@mycoastalwealth.com,kdorm@mycoastalwealth.com"
> ```
>
> Run `npx prisma migrate dev --name init` to create the Registration table. Verify the migration runs successfully.

---

## Prompt 3 — Test Locally

> Run `npm run dev` and verify:
> 1. Landing page loads at localhost:3000 with all sections rendering correctly
> 2. Form submission works and creates a registration in the database
> 3. Confirmation email sends to the registrant
> 4. Admin notification email sends to all ADMIN_EMAIL addresses
> 5. Admin panel at /admin shows the registration with correct data
> 6. Status updates (Contacted/Confirmed) work with timestamps
> 7. Delete works with confirmation
>
> Fix any issues before proceeding.

---

## Prompt 4 — Push to GitHub & Deploy to Vercel

> 1. Create the GitHub repo `cw-blueprint` at github.com/keirdillon
>    ```
>    gh repo create keirdillon/cw-blueprint --public --source=. --push
>    ```
>    (Or if `gh` isn't installed: `git remote add origin https://github.com/keirdillon/cw-blueprint.git && git push -u origin main`)
>
> 2. Deploy to Vercel:
>    ```
>    npx vercel --prod
>    ```
>
> 3. Set Vercel environment variables:
>    ```
>    echo "[Railway DATABASE_URL]" | npx vercel env add DATABASE_URL production
>    echo "[Resend API key]" | npx vercel env add RESEND_API_KEY production
>    echo "kdillon@mycoastalwealth.com,kdorm@mycoastalwealth.com" | npx vercel env add ADMIN_EMAIL production
>    ```
>
> 4. Redeploy with env vars:
>    ```
>    npx vercel --prod
>    ```

---

## Prompt 5 — Connect Custom Domain (Manual Step)

Go to **GoDaddy DNS** for mycoastalwealth.com and add:

| Type  | Name        | Value                  | TTL |
|-------|-------------|------------------------|-----|
| CNAME | `blueprint` | `cname.vercel-dns.com` | 600 |

Then in **Vercel** → Project Settings → Domains → Add `blueprint.mycoastalwealth.com`

Verify it connects. Should go live within a few minutes.

---

## Prompt 6 — Verify Resend Sender

If `blueprint@mycoastalwealth.com` throws a 403 error, you may need to add it as a verified sender in Resend. Since the `mycoastalwealth.com` domain is already verified with SPF/DKIM via GoDaddy (from the Foundations and Summit Series setup), it should work immediately. If not:

> Go to Resend dashboard → Domains → verify that mycoastalwealth.com is active. The `blueprint@` subdomain sender should work automatically.

---

## Key Differences from Foundations

| Detail | Foundations | Blueprint |
|--------|------------|-----------|
| Subdomain | foundations.mycoastalwealth.com | blueprint.mycoastalwealth.com |
| GitHub repo | keirdillon/cw-foundations | keirdillon/cw-blueprint |
| Sessions | 4 sessions | 10 sessions |
| Audience | Recently licensed advisors | New advisors (first year) |
| Focus | Financial planning process | Sales skills |
| Send-from email | foundations@mycoastalwealth.com | blueprint@mycoastalwealth.com |
| Admin emails | kdillon, kdorm | kdillon, kdorm (confirm with Kristin if others needed) |
| Registration model | Has trackInterest field | Has startDate field instead |
| Led by | Kristin Dorm | Kristin Dorm |

---

## Post-Launch Checklist

- [ ] Landing page live at blueprint.mycoastalwealth.com
- [ ] Registration form submits successfully
- [ ] Registrant receives confirmation email from blueprint@mycoastalwealth.com
- [ ] Admin team receives notification email
- [ ] Admin panel accessible at blueprint.mycoastalwealth.com/admin
- [ ] Status tracking (New → Contacted → Confirmed) works
- [ ] All 10 sessions display correctly with dates
- [ ] Mobile responsive
- [ ] Share link with Kristin for review

---

*Coastal Blueprint — Build Playbook*
*Dillon Agency · April 2026*
