# OpenACR Editor

With this tool, people can generate Accessibility Conformance Report in the [OpenACR](https://github.com/GSA/openacr) format.

## W3C Web Accessibility Initiative (WAI) Reporting Tools

This software includes builds on the work from the WAI's [ATAG Report Tool (ART)](https://github.com/w3c/wai-atag-report-tool) and [WCAG-EM Report Tool](https://github.com/w3c/wai-wcag-em-report-tool/). Copyright © 2021 W3C® (MIT, ERCIM, Keio, Beihang).

[W3C Software notice and license](https://www.w3.org/Consortium/Legal/copyright-software).

## Development

This application is built with [Svelte](https://svelte.dev) and [Vite](https://vitejs.dev). To run it locally, you need to clone this repository, have [Node](https://nodejs.org) installed and then run this in the project's directory:

```bash
npm install
```

This may take a while the first time, but it only needs to be done once.

Then start the local development server:

```bash
npm run dev
```

Navigate to [localhost:10001](http://localhost:10001). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

## Deployment

To create an optimised version of the app:

```bash
npm run build
```

To preview the built app locally:

```bash
npm run start
```

### Release to GitHub pages

The site serves what's on GitHub pages. To release to GitHub pages, [create a new release](https://github.com/GSA/openacr-editor/releases/new). This should trigger a [deploy action](https://github.com/GSA/openacr-editor/actions?query=workflow%3ADeploy).

### Base path handling

The app now uses Vite's `BASE_URL` support for the site root and static asset paths.

- JavaScript routing and asset helpers live in `src/lib/base.js` and `src/lib/router.js`
- HTML shell asset paths are based on `%BASE_URL%` in `index.html`
- if you ever need a non-root build path, set `BASE_PATH` before `npm run build`

## Data structure

The editor uses the OpenACR [schema](https://github.com/GSA/openacr/tree/main/schema) and [catalog](https://github.com/GSA/open-product-accessibility-template/tree/main/catalog) as data structures.

# External Blocks Integration Documentation

## Overview

The External Blocks feature provided by Section508.gov offers functionality to help the Section508.gov team seamlessly integrate the header and footer elements from the Section508.gov website into external projects. This documentation outlines the steps required to incorporate the Section508.gov header and footer elements into this website.

## Integration Steps

To integrate the Section508.gov header and footer into the website, follow these steps:

### 1. Include Stylesheet and JavaScript Files

Add the following stylesheet and JavaScript files to the website's HTML code:

```html
<link
  rel="stylesheet"
  href="https://www.section508.gov/assets/css/external-blocks.css"
/>
<script
  defer
  src="https://www.section508.gov/assets/js/external-508-blocks.js"
></script>
<script defer src="https://www.section508.gov/assets/js/uswds.min.js"></script>
```

### Example

Here's an example of how to integrate the Section508.gov header and footer into the HTML code:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Website</title>
    <!-- Include Section 508 stylesheet and JavaScript after Open ACR-->
    <link
      rel="stylesheet"
      href="https://www.section508.gov/assets/css/external-blocks.css"
    />
    <script
      defer
      src="https://www.section508.gov/assets/js/external-508-blocks.js"
    ></script>
    <script
      defer
      src="https://www.section508.gov/assets/js/uswds.min.js"
    ></script>
  </head>
  <body>
    <!-- Section 508 Header -->
    <div id="header-508"></div>

    <!-- Your Website Content Goes Here -->

    <!-- Section 508 Footer -->
    <div id="footer-508"></div>
  </body>
</html>
```

### Notes

- Ensure that your website's design accommodates the integration of the Section508.gov header and footer appropriately.
