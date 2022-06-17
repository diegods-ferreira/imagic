import React, { useState } from 'react';
import { MdFavorite } from 'react-icons/md';
import { Avatar, Box, Heading, HStack, Icon, Image, Text, useColorModeValue, VStack } from '@chakra-ui/react';

import { UnsplashImage } from '../models/unsplash-image.model';

interface ImageCardProps {
  image: UnsplashImage;
}

export const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      borderRadius="16px"
      overflow="hidden"
      pos="relative"
      cursor="pointer"
      transitionDuration="0.5s"
      boxShadow={{ base: 'md', lg: 'lg' }}
      _hover={{ boxShadow: { md: 'dark-lg' } }}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={image.urls.regular}
        w="100%"
        transitionDuration={{ md: '1s' }}
        transform={{ md: `scale(${isHovered ? '1.1' : '1'}) rotate(${isHovered ? '1deg' : '0deg'})` }}
      />

      <HStack
        spacing="16px"
        w="100%"
        alignItems="flex-end"
        justifyContent="space-between"
        p={{ base: '24px', md: '80px 24px 24px' }}
        bgColor={{ base: useColorModeValue('gray.50', 'gray.800'), md: 'transparent' }}
        bgGradient={{ md: 'linear(to-t, blackAlpha.800, transparent)' }}
        pos={{ md: 'absolute' }}
        bottom={{ md: isHovered ? '0' : '-100%' }}
        transitionDuration={{ md: '0.5s' }}
      >
        <VStack flex="1" alignItems="flex-start">
          <HStack color={{ md: 'gray.100' }} alignItems="center">
            <Avatar size="xs" src={image.user.profile_image.small} />

            <Heading size={{ base: 'xs', md: 'sm' }} noOfLines={1} alignItems="center">
              <span>{image.user.name}</span>
              {!!image.user.last_name && <span>{image.user.last_name}</span>}
            </Heading>
          </HStack>

          {(!!image.description || !!image.alt_description) && (
            <Text color={{ md: 'gray.200' }} fontSize="xs" noOfLines={1}>
              {image.description || image.alt_description}
            </Text>
          )}
        </VStack>

        <HStack color={{ md: 'gray.200' }} fontSize="xs" alignItems="center">
          <Icon as={MdFavorite} />
          <Text>{image.likes}</Text>
        </HStack>
      </HStack>
    </Box>
  );
};
