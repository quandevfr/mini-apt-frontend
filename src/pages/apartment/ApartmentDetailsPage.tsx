// import InvoiceList from '@/components/InvoiceList';
// import RequestList from '@/components/RequestList';
// import RoomList from '@/components/RoomList';
// import TenantList from '@/components/TenantList';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/libs/utils';
import { formatPhoneVN } from '@/utils/helpers';
import {
  IconAlertTriangleFilled,
  IconCircleCheckFilled,
  IconExclamationCircleFilled,
} from '@tabler/icons-react';
import { ChevronLeftIcon, MailIcon, PencilIcon, PhoneIcon } from 'lucide-react';

const ApartmentDetailsPage = () => {
  const STATUS_CONFIG = {
    active: {
      label: 'Hoạt động',
      className: 'bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400 ',
      Icon: <IconCircleCheckFilled className="text-green-500 dark:text-green-400 size-4" />,
    },
    inactive: {
      label: 'Ngưng hoạt động',
      className: 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400',
      Icon: <IconExclamationCircleFilled className="text-red-500 dark:text-red-400 size-4" />,
    },
    suspended: {
      label: 'Tạm dừng vận hành',
      className: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400',
      Icon: <IconAlertTriangleFilled className="text-amber-500 dark:text-amber-400 size-4" />,
    },
  };

  const status = 'active';

  const config = STATUS_CONFIG[status] || STATUS_CONFIG.inactive;
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="w-full flex-col justify-start gap-6">
          <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6 max-w-[1200px] mx-auto">
            <div className={cn('flex items-center gap-5 justify-between')}>
              <div className={cn('flex items-center gap-3')}>
                <Button variant="outline" size="icon">
                  <ChevronLeftIcon />
                </Button>

                <div className={cn('font-semibold line-clamp-1')}>Apartment detail item</div>
              </div>

              <div className={cn('flex items-center justify-end gap-3')}>
                <Button variant="ghost" className={cn('text-muted-foreground')}>
                  <PencilIcon />
                  {`Chỉnh sửa`}
                </Button>
              </div>
            </div>

            <section className={cn('grid gap-3 lg:grid-cols-3')}>
              <div
                className={cn(
                  'relative min-h-[250px] overflow-hidden rounded-md border lg:col-span-2 lg:min-h-[420px]'
                )}
              >
                <img
                  src={`https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&h=980&fit=crop`}
                  alt=""
                  className={cn('absolute inset-0 h-full w-full object-cover')}
                />
              </div>

              <div className={cn('grid gap-3 sm:grid-cols-2 lg:grid-cols-2')}>
                <div
                  className={cn(
                    'relative min-h-[200px] overflow-hidden rounded-md border lg:min-h-[200px]'
                  )}
                >
                  <img
                    src={`https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&h=640&fit=crop`}
                    alt=""
                    className={cn('absolute inset-0 h-full w-full object-cover')}
                  />
                </div>
                <div
                  className={cn(
                    'relative min-h-[200px] overflow-hidden rounded-md border lg:min-h-[200px]'
                  )}
                >
                  <img
                    src={`https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&h=640&fit=crop`}
                    alt=""
                    className={cn('absolute inset-0 h-full w-full object-cover')}
                  />
                </div>
                <div
                  className={cn(
                    'relative min-h-[200px] overflow-hidden rounded-md border lg:min-h-[200px]'
                  )}
                >
                  <img
                    src={`https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&h=640&fit=crop`}
                    alt=""
                    className={cn('absolute inset-0 h-full w-full object-cover')}
                  />
                </div>
                <div
                  className={cn(
                    'relative min-h-[200px] overflow-hidden rounded-md border lg:min-h-[200px]'
                  )}
                >
                  <img
                    src={`https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=900&h=640&fit=crop`}
                    alt=""
                    className={cn('absolute inset-0 h-full w-full object-cover')}
                  />

                  <div className={cn('absolute right-3 bottom-3')}>
                    <Button variant="secondary">Xem ảnh (5)</Button>
                  </div>
                </div>
              </div>
            </section>

            <section className={cn('grid gap-4 lg:grid-cols-[1fr_320px]')}>
              <Card>
                <CardContent className={cn('py-5')}>
                  <Badge
                    className={cn(
                      'flex items-center gap-1.5 px-2 py-1 capitalize w-fit font-medium pointer-events-none mb-5',
                      config.className
                    )}
                  >
                    {config.Icon}
                    <span>{config.label}</span>
                  </Badge>

                  <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-4')}>
                    <div className="space-y-1">
                      <p className={cn('text-muted-foreground text-sm')}>Tổng số phòng</p>
                      <p className={cn('')}>15</p>
                    </div>

                    <div className="space-y-1">
                      <p className={cn('text-muted-foreground text-sm')}>Số phòng trống</p>
                      <p className={cn('')}>5</p>
                    </div>

                    <div className="space-y-1 col-span-4">
                      <p className={cn('text-muted-foreground text-sm')}>Tiện ích</p>
                      <div className={cn('flex items-center flex-wrap gap-2')}>
                        <Badge variant="outline">Mạng wifi</Badge>
                        <Badge variant="outline">Chỗ để xe</Badge>
                        <Badge variant="outline">Camera an ninh</Badge>
                        <Badge variant="outline">Máy giặt</Badge>
                        <Badge variant="outline">Thang máy</Badge>
                        <Badge variant="outline">Khóa cửa vân tay</Badge>
                        <Badge variant="outline">An toàn phòng cháy, chữa cháy</Badge>
                      </div>
                    </div>

                    <div className="space-y-1 col-span-4">
                      <p className={cn('text-muted-foreground text-sm')}>Địa chỉ</p>
                      <p className={cn('')}>
                        Số 18 ngõ 25 Lê Đức Thọ, Phường Từ Liêm, Thành phố Hà Nội
                      </p>
                    </div>

                    <div className="space-y-1 col-span-4">
                      <p className={cn('text-muted-foreground text-sm')}>Mô tả</p>
                      <p className={cn('')}>
                        Aliquip reprehenderit consequat pariatur qui reprehenderit cupidatat aute
                        dolore eu est voluptate officia dolore. Sunt do sunt ad incididunt. Sit
                        ipsum labore incididunt ipsum aute irure eiusmod dolore Lorem occaecat ut
                        voluptate ipsum. Consectetur quis exercitation consequat sit.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className={cn('py-5 space-y-4')}>
                  <div className="">
                    <p className={cn('text-muted-foreground text-sm')}>Chủ nhà</p>

                    <p className={cn('text-md font-semibold')}>Nguyễn Văn A</p>
                  </div>

                  <div className={cn('space-y-2 text-sm')}>
                    <p className={cn('inline-flex items-center gap-2')}>
                      <PhoneIcon className={cn('text-muted-foreground size-4')} />
                      {formatPhoneVN(`0987654321`)}
                    </p>
                  </div>

                  <Separator />

                  <div className="">
                    <p className={cn('text-muted-foreground text-sm')}>Quản lý</p>

                    <p className={cn('text-md font-semibold')}>Trần Việt Phương</p>
                  </div>

                  <div className={cn('space-y-2 text-sm flex flex-col')}>
                    <p className={cn('inline-flex items-center gap-2')}>
                      <PhoneIcon className={cn('text-muted-foreground size-4')} />
                      {formatPhoneVN(`0987654321`)}
                    </p>

                    <p className={cn('inline-flex items-center gap-2')}>
                      <MailIcon className={cn('text-muted-foreground size-4')} />
                      {`example@gmail.com`}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Thông tin chi tiết</TabsTrigger>
                <TabsTrigger value="rooms">Danh sách phòng</TabsTrigger>
                <TabsTrigger value="tenants">Người thuê</TabsTrigger>
                <TabsTrigger value="invoices">Hóa đơn thanh toán</TabsTrigger>
                <TabsTrigger value="requests">Yêu cầu / Báo hỏng</TabsTrigger>
              </TabsList>

              <TabsContent value="details">Chi tiết</TabsContent>
              <TabsContent value="rooms">
                <RoomList />
              </TabsContent>
              <TabsContent value="tenants">
                <TenantList />
              </TabsContent>
              <TabsContent value="invoices">
                <InvoiceList />
              </TabsContent>
              <TabsContent value="requests">
                <RequestList />
              </TabsContent>
            </Tabs> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentDetailsPage;
