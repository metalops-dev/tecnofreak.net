---
name: tecnofreak.net
description: A clear, independent technology newsroom.
colors:
  paper: "oklch(98.5% 0.004 220)"
  paper-2: "oklch(95.5% 0.007 220)"
  rule: "oklch(89.5% 0.01 220)"
  ink: "oklch(20% 0.03 255)"
  fog: "oklch(44% 0.025 245)"
  teal: "oklch(52% 0.14 168)"
  teal-soft: "oklch(94% 0.03 168)"
  primary: "oklch(20.5% 0 0deg)"
  primary-foreground: "oklch(98.5% 0 0deg)"
  input: "oklch(92.2% 0 0deg)"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontWeight: 700
    lineHeight: 1.12
  body:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "1.0625rem"
    lineHeight: 1.7
  label:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "0.72rem"
    fontWeight: 500
    letterSpacing: "0.09em"
rounded:
  md: "calc(0.625rem - 2px)"
spacing:
  4: "1rem"
  6: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1rem"
    height: "2.5rem"
---

# Design System: tecnofreak.net

## Overview

**Creative North Star: "The Tech Newsroom"**

A clear, editorial interface gives articles and headlines the leading role. A light paper-like canvas, dark ink, concise rules, and a restrained teal accent create the character of a contemporary technology publication.

Components are practical and restrained. The system relies on hierarchy, typography, and spacing rather than decorative depth; functional controls and overlays may have subtle lift.

**Key Characteristics:**
- Editorial hierarchy with strong display headlines and compact metadata.
- Paper, ink, and teal with quiet dividers.
- Flat article surfaces and restrained functional controls.
- Responsive navigation and reading-focused text widths.

## Colors

The editorial palette combines cool paper neutrals with a distinct teal accent.

### Primary
- **Teal** (`teal`): active navigation, categories, interactive highlights, and selection.
- **Soft Teal** (`teal-soft`): selected mobile navigation background.

### Neutral
- **Paper** (`paper`) and **Paper 2** (`paper-2`): page canvas and quieter surfaces or image placeholders.
- **Ink** (`ink`): primary text and headlines.
- **Fog** (`fog`): secondary text, dates, and inactive navigation.
- **Rule** (`rule`): dividers and editorial borders.
- The shared UI primitives also use semantic `primary`, `primary-foreground`, and `input` tokens. These change under the dark theme; the editorial paper and ink tokens are separately defined and do not change in the observed stylesheet.

## Typography

Space Grotesk provides the display voice; IBM Plex Sans is the body face and IBM Plex Mono handles metadata. Fonts are loaded through `next/font` in `src/app/(frontend)/layout.tsx`.

- **Headlines:** bold display type; the lead article scales from `1.5rem` to `2.1rem` across breakpoints, with a `1.12` line-height.
- **Article body:** `1.0625rem` with `1.7` line-height and a maximum width of `65ch`.
- **Article headings:** display font, bold, with `1.15` line-height; second- and third-level headings use `1.6rem` and `1.3rem` respectively.
- **Labels:** compact uppercase monospaced metadata with tabular numerals and `0.09em` tracking. The CSS requests weight 500; the font loader explicitly loads mono weight 400.

## Layout

The centered container uses `1rem` horizontal padding, increasing to `2rem` at the medium breakpoint. Breakpoints are `40rem`, `48rem`, `64rem`, `80rem`, and `86rem`. The header uses a `56px` height and a `max-w-6xl` content width. Article cards use 16:9 media; compact cards pair a `7rem` image column with text. Archive rows move from a two-column mobile arrangement to four columns at `40rem`.

Article pages use a narrow, centered reading column with a prominent headline, date and category metadata, followed by a wide hero image. Archive and directory pages use teal section rules, counts, and responsive collections of filters or entries. The products directory groups product rows by brand and stacks their content on small screens.

## Elevation & Depth

Editorial article surfaces are flat and separated through whitespace, color, and rules. Shared controls use small shadows, and the mobile navigation overlay has a subtle shadow. The sticky header uses a translucent paper background and backdrop blur.

## Shapes

Editorial images and dividers are largely rectangular. Shared controls and the mobile navigation toggle use the medium radius derived from the base `0.625rem` radius; the desktop search field is square. Image placeholders use an oversized, low-contrast initial when an article has no image.

## Components

### Buttons

The shared default button has a dark semantic background, light text, medium rounded corners, a `2.5rem` height, and `0.5rem 1rem` padding. Outline, secondary, ghost, link, and destructive variants also exist. Hover and keyboard-focus treatments are provided by the component; disabled buttons reduce opacity.

### Inputs

The shared input has a border, transparent background, medium radius, and `2.25rem` height. It provides focus, disabled, and invalid states. The header search is a separate editorial treatment: paper-toned fill and a rule border that turns teal on focus; on desktop it expands from `8rem` to `12rem`.

### Directory filters and tags

Archive year filters and tag links appear as compact, square-cornered bordered chips with counts. The selected archive filter uses a soft teal background and teal border; tags wrap onto additional rows as space narrows. Directory search and product filters use full-width, square-cornered fields with a rule border and teal focus border.

### Navigation

The sticky header contains a display-font wordmark, desktop links, RSS, and search. Active links are teal. Below `48rem`, a menu button opens a full-width navigation panel with a search field; the panel supports Escape and closes when a link is selected.

### Article cards and rows

Cards use 16:9 imagery, teal category labels, bold headlines, muted descriptions and dates. Hover changes the headline to teal and gently enlarges the image. Lead, secondary, and compact variants share this visual grammar. Archive rows use horizontal rules and a responsive grid.

### Product rows

Affiliate product rows have a teal top rule, a white image area, a display-font title, and a separate price or availability and affiliate-action area. At `40rem` and above the image, details, and action sit side by side; below that they stack. The affiliate link is an ink-colored pill with paper text, turning teal on hover. The products directory includes filter controls, a result count, and a disclosure.

### Search results

The search page pairs a centered heading and square editorial search field with a responsive grid of article cards. Its field uses the same paper background, rule border, and teal focus border as directory filters.

## Do's and Don'ts

### Do:
- **Do** use the editorial paper, ink, fog, rule, and teal tokens for the public-facing visual language.
- **Do** keep article hierarchy clear with display headlines and monospaced metadata.
- **Do** preserve visible keyboard focus and reduced-motion support.

### Don't:
- **Don't** assume the editorial palette changes with the semantic dark-theme tokens.
- **Don't** substitute elevated card surfaces for the existing flat editorial article patterns without a deliberate design decision.
