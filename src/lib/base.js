const rawBaseUrl = import.meta.env.BASE_URL || "/";

export const basePath = rawBaseUrl.endsWith("/")
  ? rawBaseUrl.slice(0, -1)
  : rawBaseUrl;

export function normalizeAppPath(path) {
  if (!path || path === "/") {
    return "/";
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized.replace(/\/{2,}/g, "/");
}

export function stripBase(pathname = "/") {
  if (!basePath) {
    return pathname || "/";
  }

  if (pathname === basePath) {
    return "/";
  }

  if (pathname.startsWith(`${basePath}/`)) {
    return pathname.slice(basePath.length) || "/";
  }

  return pathname || "/";
}

export function withBase(path = "/") {
  return `${basePath}${normalizeAppPath(path)}`;
}

export function assetPath(path = "") {
  if (!path) {
    return withBase("/");
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}
