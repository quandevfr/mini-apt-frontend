import * as React from 'react';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import { Search, Settings2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from '@tabler/icons-react';
import { useDebounce } from 'use-debounce';
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';

export interface DataTableDefaultQuery {
  search?: string;
  page: number;
  limit: number;
  sorting?: SortingState;
  filters?: ColumnFiltersState;
}

export interface DataTableDefaultProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  getRowId?: (row: T, index: number) => string;
  onRowClick?: (row: T) => void;
  loading?: boolean;
  totalCount: number;
  defaultPage?: number;
  defaultPageSize?: number;
  defaultSearch?: string;

  // Toolbar
  renderToolbarLeft?: (table: ReturnType<typeof useReactTable<T>>) => React.ReactNode;
  renderToolbarRight?: (table: ReturnType<typeof useReactTable<T>>) => React.ReactNode;

  enableSearch?: boolean;
  enableFilters?: boolean;
  enablePagination?: boolean;
  enableColumnVisibility?: boolean;
  enableRowSelection?: boolean;
  enableColumnResizing?: boolean;
  enableColumnReorder?: boolean;

  onQueryChange?: (query: DataTableDefaultQuery) => void;
}

const TableSkeleton = ({ colCount }: { colCount: number }) => {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <TableRow key={i}>
          {Array.from({ length: colCount }).map((_, j) => (
            <TableCell key={j}>
              <div className="h-5 w-full animate-pulse bg-muted rounded-md" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export function DataTableDefault<T>({
  columns,
  data,
  // getRowId = (row: T, index: number) => `row-${index}`,
  getRowId = (_, index: number) => `row-${index}`,
  onRowClick,
  loading,
  totalCount,
  renderToolbarLeft,
  renderToolbarRight,
  enableColumnVisibility = true,
  enableSearch = true,
  enablePagination = true,
  onQueryChange,
  defaultPage = 1,
  defaultPageSize = 10,
  defaultSearch = '',
}: DataTableDefaultProps<T>) {
  const [searchKey, setSearchKey] = React.useState<string>(defaultSearch);
  const [debounceSearchKey] = useDebounce(searchKey, 500);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pageIndex, setPageIndex] = React.useState<number>(defaultPage - 1);
  const [pageSize, setPageSize] = React.useState<number>(defaultPageSize);

  const table = useReactTable({
    data,
    columns,
    getRowId,
    pageCount: Math.ceil(totalCount / pageSize),

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex,
        pageSize,
      },
    },

    // Server side
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === 'function' ? updater({ pageIndex, pageSize }) : updater;

      setPageIndex(newPagination.pageIndex);
      setPageSize(newPagination.pageSize);
    },

    getCoreRowModel: getCoreRowModel(),
  });

  const firstRender = React.useRef(true);

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    onQueryChange?.({
      search: debounceSearchKey,
      page: pageIndex + 1,
      limit: pageSize,
      sorting,
      filters: columnFilters,
    });
  }, [debounceSearchKey, pageIndex, pageSize, sorting, columnFilters]);

  return (
    <div className="w-full">
      <div className="flex items-center pb-4 pt-1 gap-4">
        <div className="flex items-center gap-4 flex-1">
          {renderToolbarLeft && renderToolbarLeft(table)}

          {enableSearch && (
            <div className="relative max-w-sm">
              <InputGroup>
                <InputGroupInput
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="sm:w-[250px]"
                  onChange={(event) => setSearchKey(event.target.value)}
                />

                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
              </InputGroup>
            </div>
          )}
        </div>

        <div className="ml-auto flex items-center gap-4">
          {enableColumnVisibility && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  <Settings2 />
                  Xem cột
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {renderToolbarRight && renderToolbarRight(table)}
        </div>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table className="min-w-5xl">
          <TableHeader className="bg-muted sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} style={{ width: header.getSize() }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableSkeleton colCount={columns.length} />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {enablePagination && (
        <div className="flex items-center justify-between space-x-2 p-4">
          <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} trên{' '}
            {table.getFilteredRowModel().rows.length} hàng được chọn.
          </div>

          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Số hàng trên mỗi trang
              </Label>

              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="w-20" id="rows-per-page">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>

                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Trang {table.getState().pagination.pageIndex + 1} trên {table.getPageCount()}
            </div>

            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft />
              </Button>

              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft />
              </Button>

              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <IconChevronRight />
              </Button>

              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
