// Libs
import {
  IconAlertTriangleFilled,
  IconCircleCheckFilled,
  IconDots,
  IconExclamationCircleFilled,
} from '@tabler/icons-react';
import type { ColumnDef, useReactTable } from '@tanstack/react-table';

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
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useNavigate } from 'react-router';
import { getApartments } from '@/features/apartment/apartmentThunk';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { PATHS } from '@/utils/constants/paths';
import type { GetApartmentsResponse } from '@/types/apartment';
import { Badge } from '@/components/ui/badge';
import { formatPhoneVN } from '@/utils/helpers';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { EMPTY_CELL_VALUE } from '@/utils/constants/common';
import { useQueryParams } from '@/hooks/useQueryParams';
import type { ApartmentQuery } from '@/types/query';
import { APARTMENT_QUERY_DEFAULT } from '@/utils/constants/query';

export const columns: ColumnDef<GetApartmentsResponse>[] = [
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
    accessorKey: 'name',
    header: 'Tên chung cư mini',
    cell: ({ row }) => (
      <div className="capitalize font-semibold">{row.getValue('name') || EMPTY_CELL_VALUE}</div>
    ),
  },
  {
    accessorKey: 'address',
    header: 'Địa chỉ',
    cell: ({ row }) => (
      <div className="capitalize">{`${row.original.address.street}, ${row.original.address.wardName}, ${row.original.address.provinceName}`}</div>
    ),
    minSize: 200,
  },
  {
    accessorKey: 'totalRooms',
    header: () => <div className="text-center">Số phòng</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue('totalRooms') ?? EMPTY_CELL_VALUE}</div>
    ),
    size: 100,
  },
  {
    accessorKey: 'availableRooms',
    header: () => <div className="text-center">Còn trống</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center">
        {row.getValue('availableRooms') ?? EMPTY_CELL_VALUE}
      </div>
    ),
    size: 100,
  },
  {
    accessorKey: 'status',
    header: () => <div className="text-left">Trạng thái</div>,
    cell: ({ row }) => {
      const STATUS_CONFIG = {
        active: {
          label: 'Hoạt động',
          className: 'bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400 ',
          Icon: <IconCircleCheckFilled className="text-green-500 dark:text-green-400 size-4" />,
        },
        inactive: {
          label: 'Ngưng hoạt động',
          className: 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400',
          Icon: <IconExclamationCircleFilled className="text-red-500 dark:text-red-400 size-4" />,
        },
        suspended: {
          label: 'Tạm dừng vận hành',
          className: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400',
          Icon: <IconAlertTriangleFilled className="text-amber-500 dark:text-amber-400 size-4" />,
        },
      };

      const status = row.original.status as keyof typeof STATUS_CONFIG;

      const config = STATUS_CONFIG[status] || STATUS_CONFIG.inactive;

      return (
        <Badge
          className={cn(
            'flex items-center gap-1.5 px-2 py-1 capitalize w-fit font-medium pointer-events-none',
            config.className
          )}
        >
          {config.Icon}
          <span>{config.label}</span>
        </Badge>
      );
    },
  },
  {
    accessorKey: 'contact',
    header: () => <div className="text-left">Quản lý</div>,
    cell: ({ row }) => (
      <div className="flex flex-col gap-2">
        <p className="font-semibold">{EMPTY_CELL_VALUE}</p>
        <p className="text-neutral-600 font-semibold">{EMPTY_CELL_VALUE}</p>
      </div>
    ),
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
                <IconDots />
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

const RenderToolbarRight = (table: ReturnType<typeof useReactTable<GetApartmentsResponse>>) => {
  const navigate = useNavigate();

  const selected = table.getSelectedRowModel().rows;

  const handleNavigateToCreate = () => {
    navigate(PATHS.PAGE.APARTMENTS.CREATE);
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

      <Button onClick={handleNavigateToCreate}>
        <Plus /> Thêm mới
      </Button>
    </div>
  );
};

const ApartmentPage = () => {
  const dispatch = useAppDispatch();
  const { apartments, pagination, isLoading } = useAppSelector((state) => state.apartment);

  const { query, setQuery } = useQueryParams<ApartmentQuery>();

  const page = Number(query.page ?? APARTMENT_QUERY_DEFAULT.page);
  const limit = Number(query.limit ?? APARTMENT_QUERY_DEFAULT.limit);
  const search = query.search;

  useEffect(() => {
    const params = {
      page,
      limit,
      search,
    };

    dispatch(getApartments(params));
  }, [dispatch, page, limit, search]);

  const handleRowClick = (apartment: GetApartmentsResponse) => {
    console.log(`Clicked apartment: `, apartment);
  };

  const handleQueryChange = (newQuery: DataTableDefaultQuery) => {
    console.log(`Query: ${JSON.stringify(newQuery)}`);

    setQuery({ page: newQuery.page, limit: newQuery.limit, search: newQuery.search });
  };

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <Tabs defaultValue="outline" className="w-full flex-col justify-start gap-6">
          <TabsContent
            value="outline"
            className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
          >
            <DataTableDefault
              data={apartments || []}
              columns={columns}
              totalCount={pagination.total}
              onRowClick={handleRowClick}
              getRowId={(payment, index) => payment._id || `row-${index}`}
              loading={isLoading}
              renderToolbarRight={RenderToolbarRight}
              onQueryChange={handleQueryChange}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ApartmentPage;
