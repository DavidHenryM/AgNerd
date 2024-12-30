import type { Metadata } from "next";
import { Provider } from "@/components/ui/provider"
import "./globals.css";

export const metadata: Metadata = {
  title: "AgNerd",
  description: "Nerdy Ag Platform",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
