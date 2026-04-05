const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";
const FALLBACK_IMAGE = "/fallback.jpg";

export function getPosterImageSrc(path?: string | null) {
  if (!path) {
    return FALLBACK_IMAGE;
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  if (path.startsWith("/fallback")) {
    return path;
  }

  if (path.startsWith("/")) {
    return `${TMDB_IMAGE_BASE}/w500${path}`;
  }

  return path;
}

export function getBackdropImageSrc(path?: string | null) {
  if (!path) {
    return FALLBACK_IMAGE;
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  if (path.startsWith("/fallback")) {
    return path;
  }

  if (path.startsWith("/")) {
    return `${TMDB_IMAGE_BASE}/original${path}`;
  }

  return path;
}
