// Libs
import { Search, X } from 'lucide-react';
import React from 'react';

// Components
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';

// Libs
import { cn } from '@/libs/utils';

type DataTableToolbarProps = {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  filtersSlot?: React.ReactNode;
  actionsSlot?: React.ReactNode;
};

const DataTableToolbar = (props: DataTableToolbarProps) => {
  const {
    searchValue,
    onSearchChange,
    searchPlaceholder = 'Tìm kiếm...',
    filtersSlot,
    actionsSlot,
  } = props;

  const hasSearchValue = Boolean(searchValue && searchValue.length > 0);

  return (
    <div className={cn('flex justify-between gap-3 flex-wrap')}>
      <div className={cn('flex flex-wrap gap-3')}>
        {/* Search */}
        {onSearchChange && (
          <InputGroup className={cn('w-full sm:w-80')}>
            <InputGroupInput
              placeholder={searchPlaceholder}
              value={searchValue ?? ''}
              onChange={(e) => onSearchChange(e.target.value)}
            />

            <InputGroupAddon>
              <Search />
            </InputGroupAddon>

            {hasSearchValue && (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  aria-label="Xóa"
                  title="xóa"
                  size="icon-xs"
                  onClick={() => onSearchChange('')}
                >
                  <X />
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </InputGroup>
        )}

        {/* Filters */}
        {filtersSlot}
      </div>

      {actionsSlot && <div className={cn('')}>{actionsSlot}</div>}
    </div>
  );
};

export default DataTableToolbar;
