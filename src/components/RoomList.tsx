// Libs
import { IconDotsVertical } from '@tabler/icons-react';
import type { ColumnDef, useReactTable } from '@tanstack/react-table';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

// Components
import { DataTableDefault, type DataTableDefaultQuery } from '@/components/DataTableDefault';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Others
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getRooms } from '@/features/room/roomThunk';
import { PATHS } from '@/utils/constants/paths';
import type { Room } from '@/types/room';
import { EMPTY_CELL_VALUE } from '@/utils/constants/common';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/libs/utils';
import { useQueryParams } from '@/hooks/useQueryParams';
import type { RoomQuery } from '@/types/query';
import { ROOM_QUERY_DEFAULT } from '@/utils/constants/query';
import { vndFormat } from '@/utils/helpers/currencyHelper';

export const columns: ColumnDef<Room>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className="flex items-center pl-2">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="rounded"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center pl-2">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="rounded"
        />
      </div>
    ),
    size: 30,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'roomName',
    header: 'Phòng',
    cell: ({ row }) => (
      <div className="capitalize font-semibold">{row.getValue('roomName') || EMPTY_CELL_VALUE}</div>
    ),
  },
  {
    accessorKey: 'apartmentName',
    header: 'Chung cư mini',
    cell: ({ row }) => (
      <div className="capitalize">{row.original.apartment.name || EMPTY_CELL_VALUE}</div>
    ),
  },
  {
    accessorKey: 'electricityPrice',
    header: () => <div className="text-right">Đơn giá điện</div>,
    cell: ({ row }) => {
      const { electricityPrice } = row.original;
      return <div className="text-right">{vndFormat.format(electricityPrice)}</div>;
    },
  },
  {
    accessorKey: 'waterPrice',
    header: () => <div className="text-right">Đơn giá nước</div>,
    cell: ({ row }) => {
      const { waterPrice } = row.original;
      return <div className="text-right">{vndFormat.format(waterPrice)}</div>;
    },
  },
  {
    accessorKey: 'price',
    header: () => <div className="text-right">Giá thuê</div>,
    cell: ({ row }) => {
      const { price } = row.original;
      return <div className="text-right font-semibold">{vndFormat.format(price)}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: () => <div className="text-left">Trạng thái</div>,
    cell: ({ row }) => {
      const STATUS_CONFIG = {
        AVAILABLE: {
          label: 'Phòng trống',
          className: 'bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400 ',
        },
        OCCUPIED: {
          label: 'Đang ở',
          className: 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400',
        },
        MAINTENANCE: {
          label: 'Bảo trì',
          className: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400',
        },
      };

      const status = row.original.status as keyof typeof STATUS_CONFIG;

      const config = STATUS_CONFIG[status] || EMPTY_CELL_VALUE;

      return (
        <Badge
          className={cn(
            'flex items-center gap-1.5 px-2 py-1 capitalize w-fit font-medium pointer-events-none',
            config.className
          )}
        >
          <span>{config.label}</span>
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    size: 50,
    cell: () => {
      return (
        <div className=" flex items-center justify-end pr-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                size={'icon'}
              >
                <IconDotsVertical />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
              <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Xoá</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

const RenderToolbarRight = (table: ReturnType<typeof useReactTable<Room>>) => {
  const navigate = useNavigate();
  const selected = table.getSelectedRowModel().rows;

  const handleNavigateCreateForm = () => {
    navigate(PATHS.PAGE.ROOMS.CREATE);
  };

  return (
    <div className="flex items-center gap-4">
      {selected.length > 0 && (
        <Button
          variant="destructive"
          disabled={selected.length === 0}
          onClick={() => console.log(selected)}
        >
          Xoá mục đã chọn ({selected.length})
        </Button>
      )}

      <Button onClick={handleNavigateCreateForm}>Thêm mới</Button>
    </div>
  );
};

const RoomList = () => {
  const dispatch = useAppDispatch();
  const { rooms, pagination, loading: roomLoading } = useAppSelector((state) => state.room);

  const { query, setQuery } = useQueryParams<RoomQuery>();

  const page = Number(query.page ?? ROOM_QUERY_DEFAULT.page);
  const limit = Number(query.limit ?? ROOM_QUERY_DEFAULT.limit);
  const search = query.search;

  useEffect(() => {
    const params = {
      page,
      limit,
      search,
    };

    dispatch(getRooms(params));
  }, [dispatch, page, limit, search]);

  const handleRowClick = (room: Room) => {
    console.log(`Clicked room: `, room);
  };

  const handleQueryChange = (newQuery: DataTableDefaultQuery) => {
    console.log(`Query: ${JSON.stringify(newQuery)}`);

    const currentSearch = query.search || '';
    const incomingSearch = newQuery.search || '';

    const isSearching = incomingSearch !== currentSearch;

    const targetPage = isSearching ? 1 : newQuery.page;

    setQuery(
      { page: targetPage, limit: newQuery.limit, search: newQuery.search },
      { replace: isSearching }
    );
  };

  return (
    <DataTableDefault
      data={rooms || []}
      columns={columns}
      totalCount={pagination.total}
      onRowClick={handleRowClick}
      getRowId={(room, index) => room._id || `row-${index}`}
      loading={roomLoading.getList}
      renderToolbarRight={RenderToolbarRight}
      onQueryChange={handleQueryChange}
      defaultPage={page}
      defaultPageSize={limit}
      defaultSearch={search ?? ''}
    />
  );
};

export default RoomList;
