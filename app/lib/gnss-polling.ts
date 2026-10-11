export const GNSS_POLL_INTERVAL_MS = 200;

export function startGnssPolling(poll: (signal: AbortSignal) => Promise<void>) {
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  async function run() {
    const started = Date.now();
    try {
      await poll(controller.signal);
    } catch (error) {
      if (!controller.signal.aborted) console.error("GNSS polling failed:", error);
    } finally {
      if (!controller.signal.aborted) {
        timer = setTimeout(() => void run(), Math.max(0, GNSS_POLL_INTERVAL_MS - (Date.now() - started)));
      }
    }
  }
  void run();
  return () => {
    controller.abort();
    clearTimeout(timer);
  };
}
