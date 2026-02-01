'use client';
import { createTheme } from '@mui/material/styles';


declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}


const components = {
  MuiUseMediaQuery: {
    defaultProps: {
      noSsr: true,
    }
  }
}

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
    xxl: 2200
  },
}

const typography = {
  fontFamily: "var(--font-arvo)"
}

export const darkTheme = createTheme(
  { 
    components: {
      ...components,
      MuiButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.secondary.main
          })
        }
      }
    }, 
    breakpoints: breakpoints,
    typography: typography,
    palette: { 
      mode: 'dark',
      primary: {
        main: '#5A6B4F',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#89986D',
        contrastText: '#ffffff',
      },
    } 
  }
)

export const lightTheme = createTheme(
  { 
    components: {
      ...components,
      MuiButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.secondary.main
          })
        }
      }
    },
    breakpoints: breakpoints,
    typography: typography,
    palette: { 
      mode: 'light', 
      primary: {
        main: '#9CAB84',
        contrastText: 'rgba(0,0,0,0.89)',
      },
      secondary: {
        main:  '#F6F0D7',
        contrastText: 'rgba(0,0,0,0.89)',
      },
    } 
  }
)

