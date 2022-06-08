import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from './styles/theme';

import { HomePage } from './pages/Home';

export const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <HomePage />
    </ChakraProvider>
  );
};
