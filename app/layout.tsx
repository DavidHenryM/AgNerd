import { Providers } from "./providers";
import { StrictMode } from 'react';
import { ApolloWrapper } from "./ApolloWrapper";



export function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StrictMode>
      <html lang="en">
        <body>
          <Providers>
            <ApolloWrapper>
            {children}
            </ApolloWrapper>
          </Providers>
        </body>
      </html>
    </StrictMode>
  )
}

export default RootLayout