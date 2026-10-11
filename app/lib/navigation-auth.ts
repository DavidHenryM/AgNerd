let redirecting = false;

export function navigationSignInURL(pathname: string, search: string) {
  return `/signin?callbackUrl=${encodeURIComponent(pathname + search)}`;
}

export function redirectNavigationToSignIn() {
  if (redirecting) return;
  redirecting = true;
  window.location.replace(navigationSignInURL(window.location.pathname, window.location.search));
}

export async function fetchNavigationApi(input: string, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.status === 401) {
    redirectNavigationToSignIn();
    throw new Error("Your session has expired. Sign in again to use navigation.");
  }
  return response;
}
