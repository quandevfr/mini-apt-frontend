// import InvoiceList from '@/components/InvoiceList';
// import RequestList from '@/components/RequestList';
// import RoomList from '@/components/RoomList';
// import TenantList from '@/components/TenantList';
import ApartmentDetailSkeleton from '@/components/skeleton/ApartmentDetailSkeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { resetApartmentDetail } from '@/features/apartment/apartmentSlice';
import { getApartmentById } from '@/features/apartment/apartmentThunk';
import { useCustomNavigate } from '@/hooks/useCustomNavigate';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/libs/utils';
import { AMENITIES } from '@/pages/apartment/apartmentSchema';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { formatPhoneVN } from '@/utils/helpers';
import {
  IconAlertTriangleFilled,
  IconCircleCheckFilled,
  IconExclamationCircleFilled,
} from '@tabler/icons-react';
import { ChevronLeftIcon, ImageOffIcon, MailIcon, PencilIcon, PhoneIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const ApartmentDetailsPage = () => {
  const appNavigate = useCustomNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const { apartmentDetails, loading: apartmentLoading } = useAppSelector(
    (state) => state.apartment
  );

  const [isOpenImages, setIsOpenImages] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      dispatch(getApartmentById(id));
    }

    return () => {
      dispatch(resetApartmentDetail());
    };
  }, [id, dispatch]);

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

  const status = apartmentDetails?.status as keyof typeof STATUS_CONFIG;

  const config = STATUS_CONFIG[status] || STATUS_CONFIG.inactive;

  if (apartmentLoading.getDetail) return <ApartmentDetailSkeleton />;

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="w-full flex-col justify-start gap-6">
          <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6 max-w-[1200px] mx-auto">
            <div className={cn('flex items-center gap-5 justify-between')}>
              <div className={cn('flex items-center gap-3')}>
                <Button variant="outline" size="icon" onClick={() => appNavigate(-1)}>
                  <ChevronLeftIcon />
                </Button>

                <div className={cn('font-semibold line-clamp-1')}>{apartmentDetails?.name}</div>
              </div>

              <div className={cn('flex items-center justify-end gap-3')}>
                <Button
                  variant="ghost"
                  className={cn('text-muted-foreground')}
                  onClick={() => {
                    if (id) {
                      appNavigate(`/apartments/${id}/edit`);
                    }
                  }}
                >
                  <PencilIcon />
                  {`Chỉnh sửa`}
                </Button>
              </div>
            </div>

            <section className={cn('grid gap-3 lg:grid-cols-3')}>
              <div
                className={cn(
                  'relative min-h-[250px] overflow-hidden rounded-md border lg:col-span-2 lg:min-h-[420px] bg-card flex items-center justify-center'
                )}
              >
                {apartmentDetails?.images[0] ? (
                  <img
                    src={apartmentDetails?.images[0]}
                    alt=""
                    className={cn('absolute inset-0 h-full w-full object-cover')}
                  />
                ) : (
                  <ImageOffIcon className="text-muted size-12" />
                )}
              </div>

              <div className={cn('grid gap-3 sm:grid-cols-2 lg:grid-cols-2')}>
                <div
                  className={cn(
                    'relative min-h-[200px] overflow-hidden rounded-md border lg:min-h-[200px] bg-card flex items-center justify-center'
                  )}
                >
                  {apartmentDetails?.images[1] ? (
                    <img
                      src={apartmentDetails?.images[1]}
                      alt=""
                      className={cn('absolute inset-0 h-full w-full object-cover')}
                    />
                  ) : (
                    <ImageOffIcon className="text-muted size-8" />
                  )}
                </div>
                <div
                  className={cn(
                    'relative min-h-[200px] overflow-hidden rounded-md border lg:min-h-[200px] bg-card flex items-center justify-center'
                  )}
                >
                  {apartmentDetails?.images[2] ? (
                    <img
                      src={apartmentDetails?.images[2]}
                      alt=""
                      className={cn('absolute inset-0 h-full w-full object-cover')}
                    />
                  ) : (
                    <ImageOffIcon className="text-muted size-8" />
                  )}
                </div>
                <div
                  className={cn(
                    'relative min-h-[200px] overflow-hidden rounded-md border lg:min-h-[200px] bg-card flex items-center justify-center'
                  )}
                >
                  {apartmentDetails?.images[3] ? (
                    <img
                      src={apartmentDetails?.images[3]}
                      alt=""
                      className={cn('absolute inset-0 h-full w-full object-cover')}
                    />
                  ) : (
                    <ImageOffIcon className="text-muted size-8" />
                  )}
                </div>
                <div
                  className={cn(
                    'relative min-h-[200px] overflow-hidden rounded-md border lg:min-h-[200px] bg-card flex items-center justify-center'
                  )}
                >
                  {apartmentDetails?.images[4] ? (
                    <img
                      src={apartmentDetails?.images[4]}
                      alt=""
                      className={cn('absolute inset-0 h-full w-full object-cover')}
                    />
                  ) : (
                    <ImageOffIcon className="text-muted size-8" />
                  )}

                  {apartmentDetails?.images && apartmentDetails.images.length > 0 && (
                    <div className={cn('absolute right-3 bottom-3')}>
                      <Button
                        variant="secondary"
                        onClick={() => setIsOpenImages(true)}
                      >{`Xem ảnh (${apartmentDetails.images.length})`}</Button>
                    </div>
                  )}
                </div>
              </div>

              <Dialog open={isOpenImages} onOpenChange={setIsOpenImages}>
                <DialogContent className="sm:max-w-2xl w-full max-w-[90vw] p-6 overflow-hidden rounded-2xl sm:rounded-3xl">
                  <div className="w-full flex justify-center items-center px-12 py-4">
                    <Carousel
                      className="w-full max-w-full"
                      opts={{
                        align: 'start',
                      }}
                    >
                      <CarouselContent>
                        {apartmentDetails?.images.map((image, index) => (
                          <CarouselItem key={index}>
                            <div className="p-1">
                              <div className="flex aspect-auto items-center justify-center rounded-xl bg-muted overflow-hidden border">
                                <img src={image} alt="img" className="w-full h-full object-cover" />
                              </div>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </div>
                </DialogContent>
              </Dialog>
            </section>

            <section className={cn('grid gap-4 lg:grid-cols-[1fr_280px_280px]')}>
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

                  <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3')}>
                    <div className="space-y-1">
                      <p className={cn('text-muted-foreground text-sm')}>Tổng số phòng</p>
                      <p className={cn('')}>{apartmentDetails?.totalRooms}</p>
                    </div>

                    <div className="space-y-1">
                      <p className={cn('text-muted-foreground text-sm')}>Số phòng trống</p>
                      <p className={cn('')}>{apartmentDetails?.availableRooms}</p>
                    </div>

                    <div className="space-y-1 col-span-3">
                      <p className={cn('text-muted-foreground text-sm')}>Địa chỉ</p>
                      <p className={cn('')}>
                        {`${apartmentDetails?.address.street}, ${apartmentDetails?.address.wardName}, ${apartmentDetails?.address.provinceName}`}
                      </p>
                    </div>

                    <div className="space-y-1 col-span-3">
                      <p className={cn('text-muted-foreground text-sm')}>Mô tả</p>
                      <p className={cn('')}>{apartmentDetails?.description || '--'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className={cn('py-5 space-y-4')}>
                  <p className="text-muted-foreground text-sm">Tiện ích</p>

                  <div className="flex items-center flex-wrap gap-2">
                    {apartmentDetails?.amenities && apartmentDetails.amenities.length > 0
                      ? apartmentDetails.amenities.map((a) => {
                          const matchedItem = AMENITIES.find((item) => item.value === a);

                          return (
                            <Badge variant="outline" className="py-1">
                              {matchedItem?.label}
                            </Badge>
                          );
                        })
                      : 'Chưa cập nhật'}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className={cn('py-5 space-y-4')}>
                  <div className="">
                    <p className={cn('text-muted-foreground text-sm')}>Chủ nhà</p>

                    <p className={cn('text-md font-semibold')}>{apartmentDetails?.contact.name}</p>
                  </div>

                  <div className={cn('space-y-2 text-sm')}>
                    <p className={cn('inline-flex items-center gap-2')}>
                      <PhoneIcon className={cn('text-muted-foreground size-4')} />
                      {apartmentDetails?.contact.phone &&
                        formatPhoneVN(apartmentDetails?.contact.phone)}
                    </p>
                  </div>

                  <Separator />

                  <div className="">
                    <p className={cn('text-muted-foreground text-sm')}>Quản lý</p>

                    <p className={cn('text-md font-semibold')}>--</p>
                  </div>

                  <div className={cn('space-y-2 text-sm flex flex-col')}>
                    <p className={cn('inline-flex items-center gap-2')}>
                      <PhoneIcon className={cn('text-muted-foreground size-4')} />
                      --
                    </p>

                    <p className={cn('inline-flex items-center gap-2')}>
                      <MailIcon className={cn('text-muted-foreground size-4')} />
                      --
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
