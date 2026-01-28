# Better Auth Migration Guide

This document describes the migration from NextAuth to better-auth.

## Changes Made

### Dependencies
- **Removed**: `next-auth@^4.24.11`
- **Added**: 
  - `better-auth@^1.4.17`
  - `mongodb@^7.0.0`
  - All supporting GraphQL and type-graphql dependencies

### Prisma Schema
- Updated User model to be compatible with better-auth
  - Added required fields: `name`, `email`, `emailVerified`, `createdAt`, `updatedAt`
  - Changed existing fields to optional: `firstName`, `lastName`, `farmId` (optional farm association)
  - **Note**: The `name` field combines first and last name for better-auth compatibility
- Added new models:
  - `Session` - Manages user sessions
  - `Account` - Manages OAuth accounts and credentials
  - `Verification` - Manages email verification tokens
- Removed old models:
  - `AuthProviderDetails` (replaced by Account model)
  - `AuthProviderNames` enum (no longer needed)

### Important Schema Migration Notes
- Existing users will need data migration to populate the `name` field
- The `farmId` is now optional to support users without farm associations
- All better-auth required fields have sensible defaults or are populated during signup

### Configuration Files

#### New Files
1. **`app/lib/auth.ts`** - Server-side better-auth configuration
2. **`app/lib/auth-client.ts`** - Client-side auth utilities and hooks
3. **`app/api/auth/[...all]/route.ts`** - API routes for better-auth
4. **`app/login/page.tsx`** - Login/signup page with email and OAuth support

#### Updated Files
1. **`app/components/SideBar.tsx`** - Now uses `useSession` and `signOut` from better-auth
2. **`example.env`** - Added better-auth configuration variables
3. **`tsconfig.json`** - Enabled experimental decorators for TypeGraphQL
4. **`package.json`** - Downgraded Prisma to 5.19.1 for typegraphql-prisma compatibility

## Environment Setup

Add the following variables to your `.env` file:

```env
# Better Auth Configuration
BETTER_AUTH_SECRET=<generate-with-openssl-rand-base64-32>
BETTER_AUTH_URL=http://localhost:3000

# OAuth Providers (optional)
GITHUB_CLIENT_ID=<your-github-client-id>
GITHUB_CLIENT_SECRET=<your-github-client-secret>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
```

Generate a secure secret:
```bash
openssl rand -base64 32
```

## Usage

### Client-Side Authentication

```typescript
import { useSession, signIn, signOut, signUp } from '@/app/lib/auth-client'

function MyComponent() {
  const { data: session, isPending } = useSession()
  
  if (isPending) return <div>Loading...</div>
  
  if (!session) {
    return <button onClick={() => signIn.email({ email, password })}>Sign In</button>
  }
  
  return (
    <div>
      <p>Welcome {session.user.name}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}
```

### Authentication Methods

#### Email/Password
```typescript
// Sign up
await signUp.email({
  email: "user@example.com",
  password: "securepassword",
  name: "John Doe"
})

// Sign in
await signIn.email({
  email: "user@example.com",
  password: "securepassword"
})
```

#### OAuth (GitHub/Google)
```typescript
// Sign in with GitHub
await signIn.social({ provider: "github" })

// Sign in with Google
await signIn.social({ provider: "google" })
```

## Database Setup

After updating the schema, run:

```bash
npm run generate
```

This will:
1. Generate the Prisma client with the new schema
2. Generate TypeGraphQL types for the GraphQL API

## Known Issues

### Prisma Version Compatibility
- The project uses Prisma 5.19.1 instead of the latest 6.x due to typegraphql-prisma compatibility
- When typegraphql-prisma adds support for Prisma 6.x, the project can be upgraded

## Testing

1. Start the development server:
```bash
npm run dev
```

2. Navigate to http://localhost:3000/login
3. Test sign up with email/password
4. Test sign in
5. Verify session persistence
6. Test sign out

## API Routes

All authentication routes are handled at `/api/auth/*`:
- POST `/api/auth/sign-up` - Create new account
- POST `/api/auth/sign-in` - Sign in
- POST `/api/auth/sign-out` - Sign out
- GET/POST `/api/auth/session` - Get current session
- And more...

See [better-auth documentation](https://better-auth.com) for full API details.

## Migration Notes

### From NextAuth to better-auth
- NextAuth's `useSession` hook works similarly to better-auth's version
- Session data structure is compatible (has `user` object with `name`, `email`, `image`)
- OAuth configuration moved from `[...nextauth].ts` to `auth.ts`
- Better-auth provides more flexibility and better TypeScript support

## Resources

- [Better Auth Documentation](https://better-auth.com)
- [Better Auth GitHub](https://github.com/better-auth/better-auth)
- [Prisma Adapter Guide](https://better-auth.com/docs/adapters/prisma)
