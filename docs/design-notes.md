# Design notes — "The Delivery Record"

Notes for whoever (or whatever) touches the visual layer next. The point
of writing them down is so the next pass doesn't re-introduce what this
one deliberately removed.

## The direction

The design language comes from the subject's trade. Bharath's job is
taking a bought-but-stalled enterprise system and driving it to a
signed-off go-live. That world is made of project records: ruled
entries, real dates, status marks, milestone sign-offs, handover docs.

So the page is built as a record. Flat sheets separated by hairline
rules instead of shadowed cards. Dates and figures set in tabular
numerals. One accent used as a stamp — for marks and emphasis — rather
than sprayed across decoration.

## Tokens

| Token          | Light     | Dark      | Role                          |
| -------------- | --------- | --------- | ----------------------------- |
| `--background` | `#EDE9DF` | `#17140F` | manila record paper           |
| `--foreground` | `#211D17` | `#ECE5D7` | warm ink                      |
| `--card`       | `#F6F3EB` | `#201C16` | a raised sheet                |
| `--muted`      | `#5E564A` | `#A79E8D` | secondary ink                 |
| `--border`     | `#C9C1B0` | `#3A342A` | hairline rule                 |
| `--accent`     | `#93261F` | `#D9655A` | oxblood stamp                 |
| `--highlight`  | `#2E4A63` | `#9CBAD6` | the "second pen", used rarely |

`--on-accent` stays `var(--background)` so a filled accent always has a
theme-correct foreground without a second literal colour. Every pair
clears WCAG AA both as small text on the page and as a fill.

## Type

- **Archivo** — headings, labels, dates, figures. Heavy and tight at
  display sizes; `.font-display` and `.tnum` both route to it.
- **Newsreader** — body copy. The prose on this site is meant to be
  read, so it gets a text serif rather than a UI sans.
- **Noto Sans Tamil** — covers both roles under `html[lang="ta"]`,
  since neither Latin face carries Tamil glyphs.

Measure stays under ~66ch. Serif body gets the looser line-height.

## Motion

Exactly one moment: the go-live rail in the hero draws once on load
through the five real stages of the onboarding automation, and each
mark fills as the line reaches it. It is in `globals.css` under
`.rail-*`, and it respects `prefers-reduced-motion`.

Everything else is static. Hover changes colour, never position.

## Deliberately removed — don't bring these back

Each of these was on the page before, and each is a default that shows
up regardless of subject:

- **01 / 02 / 03 section markers.** The sections are not a sequence to
  work through. `SectionHeading` still accepts `index` so the ten call
  sites compile, but it renders nothing.
- **Tracked-out ALL-CAPS eyebrow labels** above every heading.
- **The scrolling tech marquee.** A platform list is reference
  information — a reader scans it for the one they run, so it holds
  still now.
- **3D tilt cards with a cursor-following sheen**, and the lift-on-hover
  on every card.
- **The rotating conic-gradient ring** behind the portrait, and the
  floating accent glow blobs.
- **Fade-and-slide-up reveal on every section.** `.reveal` and the
  `Reveal` component are now inert, kept only so existing call sites
  work.
- **`→` appended to link and button text.**
- **Icon tiles per list item** — a glyph beside every service and skill
  group was decoration standing in for information.

`.glow`, `.aura`, `.ring-conic`, `.tilt-*`, `.animate-floaty` and
`.reveal` are all still defined, neutralised, because they have call
sites on pages beyond the home page. Delete the call sites before
deleting the rules.

## Scope of this pass

Home page, the shared token layer, nav and footer. `/services`,
`/freelance`, `/samples` and `/admin` inherit the tokens and the flat
`.card`, so they are coherent but have not been individually reworked —
they still use the older card-and-pill composition in places.
