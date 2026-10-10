export type InternetStatus = {
  state: "online" | "slow" | "unavailable";
  latencyMs: number | null;
  checkedAt: string;
  error: string | null;
};

export async function probeInternet(
  request: typeof fetch = fetch,
  now: () => number = Date.now,
): Promise<InternetStatus> {
  const start = now();
  try {
    const response = await request("https://www.gstatic.com/generate_204", {
      method: "HEAD",
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(5000),
    });
    if (response.status !== 204) throw new Error(`Internet check returned HTTP ${response.status}`);
    const latencyMs = Math.max(0, now() - start);
    return {
      state: latencyMs >= 1500 ? "slow" : "online",
      latencyMs,
      checkedAt: new Date(now()).toISOString(),
      error: null,
    };
  } catch (error) {
    return {
      state: "unavailable",
      latencyMs: null,
      checkedAt: new Date(now()).toISOString(),
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
