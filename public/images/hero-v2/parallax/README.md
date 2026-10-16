# PTB-M Hero layered assets

Stage: `PTBM-WEB-V2-HERO-ASSETS-01`.

These are **derived production candidates** from the preserved Hero visual reference. They do not replace the September design source and do not make PR #8 / commit `396f7a5cdfd923ec15280c4ca3c55b857d173969` canonical.

## Files

- `hero-clean-composite.jpg` — cleaned photographic composition / static fallback reference.
- `hero-far-background.jpg` — distant skyline / atmosphere.
- `hero-bridge.png` — isolated bridge and overpass with transparency.
- `hero-road.jpg` — cropped foreground road / traffic plane; blend its top edge with a CSS mask.
- `hero-employee.png` — isolated employee with corrected back branding «ПТБ-М / ТРАНСПОРТНАЯ БЕЗОПАСНОСТЬ».

## Proposed depth model

- far background: 0.08
- bridge: 0.18
- road / traffic: 0.30
- employee: 0.42
- technical overlays: 0.55

Use subtle transforms only. Reduce movement on tablet/mobile and disable it for `prefers-reduced-motion: reduce`.

## Acceptance

**ASSET CANDIDATES — NOT USER-ACCEPTED FINAL HERO.**

Preserve history if a candidate is corrected later.
