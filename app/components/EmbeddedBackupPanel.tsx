"use client";

import { useCallback, useEffect, useState } from "react";
import { Alert, Box, Button, CircularProgress, Link, Stack, Typography } from "@mui/material";
import { fetchNavigationApi } from "@lib/navigation-auth";
import type { DeploymentMode } from "@lib/deployment";

interface SyncStatus {
  pending: boolean;
  busy: boolean;
  lastSyncedAt: string | null;
  lastError: string | null;
  configurationError: string | null;
}

interface Backup {
  id: string;
  deviceId: string;
  capturedAt: string;
}

export default function EmbeddedBackupPanel({ mode }: { mode: DeploymentMode }) {
  const [status, setStatus] = useState<SyncStatus | null>(null);
  const [backups, setBackups] = useState<Backup[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const refresh = useCallback(async () => {
    const response = await fetchNavigationApi(mode === "embedded" ? "/api/embedded/sync" : "/api/embedded/backups");
    if (!response.ok) throw new Error(`Backup status request failed: HTTP ${response.status}`);
    const result: unknown = await response.json();
    if (!result || typeof result !== "object") throw new Error("Invalid backup status response.");
    if (mode === "embedded") {
      if (!("pending" in result) || typeof result.pending !== "boolean" || !("busy" in result) || typeof result.busy !== "boolean" ||
        !("lastSyncedAt" in result) || !("lastError" in result) || !("configurationError" in result) ||
        ![result.lastSyncedAt, result.lastError, result.configurationError].every(v => v === null || typeof v === "string")) {
        throw new Error("Invalid backup status response.");
      }
      setStatus(result as SyncStatus);
    } else {
      if (!("backups" in result) || !Array.isArray(result.backups) ||
        !result.backups.every(v => v && typeof v === "object" && typeof v.id === "string" &&
          /^[0-9a-f-]{36}$/.test(v.id) && typeof v.deviceId === "string" && typeof v.capturedAt === "string")) {
        throw new Error("Invalid backup listing.");
      }
      setBackups(result.backups);
    }
  }, [mode]);

  useEffect(() => {
    // This effect loads backup status from the server.
    // eslint-disable-next-line react/set-state-in-effect
    void refresh().catch(reason => setError(reason instanceof Error ? reason.message : String(reason)));
  }, [refresh]);

  async function sync() {
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const response = await fetchNavigationApi("/api/embedded/sync", { method: "POST" });
      if (!response.ok) {
        const result: unknown = await response.json();
        throw new Error(result && typeof result === "object" && "error" in result && typeof result.error === "string"
          ? result.error : `Backup request failed: HTTP ${response.status}`);
      }
      setNotice("Backup uploaded. Online business records were not changed.");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason));
    } finally {
      try { await refresh(); } catch (reason) { setError(reason instanceof Error ? reason.message : String(reason)); }
      setBusy(false);
    }
  }

  return <Stack spacing={2} sx={{ maxWidth: 680 }}>
    <Typography variant="h5">{mode === "embedded" ? "Manual cloud backup" : "Embedded device backups"}</Typography>
    <Typography>Versioned business-data snapshots, excluding authentication credentials, sessions and verification tokens. These backups do not merge into the online farm database.</Typography>
    {error && <Alert severity="error">{error}</Alert>}
    {notice && <Alert severity="success">{notice}</Alert>}
    {mode === "embedded" ? <>
      <Typography>Last successful backup: {status?.lastSyncedAt ? new Date(status.lastSyncedAt).toLocaleString() : "Never"}</Typography>
      {status?.pending && <Alert severity="warning">An interrupted backup is pending. Sync now retries that snapshot first; click again after success to capture newer changes.</Alert>}
      {status?.lastError && <Alert severity="error">{status.lastError}</Alert>}
      {status?.configurationError && <Alert severity="warning">{status.configurationError}</Alert>}
      <Box>
        <Button variant="contained" disabled={busy || !status || status.busy || !!status.configurationError}
          onClick={() => void sync()} sx={{ minHeight: 56 }}>
          {busy ? <><CircularProgress size={20} sx={{ mr: 1 }} />Backing up</> : "Sync now"}
        </Button>
        <Button disabled={busy} sx={{ ml: 1, minHeight: 56 }} onClick={() => {
          void refresh().then(() => setError(null)).catch(reason => setError(reason instanceof Error ? reason.message : String(reason)));
        }}>Refresh status</Button>
      </Box>
      <Typography variant="caption">Only runs on request. Backups are retained online until an operator removes them; monitor cloud storage usage.</Typography>
    </> : <>
      {backups.length === 0 && <Typography>No device backups stored.</Typography>}
      {backups.map(backup => <Link key={backup.id} href={`/api/embedded/backups/${backup.id}`}>
        {backup.deviceId} — {new Date(backup.capturedAt).toLocaleString()} — Download
      </Link>)}
    </>}
  </Stack>;
}
