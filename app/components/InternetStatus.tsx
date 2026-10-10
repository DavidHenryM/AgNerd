"use client";

import { useEffect, useState } from "react";
import { Chip, Tooltip } from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import type { InternetStatus as Status } from "@lib/internet-status";

type DisplayStatus = Status["state"] | "checking" | "app-unreachable";

export default function InternetStatus() {
  const [state, setState] = useState<DisplayStatus>("checking");
  const [detail, setDetail] = useState("Checking the Pi's internet connection");

  useEffect(() => {
    let cancelled = false;
    let active = false;
    const controller = new AbortController();
    async function check() {
      if (active) return;
      active = true;
      try {
        const response = await fetch("/api/internet-status", {
          cache: "no-store",
          signal: AbortSignal.any([controller.signal, AbortSignal.timeout(7000)]),
        });
        if (!response.ok) throw new Error(`Internet status request returned HTTP ${response.status}`);
        const payload: unknown = await response.json();
        if (!payload || typeof payload !== "object" || !("state" in payload) ||
          !["online", "slow", "unavailable"].includes(String(payload.state))) {
          throw new Error("Invalid internet status response");
        }
        const status = payload as Status;
        if (!cancelled) {
          setState(status.state);
          setDetail(status.error ?? `Pi internet check: ${status.latencyMs} ms. This checks reachability, not download bandwidth.`);
        }
      } catch (error) {
        if (!cancelled) {
          setState("app-unreachable");
          setDetail(error instanceof Error ? error.message : String(error));
        }
      } finally {
        active = false;
      }
    }
    void check();
    const interval = window.setInterval(() => void check(), 15000);
    window.addEventListener("online", check);
    window.addEventListener("offline", check);
    return () => {
      cancelled = true;
      controller.abort();
      window.clearInterval(interval);
      window.removeEventListener("online", check);
      window.removeEventListener("offline", check);
    };
  }, []);

  const label = {
    checking: "Internet: checking",
    online: "Internet: online",
    slow: "Internet: slow",
    unavailable: "Internet: unavailable",
    "app-unreachable": "App: unreachable",
  }[state];
  return (
    <Tooltip title={detail}>
      <Chip
        component="output"
        aria-live="polite"
        icon={state === "unavailable" || state === "app-unreachable" ? <WifiOffIcon /> : <WifiIcon />}
        label={label}
        color={state === "online" ? "success" : state === "checking" ? "default" : "warning"}
        sx={{ fontSize: 16, height: 28 }}
      />
    </Tooltip>
  );
}
