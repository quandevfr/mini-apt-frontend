export interface Item {
  label: string;
  value: string;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface PaginationResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ApiGetListResponse<T> {
  items: T;
  pagination: PaginationResponse;
}

export interface GetListParams {
  page?: number;
  limit?: number;
  search?: string;
}
