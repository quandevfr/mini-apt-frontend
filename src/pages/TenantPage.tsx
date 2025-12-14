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
import { IconDotsVertical } from '@tabler/icons-react';
import type { ColumnDef, useReactTable } from '@tanstack/react-table';

export type Tenant = {
  id: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  personalIdentificationNumber: number;
};

const data: Tenant[] = [];

export const columns: ColumnDef<Tenant>[] = [
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
    accessorKey: 'fullName',
    header: 'Họ & Tên',
    cell: ({ row }) => <div className="capitalize">{row.getValue('fullName')}</div>,
  },
  {
    accessorKey: 'personalIdentificationNumber',
    header: 'Mã số CCCD',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('personalIdentificationNumber')}</div>
    ),
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Số điện thoại',
    cell: ({ row }) => <div className="capitalize">{row.getValue('phoneNumber')}</div>,
  },
  {
    accessorKey: 'address',
    header: 'Quê quán',
    cell: ({ row }) => <div className="capitalize">{row.getValue('address')}</div>,
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

const RenderToolbarRight = (table: ReturnType<typeof useReactTable<Tenant>>) => {
  const selected = table.getSelectedRowModel().rows;

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

      <Button onClick={() => console.log(`Thêm mới`)}>Thêm mới</Button>
    </div>
  );
};

const TenantPage = () => {
  const handleRowClick = (tenant: Tenant) => {
    console.log(`Clicked tenant: `, tenant);
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
              getRowId={(tenant, index) => tenant.id || `row-${index}`}
              loading={true}
              renderToolbarRight={RenderToolbarRight}
              onQueryChange={handleQueryChange}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TenantPage;
