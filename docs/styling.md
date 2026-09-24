# Styling

Plain CSS, served unmodified from `src/assets/css/` (no preprocessor or bundler). Each stylesheet starts with a comment naming the templates that use it.

## Stylesheet map

| File                   | Scope                   | Loaded                                   | Controls                                                                                       |
| ---------------------- | ----------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `bootstrap.min.css`    | Vendor (Bootstrap 4)    | Every page                               | Grid, utilities (`.container`, `.row`, `.col-*`, `.d-flex`, `.text-center`, ...)               |
| `font-awesome.min.css` | Vendor (Font Awesome 4) | Every page                               | Icons (`fa fa-*`); the font files are in `assets/fonts/`                                       |
| `base.css`             | Global                  | Every page                               | Resets, typography, spacing helpers (`.pt-120`, `.pb-90`, ...), buttons, forms, section titles |
| `header.css`           | Global                  | Every page                               | Header, sticky bar, navigation, mobile menu, skip link                                         |
| `footer.css`           | Global                  | Every page (last)                        | Footer and back-to-top button                                                                  |
| `banner.css`           | Homepage                | `index.ejs`                              | Hero carousel and pager                                                                        |
| `home.css`             | Homepage                | `index.ejs`                              | "Explore by category" grid                                                                     |
| `post-card.css`        | Cards                   | Homepage, blog, category, tag            | Vertical and horizontal article cards                                                          |
| `post.css`             | Article                 | `post.ejs`                               | Article page, `.post-content` typography, tags, related articles, newer/older nav              |
| `sidebar.css`          | Sidebar                 | Article, blog, category, tag             | Author, recent posts, categories, tag cloud                                                    |
| `page-title.css`       | Component               | Article, blog, category, tag, categories | Page banner and breadcrumb                                                                     |
| `categories.css`       | Page                    | `categories/index.ejs`                   | Category directory cards                                                                       |
| `tags.css`             | Page                    | `tags/index.ejs`                         | Tag directory chips                                                                            |
| `not-found.css`        | Page                    | `404.ejs`                                | 404 layout                                                                                     |

Load order in `head.ejs`: bootstrap, font-awesome, `vendorStyles` (e.g. Owl Carousel), `base`, `header`, the page's `styles`, `footer`.

## Conventions

- **Add a component style:** create `src/assets/css/<name>.css` with a header comment, then add `<name>` to the `styles` list in the front matter (or the `styles` argument to `head.ejs` in `post.ejs`) of each page that needs it.
- **Global changes** (fonts, colours, spacing helpers) go in `base.css`.
- **Responsive breakpoints** follow Bootstrap 4: 575px, 767px, 991px (plus 1400px and a few others for the theme's side padding).

## Fonts

- IBM Plex Sans is the heading and display face. Its normal (weights 400–700) and italic (weights 400–500) variable WOFF2 files are self-hosted in `src/assets/fonts/`; the `@font-face` declarations and `--font-heading` stack live in `base.css`.
- Quicksand is the body face. Its variable WOFF2 files (weights 300–500) are self-hosted in `src/assets/fonts/`; the `@font-face` declarations and `--font-body` stack live in `base.css`.
- Font Awesome 4 is loaded from `assets/fonts/` (referenced by `font-awesome.min.css`).
