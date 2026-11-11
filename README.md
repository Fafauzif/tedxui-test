# What are you still figuring out?

Frontend proof of concept for the Still, We Grow campaign, TEDxUniversitasIndonesia 2027.

Indonesian interface, English campaign title, TEDx red and a friendly editorial exhibition direction. This package does not publish a site or connect to any account on your behalf.

## Deploy to Vercel

1. Extract the ZIP on your computer.
2. Create a Git repository and upload the **extracted contents** of this folder. `package.json`, `index.html`, `vercel.json`, and `src/` should be at the repository root. Do not upload the ZIP itself as the website.
3. In Vercel, choose **Add New → Project**, then import that repository.
4. Use the **Vite** framework preset. Build command: `npm run build`. Output directory: `dist`. Keep Root Directory at the directory containing `package.json`.
5. Deploy. No environment variables or Supabase account are needed.

The React + Vite implementation intentionally keeps this frontend-only proof of concept smaller than a full Next.js application. Vercel's Git deployment works with this setup. `package-lock.json` pins the resolved dependency tree; use `npm ci` for reproducible installs.

## Run locally

Use Node.js 22.12+ (Node 24 recommended).

```bash
npm ci
npm run dev
```

Open the URL printed by Vite. Do not double-click `index.html`; module imports and sharing features require a web server. Clipboard and native file sharing require HTTPS or localhost and vary by browser/device.

```bash
npm run check
npm run build
npm run preview
```

`dist/` contains a ready-built version. It can also be served as a static website; rebuild after changing source. The source project remains the intended Vercel repository.

## What works

- 24 original questions across four topics, plus an all-topics filter.
- Random drawing without immediately repeating the active question.
- Question-specific links, e.g. `/?q=arah-01`.
- Private writing up to 350 characters, retained in memory while the page remains open.
- Clearly labelled editorial example perspectives.
- Local 1080 × 1920 PNG generation for either a question or a private response.
- Native file sharing when available, with image-download and copy-link alternatives.
- Accessible question and information dialogs, keyboard close, focus restoration, mobile navigation, reduced motion.
- Main Event information panel with editable configuration and no invented speakers, venue, or checkout.

## What is intentionally absent

No Supabase, public submissions, accounts, moderation screen, analytics, payments, mailing-list collection, crisis-response service, jar, or portrait-story series. The jar and portrait series belong to the wider campaign. Nothing on the site claims to accept public submissions.

Drafts exist only in React memory and disappear on reload or closing the tab. Exporting an image processes writing locally. Sharing an image intentionally reveals its contents to its recipient. Question links never contain private response text. The hosting provider may still process ordinary request metadata when a page is visited; this is not a claim of infrastructure-level anonymity.

## Edit content and event information

`src/content.ts` contains the original prompts, example perspectives, and event settings.

- Questions need unique stable IDs, so previously shared links keep working.
- All example perspectives are fictional editorial examples, never represented as real submissions.
- Add only approved public event details to `event.date` and `event.venue`.
- Add `event.ticketUrl` to reveal an actual official ticket link. Use a trusted HTTPS URL. Until then, no purchase button is shown.
- `instagramUrl` and `logoUrl` are reserved for later integration; they are not currently rendered. The header uses a text treatment, not an imported official logo asset.
- Replace the text identity with your approved logo artwork before external release if required by VD.

`src/style.css` controls the shared palette, typography, layouts, card surfaces, and motion. `src/export.ts` controls the exported PNG. `DESIGN.md` records the intended visual identity. Fonts are installed and bundled locally rather than fetched from Google Fonts on each visit.

## Before public release

- Replace placeholder event information and review the original prompts with Marketing/Curator.
- Confirm the approved event branding and any dates, ticket URL, and venue details.
- Change the deliberate `noindex,nofollow` directive in `index.html` when indexing is desired.
- Test the PNG download and sharing flow on actual iOS and Android devices, including Instagram's in-app browser. A share-menu invocation does not prove that a Story was published.
- If public submissions are added later, implement an actual persistent database, server-side validation, rate limits, explicit publication consent, and a review queue. Do not turn private drafts into public submissions silently.

## Package contents

- `src/`: implementation and editable content.
- `public/`: favicon.
- `dist/`: tested production build.
- `vercel.json`: Vercel configuration.
- `package.json` + lockfile: dependency and build configuration.
- `DESIGN.md`, `UX-CONTRACT.md`, `QA.md`: visual direction, interaction contract, and verification evidence.

## Third-party software

React, Vite, TypeScript, Lucide icons, Archivo, and Source Sans 3 are installed through npm. See their distributed licence files in installed packages. The fonts use SIL Open Font License terms. No stock photographs, generated portraits, third-party question decks, or real user stories are included.
