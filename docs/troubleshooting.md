# Troubleshooting and known quirks

## Build problems

| Symptom                                                   | Likely cause / fix                                                                                                                                                               |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module '@11ty/eleventy'`                     | Run `npm ci` first. Requires Node.js 18+                                                                                                                                         |
| `Could not find include 'components/x.ejs'`               | Include paths resolve relative to `src/`, so write `components/x.ejs`, not `../components/x.ejs`                                                                                 |
| `ReferenceError: foo is not defined` in a template        | EJS throws on undefined variables. Guard optional inputs with `typeof foo !== 'undefined'` (see `head.ejs`)                                                                      |
| `Invalid URL` during build                                | `site.url` in `site.json` is missing or not an absolute origin (e.g. `https://example.com`). It is used in `new URL(page.url, site.url)` by `head.ejs`, the feed and the sitemap |
| `imageAlt is not defined` (or `image`/`category`/`title`) | Required front matter is missing from a post; see [Authoring posts](authoring-posts.md#front-matter-reference)                                                                   |
| A post is missing everywhere                              | The file is not directly inside `src/pages/posts/` or does not end in `.md`                                                                                                      |
| A post is missing from "Related articles"                 | The `related` slug does not match a published post filename (no `.md`), or it points to the post itself                                                                          |
| Category/tag page has URL `/categories//`                 | Its name contains only characters removed by `slugify` (non-ASCII). Use an ASCII name                                                                                            |
| Two categories share a URL                                | Names that differ only in case or punctuation slugify to the same value. Use a single spelling                                                                                   |
| New CSS not applied                                       | The stylesheet name is not in the page's `styles` list (see [Styling](styling.md))                                                                                               |
| Dev server does not rebuild after editing a component     | Restart `npm start`. `src` is watched, so this should be rare                                                                                                                    |

## Known quirks

- **Sitemap `lastmod`** is the Eleventy page date (post date or file creation date), not a real modification time.
- **`post.ejs` duplicates `base.ejs`**'s shell markup, so structural edits need to be applied twice.
