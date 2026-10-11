export type DeploymentMode = "online" | "embedded";

export function deploymentMode(env: NodeJS.ProcessEnv = process.env): DeploymentMode {
  const mode = env.AGNERD_DEPLOYMENT_MODE ?? "online";
  if (mode !== "online" && mode !== "embedded") {
    throw new Error("AGNERD_DEPLOYMENT_MODE must be online or embedded.");
  }
  return mode;
}

export function databaseURL(env: NodeJS.ProcessEnv = process.env): string {
  const mode = deploymentMode(env);
  const value = mode === "embedded"
    ? env.LOCAL_DATABASE_URL
    : env.PRISMA_DATABASE_POSTGRES_URL || env.DATABASE_URL || env.PRISMA_DATABASE_URL;
  if (!value) throw new Error(mode === "embedded"
    ? "Embedded deployment requires LOCAL_DATABASE_URL."
    : "Online deployment requires DATABASE_URL or PRISMA_DATABASE_POSTGRES_URL.");
  const url = new URL(value);
  if (!["postgres:", "postgresql:"].includes(url.protocol)) throw new Error("Database must use a PostgreSQL URL.");
  if (mode === "embedded" && !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)) {
    throw new Error("LOCAL_DATABASE_URL must point to PostgreSQL on this device (localhost).");
  }
  return value;
}

export function isSyncOperator(email: string, env: NodeJS.ProcessEnv = process.env) {
  return (env.EMBEDDED_SYNC_ADMIN_EMAILS ?? "").split(",")
    .map(value => value.trim().toLowerCase()).filter(Boolean).includes(email.toLowerCase());
}
