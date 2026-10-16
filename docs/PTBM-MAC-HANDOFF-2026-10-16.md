# PTB-M Landing v2 — handoff to Mac (2026-10-16)

## Status and authority
- Repository: `OC62/ptb-m-landing-nextjs`.
- Working feature branch: `feature/ptbm-landing-v2-windows-20261016`.
- Last verified desktop implementation before this handoff: `d5b96d040d23b580f7a56b350452a028060c83bd`.
- PR #8 is Draft; the Hero implementation and desktop design are **NOT visually accepted**.
- PR #9 is a Draft archive; its Hero WebP was diagnosed as corrupted. Do not use it as a pixel-fidelity reference. Archive remediation is a separate follow-up.
- No merge to main and no production authorization.

## Design checkpoint
- Approved September overall Hero composition: night roadway/bridge, transport security worker on right, prominent three-line H1, green accent, dramatic dark glass Header and engineering panels.
- The user rejected current R2 scene quality (bridge artifacts, blur, implausible detail) and white Header styling; R2 was correctly BLOCKED before implementation.
- Selected **Leonardo image candidate #3** (GPT Image, originally attached to ChatGPT as `gpt-image-2.5-sunburst_Ultra-photorealistic_cinematic_background_image_for_a_premium_transport_security-0.jpg`) for continued graphical work. This is a **candidate**, not an accepted finished Hero background.
- Two Adobe Firefly generative attempts to write Russian PTB-M vest identification were explicitly REJECTED by the user. Do NOT use either edited derivative.
- Correct next graphics work: preserve the Leonardo original unaltered; add official PTB-M vest branding as a true editable text/vector layer, with perspective adjustment in Photoshop or equivalent. Target text: `ПТБ-М`, `ТРАНСПОРТНАЯ`, `БЕЗОПАСНОСТЬ`. Verify against official branding, do not ask image generators to spell the text.
- An approved full-resolution reference PNG on the Windows computer: `C:/Users/OC62/Downloads/Безопасность на ночной магистрали.png`, 1672x941, SHA-256 `f4fe924ce7e8846486a15c1aeec34307f3fe1fd6a40bba643d6358dd5d562eb8`. Preserve as reference; not byte-identical to PNG hash in PR #9 README.
- Mobile visual direction selected: **Cinematic Focus (variant 2)**, separate design/implementation 02B, not accepted in code.
- Approved texts: H1 `ОБЕСПЕЧЕНИЕ ТРАНСПОРТНОЙ БЕЗОПАСНОСТИ` (only ТРАНСПОРТНОЙ green); subheading `ПТБ-М оказывает комплекс услуг по защите объектов дорожного хозяйства от актов незаконного вмешательства в соответствии с требованиями законодательства.`; CTAs `Получить консультацию` -> `/contacts` and `Наши услуги` -> `/services`.
- Four approved neutral desktop tiles: `Профильная специализация`, `Комплексный подход`, `Документы`, `Открытый диалог` (texts in docs/PTBM-HERO-VISUAL-02A.md).

## Transfer limits
The selected Leonardo JPG and Adobe intermediates have **not** been added to GitHub by this handoff. They were shared in ChatGPT, not proven present in the repository. Transfer the ORIGINAL Leonardo JPG to a controlled asset location after local binary integrity checks; do not overwrite `public/images/hero-night-highway-v2.webp` without a new bounded implementation review.
Mac workstation status (root, branch, HEAD, worktree/index, applicable AGENTS.md, remote, build/test) must be checked before any new changes. Do not assume the Windows branch or working tree is already checked out on Mac.

## Mac read-only start
```bash
git fetch origin
git branch --show-current
git rev-parse HEAD
git status --short --branch
git remote -v
git log -1 --oneline origin/feature/ptbm-landing-v2-windows-20261016
```
Inspect first, then choose an isolated worktree or tracking branch without overwriting existing changes.

## Pending independent tasks
1. `PTBM-HERO-BRAND-MARK-01`: accurate editable officer identification on selected source image; visual review before site change.
2. `PTBM-HERO-VISUAL-02A-R2`: desktop Hero/Header corrections only after accepted clean scene; user visual acceptance gate.
3. `PTBM-HERO-MOBILE-02B`: separate mobile Cinematic Focus work, only after design approval.
4. `PTBM-DESIGN-ARCHIVE-REPAIR-01`: restore corrupted design archive assets with proper hashes in a separate branch/task.

No code, site image, dependencies, settings, merge or production deployment are authorized by this documentation handoff.
