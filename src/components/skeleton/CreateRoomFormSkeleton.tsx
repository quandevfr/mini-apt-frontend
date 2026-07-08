import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/libs/utils';
import { ChevronLeftIcon } from 'lucide-react';
import React from 'react';

const CreateRoomFormSkeleton = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div className={cn(className, 'flex flex-col gap-7')} {...props}>
      <div className={cn('w-full max-w-3xl mx-auto @container/card flex items-center gap-3')}>
        <Button variant="outline" size="icon" className={cn('btn-press-effect')} disabled>
          <ChevronLeftIcon />
        </Button>

        <Skeleton className="h-5 w-28" />
      </div>

      <FieldSet disabled>
        {/* Thông tin phòng */}
        <Card className="w-full max-w-3xl mx-auto @container/card">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-40" />
            </CardTitle>

            <CardDescription>
              <Skeleton className="h-4 w-full max-w-md" />
            </CardDescription>
          </CardHeader>

          <CardContent className="pb-7">
            <FieldGroup>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>
                    <Skeleton className="h-4 w-32" />
                  </FieldLabel>
                  <Skeleton className="h-9 w-full" />
                </Field>

                <Field>
                  <FieldLabel>
                    <Skeleton className="h-4 w-24" />
                  </FieldLabel>
                  <Skeleton className="h-9 w-full" />
                </Field>
              </div>

              <FieldGroup className="grid grid-cols-1 gap-4 items-start md:grid-cols-2">
                <Field>
                  <FieldLabel>
                    <Skeleton className="h-4 w-24" />
                  </FieldLabel>
                  <Skeleton className="h-9 w-full" />
                </Field>

                <Field>
                  <FieldLabel>
                    <Skeleton className="h-4 w-32" />
                  </FieldLabel>
                  <Skeleton className="h-9 w-full" />
                </Field>

                <Field>
                  <FieldLabel>
                    <Skeleton className="h-4 w-20" />
                  </FieldLabel>
                  <Skeleton className="h-9 w-full" />
                </Field>

                <Field>
                  <FieldLabel>
                    <Skeleton className="h-4 w-28" />
                  </FieldLabel>
                  <Skeleton className="h-9 w-full" />
                </Field>
              </FieldGroup>
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Chi phí thuê & Đặt cọc */}
        <Card className="w-full max-w-3xl mx-auto @container/card">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-48" />
            </CardTitle>

            <CardDescription>
              <Skeleton className="h-4 w-full max-w-lg" />
            </CardDescription>
          </CardHeader>

          <CardContent className="pb-7">
            <FieldGroup>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>
                    <Skeleton className="h-4 w-36" />
                  </FieldLabel>
                  <Skeleton className="h-9 w-full" />
                </Field>

                <Field>
                  <FieldLabel>
                    <Skeleton className="h-4 w-28" />
                  </FieldLabel>
                  <Skeleton className="h-9 w-full" />
                </Field>
              </div>
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Phí dịch vụ hàng tháng */}
        <Card className="w-full max-w-3xl mx-auto @container/card">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-48" />
            </CardTitle>

            <CardDescription>
              <Skeleton className="h-4 w-full max-w-lg" />
            </CardDescription>
          </CardHeader>

          <CardContent className="pb-7">
            <FieldGroup>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Field key={index}>
                    <FieldLabel>
                      <Skeleton className="h-4 w-32" />
                    </FieldLabel>
                    <Skeleton className="h-9 w-full" />
                  </Field>
                ))}
              </div>
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Chi phí khác */}
        <Card className="w-full max-w-3xl mx-auto @container/card">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-28" />
            </CardTitle>

            <CardDescription>
              <Skeleton className="h-4 w-full max-w-lg" />
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldSet disabled>
              {Array.from({ length: 1 }).map((_, index) => (
                <FieldGroup
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_36px] gap-4"
                >
                  <Field>
                    <FieldLabel>
                      <Skeleton className="h-4 w-24" />
                    </FieldLabel>
                    <Skeleton className="h-9 w-full" />
                  </Field>

                  <Field>
                    <FieldLabel>
                      <Skeleton className="h-4 w-16" />
                    </FieldLabel>
                    <Skeleton className="h-9 w-full" />
                  </Field>

                  <Field>
                    <FieldLabel>
                      <Skeleton className="h-4 w-24" />
                    </FieldLabel>
                    <Skeleton className="h-9 w-full" />
                  </Field>

                  <Field>
                    <FieldLabel className="hidden md:block invisible">Xóa</FieldLabel>
                    <Skeleton className="h-9 w-9" />
                  </Field>
                </FieldGroup>
              ))}

              <Skeleton className="h-9 w-32" />
            </FieldSet>
          </CardContent>
        </Card>

        {/* Quản lý chỉ số Điện */}
        <Card className="w-full max-w-3xl mx-auto @container/card">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-44" />
            </CardTitle>

            <CardDescription>
              <Skeleton className="h-4 w-full max-w-lg" />
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>
                  <Skeleton className="h-4 w-24" />
                </FieldLabel>
                <Skeleton className="h-9 w-full" />
              </Field>

              <Field>
                <FieldLabel>
                  <Skeleton className="h-4 w-44" />
                </FieldLabel>
                <Skeleton className="h-9 w-full" />
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Quản lý chỉ số Nước */}
        <Card className="w-full max-w-3xl mx-auto @container/card">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-44" />
            </CardTitle>

            <CardDescription>
              <Skeleton className="h-4 w-full max-w-lg" />
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldGroup className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field>
                <FieldLabel>
                  <Skeleton className="h-4 w-24" />
                </FieldLabel>
                <Skeleton className="h-9 w-full" />
              </Field>

              <Field>
                <FieldLabel>
                  <Skeleton className="h-4 w-40" />
                </FieldLabel>
                <Skeleton className="h-9 w-full" />
              </Field>

              <Field>
                <FieldLabel>
                  <Skeleton className="h-4 w-28" />
                </FieldLabel>
                <Skeleton className="h-9 w-full" />
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Cơ sở vật chất */}
        <Card className="w-full max-w-3xl mx-auto @container/card">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-32" />
            </CardTitle>

            <CardDescription>
              <Skeleton className="h-4 w-56" />
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldSet disabled>
              {Array.from({ length: 1 }).map((_, index) => (
                <FieldGroup
                  key={index}
                  className={cn('grid grid-cols-1 md:grid-cols-[1fr_1fr_36px] gap-4')}
                >
                  <Field>
                    <FieldLabel>
                      <Skeleton className="h-4 w-24" />
                    </FieldLabel>
                    <Skeleton className="h-9 w-full" />
                  </Field>

                  <Field>
                    <FieldLabel>
                      <Skeleton className="h-4 w-20" />
                    </FieldLabel>
                    <Skeleton className="h-9 w-full" />
                  </Field>

                  <Field>
                    <FieldLabel className="hidden md:block invisible">Xóa</FieldLabel>
                    <Skeleton className="h-9 w-9" />
                  </Field>
                </FieldGroup>
              ))}

              <Skeleton className="h-9 w-36" />
            </FieldSet>
          </CardContent>
        </Card>

        {/* Hình ảnh */}
        <Card className="w-full max-w-3xl mx-auto @container/card">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-24" />
            </CardTitle>

            <CardDescription>
              <Skeleton className="h-4 w-56" />
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldGroup className={cn('grid grid-cols-1 gap-4')}>
              <Field>
                <Skeleton className="h-40 w-full rounded-md" />
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Actions */}
        <FieldGroup className="w-full max-w-3xl mx-auto @container/card">
          <Field
            orientation="horizontal"
            className={cn(
              'w-full max-w-3xl mx-auto @container/card',
              'flex items-center justify-end gap-4 flex-wrap md:flex-row pb-12'
            )}
          >
            <Skeleton className="h-11 w-20" />
            <Skeleton className="h-11 w-28" />
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
};

export default CreateRoomFormSkeleton;
