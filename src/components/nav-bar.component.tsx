import React, { useState } from 'react';
import { FiMoon, FiSearch, FiSun, FiX } from 'react-icons/fi';
import {
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Tooltip,
  useBreakpointValue,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';

import logoLightModeImg from '../assets/images/imagic-logo.png';

export const NavBar: React.FC = () => {
  const { toggleColorMode } = useColorMode();

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchTermInputFocused, setIsSearchTermInputFocused] = useState(false);

  return (
    <HStack
      as="nav"
      w="100%"
      h={{ base: '64px', md: '80px' }}
      borderBottomWidth="1px"
      px={{ base: '16px', md: '80px' }}
      spacing="24px"
    >
      <HStack spacing="16px" pointerEvents="none">
        <Image maxH={{ base: '24px', md: '32px' }} src={logoLightModeImg} />
        <Heading fontFamily="Lobster Two" fontSize={{ base: '2xl', md: '3xl' }} display={{ base: 'none', md: 'flex' }}>
          Imagic
        </Heading>
      </HStack>

      <HStack spacing={{ base: '8px', md: '16px' }} flex={1} justifyContent="flex-end">
        <InputGroup
          w={{ base: '100%', md: isSearchTermInputFocused ? '400px' : '240px' }}
          transitionDuration="0.2s"
          size={useBreakpointValue({ base: 'sm', md: 'md' })}
          variant="filled"
        >
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="gray.500" />
          </InputLeftElement>

          <Input
            placeholder="Buscar imagens"
            borderRadius="999px"
            focusBorderColor="primary.500"
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
            onFocus={() => setIsSearchTermInputFocused(true)}
            onBlur={() => setIsSearchTermInputFocused(false)}
          />

          {!!searchTerm && (
            <InputRightElement>
              <IconButton
                icon={<FiX />}
                aria-label="Clear search input"
                size="sm"
                isRound
                variant="ghost"
                onClick={() => setSearchTerm('')}
              />
            </InputRightElement>
          )}
        </InputGroup>

        <Tooltip label={useColorModeValue('Ativar modo escuro', 'Ativar modo claro')}>
          <IconButton
            icon={useColorModeValue(<FiMoon />, <FiSun />)}
            aria-label="Toggle dark mode"
            isRound
            size={useBreakpointValue({ base: 'sm', md: 'md' })}
            onClick={toggleColorMode}
          />
        </Tooltip>
      </HStack>
    </HStack>
  );
};
