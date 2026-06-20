import type { ApartmentQuery, BaseQuery } from '@/types/query';

// Query
export const BASE_QUERY_DEFAULT: BaseQuery = {
  page: 1,
  limit: 10,
  search: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

export const APARTMENT_QUERY_DEFAULT: ApartmentQuery = {
  page: 1,
  limit: 10,
  search: '',
};
