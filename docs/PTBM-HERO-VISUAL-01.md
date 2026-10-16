# PTBM-HERO-VISUAL-01 — 16.10.2026

## Scope and source

Continuation from clean feature/ptbm-landing-v2-windows-20261016 at 396f7a5cdfd923ec15280c4ca3c55b857d173969. Root C:/Users/OC62/Desktop/ptb-m-landing-nextjs; no applicable AGENTS.md found in repository/parents. Worktree/index initially clean; remote feature and main SHAs match expected. Prior PR #8 CI and Vercel Preview succeeded. Preflight reran 32 tests, ESLint and production build successfully. Node 24.11.0 locally; CI Node 22.

User explicitly supplied C:/Users/OC62/Downloads/Безопасность на ночной магистрали.png after the exact '(2)' filename could not be found. This supplied image is the visual reference for this continuation; it is not silently renamed as '(2)'. SHA256 f4fe924ce7e8846486a15c1aeec34307f3fe1fd6a40bba643d6358dd5d562eb8. Separate TaskSpec file was not available: implementation follows the conversation's explicit Hero-only scope, the archive's exact approved text, and the newly attached image. Full compliance with an unseen TaskSpec is not claimed.

## Background separation

Source PNG is 1672x941 RGB, one frame, no alpha/layers. Interface and photograph are flattened. Lossless separation of covered pixels is impossible. Built-in image_gen edited the exact supplied image to reconstruct covered scene pixels, preserving the night bridge, wet traffic lanes and right-side worker. It is a reference-derived reconstruction, not an arbitrary stock replacement or a verified documentary photograph of a PTBM contract.

Generated master: C:/Users/OC62/.codex/generated_images/01a143ae-8b3c-7a10-a6e9-55705ebd3ffc/exec-a18b38e2-e02b-46b2-a976-85309ac2d5af.png. Project asset: public/images/hero-night-highway-v2.webp, 1672x941, 260282 bytes (sharp WebP quality 88). SHA256 44785b01c7fc2f1ab0dfacaa19940f2db2898b1326261d07dfbebb5e947ae627. Master and user source preserved.

### Exact image-edit prompt (built-in tool; no CLI/API fallback)

Use case: precise-object-edit. Input image is the EDIT TARGET, not loose inspiration. Create a clean background plate for an accessible HTML hero. Remove ONLY the superimposed website interface: the entire top navbar and logo panel, all headline/subtitle/slogan lettering, both CTA buttons, both floating right-hand text panels, the four bottom feature cards including icons, and decorative diagonal glass/green interface stripes. Reconstruct the scene hidden underneath these interface elements. Preserve as closely as possible the SAME night highway, wet road reflections, traffic, cable-stayed bridge architecture, camera position, cool dark lighting, trees on left, and security worker seen from behind on the RIGHT in the same pose, scale, dark cap and reflective yellow-green vest. Preserve the PTB-M lettering already physically on the worker's vest; it is part of the scene, NOT UI. Keep the composition and widescreen 16:9 framing. Keep left side dark and naturally quiet for live HTML heading. Do not replace this image with another location or arbitrary photograph, do not add objects or another person. Output only the clean full-bleed scene, no website UI, no floating text, no cards, no buttons. This is reconstruction of occluded pixels in this exact supplied mockup.

## Implementation decisions

- Only Hero.jsx, Hero.module.css and the new hero background affect product output. No shared Header, other sections, form, API, analytics, dependencies or deployment settings changed.
- Exact approved H1, subheading and CTA labels retained as live HTML; only TRANSPORTNOY is green, sampled brand #00be01 retained. Existing /contacts and /services routes preserved.
- Reference slogan, dark translucent panels, restrained diagonal borders, dimensional green/graphite buttons, right-side scene and four lower cards re-created with scoped CSS/HTML.
- Original trust claims (years, state customers, results) not reproduced without factual verification. Cards use existing service directions: object protection, audit, training and consultation. Numbers 01–04 are list markers, not business statistics.
- Header/logo panel in source remains a separate scope. Existing shared Header is deliberately untouched; screenshot comparison therefore cannot be claimed pixel-perfect for the entire page.
- Mobile is an intentional adaptation: scene above live copy, stacked CTA, two-column cards; no animations or loader gates, visible keyboard focus.
- User visual acceptance pending; no merge or production deployment.

## Verification

Implementation checks and visual evidence are recorded below.

## Local verification and review

- 32/32 existing unit tests PASS; npx --no-install eslint . PASS; diff check PASS.
- Production build with new asset PASS; exact H1 and asset URL present in prerendered HTML before JavaScript. Final mobile-shade adjustment is CSS only and receives another production build.
- Independent read-only reviewer inspected the exact reference, final reconstructed asset, JSX/CSS and provenance report: no P0/P1/P2 findings.
- Actual desktop browser at 1672x941: background loaded, Hero 1657px content width including page scrollbar, no horizontal overflow; composition compared against supplied reference.
- Narrow mobile at 320x700: heading client/scroll widths 265px; four cards each client/scroll width 125px; no overflow. Mobile 390x844 initially revealed insufficient slogan contrast over road highlights; shade adjusted to 92% dark by y=320px rather than tying opacity to the entire section height.
- Existing SmartCaptcha rejects 127.0.0.1:3100; contact submission is not tested. No CAPTCHA configuration changed. No hydration errors observed in tested browser logs.
- Vercel browser: Require Log In checked; deployment type All Deployments; Save disabled. No deployment protection settings modified. API connector remains 403; authenticated dashboard provides the evidence.
- Out-of-scope diff check confirms shared layout, API, analytics, package manifests, CI and vercel.json unchanged.
- Final screenshots and post-adjustment verification are reported with the handoff. No user visual acceptance inferred from automated checks.

Independent follow-up review of fixed-pixel mobile shade: no P0/P1/P2; opacity >92% by first text baseline, independent of total Hero height.

## Final local handoff evidence

Final production build after mobile shade correction PASS (17 static pages). Real browser reload confirms corrected shade. Viewports 1672x941, 768x1024, 390x844 and 320x700 checked: no Hero or heading horizontal overflow. Background fully loaded. Both CTA navigate to the intended /services and /contacts pages; keyboard Tab reaches second CTA with computed 3px outline. Form not submitted. No motion or visibility gates added. Exact heading is present in prerendered HTML.

Desktop and mobile screenshots saved outside source: C:/Users/OC62/.codex/visualizations/2026/10/16/01a143ae-8b3c-7a10-a6e9-55705ebd3ffc/ptbm-night-hero-desktop.jpg and ptbm-night-hero-mobile.jpg. Only the fixed-pixel mobile shade changed after the desktop screenshot, so desktop visual evidence is unchanged.

Feature branch checkpoint and existing draft PR #8 are used for review, not release acceptance. Remote SHA, CI and automatic protected Preview result are verified and reported in chat. Stop before user visual acceptance; no merge or production deployment.
