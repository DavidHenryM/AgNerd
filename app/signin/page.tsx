"use client"

import { FormEvent, useState } from "react"
import { Alert, Button, Grid, Stack, Tab, Tabs, TextField, Typography } from "@mui/material"
import { signIn, signInWithOtp } from "@lib/session"
import { authClient } from "@lib/auth-client"
import { getAuthCallbackURL } from "@lib/auth-navigation"
import Content from "@components/Content"
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [password, setPassword] = useState("")
  const [method, setMethod] = useState<"link" | "password">("link")
  const [resetRequested, setResetRequested] = useState(false)
  const [resetMode, setResetMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [emailSent, setEmailSent] = useState(false)
  const router = useRouter();

  const getCallbackURL = () => getAuthCallbackURL(window.location.search, window.location.origin);

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    if (!email.trim()) {
      setError('Enter a valid email')
      return
    }
    try{
      setLoading(true)
      const callbackURL = getCallbackURL()
      if (resetMode) {
        const { data, error } = await authClient.requestPasswordReset({
          email: email.trim(),
          redirectTo: `/reset-password?callbackUrl=${encodeURIComponent(callbackURL)}`,
        })
        if (error) throw new Error(error.message || "Could not send the password reset email.")
        if (!data?.status) throw new Error("Could not send the password reset email.")
        setResetRequested(true)
      } else if (method === "password") {
        const { data, error } = await authClient.signIn.email({
          email: email.trim(),
          password,
        })
        if (error) throw new Error(error.message || "Could not sign in with your password.")
        if (!data?.user) throw new Error("Could not sign in with your password.")
        setPassword("")
        router.push(callbackURL)
        router.refresh()
      } else {
        const { data, error } = await signIn(email.trim(), callbackURL)
        if (error) throw new Error(error.message || "Could not send the sign-in link.")
        if (!data?.status) throw new Error("Could not send the sign-in link.")
        setEmailSent(true)
      }
    }catch(err: unknown){
      setError(err instanceof Error ? err.message : String(err))
    }finally{
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    if (!email.trim()) {
      setError('Enter a valid email')
      return
    }
    if (!otp) {
      setError('Enter the one-time code')
      return
    }
    try{
      setLoading(true)
      const callbackURL = getCallbackURL();
      const { data, error } = await signInWithOtp(email.trim(), otp, callbackURL)
      if (error) {
        throw new Error(error.message || "Could not sign in with the one-time code.")
      }
      if (!data?.user) throw new Error("Could not sign in with the one-time code.")
      setEmailSent(false)
      router.push(callbackURL)
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Content backgroundImageIndex={1}>
      <Grid size={12} spacing={2} sx={{ m: 2, p: 2, justifySelf: "center", width: "100%", maxWidth: 400 }}>
      <Stack component="form" onSubmit={emailSent ? handleVerifyOtp : handleSignIn} direction="column" spacing={2} sx={{ alignItems: "center" }}>
        {
          emailSent ? 
<>
            <Typography color="primary" variant="h6">Check your email</Typography>
            <Typography color="primary" variant="body2">We&apos;ve sent a magic link and a one-time code to {email}.</Typography>
            <Typography color="primary" variant="body2">Use the code below, or click the link to sign in.</Typography>
            <TextField
              label="One-time code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              fullWidth
              disabled={loading}
              required
              autoComplete="one-time-code"
              slotProps={{ htmlInput: { inputMode: "numeric" } }}
            />
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : null}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              disabled={loading || !otp}
            >
              <Typography color="secondary">
                {loading ? 'Signing in…' : 'Sign in with code'}
              </Typography>
            </Button>
            <Button type="button" disabled={loading} onClick={() => { setEmailSent(false); setOtp(""); setError(null) }}>
              Didn&apos;t get the link? Try again
            </Button>
          </>
          :
          <>
          <Typography color="primary" variant="h6">{resetMode ? "Set or reset password" : "Sign in"}</Typography>
          {!resetMode && (
            <Tabs value={method} onChange={(_, value: "link" | "password") => { setMethod(value); setError(null); setPassword("") }} aria-label="Sign-in method">
              <Tab value="link" label="Sign-in link" disabled={loading} />
              <Tab value="password" label="Password" disabled={loading} />
            </Tabs>
          )}
          {resetMode && (
            <Typography color="primary" variant="body2">
              Use your existing account email to create your first password or reset a forgotten password.
            </Typography>
          )}
        <TextField
          label="Email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          disabled={loading || resetRequested}
        />
        {!resetMode && method === "password" && (
          <TextField
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            disabled={loading}
          />
        )}
        {resetRequested && (
          <Alert severity="success">
            If an account exists for this email, a password setup/reset link has been sent. Check your inbox.
          </Alert>
        )}
        {error ? (
          <Alert severity="error">{error}</Alert>
        ) : null}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          disabled={loading || resetRequested}
        >
          <Typography color="secondary">
          {loading ? (resetMode ? "Sending…" : "Signing in…") : resetMode ? "Email password reset link" : method === "password" ? "Sign in with password" : "Email sign-in link"}
          </Typography>
        </Button>
        {(resetMode || method === "password") && (
          <Button type="button" disabled={loading} onClick={() => {
            setResetMode(!resetMode)
            setResetRequested(false)
            setPassword("")
            setError(null)
          }}>
            {resetMode ? "Back to sign in" : "Set or reset password"}
          </Button>
        )}
        </>
}
      </Stack>
      </Grid>
    </Content>
  )
}
