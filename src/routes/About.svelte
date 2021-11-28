<script>
  import { onMount } from "svelte";
  import Header from "../components/Header.svelte";
  import Pager from "../components/Pager.svelte";
  import PagerLink from "../components/PagerLink.svelte";
  import { evaluation } from "../stores/evaluation.js";
  import { currentPage } from "../stores/currentPage.js";

  onMount(() => {
    currentPage.update(currentPage => "About");
  });
</script>

<svelte:head>
  <title>About | OpenACR Editor | GSA</title>
</svelte:head>

<Header>About</Header>

<h2>Product</h2>

<div class="field">
  <label for="evaluation-product-name">Name</label>
  <input
    type="text"
    bind:value={$evaluation['product']['name']}
    id="evaluation-product-name"
    on:blur={() => evaluation.updateCache($evaluation)} />
</div>

<div class="field">
  <label for="evaluation-product-version">Version</label>
  <input
    type="text"
    bind:value={$evaluation['product']['version']}
    id="evaluation-product-version"
    on:blur={() => evaluation.updateCache($evaluation)} />
</div>

<div class="field">
  <label for="evaluation-product-description">Description</label>
  <textarea
    bind:value={$evaluation['product']['description']}
    id="evaluation-product-description"
    on:change={() => evaluation.updateCache($evaluation)} />
</div>

<h2>Author</h2>

<div class="field">
  <label for="evaluation-author-name">Name</label>
  <input
    type="text"
    bind:value={$evaluation['author']['name']}
    id="evaluation-author-name"
    on:blur={() => evaluation.updateCache($evaluation)} />
</div>

<div class="field">
  <label for="evaluation-author-company">Company Name</label>
  <input
    type="text"
    bind:value={$evaluation['author']['company_name']}
    id="evaluation-author-company"
    on:blur={() => evaluation.updateCache($evaluation)} />
</div>

<div class="field">
  <label for="evaluation-author-address">Address</label>
  <input
    type="text"
    bind:value={$evaluation['author']['address']}
    id="evaluation-author-address"
    on:blur={() => evaluation.updateCache($evaluation)} />
</div>

<div class="field">
  <label for="evaluation-author-email">Email</label>
  <input
    type="email"
    bind:value={$evaluation['author']['email']}
    id="evaluation-author-email"
    on:blur={() => evaluation.updateCache($evaluation)} />
</div>

<div class="field">
  <label for="evaluation-author-phone">Phone</label>
  <input
    type="tel"
    bind:value={$evaluation['author']['phone']}
    id="evaluation-author-phone"
    on:blur={() => evaluation.updateCache($evaluation)} />
</div>

<div class="field">
  <label for="evaluation-author-website">Website (URL)</label>
  <input
    type="url"
    bind:value={$evaluation['author']['website']}
    id="evaluation-author-website"
    on:blur={() => evaluation.updateCache($evaluation)} />
</div>

<h2>Vendor</h2>

<div class="field">
  <label for="evaluation-vendor-name">Name</label>
  <input
    type="text"
    bind:value={$evaluation['vendor']['name']}
    id="evaluation-vendor-name"
    on:blur={() => evaluation.updateCache($evaluation)} />
</div>

<div class="field">
  <label for="evaluation-vendor-company">Company Name</label>
  <input
    type="text"
    bind:value={$evaluation['vendor']['company_name']}
    id="evaluation-vendor-company"
    on:blur={() => evaluation.updateCache($evaluation)} />
</div>

<div class="field">
  <label for="evaluation-vendor-address">Address</label>
  <input
    type="text"
    bind:value={$evaluation['vendor']['address']}
    id="evaluation-vendor-address"
    on:blur={() => evaluation.updateCache($evaluation)} />
</div>

<div class="field">
  <label for="evaluation-vendor-email">Email</label>
  <input
    type="email"
    bind:value={$evaluation['vendor']['email']}
    id="evaluation-vendor-email"
    on:blur={() => evaluation.updateCache($evaluation)} />
</div>

<div class="field">
  <label for="evaluation-vendor-phone">Phone</label>
  <input
    type="tel"
    bind:value={$evaluation['vendor']['phone']}
    id="evaluation-vendor-phone"
    on:blur={() => evaluation.updateCache($evaluation)} />
</div>

<div class="field">
  <label for="evaluation-vendor-website">Website (URL)</label>
  <input
    type="url"
    bind:value={$evaluation['vendor']['website']}
    id="evaluation-vendor-website"
    on:blur={() => evaluation.updateCache($evaluation)} />
</div>

<h2>ACR Report Details</h2>

<div class="field">
  <label for="evaluation-report-date">
    Report Date
  </label>
  <input
    type="text"
    bind:value={$evaluation['report_date']}
    id="evaluation-report-date"
    on:change={() => evaluation.updateCache($evaluation)} />
</div>

<div class="field">
  <label for="evaluation-notes">Notes</label>
  <textarea
    bind:value={$evaluation['notes']}
    id="evaluation-notes"
    on:change={() => evaluation.updateCache($evaluation)} />
</div>

<div class="field">
  <label for="evaluation-evaluation-methods-used">Evaluation Methods Used</label>
  <textarea
    bind:value={$evaluation['evaluation_methods_used']}
    id="evaluation-evaluation-methods-used"
    on:change={() => evaluation.updateCache($evaluation)} />
</div>

<div class="field">
  <label for="evaluation-legal-disclaimer">Legal Disclaimer</label>
  <textarea
    bind:value={$evaluation['legal_disclaimer']}
    id="evaluation-legal-disclaimer"
    on:change={() => evaluation.updateCache($evaluation)} />
</div>

<div class="field">
  <label for="evaluation-repository">Repository (URL)</label>
  <input
    type="url"
    bind:value={$evaluation['repository']}
    id="evaluation-repository"
    on:blur={() => evaluation.updateCache($evaluation)} />
</div>

<div class="field">
  <label for="evaluation-feedback">Feedback (URL)</label>
  <input
    type="url"
    bind:value={$evaluation['feedback']}
    id="evaluation-feedback"
    on:blur={() => evaluation.updateCache($evaluation)} />
</div>

<div class="field">
  <label for="evaluation-license">License</label>
  <input
    type="text"
    bind:value={$evaluation['license']}
    id="evaluation-license"
    on:blur={() => evaluation.updateCache($evaluation)} />
</div>

<!-- TODO add related ACR URLs as an array of values. -->

<Pager label="Previous/Next Principle">
  <PagerLink to="/" direction="previous">Overview</PagerLink>
  <PagerLink to="/chapter/success_criteria_level_a" direction="next">A</PagerLink>
</Pager>
