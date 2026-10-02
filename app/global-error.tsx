'use client'
 
export function GlobalError({
  error: _error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <html lang="en">
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}

export default GlobalError