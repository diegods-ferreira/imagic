import React from 'react';
import { VStack } from '@chakra-ui/react';

import { NavBar } from '../components/nav-bar.component';
import { Hero } from '../components/hero.component';

export const HomePage: React.FC = () => {
  return (
    <VStack w="100%" spacing="0" h="100vh">
      <NavBar />

      <Hero />
    </VStack>
  );
};
