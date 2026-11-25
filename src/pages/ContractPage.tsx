// Libs
import { useState } from 'react';
import {
  IconAlarmFilled,
  IconCreditCardFilled,
  IconFileSadFilled,
  IconRosetteDiscountCheckFilled,
  IconTrendingDown,
  IconTrendingUp,
} from '@tabler/icons-react';

// Components
import ContractList from '@/components/ContractList';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import ContractToolbar, {
  type ContractStatusFilter,
} from '@/features/contract/components/ContractToolbar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// Others
import { cn } from '@/libs/utils';
import { formatNumber } from '@/utils/helpers/currencyHelper';

const ContractPage = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<ContractStatusFilter>('all');

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <Tabs defaultValue="outline" className="w-full flex-col justify-start gap-6">
          <TabsContent
            value="outline"
            className={cn('relative flex flex-col gap-5 overflow-auto px-4 lg:px-6')}
          >
            <div className={cn('grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4')}>
              <Card className="@container/card">
                <CardHeader>
                  <div className={cn('flex items-center gap-2')}>
                    <div
                      className={cn(
                        'bg-green-600 aspect-square size-6 p-0 flex items-center justify-center rounded-md'
                      )}
                    >
                      <IconRosetteDiscountCheckFilled className={cn('size-4')} />
                    </div>

                    <CardDescription>Hợp đồng còn hiệu lực</CardDescription>
                  </div>

                  <div className={cn('flex items-center justify-between gap-4')}>
                    <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
                      {formatNumber(18)}
                    </CardTitle>

                    <Tooltip>
                      <TooltipTrigger>
                        <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                          <IconTrendingUp stroke={2} className={cn('size-4 shrink-0')} />
                          <span className="">5.3%</span>
                        </Badge>
                      </TooltipTrigger>

                      <TooltipContent>So với tháng 11</TooltipContent>
                    </Tooltip>
                  </div>
                </CardHeader>
              </Card>

              <Card className="@container/card">
                <CardHeader>
                  <div className={cn('flex items-center gap-2')}>
                    <div
                      className={cn(
                        'bg-yellow-600 aspect-square size-6 p-0 flex items-center justify-center rounded-md'
                      )}
                    >
                      <IconAlarmFilled className={cn('size-4')} />
                    </div>

                    <CardDescription>Hợp đồng sắp hết hạn</CardDescription>
                  </div>

                  <div className={cn('flex items-center justify-between gap-4')}>
                    <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
                      {formatNumber(3)}
                    </CardTitle>

                    <Tooltip>
                      <TooltipTrigger>
                        <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
                          <IconTrendingDown stroke={2} className={cn('size-4 shrink-0')} />
                          <span className="">2.5%</span>
                        </Badge>
                      </TooltipTrigger>

                      <TooltipContent>So với tháng 11</TooltipContent>
                    </Tooltip>
                  </div>
                </CardHeader>
              </Card>

              <Card className="@container/card">
                <CardHeader>
                  <div className={cn('flex items-center gap-2')}>
                    <div
                      className={cn(
                        'bg-red-600 aspect-square size-6 p-0 flex items-center justify-center rounded-md'
                      )}
                    >
                      <IconFileSadFilled className={cn('size-4')} />
                    </div>

                    <CardDescription>Hợp đồng đã hết hạn</CardDescription>
                  </div>

                  <div className={cn('flex items-center justify-between gap-4')}>
                    <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
                      {formatNumber(32)}
                    </CardTitle>

                    <Tooltip>
                      <TooltipTrigger>
                        <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
                          <IconTrendingDown stroke={2} className={cn('size-4 shrink-0')} />
                          <span className="">3.1%</span>
                        </Badge>
                      </TooltipTrigger>

                      <TooltipContent>So với tháng 11</TooltipContent>
                    </Tooltip>
                  </div>
                </CardHeader>
              </Card>

              <Card className="@container/card">
                <CardHeader>
                  <div className={cn('flex items-center gap-2')}>
                    <div
                      className={cn(
                        'bg-primary aspect-square size-6 p-0 flex items-center justify-center rounded-md'
                      )}
                    >
                      <IconCreditCardFilled className={cn('size-4')} />
                    </div>

                    <CardDescription>Tổng tiền cọc đang giữ</CardDescription>
                  </div>

                  <div className={cn('flex items-center justify-between gap-4')}>
                    <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
                      {formatNumber(54000000)} ₫
                    </CardTitle>

                    <Tooltip>
                      <TooltipTrigger>
                        <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                          <IconTrendingUp stroke={2} className={cn('size-4 shrink-0')} />
                          <span className="">15%</span>
                        </Badge>
                      </TooltipTrigger>

                      <TooltipContent>So với tháng 11</TooltipContent>
                    </Tooltip>
                  </div>
                </CardHeader>
              </Card>
            </div>

            <div className={cn('grid gap-4')}>
              <ContractToolbar
                search={searchValue}
                onSearchChange={(value) => setSearchValue(value)}
                statusFilter={statusFilter}
                onStatusChange={(value) => setStatusFilter(value)}
                counts={{ all: 50, active: 18, expiring: 3, ended: 32 }}
              />

              <ContractList />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContractPage;
