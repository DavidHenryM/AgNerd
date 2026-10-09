"use client"

import { FormEvent, Suspense, useState } from "react"
import { Alert, Button, Grid, Stack, TextField, Typography } from "@mui/material"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Content from "@components/Content"
import { authClient } from "@lib/auth-client"
import { getAuthCallbackURL } from "@lib/auth-navigation"
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "@lib/password-policy"

export default function ResetPasswordPage() {
  return (
    <Content backgroundImageIndex={1}>
      <Grid size={12} sx={{ m: 2, p: 2, width: "100%", maxWidth: 400 }}>
        <Suspense fallback={<Typography>Loading password reset...</Typography>}>
          <ResetPasswordForm />
        </Suspense>
      </Grid>
    </Content>
  )
}

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const invalidToken = !token || Boolean(searchParams.get("error"))
  const [password, setPassword] = useState("")
  const [confirmation, setConfirmation] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [complete, setComplete] = useState(false)
  const callbackURL = getAuthCallbackURL(searchParams.toString(), "https://agnerd.invalid")
  const signInURL = `/signin?callbackUrl=${encodeURIComponent(callbackURL)}`

  async function handleReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    if (!token || invalidToken) {
      setError("This password reset link is invalid or has expired. Request a new link from the sign-in screen.")
      return
    }
    if (password !== confirmation) {
      setError("Passwords do not match.")
      return
    }
    setLoading(true)
    try {
      const { data, error } = await authClient.resetPassword({ token, newPassword: password })
      if (error) throw new Error(error.message || "Could not reset your password.")
      if (!data?.status) throw new Error("Could not reset your password.")
      setPassword("")
      setConfirmation("")
      setComplete(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Stack component="form" onSubmit={handleReset} spacing={2}>
      <Typography color="primary" variant="h6">Set or reset password</Typography>
      {complete ? (
        <Alert severity="success">Your password has been saved. Sign in with your email and new password.</Alert>
      ) : invalidToken ? (
        <Alert severity="error">This password reset link is invalid or has expired. Request a new link from the sign-in screen.</Alert>
      ) : (
        <>
          <TextField
            label="New password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            helperText={`Use ${MIN_PASSWORD_LENGTH}-${MAX_PASSWORD_LENGTH} characters.`}
            slotProps={{ htmlInput: { minLength: MIN_PASSWORD_LENGTH, maxLength: MAX_PASSWORD_LENGTH } }}
            required
            fullWidth
            disabled={loading}
          />
          <TextField
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            slotProps={{ htmlInput: { minLength: MIN_PASSWORD_LENGTH, maxLength: MAX_PASSWORD_LENGTH } }}
            required
            fullWidth
            disabled={loading}
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Saving..." : "Save password"}
          </Button>
        </>
      )}
      <Button component={Link} href={signInURL} disabled={loading}>Back to sign in</Button>
    </Stack>
  )
}
