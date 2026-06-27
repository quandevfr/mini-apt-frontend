import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';

type QueryValue = string | number | boolean | null | undefined;
type QueryRecord = Record<string, QueryValue>;

export const useQueryParams = <T extends QueryRecord>() => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = useMemo(
    () => Object.fromEntries(searchParams.entries()) as Partial<T>,
    [searchParams]
  );

  const setQuery = useCallback(
    (newQuery: Partial<T>, options?: { replace?: boolean }) => {
      setSearchParams(
        (prev) => {
          const allParams: QueryRecord = {
            ...Object.fromEntries(prev.entries()),
            ...newQuery,
          };
          return Object.fromEntries(
            Object.entries(allParams)
              .filter(([, value]) => value !== undefined && value !== null && value !== '')
              .map(([key, value]) => [key, String(value)])
          );
        },
        { replace: options?.replace ?? false }
      );
    },
    [setSearchParams]
  );

  const removeQuery = useCallback(
    (keys: (keyof T)[]) => {
      setSearchParams(
        (prev) => {
          const current = Object.fromEntries(prev.entries());
          keys.forEach((k) => delete current[k as string]);
          return current;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  return { query, setQuery, removeQuery };
};
