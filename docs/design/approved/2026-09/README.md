# PTB-M Landing v2 — September design archive

## Purpose

This directory is the permanent GitHub design-reference archive for the PTB-M Landing v2 work started in September 2026.

The archive intentionally keeps **all supplied source mockups**, including competing variants. Selection may change during implementation by explicit user decision. Do not delete or overwrite an older source simply because a later variant is preferred.

## Canonicality rule

Visual source-of-truth order:

1. User-supplied design source preserved in this archive.
2. Explicit user selection/correction associated with that source.
3. Real PTB-M assets in the repository.
4. Implementation candidate rendered from the design.
5. Text-only reconstruction only when no visual source exists.

An implementation is **not canonical merely because it is coded, committed, tested, pushed, or deployed to Preview**. It becomes accepted only after explicit user visual approval.

## Important Hero correction

Draft PR #8 and commit `396f7a5cdfd923ec15280c4ca3c55b857d173969` remain:

**NON-CANONICAL IMPLEMENTATION CANDIDATE — USER VISUAL ACCEPTANCE PENDING.**

The supplied Hero mockup is the visual reference. The user later corrected its large heading to:

`ОБЕСПЕЧЕНИЕ ТРАНСПОРТНОЙ БЕЗОПАСНОСТИ`

The phrase `ОБЪЕКТОВ ДОРОЖНОГО ХОЗЯЙСТВА` must not appear in the large heading.

## Supplied source set

The files under `sources/` are normalized WebP archive previews derived from the user-supplied PNGs so the visual references are permanently visible inside GitHub. They are **not byte-identical replacements for the uploaded PNG originals**. The SHA-256 of each original PNG is recorded below so a future raw-original import can be verified exactly.

| Area | Repository preview | Current design status | Original uploaded file | Original SHA-256 | Preview SHA-256 |
| --- | --- | --- | --- | --- | --- |
| Hero | `sources/hero-source-01.webp` | Current visual reference; heading correction applies | `Безопасность на ночной магистрали (1).png` | `c76977ae87656d189e0de39a61b4970d8131f9a9ef6829a7150eab1015f65f3d` | `26ff7bbd8da3a3d1966b26abe24282a1fade35d581de0fb5a24e709e7b10aab4` |
| Preloader | `sources/preloader-source-scan.webp` | Preserved candidate/source; final choice may be revisited | `Изображение ChatGPT 16 окт. 2026 г., 11_43_20.png` | `68b25b0016f3586f4a93710c272c89241fe9c6ac0e9f16e184e1e1568a5b7478` | `844f50f7ce3821a085b0a0054e43a11ffc2a1504a65588d947b3761fbedd0cd5` |
| Services source A | `sources/services-source-a.webp` | Preserve; compare/use in hybrid | `Услуги транспортной безопасности ПТБ‑М(1).png` | `5e123584976c11b710ccfeefc6ca07ed9177b3df8e940651f3a47eb0dd39f133` | `6b95ccaf83d764601a3b809c1a8c0c096fd04472b7125ca11f61bf43b6e1cb88` |
| Projects / Experience | `sources/projects-source-a.webp` | Current selection: Variant A; may evolve by user decision | `Проекты транспортной безопасности(1).png` | `ef33706a3e95b9e5778a44becbc3888f2a9e5cc8b669fbf82c7c87f5dbb27a84` | `7d952d55e23a9298dfcbcc7a0fc19d3ff918f6956056c97c933296b554b83c2a` |
| Services source B | `sources/services-source-b.webp` | Preserve; compare/use in hybrid | `Комплексная транспортная безопасность ПТБ-М(4).png` | `ac4cd6db4a95aad4b2a3f0614983af9f5ccf75559e52e811f290a0b24a0c7845` | `290b438853ea88bda87899d61e9b75ed483d7a5b4d6b0409002206b26bb0f36e` |
| Documents variants board | `sources/documents-variants-board.webp` | Current selection: Variant A; full board preserved | `Сравнение вариантов страницы документов ПТБ-М(1).png` | `d3f041e5b4374a59aea64027a72a808a198af87fda0511ae22a5ba731d4536bf` | `3830b5c9a6910546b18fe4ce6a711a1352962ebde41522eb94d3ff58566f9dab` |
| About variants board | `sources/about-variants-board.webp` | Current selection: Variant C; full board preserved | `Три варианта страницы «О компании» ПТБ‑М(1).png` | `2b6ebd707d7ab8c99f554432999b4c584f5dc7d79c5117cd7bc31273f7f0132c` | `5f5a662411efccf93dabc36ea820cbbb0c101ddbbbd46231fe2e7d4cab4d7970` |

## Services decision

There are intentionally two source mockups. Do not collapse them prematurely.

Previously discussed direction:
- calmer overall structure from the first preferred option;
- card treatment from the later/penultimate preferred option;
- avoid dense card grids and visual noise.

Final implementation may combine or revise these sources after direct comparison.

## Design gaps to complete later

No source image from the current supplied batch is archived yet for:

- Contacts / consultation form / Footer;
- Careers / Vacancies;
- Junior athletes / social responsibility block.

These are **DESIGN GAPS — TO COMPLETE**, not permission to invent a final design silently.

## Factual-content rule

Mockup composition and mockup text are separate concerns. AI-generated incidental details are not factual evidence.

Do not publish a road, region, customer, contract, quantity, result, certificate, license, staff count or project statistic solely because it appears in a mockup.

## Change policy

Design evolution is allowed. When the user changes a choice:

- keep the prior source;
- add the new source as a new file/version;
- record the new selection in this README;
- do not rewrite history;
- implementation acceptance remains a separate explicit gate.

## Raw-original follow-up

The current GitHub archive contains permanent normalized previews plus cryptographic hashes of the uploaded originals. A later bounded task may add the raw original PNG bytes and verify them against the hashes above. Until that happens, do not claim the repository previews are byte-identical originals.
