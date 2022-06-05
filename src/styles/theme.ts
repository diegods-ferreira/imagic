import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light'
};

const colors = {
  primary: {
    50: '#fadacc',
    100: '#f7c1aa',
    200: '#f4a887',
    300: '#f29c76',
    400: '#f18f65',
    500: '#ef8354',
    600: '#d7764c',
    700: '#a75c3b',
    800: '#78422a',
    900: '#482719'
  },
  text: {
    50: '#eaeaec',
    100: '#c0c1c6',
    200: '#9698a1',
    300: '#6c6f7b',
    400: '#424655',
    500: '#2D3142',
    600: '#292c3b',
    700: '#1f222e',
    800: '#171921',
    900: '#0d0f14'
  },
  textSecondary: {
    50: '#dcdfe3',
    100: '#caced6',
    200: '#a7aeba',
    300: '#848e9e',
    400: '#616d83',
    500: '#4F5D75',
    600: '#475469',
    700: '#374152',
    800: '#282f3b',
    900: '#181c23'
  },
  details: {
    50: '#e5e6e6',
    100: '#dfe0e0',
    200: '#d2d3d3',
    300: '#cccdcd',
    400: '#c5c6c6',
    500: '#BFC0C0',
    600: '#acadad',
    700: '#868686',
    800: '#606060',
    900: '#393a3a'
  }
};

const styles = {
  global: (props: any) => ({
    '*': {
      fontFamily:
        'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
    },
    'body, input, textarea, select': {
      color: props.colorMode === 'light' ? 'text.500' : 'text.50'
    }
  })
};

export const theme = extendTheme({ config, colors, styles });
