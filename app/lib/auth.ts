import { prisma } from "@lib/prisma"
import { betterAuth } from "better-auth";
import { EmailOptions } from "./email"
import { magicLink, emailOTP } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { sendEmail } from "@app/lib/brevo";
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "./password-policy";

const MAGIC_LINK_TTL_MS = 5 * 60 * 1000;
const magicLinkCache = new Map<string, { url: string; expiresAt: number }>();
const trustedOrigins = (process.env.BETTER_AUTH_TRUSTED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

function getCacheKey(email: string) {
  return email.trim().toLowerCase();
}

function cacheMagicLink(email: string, url: string) {
  magicLinkCache.set(getCacheKey(email), {
    url,
    expiresAt: Date.now() + MAGIC_LINK_TTL_MS,
  });
}

function consumeMagicLink(email: string) {
  const key = getCacheKey(email);
  const entry = magicLinkCache.get(key);
  if (!entry) {
    return undefined;
  }
  if (entry.expiresAt < Date.now()) {
    magicLinkCache.delete(key);
    return undefined;
  }
  magicLinkCache.delete(key);
  return entry.url;
}

const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  ...(trustedOrigins.length > 0 ? { trustedOrigins } : {}),
  database: prismaAdapter(prisma, {provider: "postgresql"}),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    minPasswordLength: MIN_PASSWORD_LENGTH,
    maxPasswordLength: MAX_PASSWORD_LENGTH,
    resetPasswordTokenExpiresIn: 60 * 60,
    revokeSessionsOnPasswordReset: true,
    async sendResetPassword({ user, url }) {
      await sendEmail({
        to: user.email,
        subject: "Set or reset your AgNerd password",
        text: `Use this link to set or reset your AgNerd password: ${url}\n\nThe link expires in one hour. If you did not request this, you can ignore this email.`,
      });
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        const magicLinkUrl = type === "sign-in" ? consumeMagicLink(email) : undefined;
        const subject =
          type === "sign-in"
            ? "Your AgNerd Sign-In Link & OTP"
            : "Your AgNerd Verification Code";

        const text = magicLinkUrl
          ? `Use this one-time code to sign in: ${otp}\n\nOr click the link to sign in to the AgNerd: ${magicLinkUrl}`
          : `Use this one-time code to continue: ${otp}`;

        const options: EmailOptions = {
          to: email,
          subject,
          text,
        };

        await sendEmail(options);
      }
    }),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        cacheMagicLink(email, url);
      }
    })
  ]
})

export { auth };