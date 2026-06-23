// Libs
import {
  IconCircleCheckFilled,
  IconDotsVertical,
  IconLoader,
  IconSquareRoundedXFilled,
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
import { Badge } from '@/components/ui/badge';
import { CustomLink } from '@/components/common/CustomLink';

export type Request = {
  id: string;
  roomId: string;
  image: string;
  tenantId: string;
  content: string;
  status: 'success' | 'pending' | 'close';
};

const data: Request[] = [
  {
    id: '1',
    roomId: '1',
    image: '#',
    tenantId: '1',
    content: 'Vòi hoa sen bị hỏng',
    status: 'success',
  },
  {
    id: '2',
    roomId: '2',
    image: '#',
    tenantId: '2',
    content: 'Bóng đèn nhà vệ sinh bị hỏng',
    status: 'pending',
  },
  {
    id: '3',
    roomId: '3',
    image: '#',
    tenantId: '3',
    content: 'Điều hoà không mát',
    status: 'close',
  },
];

export const columns: ColumnDef<Request>[] = [
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
    accessorKey: 'roomId',
    header: 'Phòng',
    cell: ({ row }) => <div>{row.getValue('roomId')}</div>,
  },
  {
    accessorKey: 'tenantId',
    header: 'Người gửi yêu cầu',
    cell: ({ row }) => <div>{row.getValue('tenantId')}</div>,
  },
  {
    accessorKey: 'content',
    header: 'Nội dung',
    cell: ({ row }) => (
      <div className="max-w-xs overflow-hidden truncate">{row.getValue('content')}</div>
    ),
  },
  {
    accessorKey: 'image',
    header: 'Hình ảnh',
    cell: ({ row }) => (
      <CustomLink to={'#'} className="truncate">
        {row.getValue('image')}
      </CustomLink>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => (
      <Badge
        variant={'outline'}
        className="text-muted-foreground font-semibold px-1.5 py-1 capitalize"
      >
        {row.original.status === 'success' ? (
          <IconCircleCheckFilled className="text-green-500 dark:text-green-400 size-4" />
        ) : row.original.status === 'pending' ? (
          <IconLoader className="text-amber-500 dark:text-amber-400 size-4" />
        ) : (
          <IconSquareRoundedXFilled className="text-red-500 dark:text-red-400 size-4" />
        )}
        {row.original.status === 'success'
          ? 'Đã xử lý'
          : row.original.status === 'pending'
            ? 'Chờ xử lý'
            : 'Bỏ qua'}
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

const RenderToolbarRight = (table: ReturnType<typeof useReactTable<Request>>) => {
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
    </div>
  );
};

const RequestList = () => {
  const handleRowClick = (request: Request) => {
    console.log(`Clicked request: `, request);
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
      getRowId={(request, index) => request.id || `row-${index}`}
      // loading={true}
      renderToolbarRight={RenderToolbarRight}
      onQueryChange={handleQueryChange}
    />
  );
};

export default RequestList;
