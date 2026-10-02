
import { Button } from "@mui/material"
import { signOut } from "@lib/session"
import Link from "next/link"
 
export function SignInButton() {
  return (
    <Link href="/signin">
      <Button 
        variant="contained" 
        sx={{color: "primary.main", backgroundColor: "secondary.main"}} 
      >
        Sign In
      </Button>
    </Link>
  )
}

export function SignOutButton() {
  function handleClick() {
    void signOut()
      .then((result) => {
        console.log(result)
      })
      .catch((error: unknown) => {
        console.error("Failed to sign out:", error)
      })
  }
  return (
      <Button 
        variant="contained" 
        sx={{color: "primary.main", backgroundColor: "secondary.main"}} 
        onClick={handleClick}>
          Sign Out
      </Button>
  )
}