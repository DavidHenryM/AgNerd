"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import { fetchNavigationApi } from "../navigation-auth";
import { SprayTrackHttpError, SprayTrackSession } from "../spray-track-session";

export async function requestSprayTracks(url: string, init?: RequestInit): Promise<unknown> {
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json");
  const response = await fetchNavigationApi(url, {
    ...init, cache: "no-store", signal: AbortSignal.timeout(15000),
    headers,
  });
  const body: unknown = await response.json();
  if (!response.ok) {
    const message = body && typeof body === "object" && "error" in body && typeof body.error === "string"
      ? body.error : `Spray track request failed: HTTP ${response.status}`;
    throw new SprayTrackHttpError(message, response.status);
  }
  return body;
}

export function useSprayTracks(setSprayingEnabled: (enabled: false) => void) {
  const [session] = useState(() => new SprayTrackSession(requestSprayTracks));
  const state = useSyncExternalStore(session.subscribe, session.getSnapshot, session.getSnapshot);
  useEffect(() => {
    const timer = setInterval(() => {
      const latest = session.getSnapshot();
      if (latest.dirty && !latest.error && !latest.busy) void session.flush();
    }, 2000);
    const beforeUnload = (event: BeforeUnloadEvent) => {
      const latest = session.getSnapshot();
      if (latest.dirty || latest.saving || latest.busy || latest.error) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    const beforeLinkNavigation = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const destination = new URL(anchor.href, window.location.href);
      if (!["http:", "https:"].includes(destination.protocol) ||
        destination.href.split("#")[0] === window.location.href.split("#")[0]) return;
      const latest = session.getSnapshot();
      if (!latest.dirty && !latest.saving && !latest.busy && !latest.error) return;
      event.preventDefault();
      event.stopPropagation();
      setSprayingEnabled(false);
      if (!window.confirm("Save the current spray track before leaving? Cancel to stay on navigation.")) return;
      void session.flush().then(saved => {
        if (saved) window.location.assign(destination.href);
      });
    };
    window.addEventListener("beforeunload", beforeUnload);
    document.addEventListener("click", beforeLinkNavigation, true);
    return () => {
      clearInterval(timer);
      window.removeEventListener("beforeunload", beforeUnload);
      document.removeEventListener("click", beforeLinkNavigation, true);
      void session.flush();
    };
  }, [session, setSprayingEnabled]);
  return { session, state };
}
