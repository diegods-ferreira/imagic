import React, { useState } from 'react';
import { MdFavorite } from 'react-icons/md';
import { Avatar, Box, Heading, HStack, Icon, Image, Text, VStack } from '@chakra-ui/react';

import { hexToRgb } from '../utils/hex-to-rgb.util';

export const ImageCard: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      borderRadius="16px"
      overflow="hidden"
      pos="relative"
      cursor="pointer"
      transitionDuration="0.5s"
      _hover={{ boxShadow: 'dark-lg' }}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src="https://source.unsplash.com/random/1080x1920/?landscape"
        w="100%"
        transitionDuration="1s"
        transform={`scale(${isHovered ? '1.1' : '1'}) rotate(${isHovered ? '1deg' : '0deg'})`}
      />

      <VStack
        spacing={{ base: '8px', md: '16px' }}
        w="100%"
        alignItems="flex-start"
        p={{ base: '40px 16px 16px', md: '80px 24px 24px' }}
        bgGradient={`linear-gradient(180deg, transparent, rgba(${hexToRgb('#000000')}, 0.8))`}
        pos="absolute"
        bottom={isHovered ? '0' : '-100%'}
        transitionDuration="0.5s"
      >
        <HStack color="gray.100">
          <Avatar size={{ base: '2xs', md: 'xs' }} />

          <Heading size={{ base: 'xs', md: 'sm' }} noOfLines={1}>
            Nome do Usário
          </Heading>
        </HStack>

        <HStack w="100%" color="gray.200" fontSize="xs" justifyContent="space-between">
          <Text noOfLines={1}>Descrição da imagem</Text>

          <HStack>
            <Icon as={MdFavorite} />
            <Text>12</Text>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
};
