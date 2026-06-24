import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/libs/utils';

const ApartmentDetailSkeleton = () => {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="w-full flex-col justify-start gap-6">
          <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6 max-w-[1200px] mx-auto">
            <div className={cn('flex items-center gap-5 justify-between')}>
              <div className={cn('flex items-center gap-3')}>
                <Skeleton className="size-9 rounded-md" />
                <Skeleton className="h-5 w-48" />
              </div>

              <div className={cn('flex items-center justify-end gap-3')}>
                <Skeleton className="h-9 w-28" />
              </div>
            </div>

            <section className={cn('grid gap-3 lg:grid-cols-3')}>
              <div
                className={cn(
                  'relative min-h-[250px] overflow-hidden rounded-md border lg:col-span-2 lg:min-h-[420px] flex items-center justify-center'
                )}
              >
                <Skeleton className="w-full h-full" />
              </div>

              <div className={cn('grid gap-3 sm:grid-cols-2 lg:grid-cols-2')}>
                {Array.from({ length: 4 }).map(() => (
                  <div
                    className={cn(
                      'relative min-h-[200px] overflow-hidden rounded-md border lg:min-h-[200px] flex items-center justify-center'
                    )}
                  >
                    <Skeleton className="w-full h-full" />
                  </div>
                ))}
              </div>
            </section>

            <section className={cn('grid gap-4 lg:grid-cols-[1fr_280px_280px]')}>
              <Card>
                <CardContent className={cn('py-5')}>
                  <Skeleton className="h-7 w-28 rounded-full mb-5" />

                  <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3')}>
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-5 w-12" />
                    </div>

                    <div className="space-y-1">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-5 w-12" />
                    </div>

                    <div className="space-y-1 col-span-3">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-5 w-full max-w-sm" />
                    </div>

                    <div className="space-y-1 col-span-3">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-5 w-full max-w-md" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className={cn('py-5 space-y-4')}>
                  <Skeleton className="h-4 w-16" />

                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="h-6 w-20 rounded-full" />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className={cn('py-5 space-y-4')}>
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-5 w-32" />
                  </div>

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                  </div>

                  <Separator />

                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-5 w-24" />
                  </div>

                  <div className="space-y-2 flex flex-col gap-1">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentDetailSkeleton;
