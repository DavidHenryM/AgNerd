'use client'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import "./globals.css";
import { Theme, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "@app/theme";
import { TopBar } from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Analytics } from "@vercel/analytics/next"
import { usePathname } from "next/navigation"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isNavigation = usePathname() === "/navigation"
  const storageKey = 'ag-nerd-theme'
  const [theme, setTheme] = useState<Theme>(lightTheme)
  const [darkModeActive, setDarkModeActive] = useState<boolean>(false)
  const [drawerOpen, setDrawerOpen] = useState(true)

  useEffect(() => {
    function determineInitialTheme() {
      const storedTheme = typeof window !== 'undefined' ? localStorage.getItem(storageKey) : null
      if (storedTheme === 'dark' || storedTheme === 'light') {
        setDarkModeActive(storedTheme === 'dark')
        return
      }
      if (typeof window !== 'undefined' && window.matchMedia) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setDarkModeActive(prefersDark)
      }
    } 
    determineInitialTheme()
  }, [])
  
  useEffect(()=>{
    function getPrefersColorScheme(){
      if(darkModeActive){
        setTheme(darkTheme)
        if (typeof window !== 'undefined') {
          localStorage.setItem(storageKey, 'dark')
        }
      } else {
        setTheme(lightTheme)
        if (typeof window !== 'undefined') {
          localStorage.setItem(storageKey, 'light')
        }
      }
    }
    getPrefersColorScheme()
  },[darkModeActive])
  

  return (
    <html lang="en">
      <body className="antialiased">
        <AppRouterCacheProvider>
          <Analytics/>
          <ThemeProvider theme={theme}>      
            <TopBar darkModeActive={darkModeActive} setDarkModeActiveAction={setDarkModeActive} drawerOpen={drawerOpen} setDrawerOpenAction={setDrawerOpen} compactNavigation={isNavigation}/>
            <Navbar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} setDarkModeActive={setDarkModeActive} darkModeActive={darkModeActive} compactNavigation={isNavigation}/>
              {children}
            <Footer compactNavigation={isNavigation}/>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
