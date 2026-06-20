export interface BaseQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export type ApartmentQuery = Pick<BaseQuery, 'page' | 'limit' | 'search'>;
