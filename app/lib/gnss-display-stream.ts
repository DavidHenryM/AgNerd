import type { GnssDisplay } from "./gnss-display";

export type DisplayStreamOptions = {
  readDisplay: () => Promise<GnssDisplay | null>;
  checkSession: () => Promise<boolean>;
  signal: AbortSignal;
  pollIntervalMs?: number;
  keepaliveMs?: number;
  sessionCheckMs?: number;
  now?: () => number;
};

const encoder = new TextEncoder();

/** Server-sent event stream that forwards each new gnss-reader display packet. */
export function createGnssDisplayStream({
  readDisplay,
  checkSession,
  signal,
  pollIntervalMs = 50,
  keepaliveMs = 5000,
  sessionCheckMs = 60000,
  now = Date.now,
}: DisplayStreamOptions): ReadableStream<Uint8Array> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let closed = false;
  return new ReadableStream<Uint8Array>({
    start(controller) {
      let lastKey: string | null = null;
      let lastWriteMs = now();
      let lastSessionCheckMs = now();
      const close = () => {
        if (closed) return;
        closed = true;
        clearTimeout(timer);
        try {
          controller.close();
        } catch {
          // Already closed by the client.
        }
      };
      const send = (text: string) => {
        controller.enqueue(encoder.encode(text));
        lastWriteMs = now();
      };
      signal.addEventListener("abort", close, { once: true });
      send("retry: 1000\n\n");

      const tick = async () => {
        if (closed) return;
        try {
          if (now() - lastSessionCheckMs >= sessionCheckMs) {
            lastSessionCheckMs = now();
            if (!(await checkSession())) {
              if (!closed) send("event: unauthorized\ndata: {}\n\n");
              close();
              return;
            }
          }
          const display = await readDisplay();
          if (closed) return;
          const key = display ? `${display.seq}:${display.publishedAtMs}` : null;
          if (display && key !== lastKey) {
            lastKey = key;
            send(`event: display\ndata: ${JSON.stringify(display)}\n\n`);
          } else if (now() - lastWriteMs >= keepaliveMs) {
            send(": keepalive\n\n");
          }
        } catch {
          close();
          return;
        }
        if (!closed) timer = setTimeout(() => void tick(), pollIntervalMs);
      };
      void tick();
    },
    cancel() {
      closed = true;
      clearTimeout(timer);
    },
  });
}
