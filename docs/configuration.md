# Configuration

There are three places to configure the site: `src/_data/site.json` (content/identity), `src/_data/build.js` (build-time values), and `eleventy.config.js` (build behaviour, documented inline and in [Collections & filters](collections-and-filters.md)).

## `src/_data/site.json` (global `site`)

Available in every template as `site`. JSON has no comments, so every key is documented here.

| Key             | Type                         | Used by                                                  | Notes                                                                                                                                                                                                      |
| --------------- | ---------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`         | string                       | `<title>` suffix, logo `alt`, footer, RSS, JSON-LD       | Site name                                                                                                                                                                                                  |
| `description`   | string                       | Default meta/OG description, homepage hidden `<h1>`, RSS | Fallback when a page has no `metaDescription` / `excerpt`                                                                                                                                                  |
| `url`           | string                       | Canonical URLs, Open Graph, RSS, sitemap, `robots.txt`   | **Production origin, no trailing slash.** All absolute URLs are built from it, so a wrong value breaks canonicals and the sitemap                                                                          |
| `language`      | string                       | `<html lang>`, RSS `<language>`                          | BCP 47 code, e.g. `en`                                                                                                                                                                                     |
| `author.name`   | string                       | Sidebar, post meta, JSON-LD, avatar `alt`                | Author of every post (there is no per-post override)                                                                                                                                                       |
| `author.bio`    | string                       | Sidebar author card                                      | Plain text                                                                                                                                                                                                 |
| `author.avatar` | string                       | Sidebar and post/card meta                               | Path under `/assets/images/`                                                                                                                                                                               |
| `nav[]`         | list of `{label, url}`       | Header navigation (`header.ejs`)                         | Order = display order. `/` is active only on the homepage; other items are active for any URL starting with their `url`                                                                                    |
| `social[]`      | list of `{label, url, icon}` | Footer icons (`footer.ejs`)                              | `icon` is a Font Awesome **4** icon name without the `fa-` prefix (`github`, `linkedin`, `envelope`, `rss`, ...). Links open in a new tab, so an internal link such as `/feed.xml` also opens in a new tab |

### Recipes

- **Add a menu item:** append `{ "label": "About", "url": "/about/" }` to `nav` and create a page whose permalink is `/about/`.
- **Add a social link:** append `{ "label": "Mastodon", "url": "https://…", "icon": "mastodon" }`. Check the icon exists in Font Awesome 4.7 ([cheatsheet](https://fontawesome.com/v4/icons/)); brand icons added after 4.7 (for example X) are not available.
- **Move to a new domain:** change only `url`.

## `src/_data/build.js` (global `build`)

Evaluated once per build.

| Key          | Type   | Meaning                                     |
| ------------ | ------ | ------------------------------------------- |
| `build.year` | number | Current year, used for the footer copyright |

## `eleventy.config.js`

| Section          | What it configures                                                               |
| ---------------- | -------------------------------------------------------------------------------- |
| Passthrough copy | `src/assets` -> `public/assets` (not processed)                                  |
| Watch target     | `src` is watched in dev so component/layout/data edits rebuild                   |
| EJS setup        | Include resolution relative to `src/`; plugin registration                       |
| Helpers          | See [Collections & filters](collections-and-filters.md)                          |
| Collections      | `posts`, `featuredPosts`, `categoryList`, `tagList`, `categoryPages`, `tagPages` |
| Return object    | Directories and template engines (see [Architecture](architecture.md))           |

## `package.json` scripts

| Script          | Command                    | Purpose                                                                                                                  |
| --------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `npm start`     | `eleventy --serve`         | Dev server with live rebuild                                                                                             |
| `npm run build` | `eleventy`                 | Production build to `public/`                                                                                            |
| `npm run debug` | `DEBUG=Eleventy* eleventy` | Verbose Eleventy logging. This inline `VAR=value` syntax works in macOS/Linux/Git Bash, not in Windows PowerShell or cmd |

Requires Node.js 18 or newer (`engines` in `package.json`).

## `.eleventyignore` and `.gitignore`

- `.eleventyignore` is a safety net: Eleventy only reads `src/pages` (the `input` directory), so files elsewhere such as `README.md`, `docs/`, `documentation/` and `html_template/` are not built anyway. It currently lists `README.md`, `documentation/`, `html_template/`, `.reference-11ty-ejs-boilerplate/`, `node_modules/` and `public/`; `docs/` is not listed because it is already outside `src/pages`. It matters only if the input directory is ever widened.
- `.gitignore` excludes `node_modules/`, `public/`, `.DS_Store`, and `.env`.
