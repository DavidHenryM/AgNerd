import { Box, Typography } from "@mui/material";
import { headers } from "next/headers";
import { auth } from "@lib/auth";
import { deploymentMode, isSyncOperator } from "@lib/deployment";
import EmbeddedBackupPanel from "@components/EmbeddedBackupPanel";
import Content from "@components/Content";

export const dynamic = "force-dynamic";

export default async function Settings() {
  const mode = deploymentMode();
  const session = await auth.api.getSession({ headers: await headers() });
  return <Content><Box sx={{ p: 2 }}>
    <Typography variant="h4" sx={{ mb: 2 }}>Settings — {mode === "embedded" ? "Embedded device" : "Online"}</Typography>
    {session && isSyncOperator(session.user.email) ? <EmbeddedBackupPanel mode={mode} />
      : <Typography>Device backups are available to configured backup operators.</Typography>}
  </Box></Content>;
}