/**
 * Global data file: available in every template as `build`.
 *
 * Eleventy evaluates this once per build, so values reflect the moment the
 * site was generated, not the moment a visitor loads the page.
 *
 * @property {number} year Current year; used for the footer copyright
 *                         (`© <%= build.year %>`).
 * @property {Date} generatedAt Build timestamp; used for the RSS feed's
 *                              `<lastBuildDate>` in `feed.xml.11ty.js`.
 */
export default {
  year: new Date().getFullYear(),
  generatedAt: new Date(),
};
