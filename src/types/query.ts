export interface BaseQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  isGetAll?: boolean;
}

export type ApartmentQuery = Pick<BaseQuery, 'page' | 'limit' | 'search' | 'isGetAll'>;
export type RoomQuery = Pick<BaseQuery, 'page' | 'limit' | 'search' | 'isGetAll'>;
