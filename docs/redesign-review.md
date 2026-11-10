# ScrewUp Nights redesign review

Review branch: `review/full-redesign`, based on `review/typography` at `41ee177`.
The earlier `proto/zine-torn` and typography versions remain available in Git.

## Design

Bricolage Grotesque (600–700) and DM Sans (400–600), loaded with next/font.
Shared rem typography tokens: 18px body, 16px essential information, 14px secondary
captions. Cream/purple foundation with accessible dark pink text, original hot
pink decoration, and lime accents. Original logo and genuine photos retained.
Four speaker silhouettes retained at the user's request.

The opening puts explanation and event essentials before photography on mobile.
Editorial experience, photo, speaker, practical-information, and closing sections
replace repeated pitches. Native navigation/FAQ disclosures work without client
JavaScript. No essential content is hidden behind scroll animations. No sticky
purchase overlay is used while no event is announced.

## Event facts and purchase path

The user confirmed on November 10, 2026 that there is no confirmed upcoming event.
The current public state is explicitly unannounced. Date, venue, price, and tickets
are not advertised as confirmed. `app/event.ts` centralizes event details, validates
Zeffy ticket destinations, and removes expired events from upcoming presentation.
Every active Buy tickets action uses the same destination and component. The old
`?show=on-sale` prototype override is removed. No analytics service was added.

Historical source: https://www.inspirecolumbia.org/ lists September 2, 2026.
The November 12 event was explicitly placeholder data in the starting branch.
The historical September Zeffy URL must not be reused for a new event. Its current
checkout was inaccessible (HTTP 403); no platform contribution or fee claims were
added. The reference deployment was inaccessible and no PDF was supplied locally.

Before enabling purchases, confirm the next event's date, start/doors times,
venue/address, price/inclusions, availability, and current Zeffy checkout URL.
Only add age, accessibility, parking, refund, or optional contribution guidance
when verified. Speaker names remain unannounced.

## Validation

- ESLint and production build passed. Build needs network access for Google Fonts.
- Seven native Node tests cover booking gates, timezone display, expiry,
  sold-out behavior, missing details, and invalid/placeholder checkout URLs.
  Run: `node --experimental-strip-types --test tests/event.test.ts`.
- Local server HTML checked for one h1, unique IDs, valid anchor targets,
  descriptive image alternatives, four speaker icons, no stale November date or
  $15 price, and no active checkout link, including with `?show=on-sale`.
- Text contrast calculated: ink/paper 13.31:1, muted/paper 5.61:1,
  pink text/paper 5.87:1, ink/lime 10.90:1. Hot pink is decorative.
- Source review prompted intrinsic grid reflow, capped gutters/button spacing,
  content-sized event labels, correct responsive image sizes, and state-copy fixes.

## Unverified checks

Browser host was unavailable; native Safari returned missing Computer Use
permissions. No desktop/mobile screenshots could be captured. Actual rendering at
320/390/768/1440px, keyboard traversal, 200% text enlargement, reduced motion,
font appearance/crops, and live checkout flow still need browser review. CSS/source
checks are not a substitute for those visual and interaction checks.

Existing build warning: Next.js detects a parent-directory lockfile and infers the
workspace root. No unrelated configuration or dependency changes were made.
Nothing deployed or merged.
