# OpenACR Editor

With this tool, people can generate Accessibility Conformance Report in the [OpenACR](https://github.com/GSA/openacr) format.

## W3C Web Accessibility Initiative (WAI) Reporting Tools

This software includes builds on the work from the WAI's [ATAG Report Tool (ART)](https://github.com/w3c/wai-atag-report-tool) and [WCAG-EM Report Tool](https://github.com/w3c/wai-wcag-em-report-tool/). Copyright © 2021 W3C® (MIT, ERCIM, Keio, Beihang).

[W3C Software notice and license](https://www.w3.org/Consortium/Legal/copyright-software).

## Development

This application is built with [Svelte](https://svelte.dev). To run it locally, you need to clone it this repository, have [Node](https://nodejs.org) installed and then run this in the project's directory:

```bash
npm install
```

This may take a while the first time, but it only needs to be done once.

Then, to build the app with [Rollup](https://rollupjs.org), and serve it on a local dev server, run:

```bash
export NODE_ENV=development; npm run dev
```

Navigate to [localhost:10001](http://localhost:10001). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

## Deployment

To create an optimised version of the app:

```bash
npm run build
```

### Release to GitHub pages

The site serves what's on GitHub pages. To release to GitHub pages, [create a new release](https://github.com/GSA/openacr-editor/releases/new). This should trigger a [deploy action](https://github.com/GSA/openacr-editor/actions?query=workflow%3ADeploy).

### Environment-specific variables in HTML and JavaScript (.svelte)

In some deployment contexts, things like paths may need to vary. There are two steps to this:

1. Add environment specific settings to `config/[environment-name].json`, for example `{ pathPrefix: "/editor" }` or `{ imageDir: "/images" }`
2. Before running `npm run build` or `npm run dev`, set `export NODE_ENV=[environment-name]`

#### Using in HTML

Use variables in HTML, with `{{ variable-name }}`, for instance `{{ pathPrefix }}`. If you need these non-escaped, use triple brackets, for instance `{{{ pathPrefix }}}`.

[Mustache](http://mustache.github.io/) replaces the variables in `src/index.html` and places the resulting HTML in `public/index.html`.

#### Using in JavaScript

In JavaScript, `__buildEnv__` is replaced with the name of the build environment using the [replace plugin for rollup](https://github.com/rollup/plugins).

To use variables, this is how you can import the JSON file that your build environment needs:

```js
import vars from "../../config/__buildEnv__.json";
```

The vars are now in the `vars` object, you can reference them with `vars.variableName`, for instance `vars.pathPrefix`.

## Data structure

The editor uses the OpenACR [schema](https://github.com/GSA/openacr/tree/main/schema) and [catalog](https://github.com/GSA/open-product-accessibility-template/tree/main/catalog) as data structures.

## License

By default, this falls under a public domain license. Some libraries included here may include other licenses (see [licenses.txt](license/licenses.txt)). See our [LICENSE.md](LICENSE.md) file for more information.
