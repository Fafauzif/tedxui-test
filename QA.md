# Verification record

Build date: 11 November 2026. Frontend proof of concept only.

## Completed

- `npm run build`: TypeScript and Vite production build passed after final source changes.
- Strict frontend UI audit: zero errors, zero warnings, zero unresolved findings.
- `designmd lint DESIGN.md`: zero errors; seven documentation-only orphan-token warnings. Runtime styles are owned by CSS, with their visual roles recorded in DESIGN.md prose.
- Browser inspection of the desktop homepage and question-writing dialog.
- Browser inspection of actual 390px and 320px iframe viewports, exercising the app's own responsive media queries. These were width checks in desktop Chrome, not physical-device emulation.
- Opened a question from the deck; entered a private response; revealed an editorial perspective; generated and visually inspected its Story-card preview.
- Generated and visually inspected a card using a 350-character response.
- Confirmed a question-specific URL reopened the corresponding question after reload.
- Confirmed clipboard action displayed visible success feedback inside the dialog.
- Opened the mobile navigation and observed the navigation links.
- Checked narrow modal geometry with DOM measurements: the 390px viewport contained its 370px-wide dialog without child overflow.
- Contrast calculation identified standard brand red as marginal for white normal-size button text; action red was darkened separately while retaining TEDx red for the brand and large typography.

## Corrections made during QA

- Local feedback moved inside the native dialog top layer.
- Private drafts lifted into page-session memory so closing a question does not immediately discard writing.
- Removed an empty hash link; the identity now links to the real main anchor.
- Small-screen heading and long-word wrapping hardened; narrow deck bounds adjusted.
- Export view resets dialog scrolling and focus to its top when the view changes.
- Late image-generation results are ignored if their originating question is no longer active.

The final small-screen overflow and export scroll-reset adjustments were source-checked and production-built; the browser connection timed out before a further visual pass. No claim of exhaustive cross-browser visual verification is made.

## Remaining device checks

- The browser download-event listener timed out; automated filesystem confirmation of the downloaded PNG was not obtained. The actual PNG preview rendered successfully in the app.
- Native sharing to Instagram or another phone app requires a real iOS/Android check after deployment. Browser/device differences are why save-image and copy-link alternatives are included.
- Tablet widths, screen readers, physical phone keyboards, and reduced-motion OS settings were not exercised in this environment. The corresponding responsive/accessibility rules are implemented, but are not presented as independently verified device behaviour.

## Public release boundary

No public user contributions, no real participant testimonials, no live checkout, no backend, and no external analytics. Event dates, venue, and speakers remain unannounced until approved details are supplied. The text identity is a prototype treatment rather than a supplied official logo file. The page intentionally has a noindex directive.
