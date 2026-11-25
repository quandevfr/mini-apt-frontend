// Libs
import { IconDotsVertical } from '@tabler/icons-react';
import type { ColumnDef } from '@tanstack/react-table';

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

export type Contract = {
  id: string;
  room: string;
  tenant: string;
  numberOfOccupants: number;
  duration: Date;
  price: string;
  status: string;
};

const data: Contract[] = [];

export const columns: ColumnDef<Contract>[] = [
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
    accessorKey: 'room',
    header: 'Phòng',
    cell: ({ row }) => <div className="capitalize">{row.getValue('room')}</div>,
  },
  {
    accessorKey: 'tenant',
    header: 'Người đứng tên',
    cell: ({ row }) => <div className="capitalize">{row.getValue('tenant')}</div>,
  },
  {
    accessorKey: 'numberOfOccupants',
    header: 'Số người',
    cell: ({ row }) => <div className="capitalize">{row.getValue('numberOfOccupants')}</div>,
  },
  {
    accessorKey: 'duration',
    header: 'Thời hạn',
    cell: ({ row }) => <div className="capitalize">{row.getValue('duration')}</div>,
  },
  {
    accessorKey: 'price',
    header: 'Giá thuê',
    cell: ({ row }) => <div className="capitalize">{row.getValue('price')}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => <div className="capitalize">{row.getValue('status')}</div>,
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

const ContractList = () => {
  const handleRowClick = (contract: Contract) => {
    console.log(`Clicked contract: `, contract);
  };

  const handleQueryChange = (query: DataTableDefaultQuery) => {
    console.log(`Query: ${JSON.stringify(query)}`);
  };

  return (
    <DataTableDefault
      data={data}
      columns={columns}
      totalCount={55}
      onRowClick={handleRowClick}
      getRowId={(contract, index) => contract.id || `row-${index}`}
      loading={true}
      onQueryChange={handleQueryChange}
      enableSearch={false}
      enableColumnVisibility={false}
    />
  );
};

export default ContractList;
