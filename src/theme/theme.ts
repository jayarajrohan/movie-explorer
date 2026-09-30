import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'class' },
  colorSchemes: {
    dark: {
      palette: {
        primary:   { main: '#7C5CFF', light: '#A18BFF', dark: '#5A3DE0', contrastText: '#FFFFFF' }, // electric violet
        secondary: { main: '#22D3EE', light: '#67E8F9', dark: '#0891B2', contrastText: '#07080F' }, // neon cyan
        background: { default: '#07080F', paper: '#11131F' },
        text: { primary: '#E8EAF6', secondary: '#9AA0B8', disabled: '#5A6072' },
        divider: 'rgba(255,255,255,0.08)',
        warning: { main: '#FBBF24' },
        error:   { main: '#FF4D6D' },
        success: { main: '#2EE6A6' },
        info:    { main: '#38BDF8' },
      },
    },
    light: {
      palette: {
        primary:   { main: '#5B3DF5', light: '#7C5CFF', dark: '#4527D1', contrastText: '#FFFFFF' },
        secondary: { main: '#0891B2', light: '#22D3EE', dark: '#0E7490', contrastText: '#FFFFFF' },
        background: { default: '#F4F5FB', paper: '#FFFFFF' },
        text: { primary: '#0B0D17', secondary: '#5A6072', disabled: '#9AA0B8' },
        divider: 'rgba(11,13,23,0.08)',
        warning: { main: '#D97706' },
        error:   { main: '#E11D48' },
        success: { main: '#059669' },
        info:    { main: '#0284C7' },
      },
    },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: '"Inter", system-ui, sans-serif',
    h1: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
    h4: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
})