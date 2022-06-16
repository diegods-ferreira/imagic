import axios from 'axios';

import { UnsplashImage } from '../models/unsplash-image.model';

export type OrderByOption = 'latest' | 'oldest' | 'popular';

interface GetParams {
  page?: number;
  itemsPerPage?: number;
  orderBy?: OrderByOption;
}

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com',
  timeout: 10_000,
  headers: {
    Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
  }
});

export const getPhotos = async ({ page, itemsPerPage, orderBy }: GetParams = {}): Promise<UnsplashImage[]> => {
  const response = await unsplashApi.get<UnsplashImage[]>('/photos', {
    params: { page, per_page: itemsPerPage, order_by: orderBy }
  });

  return response.data;
};
