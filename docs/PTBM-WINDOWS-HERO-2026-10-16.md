# PTBM Windows — Hero slice, 2026-10-16

## Baseline and scope

- Accepted baseline: f9b3a53eceb05b7958ed5f97a6f56fde539d91d6.
- Branch: feature/ptbm-landing-v2-windows-20261016. Historical local main remains 8b147f7.
- User authorized git revert --quit to remove an unfinished historical sequencer; no files or HEAD were reset.
- Vercel browser verification: production Ready at f9b3a53; Require Log In enabled; All Deployments selected. No settings changed. Connector API returned 403; browser session supplied read-only evidence.
- Only Hero.jsx and its new scoped CSS module change product behavior. No Mac changes imported.

## Approved-screen gap audit (read-only)

All sections are composed by src/app/HomePageContent.js. Route pages reuse existing sections.

| Screen | Route/component | Available assets | Gap / next task |
| --- | --- | --- | --- |
| Hero | /, sections/Hero.jsx | images/bg_Hero.webp; preloader.png; logo.webp | Old blue presentation and different copy. This slice implements the approved text and colors. Original photo variant 2 absent. |
| Preloader | ui/HeroPreloader.jsx (not used by current Hero) | preloader.png; preloadimg/preloader1–9.png; videos/backgroundanime.webm | Old progress bar, percentages and dots; separate implementation required. Preserve baseline SSR without timer gates. |
| Services | /services, sections/ServicesGrid.jsx, #services | Existing icons | Equal cards; no dominant core service; equipment sales copy needs separate correction. |
| Experience | /cases, sections/CasesSlider.jsx, #cases | Main_Bus_Station.webp; Rost_Sea.webp; bg_Hero.webp | Unsupported 85%, 90%, savings claims; factual contracts task required before publication. |
| Documents | /licenses, sections/Licenses.jsx, #licenses | vypiska.webp; Licenses.webp | Both supplied document numbers present; register layout missing; authenticity/current validity not reverified. |
| About | /about, sections/About.jsx, #about | team.webp; team1–8.webp | Old styling and quantitative claims require a separate slice/content review. |
| Contacts/form/footer | /contacts, sections/ContactForm.jsx, layout/Footer.jsx | Existing contacts/form | Old styling; consent/legal P1 remains separate; no submissions made during Hero testing. |
| Careers | /careers, sections/Careers.jsx, #careers | Existing listings | Variant A source absent; factual vacancies need confirmation. |
| Junior sports | /community, sections/CommunitySupport.jsx, #community | team-football.webp | Variant A source absent; photo/caption permissions and facts need verification. |
| Navigation | layout/Header.jsx | preloader.png | Current menu differs from approved five items; separate Header slice. |

## Hero readiness and visual assumptions

READY for bounded implementation; pixel-perfect agreement with variant 2 cannot be claimed without its original reference. Existing bridge photograph reused without identifying it as a verified PTBM contract. Graphite overlay and three-line composition are implementation assumptions. No new imagery or company facts introduced.

Logo green #00be01 is the most frequent saturated green RGB value sampled from existing public/images/preloader.png using installed sharp. Tokens are scoped to Hero to avoid recoloring unrelated screens. One visible semantic H1 contains the exact approved wording; only TRANSPORTNOY is green. Exact approved subheading and both CTA labels retained. Links target existing /contacts and /services routes. No Hero motion, timers or loader; reduced-motion users receive the same static content. Focus outline and 56px minimum CTA height included.

## Verification

Final local evidence is recorded below. Node 24.11.0 is the only installed version; Node 22 CI parity must be confirmed by GitHub Actions. No system runtime changed.

## Remaining boundary

This checkpoint is not an accepted release. Stop before any subsequent visual slice. No merge, production deployment, DNS or authentication changes authorized or performed. Legal/privacy P1 and unsupported legacy content remain outside this slice; retain site protection.

## Final local evidence

- npm ci --no-audit --no-fund --prefer-offline: PASS, 537 packages; initial audit-enabled installation stalled on registry requests and was stopped before retry. Manifest and lockfile unchanged; installed Next PostCSS is 8.5.23.
- CI unit command (all four test files): PASS, 32/32.
- npx --no-install eslint .: PASS.
- npm run build: PASS, all 17 static pages generated under Node 24.11.0. Existing browser-data age warnings only.
- git diff --check: PASS (Git warns about automatic LF/CRLF conversion).
- Prerendered .next/server/app/index.html: exact H1 present before JS; SSR assertion PASS.
- Real in-app browser, production server 127.0.0.1:3100: desktop 1440x900, mobile 390x844 and narrow 320x700; no Hero horizontal overflow; CTA links render at 56px border-box height. Both links navigate to existing services/contact pages.
- Keyboard Tab from first CTA reaches second CTA with computed 3px solid focus outline.
- No Hero animation or delayed visibility is present; reduced-motion path is static by construction.
- Browser logs: no hydration error observed. Existing SmartCaptcha rejects localhost host; form submission NOT tested and host allowlist NOT changed. This is an environment limitation outside Hero scope, not a complete contact-flow PASS.
- Independent read-only reviewer: no P0/P1/P2 findings in exact Hero JSX/CSS diff; requested SSR check completed above. No other screen approved by this review.
- Visual evidence saved outside Git under the task visualization directory: ptbm-hero-desktop.jpg and ptbm-hero-mobile.jpg.

## Preservation and next slice

Commit is a review checkpoint awaiting visual acceptance, not a production release. Feature-branch push and draft PR only. GitHub Actions (Node 22) and automatic protected Preview status are reported in the chat after remote verification. Stop here before Header/Preloader or any other visual slice. Suggested next bounded task: Header navigation, after acceptance of Hero; Preloader remains separate and must not block SSR content.

For later Mac synchronization: git fetch origin, inspect origin/feature/ptbm-landing-v2-windows-20261016, then choose a local tracking branch. No operation on the Mac experiment performed today.
