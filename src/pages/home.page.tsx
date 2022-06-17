import React, { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { Alert, AlertIcon, Box, Button, Center, HStack, Select, Spinner, Stack, VStack } from '@chakra-ui/react';

import * as UnsplashService from '../services/unsplash.service';
import { OrderByOption } from '../services/unsplash.service';

import { UnsplashImage } from '../models/unsplash-image.model';

import { NavBar } from '../components/nav-bar.component';
import { Hero } from '../components/hero.component';
import { ImageCard } from '../components/image-card.component';

import { splitArrayToChunks } from '../utils/split-array-to-chunks.util';

interface UnsplashPhotoChunks {
  firstColumn: UnsplashImage[];
  secondColumn: UnsplashImage[];
  thirdColumn: UnsplashImage[];
}

export const HomePage: React.FC = () => {
  const { ref: loadMorePhotosButtonRef, inView: isLoadMorePhotosButtonInView } = useInView();

  const [photosPerPage, setPhotosPerPage] = useState(10);
  const [unsplashPhotoChunks, setUnsplashPhotoChunks] = useState<UnsplashPhotoChunks>({} as UnsplashPhotoChunks);
  const [orderBy, setOrderBy] = useState<OrderByOption>('latest');

  const getUnsplashPhotos = async ({ pageParam = 1 }) => {
    const unsplashPhotos = await UnsplashService.getPhotos({ page: pageParam, itemsPerPage: photosPerPage, orderBy });

    if (pageParam === 1 && !unsplashPhotos?.length) {
      setUnsplashPhotoChunks({} as UnsplashPhotoChunks);
      return;
    }

    if (pageParam === 1 && unsplashPhotos?.length) {
      const [firstColumn, secondColumn, thirdColumn] = splitArrayToChunks(unsplashPhotos, 3);
      setUnsplashPhotoChunks({ firstColumn, secondColumn, thirdColumn });
      return;
    }

    if (!unsplashPhotos?.length) {
      return;
    }

    const [firstColumn, secondColumn, thirdColumn] = splitArrayToChunks(unsplashPhotos, 3);

    setUnsplashPhotoChunks(prevState => ({
      firstColumn: [...prevState.firstColumn, ...firstColumn],
      secondColumn: [...prevState.secondColumn, ...secondColumn],
      thirdColumn: [...prevState.thirdColumn, ...thirdColumn]
    }));
  };

  const unsplashPhotosQuery = useInfiniteQuery(['unsplash-photos', photosPerPage, orderBy], getUnsplashPhotos, {
    getNextPageParam: (lastPage: any, allPages) =>
      (lastPage?.data?.length || 0) <= photosPerPage ? allPages.length + 1 : undefined
  });

  useEffect(() => {
    if (isLoadMorePhotosButtonInView && !unsplashPhotosQuery.isFetchingNextPage) {
      unsplashPhotosQuery.fetchNextPage();
    }
  }, [isLoadMorePhotosButtonInView, unsplashPhotosQuery]);

  return (
    <Box w="100%" h="100vh">
      <NavBar />

      <Hero />

      <Box w="100%" maxW="1080px" mx="auto" px="16px" py="32px">
        {(() => {
          if (unsplashPhotosQuery.isLoading) {
            return (
              <Alert status="loading" variant="left-accent" borderRadius="16px">
                <Spinner />
                Carregando fotos...
              </Alert>
            );
          }

          if (unsplashPhotosQuery.isError) {
            return (
              <Alert status="error" variant="left-accent" borderRadius="16px">
                <AlertIcon />
                Ocorreu um erro ao carregar as fotos. Recarregue a página e tente novamente.
              </Alert>
            );
          }

          if (unsplashPhotosQuery.isSuccess && !unsplashPhotoChunks?.firstColumn?.length) {
            return (
              <Alert status="info" variant="left-accent" borderRadius="16px">
                <AlertIcon />
                Nenhuma foto encontrada.
              </Alert>
            );
          }

          return (
            <VStack spacing="24px">
              <HStack w="100%" justifyContent="flex-end" spacing="16px">
                <Select
                  w="fit-content"
                  variant="filled"
                  size={{ base: 'sm', md: 'md' }}
                  value={photosPerPage}
                  onChange={event => setPhotosPerPage(Number(event.target.value))}
                >
                  <option value="10">10 fotos por vez</option>
                  <option value="25">25 fotos por vez</option>
                  <option value="50">50 fotos por vez</option>
                </Select>

                <Select
                  w="fit-content"
                  variant="filled"
                  size={{ base: 'sm', md: 'md' }}
                  value={orderBy}
                  onChange={event => setOrderBy(event.target.value as OrderByOption)}
                >
                  <option value="latest">Mais recentes</option>
                  <option value="oldest">Mais antigos</option>
                  <option value="popular">Populares</option>
                </Select>
              </HStack>

              <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={{ base: '16px', md: '24px' }}
                alignItems="flex-start"
              >
                <VStack spacing={{ base: '16px', md: '24px' }}>
                  {unsplashPhotoChunks.firstColumn.map(image => (
                    <ImageCard key={image.id} image={image} />
                  ))}
                </VStack>

                <VStack spacing={{ base: '16px', md: '24px' }}>
                  {unsplashPhotoChunks.secondColumn.map(image => (
                    <ImageCard key={image.id} image={image} />
                  ))}
                </VStack>

                <VStack spacing={{ base: '16px', md: '24px' }}>
                  {unsplashPhotoChunks.thirdColumn.map(image => (
                    <ImageCard key={image.id} image={image} />
                  ))}
                </VStack>
              </Stack>

              {!!unsplashPhotosQuery.hasNextPage && (
                <Center py="40px">
                  <Button
                    ref={loadMorePhotosButtonRef}
                    onClick={() => unsplashPhotosQuery.fetchNextPage()}
                    isLoading={unsplashPhotosQuery.isFetchingNextPage}
                    loadingText="Carregando mais..."
                  >
                    Carregar mais
                  </Button>
                </Center>
              )}
            </VStack>
          );
        })()}
      </Box>
    </Box>
  );
};
