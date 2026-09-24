# JavaScript

Front-end scripts live in `src/assets/js/` and `src/assets/plugins/` and are copied as-is (no bundling). They are loaded at the end of `<body>` by `src/components/scripts.ejs` in this order:

1. `jquery-1.12.1.min.js`
2. `bootstrap.bundle.min.js` (Bootstrap 4 JS including Popper)
3. The page's `vendorScripts` (front matter, full URLs), e.g. `plugins/owl-carousel/owl.carousel.min.js` on the homepage
4. `scripts.js`, the shared theme behaviour (documented inline)
5. The page's `scripts` (front matter, names of files in `src/assets/js/` without `.js`), e.g. `banner` on the homepage

`vendorScripts` and `scripts` work like `vendorStyles` and `styles` in `head.ejs`: optional arrays, duplicates removed. Pages that don't set them load only steps 1, 2 and 4.

## `scripts.js` sections

The file is the BizBlog theme script wrapped in one jQuery IIFE. Each section is annotated in the source.

| Section             | Does                                                                  | Status on this site               |
| ------------------- | --------------------------------------------------------------------- | --------------------------------- |
| 01 Background image | Converts `data-bg-img` attributes to CSS backgrounds                  | **Active**: horizontal post cards |
| 02 Image to SVG     | Inlines `img.svg` files as `<svg>`                                    | **Active**: mobile menu icon      |
| 04 Navbar           | Sticky header on scroll; mobile menu toggle                           | **Active**                        |
| 08 Back to top      | Shows `.back-to-top` after 400px scroll; smooth scroll on click       | **Active**                        |

The homepage carousel (original section 05) lives in its own file, `banner.js`: the main slider plus a synced pager (`syncPosition`, `syncPosition2`). Only `pages/index.ejs` loads it, together with Owl Carousel.

Sections 03, 06, 07 and 09 of the original theme (sub-menus, video popups, generic Owl defaults, AJAX contact form) were removed because nothing on this site uses them.

## Known quirks

- **jQuery 1.12** is old. It is only used by the theme scripts; be careful adding code that relies on newer jQuery APIs.
- **Load order matters.** `vendorScripts` must load after jQuery and before the page's own `scripts`; `scripts.ejs` guarantees this.

## Adding your own JavaScript

For code needed by one page, create a file in `src/assets/js/` (e.g. `gallery.js`) and list it in that page's front matter with `scripts: [gallery]`; add any plugin it needs under `vendorScripts`. For code needed on every page, add it to `scripts.js`. jQuery and Bootstrap are already loaded above both.
