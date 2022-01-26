import { writable } from "svelte/store";

const storageName = "openacr_editor_disabled_sections_store";

// update this number whenever new things added to the data model to cachebust [remove this when stable]
const DATA_MODEL = "2";

let fresh = true;

export function updateCache(disabledSections) {
  try {
    const serialisedDisabledSections = JSON.stringify(disabledSections);
    localStorage.setItem(storageName, serialisedDisabledSections);

    fresh = false;
  } catch (error) {
    // something didn't work
  }
}

export function clearCache() {
  localStorage.clear();
  location.reload();
}

export function getDisabledSections() {
  const cleanDisabledSections = {
    success_criteria_level_a: false,
    success_criteria_level_aa: false,
    success_criteria_level_aaa: false,
    functional_performance_criteria: false,
    hardware: false,
    software: false,
    support_documentation_and_services: false,
  };

  if (
    localStorage.getItem(storageName) &&
    localStorage.getItem(storageName) !== null &&
    localStorage.getItem(`${storageName}-data-model`) === DATA_MODEL
  ) {
    try {
      const serialisedDisabledSections = localStorage.getItem(storageName);
      const localDisabledSectionsObject = JSON.parse(
        serialisedDisabledSections
      );

      fresh = false;

      return localDisabledSectionsObject;
    } catch (error) {
      return cleanDisabledSections;
    }
  } else {
    localStorage.setItem(`${storageName}-data-model`, DATA_MODEL);
    console.log(
      "Removed disabled sections data as it was created with a previous development version of OpenACR Editor."
    );
    return cleanDisabledSections;
  }
}

export function isFresh() {
  return fresh;
}

export function createDisabledSections() {
  const disabledSections = getDisabledSections();
  const { set, update, subscribe } = writable(disabledSections);

  return {
    subscribe,
    set,
    update,
    updateCache,
    clearCache,
    isFresh,
  };
}

export const disabledSections = createDisabledSections();
