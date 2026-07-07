# brand_assets — learngermanwithjonas

Drop this whole folder into your project root so Claude Code finds it at `/brand_assets`.

## What's inside (ready to use)
- `tokens.css` — all colors, fonts, radii, shadows as CSS variables. Import once, use everywhere.
- `tokens.json` — same values as data (handy for Tailwind config / JS).
- `logo/wordmark.svg` — **placeholder** wordmark. Replace with your real logo when you have it.
- `icons/` — speak, check, star, calendar, chat, arrow (brutalist cartoon, 3px black outline).
- `shapes/` — blob, burst, underline (decorative accents).
- `buttons/components.html` — live reference for button + card + tag styles. Open in a browser to see the look.

## Design system (quick reference)
| Token        | Value        | Use                     |
|--------------|--------------|-------------------------|
| creme        | `#FBF5F2`    | page background         |
| black        | `#1A1A1A`    | text, outlines, shadows |
| orange       | `#FF881A`    | accent / CTA            |
| white        | `#FFFFFF`    | cards on creme          |
| font         | Rubik        | 400 / 500 / 700 / 800   |
| border       | 3px solid black | all outlines         |
| radius       | 8 / 14 / 22 / pill | corners           |
| shadow       | hard offset, no blur, e.g. `6px 6px 0 #1A1A1A` |

**Rule:** shadows are always hard offset (no blur), outlines always black and thick. That's the whole "brutalist cartoon" feel.

## What YOU still need to add
- [ ] `portrait/jonas.jpg` — your own photo (for hero / about). I can't generate a real photo of you.
- [ ] Real logo file, if you have one (replace `logo/wordmark.svg`).
- [ ] Any existing Expatly assets you want to reuse — copy them in here yourself; nothing is pulled in automatically.

## Tell Claude Code
Add a line to your project brief:
> Use brand assets from /brand_assets. Import /brand_assets/tokens.css for all colors, fonts, radii and shadows. Use jonas.jpg in the hero/about section.
