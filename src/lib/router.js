import { get, readable } from "svelte/store";
import { normalizeAppPath, stripBase, withBase } from "./base.js";

const NAVIGATION_EVENT = "openacr:navigation";

function readLocation() {
  if (typeof window === "undefined") {
    return {
      pathname: "/",
      search: "",
      hash: "",
    };
  }

  return {
    pathname: stripBase(window.location.pathname),
    search: window.location.search,
    hash: window.location.hash,
  };
}

function splitPath(path = "/") {
  const hashIndex = path.indexOf("#");
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : "";
  const withoutHash = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  const searchIndex = withoutHash.indexOf("?");
  const search = searchIndex >= 0 ? withoutHash.slice(searchIndex) : "";
  const pathname = searchIndex >= 0
    ? withoutHash.slice(0, searchIndex)
    : withoutHash;

  return {
    pathname: pathname || "/",
    search,
    hash,
  };
}

function isExternalPath(path) {
  return /^(?:[a-z]+:)?\/\//i.test(path) || /^(?:mailto|tel):/i.test(path);
}

function notifyNavigation() {
  window.dispatchEvent(new Event(NAVIGATION_EVENT));
}

export const location = readable(readLocation(), (set) => {
  if (typeof window === "undefined") {
    return undefined;
  }

  const updateLocation = () => {
    set(readLocation());
  };

  window.addEventListener("popstate", updateLocation);
  window.addEventListener("hashchange", updateLocation);
  window.addEventListener(NAVIGATION_EVENT, updateLocation);
  updateLocation();

  return () => {
    window.removeEventListener("popstate", updateLocation);
    window.removeEventListener("hashchange", updateLocation);
    window.removeEventListener(NAVIGATION_EVENT, updateLocation);
  };
});

export function href(path = "/") {
  if (!path) {
    return withBase("/");
  }

  if (isExternalPath(path)) {
    return path;
  }

  if (path.startsWith("#")) {
    const currentLocation = get(location);
    return `${withBase(currentLocation.pathname)}${currentLocation.search}${path}`;
  }

  const { pathname, search, hash } = splitPath(path);
  return `${withBase(normalizeAppPath(pathname))}${search}${hash}`;
}

export function goto(path, { replace = false } = {}) {
  if (typeof window === "undefined") {
    return;
  }

  if (isExternalPath(path)) {
    window.location.assign(path);
    return;
  }

  const nextHref = href(path);
  const nextUrl = new URL(nextHref, window.location.origin);
  const method = replace ? "replaceState" : "pushState";

  window.history[method]({}, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
  notifyNavigation();
}

export function link(node) {
  function handleClick(event) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }

    if (node.target && node.target !== "_self") {
      return;
    }

    if (node.hasAttribute("download")) {
      return;
    }

    const nextUrl = new URL(node.href, window.location.href);

    if (nextUrl.origin !== window.location.origin) {
      return;
    }

    event.preventDefault();
    goto(`${stripBase(nextUrl.pathname)}${nextUrl.search}${nextUrl.hash}`);
  }

  node.addEventListener("click", handleClick);

  return {
    destroy() {
      node.removeEventListener("click", handleClick);
    },
  };
}
