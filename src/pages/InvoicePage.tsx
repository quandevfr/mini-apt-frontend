// Libs
import {
  IconAlertTriangleFilled,
  IconCircleCheckFilled,
  IconDotsVertical,
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
import { Badge } from '@/components/ui/badge';

export type Invoice = {
  id: string;
  code: string;
  tenantId: string;
  price: number;
  status: 'paid' | 'unpaid' | 'late';
};

const data: Invoice[] = [
  {
    id: '1',
    code: '1234',
    tenantId: '0001',
    price: 5234000,
    status: 'paid',
  },
  {
    id: '2',
    code: '1235',
    tenantId: '0002',
    price: 5034000,
    status: 'unpaid',
  },
  {
    id: '3',
    code: '1236',
    tenantId: '0003',
    price: 5128000,
    status: 'late',
  },
];

export const columns: ColumnDef<Invoice>[] = [
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
    accessorKey: 'tenantId',
    header: 'Người thuê',
    cell: ({ row }) => <div className="capitalize">{row.getValue('tenantId')}</div>,
  },
  {
    accessorKey: 'price',
    header: () => <div className="text-right">Tổng tiền (₫)</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'));

      const formatted = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(price);

      return <div className="text-right">{formatted}</div>;
    },
    size: 150,
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => (
      <Badge variant={'outline'} className="text-muted-foreground px-1.5 py-1 capitalize">
        {row.original.status === 'paid' ? (
          <IconCircleCheckFilled className="text-green-500 dark:text-green-400 size-4" />
        ) : row.original.status === 'unpaid' ? (
          <IconAlertTriangleFilled className="text-amber-500 dark:text-amber-400 size-4" />
        ) : (
          <IconExclamationCircleFilled className="text-red-500 dark:text-red-400 size-4" />
        )}
        {row.original.status === 'paid'
          ? 'Đã thanh toán'
          : row.original.status === 'unpaid'
            ? 'Chưa thanh toán'
            : 'Quá hạn'}
      </Badge>
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

const RenderToolbarRight = (table: ReturnType<typeof useReactTable<Invoice>>) => {
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

const InvoicePage = () => {
  const handleRowClick = (invoice: Invoice) => {
    console.log(`Clicked invoice: `, invoice);
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
              getRowId={(invoice, index) => invoice.id || `row-${index}`}
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

export default InvoicePage;
