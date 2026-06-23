import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const CreateApartmentFormSkeleton = () => {
  return (
    <div className={cn('grid grid-cols-1 gap-8')}>
      <Card className="w-full max-w-3xl mx-auto @container/card">
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>

        <CardContent className="grid gap-6">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="grid gap-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="grid gap-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            <div className="grid gap-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-36 w-full rounded-lg" />
              <div className="flex items-center gap-2.5 rounded-md border p-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="size-20 rounded border" />
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-3xl mx-auto @container/card">
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-56" />
        </CardHeader>

        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="grid gap-3">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-3xl mx-auto @container/card">
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-60" />
        </CardHeader>

        <CardContent className="grid gap-6">
          <div className="grid gap-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="grid gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="grid gap-3">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>

      <div
        className={cn(
          'w-full max-w-3xl mx-auto @container/card',
          'flex items-center justify-end gap-4 flex-wrap md:flex-row pb-12'
        )}
      >
        <Skeleton className="h-11 w-24" />
        <Skeleton className="h-11 w-36" />
      </div>
    </div>
  );
};

export default CreateApartmentFormSkeleton;
