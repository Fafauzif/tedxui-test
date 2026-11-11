# Interaction contract

## Business evidence

Source: the user's current instructions in this conversation. Approved scope is a frontend-only proof of concept, Indonesian-first with the English campaign title, friendly editorial exhibition aesthetic, a Vercel-ready source ZIP, and no Supabase yet. Jar and portrait-story initiatives belong to the broader marketing campaign.

## Canonical UI Map

| Capability | Canonical owner            | Source of truth                   | Allowed variants                   | Verification                      |
| ---------- | -------------------------- | --------------------------------- | ---------------------------------- | --------------------------------- |
| Form       | QuestionRoom, src/main.tsx | Current user scope; this contract | Private optional response only     | Browser writing and export        |
| Scrollbar  | src/style.css global rules | DESIGN.md                         | Document and native dialog         | Browser layout and computed style |
| Toast      | QuestionRoom local status  | This contract                     | Inline status inside native dialog | Browser copy-link feedback        |

No table selection, authored select/listbox, date picker, remote search, authentication, or server CRUD exists. No UX-CONTRACT expansion is needed for absent capabilities.

## Flow ledger

- Draw/open: select a question, open one native dialog, set URL `q` to a stable question ID. Deep links reopen the same question. Closing removes `q` and restores trigger focus.
- Random draw excludes the current question. Filtering affects the collection, not the original canonical dataset.
- Writing is optional. Drafts are stored only in React memory by question ID. Closing/reopening the room during the same page session retains the text; reload clears it.
- Generate: local PNG export, visible busy label, duplicate export blocked. No request sends the response. Failure leaves the draft intact and provides inline recovery guidance.
- Preview: image reflects the question and optional response. Back restores the writing view. Close retains in-memory draft but discards the temporary image.
- Share: attempt native file sharing only if supported; otherwise download the PNG. User cancellation is not an error. Failed sharing offers download/copy alternatives. A successful native share invocation is not evidence of publication.
- Copy: copy the question-only link. Clipboard failure reveals a selectable read-only field. Feedback stays inside the dialog's top layer.
- Sample perspectives: explicitly fictional editorial examples. No publish, like, reply, or public-submission controls.
- Event: unconfirmed facts remain unannounced. Ticket action only appears when an official URL is configured.

## Privacy boundary

No persistent draft storage, analytics, database, accounts, external API calls, or uploaded content. Bundled font files are same-origin static assets. URLs carry only question IDs; response text is not serialized into the URL. Sharing the exported image discloses its visible writing to the chosen recipient.

## Accessibility and resilience

Visible labels, native buttons, 44px icon controls, 50px primary actions, focus-visible outlines, native dialog focus containment and Escape, body scroll lock, reduced-motion support. Dialog body scrolls on small screens. Browser-owned clipboard/share capability is detected and has a visible fallback. No fake busy states or implied network saves.
