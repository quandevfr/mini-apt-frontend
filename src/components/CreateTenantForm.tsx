// Libs
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { toast } from 'sonner';
import { X } from 'lucide-react';

// Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from './ui/field';
import { Input } from './ui/input';
import IntegerInput from './IntegerInput';
import { formatPhoneVN, formatVNDateOnChange, unFormatPhoneVN, vnDateToISO } from '@/utils/helpers';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from './ui/file-upload';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog';

// Others
import { cn } from '@/libs/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import type { ItemSelect } from '@/utils/interface';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/utils/constants/file';
import { FileRejectReason } from '@/utils/enums/file';

const createTenantFormSchema = z.object({
  fullName: z.string().min(1, 'Vui lòng nhập Họ và Tên.'),
  placeOfResidence: z.string().min(1, 'Vui lòng nhập quê quán.'),
  gender: z.enum(['0001', '0002', '0003']).optional(),
  dateOfBirth: z.string().min(1, 'Vui lòng nhập ngày, tháng, năm sinh.'),
  phone: z.string().min(1, 'Vui lòng nhập số điện thoại.'),
  personalIdNumber: z.string().min(1, 'Vui lòng nhập số định danh cá nhân.'),
  images: z
    .array(z.instanceof(File))
    .min(2, 'Vui lòng tải lên đủ ảnh 2 mặt của căn cước.')
    .max(2, 'Chỉ được tải lên tối đa 2 ảnh')
    .refine(
      (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
      'Ảnh phải nhỏ hơn hoặc bằng 5MB.'
    )
    .refine((files) =>
      files.every(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        'Chỉ chấp nhận ảnh .JPG, .PNG, .WEBP'
      )
    ),
});

type CreateTenantFormValues = z.infer<typeof createTenantFormSchema>;

const CreateTenantForm = ({ className, ...props }: React.ComponentProps<'form'>) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateTenantFormValues>({
    resolver: zodResolver(createTenantFormSchema),
    defaultValues: {
      fullName: '',
      placeOfResidence: '',
      gender: '0003',
      dateOfBirth: '',
      phone: '',
      personalIdNumber: '',
      images: [],
    },
  });

  const isMobile = useIsMobile();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onFileReject = React.useCallback((file: File, reason?: FileRejectReason) => {
    const shortName = file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name;

    let description = `Không thể tải ảnh "${shortName}".`;

    switch (reason) {
      case FileRejectReason.MAX_SIZE:
        description = `Ảnh "${shortName}" vượt quá dung lượng cho phép (tối đa 5MB).`;
        break;

      case FileRejectReason.INVALID_TYPE:
        description = `Ảnh "${shortName}" không đúng định dạng (JPG, PNG, WEBP).`;
        break;

      case FileRejectReason.MAX_FILES:
        description = `Chỉ được tải lên tối đa 2 ảnh căn cước.`;
        break;
    }

    toast.error('Tải ảnh không hợp lệ', { description });
  }, []);

  const onSubmit = async (data: CreateTenantFormValues) => {
    const dataConverted = {
      ...data,
      dateOfBirth: vnDateToISO(data.dateOfBirth),
      phone: unFormatPhoneVN(data.phone),
    };

    console.log(dataConverted);
  };

  return (
    <form
      id="createTenantForm"
      className={cn(className, 'flex flex-col gap-7')}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card className="w-full max-w-3xl mx-auto @container/card">
        <CardHeader>
          <CardTitle>Thêm người thuê mới</CardTitle>

          <CardDescription>
            Thực hiện thêm mới người thuê tại đây. Nhấn vào thêm người thuê khi bạn đã nhập đầy đủ
            thông tin.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="w-full max-w-3xl mx-auto @container/card pt-6">
        <CardContent>
          <Field>
            <FieldLabel>
              Ảnh căn cước (mặt trước & mặt sau) <span className="text-destructive">*</span>
            </FieldLabel>

            <Controller
              control={control}
              name="images"
              render={({ field }) => {
                return (
                  <FileUpload
                    maxFiles={2}
                    maxSize={MAX_FILE_SIZE}
                    className="w-full"
                    value={field.value}
                    onValueChange={field.onChange}
                    onFileReject={onFileReject}
                    multiple
                  >
                    <FileUploadDropzone>
                      <div className="flex flex-col items-center gap-1 text-center">
                        <p className="font-medium text-sm">Kéo và thả tệp tin vào đây</p>

                        <p className="text-muted-foreground text-xs">
                          Hoặc nhấn vào để tải lên (tối đa 2 tệp, tối đa 5MB mỗi tệp)
                        </p>
                      </div>

                      <FileUploadTrigger asChild>
                        <Button variant="outline" size="sm" className="mt-2 w-fit">
                          Chọn ảnh
                        </Button>
                      </FileUploadTrigger>
                    </FileUploadDropzone>

                    <FileUploadList>
                      {field.value?.map((file: File, index: number) => {
                        const preview = URL.createObjectURL(file);

                        return (
                          <FileUploadItem key={index} value={file}>
                            <div className="cursor-pointer" onClick={() => setPreviewUrl(preview)}>
                              <FileUploadItemPreview />
                            </div>

                            <FileUploadItemMetadata />

                            <FileUploadItemDelete asChild>
                              <Button variant="ghost" size="icon" className="size-7">
                                <X />
                              </Button>
                            </FileUploadItemDelete>
                          </FileUploadItem>
                        );
                      })}
                    </FileUploadList>
                  </FileUpload>
                );
              }}
            />

            {errors.images && <FieldError>{errors.images.message}</FieldError>}

            {/* Preview dialog */}
            <Dialog open={!!previewUrl} onOpenChange={() => setPreviewUrl(null)}>
              <DialogContent className="max-w-3xl p-6">
                <DialogTitle>
                  <span className="sr-only">Xem ảnh căn cước</span>
                </DialogTitle>

                <DialogDescription>
                  <span className="sr-only">Bản xem trước ảnh căn cước phóng to</span>
                </DialogDescription>

                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview căn cước"
                    className="w-full h-full object-contain"
                  />
                )}
              </DialogContent>
            </Dialog>
          </Field>
        </CardContent>
      </Card>

      <Card className="w-full max-w-3xl mx-auto @container/card">
        <CardHeader>
          <CardTitle>Thông tin người thuê</CardTitle>

          <CardDescription>Thông tin cá nhân, liên lạc cơ bản của người thuê.</CardDescription>
        </CardHeader>

        <CardContent className="pb-7">
          <FieldGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>
                  Số định danh cá nhân <span className="text-destructive">*</span>
                </FieldLabel>

                <Controller
                  control={control}
                  name="personalIdNumber"
                  render={({ field }) => {
                    return (
                      <IntegerInput
                        id="personalIdNumber"
                        placeholder=""
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    );
                  }}
                />

                {errors.personalIdNumber && (
                  <FieldError>{errors.personalIdNumber.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel>
                  Họ và Tên <span className="text-destructive">*</span>
                </FieldLabel>

                <Input id="fullName" {...register('fullName')} />

                {errors.fullName && <FieldError>{errors.fullName.message}</FieldError>}
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="dateOfBirth">
                  Ngày, tháng, năm sinh <span className="text-destructive">*</span>
                </FieldLabel>

                <Controller
                  control={control}
                  name="dateOfBirth"
                  render={({ field }) => {
                    return (
                      <Input
                        placeholder="__/__/____"
                        value={field.value}
                        onChange={(e) => {
                          const formatted = formatVNDateOnChange(e.target.value);
                          field.onChange(formatted);
                        }}
                      />
                    );
                  }}
                />

                {errors.dateOfBirth && <FieldError>{errors.dateOfBirth.message}</FieldError>}
              </Field>

              <Field>
                <FieldLabel>
                  Giới tính <span className="text-destructive">*</span>
                </FieldLabel>

                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => {
                    return (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger
                          className={cn('w-full', !field.value && 'text-muted-foreground')}
                        >
                          <SelectValue placeholder="Chọn giới tính" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Giới tính</SelectLabel>

                            {(
                              [
                                { label: 'Nam', value: '0001' },
                                { label: 'Nữ', value: '0002' },
                                { label: 'Khác', value: '0003' },
                              ] as ItemSelect[]
                            ).map((item) => (
                              <SelectItem
                                key={item.value}
                                value={item.value}
                                onSelect={() => {
                                  field.onChange(item.value);
                                }}
                              >
                                {item.label ?? '...'}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    );
                  }}
                />

                {errors.gender && <FieldError>{errors.gender.message}</FieldError>}
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>
                  Số điện thoại <span className="text-destructive">*</span>
                </FieldLabel>

                <Controller
                  control={control}
                  name="phone"
                  render={({ field }) => {
                    return (
                      <Input
                        id="phone"
                        value={field.value}
                        placeholder="xxxx xxx xxx"
                        onChange={(e) => {
                          const formatted = formatPhoneVN(e.target.value);
                          field.onChange(formatted);
                        }}
                      />
                    );
                  }}
                />

                {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="placeOfResidence">
                Nơi cư trú <span className="text-destructive">*</span>
              </FieldLabel>

              <Input id="placeOfResidence" {...register('placeOfResidence')} />

              <FieldDescription>
                Lưu ý: Sử dụng nơi cư trú đã được đăng ký trên thẻ căn cước.
              </FieldDescription>

              {errors.placeOfResidence && (
                <FieldError>{errors.placeOfResidence.message}</FieldError>
              )}
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <FieldGroup className="w-full max-w-3xl mx-auto @container/card">
        <Field orientation={isMobile ? 'responsive' : 'horizontal'} className="justify-end">
          <Button variant="outline">Huỷ</Button>

          <Button type="submit" form="createTenantForm" disabled={isSubmitting}>
            Thêm người thuê
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default CreateTenantForm;
