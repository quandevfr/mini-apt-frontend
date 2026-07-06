export interface BaseQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  isGetAll?: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type ApartmentQuery = Pick<BaseQuery, 'page' | 'limit' | 'search' | 'isGetAll'>;
export interface RoomQuery extends Omit<BaseQuery, 'sortBy' | 'sortOrder'> {
  apartmentId?: string;
  status?: string;
}
