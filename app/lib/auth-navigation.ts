export function getAuthCallbackURL(search: string, origin: string): string {
  const requestedURL = new URLSearchParams(search).get("callbackUrl");
  if (!requestedURL?.startsWith("/") || requestedURL.startsWith("//")) return "/home";

  const resolvedURL = new URL(requestedURL, origin);
  if (resolvedURL.origin !== origin) return "/home";
  return `${resolvedURL.pathname}${resolvedURL.search}${resolvedURL.hash}`;
}
