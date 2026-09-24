# Project documentation

Maintainer documentation for the Stories blog (source of [stories.yush.dev](https://stories.yush.dev)).
The top-level [README](../README.md) covers running and deploying the site; these pages explain **what each part does and why**, so you can find the right file quickly months from now.

| Document                                            | Read it when you want to...                                                 |
| --------------------------------------------------- | --------------------------------------------------------------------------- |
| [Architecture](architecture.md)                     | Understand the build pipeline, folder layout, and how a page is assembled   |
| [Authoring posts](authoring-posts.md)               | Write or edit an article; full front matter reference                       |
| [Configuration](configuration.md)                   | Change site title, navigation, social links, author, or build settings      |
| [Collections & filters](collections-and-filters.md) | Know what data (`collections.*`, `helpers.*`) templates can use             |
| [Templates](templates.md)                           | Look up a layout, component, or page: inputs, outputs, and where it is used |
| [Styling](styling.md)                               | Find which stylesheet controls which part of the UI                         |
| [JavaScript](javascript.md)                         | Understand the front-end scripts and what is active or dormant              |
| [Troubleshooting](troubleshooting.md)               | Fix a build error or unexpected behaviour; known quirks                     |

## Documentation conventions

- **In-code documentation** is the source of truth for details: `eleventy.config.js` and the `.11ty.js` templates use JSDoc, EJS files start with a `<%# ... %>` comment block (invisible in the output), and each site-specific stylesheet (everything except the vendored Bootstrap and Font Awesome) starts with a comment saying which templates use it. JSON cannot hold comments, so [`src/_data/site.json`](../src/_data/site.json) is documented in [Configuration](configuration.md).
- Paths are relative to the repository root unless stated otherwise.
- `documentation/` and `html_template/` at the repository root belong to the original BizBlog theme download. They are reference material only, are ignored by Eleventy (see `.eleventyignore`), and are unrelated to this `docs/` folder.
