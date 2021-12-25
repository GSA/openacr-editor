<script>
  import { onMount } from "svelte";
  import Header from "../components/Header.svelte";
  import Pager from "../components/Pager.svelte";
  import HelpText from "../components/HelpText.svelte";
  import PagerLink from "../components/PagerLink.svelte";
  import { evaluation } from "../stores/evaluation.js";
  import { currentPage } from "../stores/currentPage.js";
  import spdxLicenseList from "spdx-license-list";
  import Select from 'svelte-select';
  import helpText from "../data/helpText.yaml";
  import Related from "../components/Related.svelte";
  import AddOther from "../components/AddOther.svelte";
  import HeaderWithAnchor from "../components/HeaderWithAnchor.svelte";
  import ExpandCollapseAll from "../components/ExpandCollapseAll.svelte";

  onMount(() => {
    currentPage.update(currentPage => "About");
  });

  let spdxLicenses = [];
  for (const spdexLicenseListItem in spdxLicenseList) {
    spdxLicenses.push({
      value: spdexLicenseListItem,
      label: `${spdxLicenseList[spdexLicenseListItem].name} (${spdexLicenseListItem})`
    });
  }
  spdxLicenses.sort((a, b) => {
    let la = a.label.toLowerCase(),
        lb = b.label.toLowerCase();

    if (la < lb) {
        return -1;
    }
    if (la > lb) {
        return 1;
    }
    return 0;
  });

  function handleLicenseSelect(e) {
    $evaluation['license'] = e.detail.value;
    evaluation.updateCache($evaluation);
  }

  function handleLicenseClear(e) {
    $evaluation['license'] = "";
    evaluation.updateCache($evaluation);
  }

  function handleRelatedAdd() {
    const newRelatedOpenACR = {
      url: "",
      type: "primary"
    };

    $evaluation['related_openacrs'] = [...$evaluation['related_openacrs'], newRelatedOpenACR];
    evaluation.updateCache($evaluation);
  }

  function handleRelatedDelete(e) {
    if (window.confirm("Are you sure you would like to delete this related OpenACR?")) {
      const newValue = $evaluation['related_openacrs'];
      newValue.splice(e.detail, 1);
      $evaluation['related_openacrs'] = newValue;
      evaluation.updateCache($evaluation);
    }
  }
</script>

<svelte:head>
  <title>About | OpenACR Editor | GSA</title>
</svelte:head>

<Header>About</Header>

<ExpandCollapseAll />

<details>
  <summary>
    <HeaderWithAnchor id="product" level=2>Product</HeaderWithAnchor>
  </summary>

  <div class="field">
    <label for="evaluation-product-name">Name</label>
    <input
      type="text"
      bind:value={$evaluation['product']['name']}
      id="evaluation-product-name"
      on:blur={() => evaluation.updateCache($evaluation)} />
    <HelpText type="product" field="name" />
  </div>

  <div class="field">
    <label for="evaluation-product-version">Version</label>
    <input
      type="text"
      bind:value={$evaluation['product']['version']}
      id="evaluation-product-version"
      on:blur={() => evaluation.updateCache($evaluation)} />
    <HelpText type="product" field="version" />
  </div>

  <div class="field">
    <label for="evaluation-product-description">Description</label>
    <textarea
      bind:value={$evaluation['product']['description']}
      id="evaluation-product-description"
      on:change={() => evaluation.updateCache($evaluation)} />
    <HelpText type="product" field="description" />
  </div>
</details>

<details>
  <summary>
    <HeaderWithAnchor id="author" level=2>Author</HeaderWithAnchor>
  </summary>

  <div class="field">
    <label for="evaluation-author-name">Name</label>
    <input
      type="text"
      bind:value={$evaluation['author']['name']}
      id="evaluation-author-name"
      on:blur={() => evaluation.updateCache($evaluation)} />
    <HelpText type="author" field="name" />
  </div>

  <div class="field">
    <label for="evaluation-author-company">Company Name</label>
    <input
      type="text"
      bind:value={$evaluation['author']['company_name']}
      id="evaluation-author-company"
      on:blur={() => evaluation.updateCache($evaluation)} />
    <HelpText type="author" field="company_name" />
  </div>

  <div class="field">
    <label for="evaluation-author-address">Address</label>
    <input
      type="text"
      bind:value={$evaluation['author']['address']}
      id="evaluation-author-address"
      on:blur={() => evaluation.updateCache($evaluation)} />
    <HelpText type="author" field="address" />
  </div>

  <div class="field">
    <label for="evaluation-author-email">Email</label>
    <input
      type="email"
      bind:value={$evaluation['author']['email']}
      id="evaluation-author-email"
      on:blur={() => evaluation.updateCache($evaluation)} />
    <HelpText type="author" field="email" />
  </div>

  <div class="field">
    <label for="evaluation-author-phone">Phone</label>
    <input
      type="tel"
      bind:value={$evaluation['author']['phone']}
      id="evaluation-author-phone"
      on:blur={() => evaluation.updateCache($evaluation)} />
    <HelpText type="author" field="phone" />
  </div>

  <div class="field">
    <label for="evaluation-author-website">Website (URL)</label>
    <input
      type="url"
      bind:value={$evaluation['author']['website']}
      id="evaluation-author-website"
      on:blur={() => evaluation.updateCache($evaluation)} />
    <HelpText type="author" field="website" />
  </div>
</details>

<details>
  <summary>
    <HeaderWithAnchor id="vendor" level=2>Vendor</HeaderWithAnchor>
  </summary>

  <div class="field">
    <label for="evaluation-vendor-name">Name</label>
    <input
      type="text"
      bind:value={$evaluation['vendor']['name']}
      id="evaluation-vendor-name"
      on:blur={() => evaluation.updateCache($evaluation)} />
    <HelpText type="vendor" field="name" />
  </div>

  <div class="field">
    <label for="evaluation-vendor-company">Company Name</label>
    <input
      type="text"
      bind:value={$evaluation['vendor']['company_name']}
      id="evaluation-vendor-company"
      on:blur={() => evaluation.updateCache($evaluation)} />
    <HelpText type="vendor" field="company_name" />
  </div>

  <div class="field">
    <label for="evaluation-vendor-address">Address</label>
    <input
      type="text"
      bind:value={$evaluation['vendor']['address']}
      id="evaluation-vendor-address"
      on:blur={() => evaluation.updateCache($evaluation)} />
    <HelpText type="vendor" field="address" />
  </div>

  <div class="field">
    <label for="evaluation-vendor-email">Email</label>
    <input
      type="email"
      bind:value={$evaluation['vendor']['email']}
      id="evaluation-vendor-email"
      on:blur={() => evaluation.updateCache($evaluation)} />
    <HelpText type="vendor" field="email" />
  </div>

  <div class="field">
    <label for="evaluation-vendor-phone">Phone</label>
    <input
      type="tel"
      bind:value={$evaluation['vendor']['phone']}
      id="evaluation-vendor-phone"
      on:blur={() => evaluation.updateCache($evaluation)} />
    <HelpText type="vendor" field="phone" />
  </div>

  <div class="field">
    <label for="evaluation-vendor-website">Website (URL)</label>
    <input
      type="url"
      bind:value={$evaluation['vendor']['website']}
      id="evaluation-vendor-website"
      on:blur={() => evaluation.updateCache($evaluation)} />
    <HelpText type="vendor" field="website" />
  </div>
</details>

<details>
  <summary>
    <HeaderWithAnchor id="acr-report-details" level=2>ACR Report Details</HeaderWithAnchor>
  </summary>

  <div class="field">
    <label for="evaluation-report-date">
      Report Date
    </label>
    <input
      type="text"
      bind:value={$evaluation['report_date']}
      id="evaluation-report-date"
      on:change={() => evaluation.updateCache($evaluation)} />
    <HelpText type="report" field="report_date" />
  </div>

  <div class="field">
    <label for="evaluation-notes">Notes</label>
    <textarea
      bind:value={$evaluation['notes']}
      id="evaluation-notes"
      on:change={() => evaluation.updateCache($evaluation)} />
    <HelpText type="report" field="notes" />
  </div>

  <div class="field">
    <label for="evaluation-evaluation-methods-used">Evaluation Methods Used</label>
    <textarea
      bind:value={$evaluation['evaluation_methods_used']}
      id="evaluation-evaluation-methods-used"
      on:change={() => evaluation.updateCache($evaluation)} />
    <HelpText type="report" field="evaluation_methods_used" />
  </div>

  <div class="field">
    <label for="evaluation-legal-disclaimer">Legal Disclaimer</label>
    <textarea
      bind:value={$evaluation['legal_disclaimer']}
      id="evaluation-legal-disclaimer"
      on:change={() => evaluation.updateCache($evaluation)} />
    <HelpText type="report" field="legal_disclaimer" />
  </div>

  <div class="field">
    <label for="evaluation-repository">Repository (URL)</label>
    <input
      type="url"
      bind:value={$evaluation['repository']}
      id="evaluation-repository"
      on:blur={() => evaluation.updateCache($evaluation)} />
    <HelpText type="report" field="repository" />
  </div>

  <div class="field">
    <label for="evaluation-feedback">Feedback (URL)</label>
    <input
      type="url"
      bind:value={$evaluation['feedback']}
      id="evaluation-feedback"
      on:blur={() => evaluation.updateCache($evaluation)} />
    <HelpText type="report" field="feedback" />
  </div>

  <div class="field">
    <label for="evaluation-license">License</label>
    <Select id="evaluation-license" inputStyles="border: 1px solid var(--grey);" items={spdxLicenses} value={$evaluation['license']} on:select={handleLicenseSelect} on:clear={handleLicenseClear} />
    <HelpText type="report" field="license" />
  </div>
</details>

<details>
  <summary>
    <HeaderWithAnchor id="related-openacrs" level=2>Related OpenACRs</HeaderWithAnchor>
  </summary>

  <p>{helpText["related_openacrs"]["intro"]}</p>

  {#each $evaluation['related_openacrs'] as related, index}
    <Related id={index} count={index + 1} on:DELETE="{handleRelatedDelete}" />
  {/each}

  <AddOther label="Add related OpenACR" on:ADD="{handleRelatedAdd}"></AddOther>
</details>

<Pager label="Previous/Next Principle">
  <PagerLink to="/" direction="previous">Overview</PagerLink>
  <PagerLink to="/chapter/success_criteria_level_a" direction="next">A</PagerLink>
</Pager>
