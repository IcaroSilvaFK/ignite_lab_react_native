import { extendTheme } from 'native-base';

export const theme = extendTheme({
  colors: {
    green: {
      300: '#04d361',
      500: '#00b37e',
      700: '#00875f',
    },
    primary: {
      700: '#996dff',
    },
    secondary: {
      700: '#fba94c',
    },
    gray: {
      100: '#e1e1e6',
      200: '#c4c4cc',
      300: '#7c7c8a',
      400: '#323238',
      500: '#29292e',
      600: '#202024',
      700: '#131314',
    },
    white: '#fff',
  },
  fonts: {
    heading: 'Roboto_700Bold',
    body: 'Roboto_400Regular',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
  },
  sizes: {
    14: 56,
  },
});
// https://ignite-lab.rocketseat.com.br/ticket/blue/IcaroSilvaFK/share
