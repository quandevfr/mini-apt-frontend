// Libs
import { IconDotsVertical } from '@tabler/icons-react';
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
import { PATH } from '@/utils/paths';
import { getApartments } from '@/features/apartment/apartmentThunk';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { RootState } from '@/store/rootReducer';

export type Apartment = {
  id: string;
  code: string;
  name: string;
  address: string;
  numberOfRooms: number;
  numberOfAvailableRooms: number;
};

// const data: Apartment[] = [];

export const columns: ColumnDef<Apartment>[] = [
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
    accessorKey: 'code',
    header: 'Code',
    cell: ({ row }) => <div className="capitalize">{row.getValue('code')}</div>,
    size: 80,
  },
  {
    accessorKey: 'name',
    header: 'Tên chung cư mini',
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'address',
    header: 'Địa chỉ',
    cell: ({ row }) => <div className="capitalize">{row.getValue('address')}</div>,
  },
  {
    accessorKey: 'numberOfRooms',
    header: () => <div className="text-right">Số lượng phòng</div>,
    cell: ({ row }) => {
      return <div className="text-right">{row.getValue('numberOfRooms')}</div>;
    },
    size: 100,
  },
  {
    accessorKey: 'numberOfAvailableRooms',
    header: () => <div className="text-right">Số lượng phòng trống</div>,
    cell: ({ row }) => {
      return <div className="text-right font-medium">{row.getValue('numberOfAvailableRooms')}</div>;
    },
    size: 130,
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

const RenderToolbarRight = (table: ReturnType<typeof useReactTable<Apartment>>) => {
  const navigate = useNavigate();

  const selected = table.getSelectedRowModel().rows;

  const handleNavigateToCreate = () => {
    navigate(PATH.PAGE.APARTMENTS.CREATE);
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

      <Button onClick={handleNavigateToCreate}>Thêm mới</Button>
    </div>
  );
};

const ApartmentPage = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state: RootState) => state.apartment.loading);
  const list = useAppSelector((state: RootState) => state.apartment.list);

  useEffect(() => {
    dispatch(getApartments());
  }, [dispatch]);

  const handleRowClick = (apartment: Apartment) => {
    console.log(`Clicked apartment: `, apartment);
  };

  const handleQueryChange = (query: DataTableDefaultQuery) => {
    console.log(`Query: ${JSON.stringify(query)}`);
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
              data={list ?? []}
              columns={columns}
              totalCount={55}
              onRowClick={handleRowClick}
              getRowId={(payment, index) => payment.id || `row-${index}`}
              loading={loading}
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
