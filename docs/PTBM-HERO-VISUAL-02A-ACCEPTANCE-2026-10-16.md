# PTBM-HERO-VISUAL-02A — User Visual Acceptance

Date: 2026-10-16 (Europe/Moscow)
Status: **USER VISUALLY ACCEPTED — DOCUMENTED**
Scope: **Hero implementation in PR #8 only**; no release authorization.

## Decision and provenance

On 2026-10-16 the user explicitly stated in the PTB-M Landing project chat: **"Текущую реализацию принимаю"** and then authorized documenting that decision ("go"). This supersedes the **historical pending/rejected visual-acceptance status** in earlier handoff and 02A reports **only for the current PR #8 Hero implementation**. Preserve the earlier reports as accurate records of the status at the time; do not silently rewrite the history.

Canonical accepted implementation baseline at decision time:

- Repository: `OC62/ptb-m-landing-nextjs`.
- PR: [#8 — Landing v2: Desktop Hero fidelity — 02A](https://github.com/OC62/ptb-m-landing-nextjs/pull/8).
- Implementation branch: `feature/ptbm-landing-v2-windows-20261016`.
- Accepted commit (pre-acceptance-documentation): `300c8db4be8320438b84dd49101d4369c3e3efe8`.
- PR base: `main`; PR was **Open / Draft / unmerged** at the check.
- Approved September reference PNG SHA-256: `f4fe924ce7e8846486a15c1aeec34307f3fe1fd6a40bba643d6358dd5d562eb8`.
- The user-approved decision refers to the existing Hero rendition, **not** an unimplemented parallax, an Adobe/Figma composite, or a new image replacement.

## Verified evidence before this documentation change

- GitHub PR #8 head: `300c8db4`; reported mergeable (not permission to merge).
- GitHub check run `Verify`: success; `Vercel Preview Comments`: success.
- Legacy Vercel commit status: success.
- Current GitHub Actions CI workflow on the accepted commit: completed/success.
- `docs/PTBM-HERO-VISUAL-02A.md` records 32/32 tests, ESLint PASS, production build PASS, prerendered Hero, desktop and mobile layout checks, CTA navigation and keyboard focus; its independent reviewer reported no blocking findings within that bounded Hero scope. These are **historical recorded local verifications**, not a fresh local Mac rerun.
- No GitHub PR review submission was found at the check; local independent-review evidence in 02A report is not a GitHub approval.

## Acceptance boundaries

**Accepted by user:** the current Hero visual implementation represented by PR #8 at the baseline above. Do not withhold this accepted scope pending an optional image/parallax redesign.

**Not included in this acceptance:**

- Merge of PR #8 to `main`, promotion from Draft, Vercel production deployment, DNS, settings or access/protection changes.
- Separate mobile `Cinematic Focus` redesign / `PTBM-HERO-MOBILE-02B`; no claim that that design has been implemented.
- Historical white shared Header discrepancy and further Header alignment.
- Accurate editable PTB-M vest marking and layered Photoshop assets: visual prototype accepted separately in ChatGPT/Figma, **not in the website code in this PR**.
- Background inpainting artifact recovery or adoption of the Leonardo candidate; no authorized replacement of `public/images/hero-night-highway-v2.webp`.
- Parallax animation; **not present** in the accepted PR implementation.
- Correcting unsupported claims, pre-existing legal/privacy/content issues, damaged PR #9 design archive, unrelated services/components.
- Site-wide accessibility certification, contact-form CAPTCHA submission in production, or full production-release acceptance.

## PR #8 readiness conclusion

**USER VISUAL GATE: PASS.** Original implementation test/CI gate: PASS as recorded for SHA `300c8db4`.

**MERGE / RELEASE GATE: NOT REQUESTED AND NOT AUTHORIZED.** Keep Draft and protections unchanged. The docs-only acceptance commit itself may trigger new GitHub checks; verify the new HEAD checks separately before any future PR readiness decision. Review site-wide/deployment prerequisites as a separately authorized bounded stage if and when release is requested.

## Independent follow-ups (not part of this documentation task)

1. `PTBM-HERO-PARALLAX-ARCH-01`: design specification exists outside the GitHub branch; treat offsets as proposals, not accepted animation. Before implementation, independently validate the separated officer/background asset quality and mobile/reduced-motion behaviour.
2. `PTBM-HERO-PARALLAX-IMPLEMENT-01` (future, separate explicit authorization): implement subtle desktop motion, officer and vest label moving together, no UI movement, static mobile/reduced-motion path, viewport and performance tests; preserve a rollback path.
3. `PTBM-HERO-MOBILE-02B`: separate proposed mobile composition; do not silently blend into desktop acceptance.
4. `PTBM-HERO-HEADER-ALIGNMENT`: separately decide whether and when to update the white shared Header.
5. `PTBM-DESIGN-ARCHIVE-REPAIR-01`: independently remediate corrupt PR #9 hero source; do not treat it as canonical.
6. Site-wide legacy content/privacy/claims follow-ups remain open, independent of Hero visual acceptance.

## STOP

This acceptance artifact is documentation only. No implementation code, dependency, image, merge, push from local Mac, environment setting or production deployment is authorized by it.
