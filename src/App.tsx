import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from './styles/theme';

export const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <h1>Hello World!</h1>
    </ChakraProvider>
  );
};
