import React from 'react';
import { Box, Image, SimpleGrid, VStack } from '@chakra-ui/react';

import { NavBar } from '../components/nav-bar.component';
import { Hero } from '../components/hero.component';

export const HomePage: React.FC = () => {
  return (
    <VStack w="100%" spacing="0" h="100vh">
      <NavBar />

      <Hero />

      <SimpleGrid columns={3} spacing="16px" w="100%" maxW="1080px" border="1px solid red" py="24px">
        <Box borderRadius="16px" overflow="hidden">
          <Image src="https://source.unsplash.com/random/1920x1080/?landscape" w="100%" />
          <h1>Teste</h1>
        </Box>
      </SimpleGrid>
    </VStack>
  );
};
