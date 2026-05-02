import { access } from "node:fs/promises";

const GNSS_STATUS_FILE = process.env.GNSS_STATUS_FILE || "/tmp/agnerd-gnss-status.json";

export async function GET() {
  let statusFilePresent = false;
  try {
    await access(GNSS_STATUS_FILE);
    statusFilePresent = true;
  } catch {
    statusFilePresent = false;
  }

  return Response.json({
    ok: true,
    service: {
      expectedStatusFile: GNSS_STATUS_FILE,
      statusFilePresent,
    },
    timestamp: new Date().toISOString(),
  });
}
