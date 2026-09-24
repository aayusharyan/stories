# Templates: layouts, components, pages

Every file also starts with a `<%# ... %>` comment describing its inputs; this page is the overview. In EJS, `<%= x %>` prints escaped text, `<%- x %>` prints raw HTML, and `<% code %>` runs JavaScript.

## Layouts (`src/layouts/`)

| File       | Used by                               | Behaviour                                                                                                                                         |
| ---------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `base.ejs` | Homepage, blog, categories, tags, 404 | `<head>`, header, `<main id="main-content">{content}</main>`, footer, scripts.                                                                    |
| `post.ejs` | Every Markdown article                | Standalone layout (does **not** extend `base.ejs`): page title banner, hero image, meta, body, tags, related articles, newer/older links, sidebar |

Because `post.ejs` duplicates the shell markup of `base.ejs`, apply structural changes (skip link target, scripts, etc.) to both.

## Components (`src/components/`)

| Component              | Include call                                       | Inputs                                                   | Used in                                     |
| ---------------------- | -------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------- |
| `head.ejs`             | inside `<head>`                                    | `pageTitle`, `metaDescription`, `styles`, `vendorStyles` | both layouts                                |
| `header.ejs`           | (none)                                             | `site.nav`, `page.url`                                   | both layouts                                |
| `footer.ejs`           | (none)                                             | `site.social`, `build.year`                              | both layouts                                |
| `scripts.ejs`          | optional `vendorScripts`, `scripts` (front matter) | -                                                        | both layouts                                |
| `page-title.ejs`       | `{ heading, parentLabel?, parentUrl? }`            | see left                                                 | post layout, blog, categories, tags         |
| `post-card.ejs`        | `{ post, horizontal? }`                            | collection item                                          | homepage (vertical), archives (horizontal)  |
| `related-articles.ejs` | `{ relatedPosts }`                                 | array of posts                                           | post layout                                 |
| `sidebar.ejs`          | optional `{ sidebarCategories }` (category names)  | `site.author`, `collections.*`                           | post layout, blog, category, tag            |
| `pagination.ejs`       | optional `pager: { current, total, baseUrl }`      | Eleventy `pagination`, or `pager` when given             | blog, category/tag archives and directories |

### How CSS is chosen per page

`head.ejs` always loads bootstrap, font-awesome, `base.css`, `header.css` and `footer.css`. Everything else is opt-in through the page's front matter `styles` list (names of files in `src/assets/css/` without `.css`). If you add a component that needs styles, add its stylesheet name to the `styles` of every page that includes it. `vendorStyles` takes full URLs and loads before the site CSS.

## Pages (`src/pages/`)

See the inventory in [Architecture](architecture.md#page-inventory). Notable patterns:

- **Pagination** (`blog/index.ejs`): Eleventy splits `collections.posts` into pages of 6. The items are exposed as `posts`; the `permalink` is an EJS expression giving `/blog/` for page 1 and `/blog/page/N/` afterwards.
- **Generated archives** (`categories/category.ejs`, `tags/tag.ejs`): paginate `categoryPages` / `tagPages` with `size: 1`. Each entry is one page of one category/tag (built in `eleventy.config.js`, see [Collections & filters](collections-and-filters.md#categorypages-and-tagpages)), so archives get `/page/N/` URLs. They pass `pager` to `pagination.ejs`. `eleventyComputed` builds per-page titles because plain front matter cannot use the loop variable.
- **Directories** (`categories/index.ejs`, `tags/index.ejs`): paginate `categoryList` / `tagList` directly (12 / 48 per page) with the same permalink pattern as `/blog/`.
- **JS templates** (`feed.xml.11ty.js`, `sitemap.xml.11ty.js`): export `data` (front matter) and `render()`. Documented with JSDoc.
- **Excluded from collections** (`404`, `robots.txt`, feed, sitemap): `eleventyExcludeFromCollections: true` keeps them out of `collections.all`, and therefore out of the sitemap.

## Common tasks

- **Add a new static page** (e.g. About): create `src/pages/about.ejs` with `layout: base.ejs`, `pageTitle`, `permalink: /about/index.html`, and `styles: [page-title]`; use `components/page-title.ejs` for the banner. Add it to `site.nav` if it should be in the menu.
- **Change how many posts per page:** `pagination.size` in `pages/blog/index.ejs`; for category/tag archives, `POSTS_PER_PAGE` in `eleventy.config.js`.
- **Change how many categories/tags per directory page:** `pagination.size` in `pages/categories/index.ejs` / `pages/tags/index.ejs`.
- **Change how many posts on the homepage:** `slice(0, 6)` in `pages/index.ejs`. The hero uses `slice(0, 3)`.
- **Change recent posts in sidebar:** `slice(0, 4)` in `components/sidebar.ejs`.
- **Change sidebar category/tag limits:** the sidebar shows the 8 most-used categories and 15 most-used tags (`slice(0, 8)` / `slice(0, 15)` in `components/sidebar.ejs`), with links to `/categories/` and `/tags/`. A post can choose its own sidebar categories with `relatedCategories` (see [Authoring posts](authoring-posts.md)).
