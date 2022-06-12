import React from 'react';
import { SimpleGrid, VStack } from '@chakra-ui/react';

import { NavBar } from '../components/nav-bar.component';
import { Hero } from '../components/hero.component';

import { ImageCard } from '../components/image-card.component';

export const HomePage: React.FC = () => {
  return (
    <VStack w="100%" spacing="0" h="100vh">
      <NavBar />

      <Hero />

      <SimpleGrid
        columns={{ base: 2, md: 3 }}
        spacing={{ base: '16px', md: '24px' }}
        w="100%"
        maxW="1080px"
        px="16px"
        py="32px"
      >
        <ImageCard />
        <ImageCard />
        <ImageCard />
      </SimpleGrid>
    </VStack>
  );
};
