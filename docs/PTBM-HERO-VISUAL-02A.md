# PTBM-HERO-VISUAL-02A — Desktop review candidate

Date: 2026-10-16 (Europe/Moscow). Status: implementation complete, user visual acceptance pending. No merge or production release.

## Baseline and source

- Repository: OC62/ptb-m-landing-nextjs.
- Feature branch: `feature/ptbm-landing-v2-windows-20261016`; starting HEAD `54e6fe4054f0f45f05b81422298e3518b6125b15`. Single worktree; index and working tree were clean; upstream +0/-0. PR #8 was OPEN/Draft.
- Explicitly selected reference: `C:/Users/OC62/Downloads/Безопасность на ночной магистрали.png`, 1672x941, SHA-256 `f4fe924ce7e8846486a15c1aeec34307f3fe1fd6a40bba643d6358dd5d562eb8` (rechecked before editing).
- Existing clean scene asset `public/images/hero-night-highway-v2.webp` retained unchanged. It preserves the night highway, bridge, traffic and worker from the supplied composition. Text and panels are real DOM content.
- Damaged PR #9 WebP was neither used nor repaired. Its provenance/integrity findings remain in PREFLIGHT-R1.

## Change and scope

Only Hero.jsx and Hero.module.css implement the desktop slice. New visual rules apply at min-width 1024px. Existing styles, scene crop, service-direction cards and copy below 1024px remain intact; the new desktop card list and secondary panel use display:none there, including in the accessibility tree.

Desktop changes: reference-aligned content inset and heading hierarchy; wider heading letterforms; controlled left shading; green illuminated CTA; translucent diagonal information panels; four glass trust tiles with decorative SVG icons and the exact approved neutral copy:

1. Профильная специализация — Транспортная безопасность объектов дорожного хозяйства.
2. Комплексный подход — Услуги по защите от актов незаконного вмешательства.
3. Документы — Ознакомьтесь с реквизитами и документами компании.
4. Открытый диалог — Обсудите задачу со специалистом.

The approved H1/subheading and CTA labels/routes remain. Shared Header, mobile 02B, other sections, forms, APIs, analytics, dependencies and project images were not changed.

## Reference versus render

| Area | Baseline mismatch | 02A result / remaining difference |
| --- | --- | --- |
| Scene | Heavy shading obscured the scene | Bridge, road and worker remain visible; no replacement scene |
| Heading | Left edge too far left; narrower type | Reference-like inset, three lines and wider letterforms; system font approximates the flattened reference |
| CTA | Smaller rectangular treatment; weak illumination | Larger rounded glass controls, stronger controlled green edge light |
| Information panels | Rectangular upper panel; missing lower cue | Two angled translucent panels; spacing verified at 1024/1440/1672 |
| Trust row | Numbered service cards | Four neutral credibility tiles, icons and subtle green light; copy intentionally differs from unsupported reference claims |
| Header | White shared Header versus integrated dark nav | Remains unchanged, explicitly outside 02A; full-page pixel identity is not claimed |

Source/reference and render have been compared side by side. This is a visual review candidate, not a declaration of pixel-perfect agreement or user acceptance.

## Validation

- `node --test src/app/api/send/captcha.test.mjs src/app/api/send/contact-input.test.mjs src/app/api/send/rate-limit.test.mjs src/app/components/analytics/consent.test.mjs`: 32/32 PASS.
- `npx --no-install eslint .`: exit 0.
- `npm run build`: final rerun after the narrow-desktop spacing correction, exit 0, 17/17 static pages, lint/type checks and build traces complete. Node v24.11.0, npm 11.6.1, Next.js 15.5.25. No dependency changes.
- `git diff --check`: PASS.
- Prerendered `.next/server/app/index.html`: one Hero H1, exact approved heading/accent, both CTA hrefs, scene URL and all four neutral cards present before JavaScript. Local production HTTP GET `/`: 200.
- Real browser navigation: Hero links open `/services` and `/contacts`; destination headings/content verified. No form submission or CAPTCHA completion performed.
- Keyboard: primary and secondary CTA both receive a visible 3px focus outline; decorative SVGs hidden from assistive technology. No new animation or motion dependency.
- Desktop text, image loading and contrast reviewed visually on the actual scene; no formal automated WCAG certification is claimed.

| Viewport | Hero client/scroll width | Lower panel bottom / card row top | Result |
| --- | --- | --- | --- |
| 1672x941 | 1657 / 1657 | 723.02 / 742.75 | PASS |
| 1440x900 | 1425 / 1425 | 623 / 663.13 | PASS |
| 1024x900 (final build) | 1009 / 1009 | 562.38 / 580.19 | PASS |
| 768x1024 | 753 / 753 | unchanged compact composition | PASS |
| 390x844 | 375 / 375 | unchanged compact composition | PASS |
| 320x700 | 305 / 305 | unchanged compact composition | Hero container has no horizontal overflow |

The browser reserves 15px for the vertical scrollbar. At 390px, before/after Hero innerText, bounding box, heading box and visible card boxes matched exactly. The 320px baseline retains long compact card titles extending within their cards; this pre-existing mobile typography is deferred to separately authorized 02B.

Independent review: a separate reviewer inspected the final diff, production 1440px screenshot and 1672px reference comparison. No blocking findings. The last 1024px spacing correction is confirmed by final production DOM coordinates and screenshot.

## Evidence and limitations

Local evidence directory (outside repository): `C:/Users/OC62/.codex/visualizations/2026/10/16/01a1446f-b717-7b32-b26f-4099dc4a346f/desktop-02a/`.

Files: `before-1672.png`, `desktop-1672.png`, `desktop-1440.png`, `desktop-1024.png`, `reference-vs-desktop.png`, `before-mobile.json`, `after-mobile.json`, `mobile-production.png`, `viewport-checks-dev.json`, `production-checks.json`, `final-1024.json`. The earlier production-checks.json records the pre-correction 1024 panel; final-1024.json supersedes that one entry. Final narrow correction does not affect 1440/1672.

Existing warnings: stale baseline-browser-mapping/Browserslist data; Next image domains deprecation. Development mode also reported the existing favicon public/page conflict and Watchpack access errors for Windows system files; these are outside this slice. Production build succeeds. No new P0/P1 code findings from independent review.

Vercel connector inspection returned 403. The authenticated project UI independently confirmed Vercel Authentication enabled for All Deployments; settings were not changed. Feature-branch Git integration is used for the protected Preview. Remote commit, CI and Preview results are reported separately after push so they are not inferred from local PASS.

## Acceptance gate

STOP before user visual acceptance. PR #8 remains Draft. No merge, production deploy, DNS, access or protection changes. Rollback: restore the Hero component/styles from the starting checkpoint through a normal reviewed revert; preserve the original reference and existing scene asset.
