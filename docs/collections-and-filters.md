# Collections and helpers

Everything here is registered in [`eleventy.config.js`](../eleventy.config.js), where each item also has an inline doc comment.

## Collections

All collections are built from the Markdown files in `src/pages/posts/` (glob `src/pages/posts/*.md`). No tag is required in front matter.

| Collection                  | Contents                                                                  | Order        | Used by                                                                                |
| --------------------------- | ------------------------------------------------------------------------- | ------------ | -------------------------------------------------------------------------------------- |
| `collections.posts`         | Published articles                                                        | Newest first | Homepage, `/blog/`, sidebar (recent 4), prev/next, related, RSS, category/tag archives |
| `collections.featuredPosts` | Published articles with `featured: true`                                  | Newest first | Homepage hero (first 3; falls back to `posts`)                                         |
| `collections.categoryList`  | `{ name, count, slug }` per distinct category                             | A-Z by name  | `/categories/`, category archive generation, sidebar, homepage category grid           |
| `collections.tagList`       | `{ name, count, slug }` per distinct tag (a legacy `post` tag is ignored) | A-Z by name  | Tag archive generation, sidebar tag cloud                                              |

`categoryList` and `tagList` are plain arrays of objects, which lets Eleventy's pagination generate one page per entry (`size: 1`), e.g. `categories/category.ejs`.

## Helpers (EJS)

EJS has no filter pipe, so helpers are exposed as global data `helpers`:

| Call                           | Returns                            | Example                                           |
| ------------------------------ | ---------------------------------- | ------------------------------------------------- |
| `helpers.slugify(text)`        | URL-safe slug                      | `helpers.slugify("Food & Drink")` -> `food-drink` |
| `helpers.readableDate(date)`   | Display date, UTC                  | `Sep 8, 2026`                                     |
| `helpers.htmlDateString(date)` | `YYYY-MM-DD` for `<time datetime>` | `2026-09-08`                                      |

`slugify` behaviour: Unicode NFKD normalise, lowercase, replace every run of characters outside `a-z0-9` with `-`, trim dashes. Non-Latin characters (e.g. Devanagari, SJIS) are dropped, so a category made only of such characters would get an **empty slug**. Give categories and tags an ASCII name.

## Global data summary

| Name          | Source                | Contents                                                             |
| ------------- | --------------------- | -------------------------------------------------------------------- |
| `site`        | `src/_data/site.json` | Site identity, nav, social links ([Configuration](configuration.md)) |
| `build`       | `src/_data/build.js`  | `year`, `generatedAt`                                                |
| `helpers`     | `eleventy.config.js`  | `slugify`, `readableDate`, `htmlDateString`                          |
| `collections` | Eleventy              | Built-in `all` plus the four above                                   |
