// Libs
import { IconDotsVertical } from '@tabler/icons-react';
import type { ColumnDef, useReactTable } from '@tanstack/react-table';
import { useNavigate } from 'react-router';
import React, { useEffect } from 'react';

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
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from '@/components/ui/combobox';
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Badge } from '@/components/ui/badge';

// Others
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getRooms } from '@/features/room/roomThunk';
import { PATHS } from '@/utils/constants/paths';
import type { Room } from '@/types/room';
import { EMPTY_CELL_VALUE } from '@/utils/constants/common';
import { cn } from '@/libs/utils';
import { useQueryParams } from '@/hooks/useQueryParams';
import type { RoomQuery } from '@/types/query';
import { ROOM_QUERY_DEFAULT } from '@/utils/constants/query';
import { vndFormat } from '@/utils/helpers/currencyHelper';
import { ROOM_STATUS } from '@/pages/room/roomSchema';
import { ChevronDown, Funnel, Plus } from 'lucide-react';
import type { Item } from '@/types/common';
import { getApartments } from '@/features/apartment/apartmentThunk';

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
      <div className="capitalize">{row.getValue('roomName') || EMPTY_CELL_VALUE}</div>
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
      return (
        <div className="inline-flex items-baseline justify-end w-full gap-0.5">
          <span>{vndFormat.format(electricityPrice).trim()}</span>
          <span className="text-muted-foreground">/kWh</span>
        </div>
      );
    },
    size: 100,
  },
  {
    accessorKey: 'waterPrice',
    header: () => <div className="text-right">Đơn giá nước</div>,
    cell: ({ row }) => {
      const { waterPrice, waterCalculationType } = row.original;

      return (
        <div className="inline-flex items-baseline justify-end w-full gap-0.5">
          <span>{vndFormat.format(waterPrice).trim()}</span>
          <span className="text-muted-foreground">
            {waterCalculationType === 'PER_CUBIC' ? '/m³' : '/người'}
          </span>
        </div>
      );
    },
    size: 100,
  },
  {
    accessorKey: 'price',
    header: () => <div className="text-right">Giá thuê</div>,
    cell: ({ row }) => {
      const { price } = row.original;

      return (
        <div className="inline-flex items-baseline justify-end w-full gap-0.5">
          <span className="font-semibold">{vndFormat.format(price).trim()}</span>
          <span className="text-muted-foreground">/tháng</span>
        </div>
      );
    },
    size: 100,
  },
  {
    accessorKey: 'status',
    header: () => <div className="text-left pl-12">Trạng thái</div>,
    cell: ({ row }) => {
      const STATUS_CONFIG = {
        AVAILABLE: {
          label: 'Sẵn sàng',
          className: 'dark:bg-status-success-dark bg-status-success text-status-success-foreground',
        },
        OCCUPIED: {
          label: 'Đang sử dụng',
          className: 'dark:bg-status-info bg-status-info text-status-info-foreground',
        },
        MAINTENANCE: {
          label: 'Bảo trì',
          className: 'dark:bg-status-warning bg-status-warning text-status-warning-foreground',
        },
      };

      const status = row.original.status as keyof typeof STATUS_CONFIG;

      const config = STATUS_CONFIG[status] || EMPTY_CELL_VALUE;

      return (
        <div className="pl-12">
          <Badge
            className={cn(
              'flex items-center gap-1.5 px-2 py-1 capitalize w-fit font-medium pointer-events-none',
              config.className
            )}
          >
            <span className="text-nowrap">{config.label}</span>
          </Badge>
        </div>
      );
    },
    size: 100,
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

      <Button className={cn('btn-press-effect')} onClick={handleNavigateCreateForm}>
        <Plus /> <span className={cn('hidden md:block')}>Thêm mới</span>
      </Button>
    </div>
  );
};

const FilterFields = ({ className }: { className?: string }) => {
  const { query, setQuery, removeQuery } = useQueryParams<RoomQuery>();

  const { apartments, loading: apartmentLoading } = useAppSelector((state) => state.apartment);

  const hasFilter = !!(query.apartmentId || query.status);

  const selectedApt = (
    apartments.map((apt) => ({ label: apt.name, value: apt._id })) as Item[]
  ).find((apt) => apt.value === query.apartmentId);

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <Select
        value={query.status || ''}
        onValueChange={(value: string) => setQuery({ status: value, page: 1 })}
      >
        <SelectTrigger className={cn('w-full xl:w-[150px]')}>
          <SelectValue placeholder="Trạng thái" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {ROOM_STATUS.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Combobox
        key={query.apartmentId}
        items={apartments.map((apt) => ({ label: apt.name, value: apt._id })) as Item[]}
        itemToStringValue={(apt: Item) => apt.label}
        value={selectedApt}
        onValueChange={(item) => {
          setQuery({ apartmentId: item?.value, page: 1 });
        }}
      >
        <ComboboxTrigger
          render={
            <Button
              variant="outline"
              className={cn(
                'justify-between font-normal w-full xl:w-[250px]',
                !selectedApt && 'text-muted-foreground hover:text-muted-foreground'
              )}
            >
              <ComboboxValue placeholder="Chung cư mini" />

              {apartmentLoading.getList ? (
                <Spinner />
              ) : (
                <ChevronDown className="w-4 h-4 opacity-50" />
              )}
            </Button>
          }
        />

        <ComboboxContent>
          <ComboboxInput showTrigger={false} placeholder="Chung cư mini" />

          <ComboboxEmpty>Không có dữ liệu.</ComboboxEmpty>

          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.value} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      {hasFilter && (
        <Button
          variant={'destructive'}
          className={cn('btn-press-effect')}
          onClick={() => removeQuery(['status', 'apartmentId'])}
        >
          Xóa bộ lọc
        </Button>
      )}
    </div>
  );
};

const RenderToolbarLeft = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const apartmentParams = { isGetAll: true };
    dispatch(getApartments(apartmentParams));
  }, [dispatch]);

  return (
    <React.Fragment>
      <FilterFields className={cn('hidden xl:flex')} />

      <div className={cn('xl:hidden')}>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={'outline'}>
              <Funnel />
            </Button>
          </PopoverTrigger>

          <PopoverContent align="start">
            <PopoverHeader>
              <PopoverTitle>Bộ lọc</PopoverTitle>
            </PopoverHeader>

            <FilterFields className="flex flex-col items-end gap-4" />
          </PopoverContent>
        </Popover>
      </div>
    </React.Fragment>
  );
};

const RoomList = () => {
  const dispatch = useAppDispatch();
  const { rooms, pagination, loading: roomLoading } = useAppSelector((state) => state.room);

  const { query, setQuery } = useQueryParams<RoomQuery>();

  const page = Number(query.page ?? ROOM_QUERY_DEFAULT.page);
  const limit = Number(query.limit ?? ROOM_QUERY_DEFAULT.limit);
  const search = query.search;
  const status = query.status;
  const apartmentId = query.apartmentId;

  useEffect(() => {
    const params = {
      page,
      limit,
      search,
      status,
      apartmentId,
    };

    dispatch(getRooms(params));
  }, [dispatch, page, limit, search, status, apartmentId]);

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
      renderToolbarLeft={RenderToolbarLeft}
      onQueryChange={handleQueryChange}
      defaultPage={page}
      defaultPageSize={limit}
      defaultSearch={search ?? ''}
    />
  );
};

export default RoomList;
