// Libs
import { Building2, ChevronDown, Plus } from 'lucide-react';

// Components
import DataTableToolbar from '@/components/common/DataTableToolbar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

// Others
import { cn } from '@/libs/utils';

export type ContractStatus = 'active' | 'expiring' | 'ended';

export type ContractStatusCounts = {
  all: number;
  active: number;
  expiring: number;
  ended: number;
};

export type ContractStatusFilter = 'all' | ContractStatus;

type ContractToolbarProps = {
  search?: string;
  onSearchChange?: (value: string) => void;
  onAddClick?: () => void;
  statusFilter?: ContractStatusFilter;
  onStatusChange?: (value: ContractStatus) => void;
  counts?: ContractStatusCounts;
};

const buildings = [
  { label: 'Tất cả tòa nhà', value: '0000' },
  { label: 'Vinhomes Ocean Park', value: '0001' },
  { label: 'Vinhomes Green Bay', value: '0002' },
  { label: 'The Matrix One', value: '0003' },
];

const ContractToolbar = (props: ContractToolbarProps) => {
  const { search, onSearchChange, onAddClick, statusFilter, onStatusChange, counts } = props;

  const filters = (
    <div className={cn('flex flex-wrap gap-3')}>
      <Combobox items={buildings} defaultValue={buildings[0]}>
        <ComboboxTrigger
          render={
            <Button variant="outline" className="w-64 justify-between font-normal">
              <div className={cn('flex items-center gap-2 min-w-0')}>
                <Building2 className="size-4 shrink-0 text-muted-foreground" />
                <span className={cn('truncate')}>
                  <ComboboxValue />
                </span>
              </div>

              <ChevronDown className={cn('size-4 shrink-0 opacity-50 text-muted-foreground')} />
            </Button>
          }
        />
        <ComboboxContent>
          <ComboboxInput showTrigger={false} placeholder="Tìm kiếm..." />

          <ComboboxEmpty>Không tìm thấy mục nào.</ComboboxEmpty>

          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.value} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      {onStatusChange && (
        <Tabs
          value={statusFilter}
          onValueChange={(value) => onStatusChange(value as ContractStatus)}
        >
          <TabsList>
            <TabsTrigger value="all">Tất cả ({counts?.all ?? 0})</TabsTrigger>
            <TabsTrigger value="active">Đang hiệu lực ({counts?.active ?? 0})</TabsTrigger>
            <TabsTrigger value="expiring">Sắp hết hạn ({counts?.expiring ?? 0})</TabsTrigger>
            <TabsTrigger value="ended">Đã kết thúc ({counts?.ended ?? 0})</TabsTrigger>
          </TabsList>
        </Tabs>
      )}
    </div>
  );

  const actions = (
    <div className={cn('flex items-center justify-end gap-3')}>
      <Button onClick={onAddClick}>
        <Plus /> Hợp đồng mới
      </Button>
    </div>
  );

  return (
    <DataTableToolbar
      searchValue={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Tìm theo phòng, người đứng tên"
      filtersSlot={filters}
      actionsSlot={actions}
    />
  );
};

export default ContractToolbar;
