# Collections and helpers

Everything here is registered in [`eleventy.config.js`](../eleventy.config.js), where each item also has an inline doc comment.

## Collections

All collections are built from the Markdown files in `src/pages/posts/` (glob `src/pages/posts/*.md`). No tag is required in front matter.

| Collection                  | Contents                                                    | Order          | Used by                                                                                |
| --------------------------- | ----------------------------------------------------------- | -------------- | -------------------------------------------------------------------------------------- |
| `collections.posts`         | Published articles                                          | Newest first   | Homepage, `/blog/`, sidebar (recent 4), prev/next, related, RSS, category/tag archives |
| `collections.featuredPosts` | Published articles with `featured: true`                    | Newest first   | Homepage hero (first 3; falls back to `posts`)                                         |
| `collections.categoryList`  | `{ name, count, slug }` per distinct category               | A-Z by name    | `/categories/` (paginated), sidebar, homepage category grid                            |
| `collections.tagList`       | `{ name, count, slug }` per distinct tag                    | A-Z by name    | `/tags/` (paginated), sidebar tag cloud                                                |
| `collections.categoryPages` | One entry per **page** of each category archive (see below) | A-Z, then page | `categories/category.ejs`                                                              |
| `collections.tagPages`      | Same as `categoryPages`, for tags                           | A-Z, then page | `tags/tag.ejs`                                                                         |

`categoryList` and `tagList` are plain arrays of objects, so `/categories/` and `/tags/` paginate them directly (12 cards / 48 tags per page).

### `categoryPages` and `tagPages`

Eleventy can only paginate one list per template, so a category archive cannot loop over categories *and* page through their posts. Instead, `eleventy.config.js` pre-splits each category's (or tag's) posts into pages of `POSTS_PER_PAGE` (6) and returns one flat entry per output page:

```js
{ name: "News", slug: "news", pageNumber: 2, totalPages: 3, posts: [/* up to 6 */], baseUrl: "/categories/news/" }
```

The archive templates paginate that list with `size: 1`, so each entry becomes one page: `/categories/news/`, `/categories/news/page/2/`, and so on. To change the page size, edit `POSTS_PER_PAGE` in `eleventy.config.js`.

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
| `build`       | `src/_data/build.js`  | `year`                                                               |
| `helpers`     | `eleventy.config.js`  | `slugify`, `readableDate`, `htmlDateString`                          |
| `collections` | Eleventy              | Built-in `all` plus the six above                                    |
