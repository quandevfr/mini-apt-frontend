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
import { PATH } from '@/utils/paths';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { RootState } from '@/store/rootReducer';
import { getRooms } from '@/features/room/roomThunk';

export type Room = {
  id: string;
  code: string;
  name: string;
  apartmentId: string;
  numberOfTenant: number;
  previousMeterNumber: number;
  currentMeterNumber: number;
  previousWaterNumber: number;
  currentWaterNumber: number;
};

// const data: Room[] = [
//   {
//     id: '1',
//     code: '201',
//     name: 'Phòng 201',
//     apartmentId: '1',
//     numberOfTenant: 2,
//     previousMeterNumber: 295,
//     currentMeterNumber: 525,
//     previousWaterNumber: 56,
//     currentWaterNumber: 63,
//   },
//   {
//     id: '2',
//     code: '202',
//     name: 'Phòng 202',
//     apartmentId: '1',
//     numberOfTenant: 2,
//     previousMeterNumber: 1254,
//     currentMeterNumber: 1442,
//     previousWaterNumber: 123,
//     currentWaterNumber: 135,
//   },
//   {
//     id: '1',
//     code: '203',
//     name: 'Phòng 203',
//     apartmentId: '1',
//     numberOfTenant: 2,
//     previousMeterNumber: 245,
//     currentMeterNumber: 455,
//     previousWaterNumber: 34,
//     currentWaterNumber: 46,
//   },
// ];

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
    accessorKey: 'code',
    header: 'Code',
    cell: ({ row }) => <div className="capitalize">{row.getValue('code')}</div>,
    size: 80,
  },
  {
    accessorKey: 'name',
    header: 'Tên phòng',
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'numberOfTenant',
    header: () => <div className="text-right">Số người ở</div>,
    cell: ({ row }) => {
      return <div className="text-right">{row.getValue('numberOfTenant')}</div>;
    },
    size: 150,
  },
  {
    accessorKey: 'totalElectric',
    header: () => <div className="text-right">Tổng số điện sử dụng (kWh)</div>,
    accessorFn: (row) => {
      const previous = row.previousMeterNumber;
      const current = row.currentMeterNumber;

      return current - previous;
    },
    cell: ({ getValue }) => {
      const formattedElectric = getValue<number>().toLocaleString('vi-VN');

      return <div className="text-right font-semibold">{`${formattedElectric} kWh`}</div>;
    },
  },
  {
    accessorKey: 'totalWater',
    header: () => <div className="text-right">Tổng số nước sử dụng (m³)</div>,
    accessorFn: (row) => {
      const previous = row.previousWaterNumber;
      const current = row.currentWaterNumber;

      return current - previous;
    },
    cell: ({ getValue }) => {
      const formattedWater = getValue<number>().toLocaleString('vi-VN');

      return <div className="text-right font-semibold">{`${formattedWater} m³`}</div>;
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
    navigate(PATH.PAGE.ROOMS.CREATE);
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
  const loading = useAppSelector((state: RootState) => state.room.loading);
  const list = useAppSelector((state: RootState) => state.room.list);

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  const handleRowClick = (room: Room) => {
    console.log(`Clicked room: `, room);
  };

  const handleQueryChange = (query: DataTableDefaultQuery) => {
    console.log(`Query: ${JSON.stringify(query)}`);
  };

  return (
    <DataTableDefault
      data={list ?? []}
      columns={columns}
      totalCount={1}
      onRowClick={handleRowClick}
      getRowId={(room, index) => room.id || `row-${index}`}
      loading={loading}
      renderToolbarRight={RenderToolbarRight}
      onQueryChange={handleQueryChange}
    />
  );
};

export default RoomList;
