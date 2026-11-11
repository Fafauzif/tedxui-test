---
version: alpha
name: "Still figuring it out"
description: "An Indonesian participatory question-card exhibition for TEDxUniversitasIndonesia 2027."
colors:
  primary: "#e62b1e"
  action: "#d3261b"
  ink: "#151515"
  paper: "#f6f5f2"
  card: "#fffefa"
  muted: "#62615d"
  line: "#d5d3cd"
  focus: "#a71910"
typography:
  heading:
    fontFamily: "Archivo, sans-serif"
  body:
    fontFamily: "Source Sans 3, sans-serif"
rounded:
  DEFAULT: "6px"
  card: "8px"
  dialog: "12px"
spacing:
  page-max: "1280px"
  desktop-gutter: "56px"
  mobile-gutter: "20px"
components:
  button:
    height: "50px"
  icon-button:
    height: "44px"
  textarea:
    height: "150px"
---

# Still figuring it out

## Overview

A friendly exhibition of real interactive question cards, not a SaaS landing page or an anonymous confession feed. Audience: Indonesian students and curious young adults, commonly opening a link from social media. Brand-led public homepage; product-led writing/export dialog. Indonesian UI, approved English campaign title. No backend or public submissions in this version.

Signature: a tangible paper deck with an offset red backing card. Give the deck the expressive depth; keep navigation and the writing surface familiar. The user explicitly corrected the scope: no digital jar or portrait-story section in this app.

Runtime ownership: `src/style.css` owns web tokens; this file records their roles. `src/export.ts` uses the same paper/ink/red family for Canvas output. Action red is slightly darker than brand red to clear normal-text contrast with white. No theme toggle or alternating light/dark sections.

## Colors

Use brand red for large headlines, physical card backing, the mark, and expressive accents. Use darker action red for white-on-red controls and `#b72319` for small red labels. Ink and muted text carry readability. Neutral paper is deliberately not a sepia scrapbook. No purple gradients, glass cards, or fake status lights.

## Typography

Archivo 500–800 for headings/cards; Source Sans 3 400–600 for prose and writing. Locally bundled Latin fonts with system fallback. English title remains large but fits a 320px viewport. Body writing fields use at least 16px on phones. Tight headline tracking does not apply to body paragraphs.

## Layout

1280px maximum content width, desktop gutters 56px, mobile 20px (16px at 370px and below). Hero split collapses to vertical at 620px. Three-column question collection becomes two columns at 800px. Cards represent actual question content, not a generic feature grid. One scroll owner in each native dialog. Modal maximum height uses `100dvh`.

## Elevation & Depth

Depth belongs to the hero deck and exported image preview. Collection cards use a light border and restrained hover lift. The native dialog has a blurred dark backdrop and one shadow. No infinite floating animation.

## Shapes

6px control radius, 8px deck surfaces, 12px desktop dialog. Circles are reserved for arrow and close controls. Filters use subtle rectangular shapes rather than a sea of pills.

## Components

`Modal` owns native modal semantics, scroll lock, Escape and close handling, and focus restoration. `QuestionRoom` owns private writing, sample disclosure, export and local feedback. All question entry points reuse that same room.

Buttons keep height stable while exporting. Fields have visible labels, local-only helper text, and a character count. Filters use `aria-pressed`. Disclosure uses `aria-expanded`; FAQ uses native details/summary. Focus outlines remain visible. Lucide line icons are always accompanied by labels or accessible names.

Motion: 200–450ms feedback, simple card lift and content fade. All nonessential animation and smooth scrolling are disabled for reduced motion. Narrow screens retain every action; no hover-only content. Actual phone share targets remain platform-owned.

## Do's and Don'ts

- Preserve one campaign question, one deck, and one private writing flow.
- Label all fictional perspectives as editorial examples.
- Keep the event panel honest about unconfirmed details.
- Never send draft text in a query string or log it.
- Do not introduce a jar, portrait series, fake counters, invented testimonials, or a nonfunctional checkout.
