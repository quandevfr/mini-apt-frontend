// Libs
import {
  IconAlertTriangleFilled,
  IconCircleCheckFilled,
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
import {
  deleteApartment,
  deleteApartments,
  getApartments,
} from '@/features/apartment/apartmentThunk';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { PATHS } from '@/utils/constants/paths';
import type { GetApartmentsResponse } from '@/types/apartment';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { MoreHorizontalIcon, Plus, Trash2Icon } from 'lucide-react';
import { EMPTY_CELL_VALUE } from '@/utils/constants/common';
import { useQueryParams } from '@/hooks/useQueryParams';
import type { ApartmentQuery } from '@/types/query';
import { APARTMENT_QUERY_DEFAULT } from '@/utils/constants/query';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { useCustomNavigate } from '@/hooks/useCustomNavigate';

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
    header: 'Chung cư mini',
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
    cell: () => (
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
    cell: ({ row }) => {
      return (
        <div onClick={(e) => e.stopPropagation()}>
          <ActionMenu apartment={row.original} />
        </div>
      );
    },
  },
];

const ActionMenu = ({ apartment }: { apartment: GetApartmentsResponse }) => {
  const dispatch = useAppDispatch();
  const appNavigate = useCustomNavigate();
  const { query } = useQueryParams<ApartmentQuery>();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

  const page = Number(query.page ?? APARTMENT_QUERY_DEFAULT.page);
  const limit = Number(query.limit ?? APARTMENT_QUERY_DEFAULT.limit);
  const search = query.search;

  const apartmentId = apartment._id;
  const apartmentName = apartment.name;

  const handleDeleteApartment = async () => {
    if (!apartmentId) return;

    const deletePromise = dispatch(deleteApartment(apartmentId)).unwrap();

    toast.promise(deletePromise, {
      loading: `Đang xóa ${apartmentName}...`,
      success: () => `Đã xóa ${apartmentName}`,
      error: () => `Xóa ${apartmentName} thất bại`,
    });

    setIsDeleteConfirm(false);

    try {
      await deletePromise;

      dispatch(getApartments({ page, limit, search }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateApartment = () => {
    if (!apartmentId) return;

    appNavigate(`/apartments/${apartmentId}/edit`);
  };

  const handleViewApartmentDetail = () => {
    if (!apartmentId) return;

    appNavigate(`/apartments/${apartmentId}`);
  };

  return (
    <div className=" flex items-center justify-end pr-2">
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size={'icon'}
          >
            <MoreHorizontalIcon />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-32"
          onCloseAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();

              setIsDropdownOpen(false);

              handleViewApartmentDetail();
            }}
          >
            Chi tiết
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();

              setIsDropdownOpen(false);

              handleUpdateApartment();
            }}
          >
            Chỉnh sửa
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => {
              setIsDropdownOpen(false);

              setTimeout(() => {
                setIsDeleteConfirm(true);
              }, 0);
            }}
          >
            Xoá
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isDeleteConfirm} onOpenChange={setIsDeleteConfirm}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <Trash2Icon />
            </AlertDialogMedia>

            <AlertDialogTitle>Xóa chung cư mini?</AlertDialogTitle>

            <AlertDialogDescription>
              {`Bạn có chắc chắn muốn xóa ${apartmentName} không?`}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel variant="outline" onClick={() => setIsDeleteConfirm(false)}>
              Bỏ qua
            </AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleDeleteApartment}>
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

const RenderToolbarRight = (table: ReturnType<typeof useReactTable<GetApartmentsResponse>>) => {
  const appNavigate = useCustomNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.apartment);
  const { query } = useQueryParams<ApartmentQuery>();

  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

  const page = Number(query.page ?? APARTMENT_QUERY_DEFAULT.page);
  const limit = Number(query.limit ?? APARTMENT_QUERY_DEFAULT.limit);
  const search = query.search;
  const selected = table.getSelectedRowModel().rows;
  const ids = selected.map((s) => s.original._id).filter(Boolean) as string[];

  const handleNavigateToCreate = () => {
    appNavigate(PATHS.PAGE.APARTMENTS.CREATE);
  };

  const handleDeleteApartments = async () => {
    if (ids.length === 0) return;

    const deletePromise = dispatch(deleteApartments({ ids })).unwrap();

    toast.promise(deletePromise, {
      loading: `Đang xóa ${selected.length} chung cư mini...`,
      success: () => `Đã xóa ${selected.length} chung cư mini`,
      error: () => `Xóa chung cư mini thất bại`,
    });

    setIsDeleteConfirm(false);

    try {
      await deletePromise;

      table.resetRowSelection();

      dispatch(getApartments({ page, limit, search }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {selected.length > 0 && (
        <>
          <Button
            variant="destructive"
            size={'lg'}
            disabled={isLoading || selected.length === 0}
            onClick={(e) => {
              e.preventDefault();
              setIsDeleteConfirm(true);
            }}
          >
            {`Xoá mục đã chọn (${selected.length})`}
          </Button>

          <AlertDialog open={isDeleteConfirm} onOpenChange={setIsDeleteConfirm}>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                  <Trash2Icon />
                </AlertDialogMedia>

                <AlertDialogTitle>Delete chung cư mini?</AlertDialogTitle>

                <AlertDialogDescription>
                  {`Bạn có chắc chắn muốn xóa (${selected.length}) chung cư mini đã chọn không?`}
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel variant="outline" onClick={() => setIsDeleteConfirm(false)}>
                  Bỏ qua
                </AlertDialogCancel>
                <AlertDialogAction variant="destructive" onClick={handleDeleteApartments}>
                  Xóa
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
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
