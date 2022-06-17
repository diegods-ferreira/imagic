import React, { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import {
  VStack,
  useColorModeValue,
  Heading,
  Box,
  Center,
  Text,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useBreakpointValue
} from '@chakra-ui/react';

export const Hero: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Box
      w="100%"
      mt={{ base: '64px', md: '80px' }}
      bgColor={useColorModeValue('gray.100', 'gray.900')}
      bgImage="url(https://source.unsplash.com/random/1920x1080/?landscape)"
      bgPosition="center"
      bgSize="cover"
    >
      <Center w="100%" bgColor="blackAlpha.600">
        <VStack spacing="24px" py={{ base: '80px', md: '160px' }} px="16px" alignItems="flex-start">
          <Heading fontFamily="Lobster Two" fontSize={{ base: '4xl', md: '5xl' }} color="text.50">
            Imagic
          </Heading>

          <Text color="textSecondary.50" fontSize={{ base: 'md', md: 'lg' }}>
            A fonte de imagens liberadas para uso na internet.
          </Text>

          <InputGroup w={{ base: '90vw', md: '50vw' }} size={useBreakpointValue({ base: 'md', md: 'lg' })}>
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="gray.500" />
            </InputLeftElement>

            <Input
              placeholder="Buscar imagens"
              bgColor={useColorModeValue('gray.100', 'gray.900')}
              transitionDuration="0.2s"
              _focus={{
                bgColor: useColorModeValue('gray.50', 'gray.800'),
                borderColor: 'primary.500',
                boxShadow: '0 0 0 1px #ef8354'
              }}
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
            />

            {!!searchTerm && (
              <InputRightElement>
                <IconButton
                  icon={<Icon as={FiX} />}
                  aria-label="Clear search input"
                  size="md"
                  isRound
                  variant="ghost"
                  onClick={() => setSearchTerm('')}
                />
              </InputRightElement>
            )}
          </InputGroup>
        </VStack>
      </Center>
    </Box>
  );
};
