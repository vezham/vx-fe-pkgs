# HeroUI source audit

Compared with the local HeroUI checkout at revision
`b2c65a5b5236550526f23d475b1ad0c6e5eab1a2`.

Run the repeatable content audit from the workspace root:

```sh
node apps-docs/developers/scripts/audit-heroui-docs.mjs /path/to/heroui/apps/docs
```

The audit checks page and navigation-file coverage, prose, headings, frontmatter,
preview attributes, gallery groups and media URLs, registered demos, displayed source versus executable source,
the supported MDX component names, and the original licenses. It fails on an
unexpected difference. It accepts the documented route rewrites and the conversion
of upstream status icons to status metadata.

## Coverage

| Area                                       |                    Count |
| ------------------------------------------ | -----------------------: |
| English pages                              | 256 (179 Web, 77 Native) |
| Navigation metadata files                  |                        9 |
| Preview instances                          |                      820 |
| Registered executable demos                |                      707 |
| Pages with resource links                  |                      119 |
| Pages with New, Updated, or Preview status |                       26 |
| Custom MDX component names                 |                       21 |
| Gallery tiles                              |  112 (73 Web, 39 Native) |

No missing pages, prose, headings, resource metadata, preview source, or original
licenses were found. The audit does not establish visual or behavioral parity;
the browser tests cover representative interactive pages separately.

## Corrected integration omissions

- Preview `minHeight`, alignment, solid backgrounds, and containment styles now
  survive import and reach the live preview. Placeholder `href="#"` links no
  longer move the documentation page.
- Color examples render separate light/dark collections, hover and soft tokens,
  form-field states, tooltips, and copyable computed colors.
- Related-component cards use the upstream relationship registry and local,
  locale-aware routes. Related showcases use the upstream registry and link to
  the original site instead of displaying a generic gallery link.
- Component catalogs and related components use the upstream light/dark preview
  images with labels instead of description-only cards. Catalogs retain the
  explicit source ordering, responsive media/label placement, and status chips.
  Native catalogs use theme-aware videos, including the SkeletonGroup override.
- Documentation images retain their destination links, wrappers, aspect ratios,
  and theme-specific sources. Videos retain posters, sizing, and playback props.
- Component pages, release videos, and Native gallery previews share a 16:9
  player with custom play/pause, mute, and restart controls. Nearby videos load
  their first frame; desktop autoplay follows viewport visibility, while mobile
  and reduced-motion viewers can start playback manually.
- New, Updated, and Preview metadata survives schema validation and appears in
  page titles and component catalogs. Preview is no longer requested as a CDN icon.
- Release pull-request metadata and introduction social-image metadata are
  preserved. Release attribution links to the matching pull request.
- Native videos and release notes offer the source site's actual app deep links
  and store destinations.
- Sidebar icons use bundled Vezham equivalents instead of requesting unsupported
  upstream names from the generic icon CDN.
- The referenced Apache-2.0 license files are restored alongside the copied
  documentation and demo sources.

The earlier resource-chip, line-number, spacing, and expand/collapse fixes remain
part of the shared documentation presentation.

## Remaining differences from the upstream site

- Chinese routes intentionally reuse English content and demos, as requested.
- The app retains the Vezham notebook shell, search, account controls, page
  actions, and Pro-style Preview/Code switcher. HeroUI marketing navigation,
  newsletter subscriptions, and hosted showcase applications are not imported.
- Native previews use videos and links to the hosted HeroUI Native app. The
  upstream QR-code popovers are not reproduced locally.
- The Native ScrollShadow gallery tile uses its light recording in both themes:
  the upstream dark recording URLs return 403.
- Release attribution links to the source pull request. The upstream live
  GitHub contributor-avatar fetch is not reproduced locally.
- Long inline `CollapsibleCode` examples use the local expandable details
  presentation. Color copying retains the browser's valid computed CSS color
  representation rather than converting every value to OKLCH.
- Status chips appear in titles and catalogs; the notebook sidebar retains its
  existing navigation presentation.

These differences should remain explicit when assessing parity. The audit script
checks the imported documentation contract, not all marketing-site features or
every upstream screenshot.

## Verification

- Source audit: no unexpected differences across the coverage listed above.
- Nx lint, type checking, and production build passed; all 22 unit tests passed.
- Chromium coverage includes decoded video frames, advancing playback time,
  play/pause, mute, restart, viewport pausing, theme changes, and mobile playback,
  alongside gallery image loading, theme variants, source ordering,
  desktop/mobile placement, locale links, Native video URLs, local demos,
  numbered source, Preview/Code navigation, code scrolling,
  and stable Show more/Show less controls. All nine Chromium scenarios passed.
- Production browser checks at desktop and mobile widths passed for color
  copying, light/dark tokens, related content, release attribution, linked images,
  social metadata, and Native video/app links, with no page runtime errors.
