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

const data: Room[] = [
  {
    id: '1',
    code: '201',
    name: 'Phòng 201',
    apartmentId: '1',
    numberOfTenant: 2,
    previousMeterNumber: 295,
    currentMeterNumber: 525,
    previousWaterNumber: 56,
    currentWaterNumber: 63,
  },
  {
    id: '2',
    code: '202',
    name: 'Phòng 202',
    apartmentId: '1',
    numberOfTenant: 2,
    previousMeterNumber: 1254,
    currentMeterNumber: 1442,
    previousWaterNumber: 123,
    currentWaterNumber: 135,
  },
  {
    id: '1',
    code: '203',
    name: 'Phòng 203',
    apartmentId: '1',
    numberOfTenant: 2,
    previousMeterNumber: 245,
    currentMeterNumber: 455,
    previousWaterNumber: 34,
    currentWaterNumber: 46,
  },
];

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

const RoomPage = () => {
  const handleRowClick = (room: Room) => {
    console.log(`Clicked room: `, room);
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
              data={data}
              columns={columns}
              totalCount={55}
              onRowClick={handleRowClick}
              getRowId={(room, index) => room.id || `row-${index}`}
              // loading={true}
              renderToolbarRight={RenderToolbarRight}
              onQueryChange={handleQueryChange}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RoomPage;
