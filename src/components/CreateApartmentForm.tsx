// Libs
import { Check, ChevronsUpDown, CloudUpload, X } from 'lucide-react';
import React, { useState } from 'react';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

// Components
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import IntegerInput from './IntegerInput';
import { Textarea } from '@/components/ui/textarea';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '@/components/ui/combobox';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Field, FieldLabel } from '@/components/ui/field';
import {
  FileUpload,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
  FileUploadDropzone,
} from '@/components/ui/file-upload';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { EmptyMedia } from '@/components/ui/empty';

// Others
import { PATHS } from '@/utils/constants/paths';
import { MAX_FILE_SIZE } from '@/utils/constants/file';
import { FileRejectReason } from '@/utils/enums/file';
import { cn } from '@/libs/utils';
import { AMENITIES, STATUS, createApartmentFormSchema } from '@/pages/apartment/apartmentSchema';

type Item = {
  label: string;
  value: string;
};
//   {
//     label: 'Mạng wifi',
//     value: 'wifi',
//   },
//   {
//     label: 'Chỗ để xe',
//     value: 'parking',
//   },
//   {
//     label: 'Camera an ninh',
//     value: 'camera',
//   },
//   {
//     label: 'Bảo vệ',
//     value: 'security',
//   },
//   {
//     label: 'Máy giặt',
//     value: 'elevator',
//   },
//   {
//     label: 'Thang máy',
//     value: 'laundry',
//   },
//   {
//     label: 'Khóa cửa vân tay',
//     value: 'fingerprintLock',
//   },
//   {
//     label: 'An toàn phòng cháy, chữa cháy',
//     value: 'firePrevention',
//   },
// ] as const;

// const STATUS = [
//   {
//     label: 'Hoạt động',
//     value: 'active',
//   },
//   {
//     label: 'Ngưng hoạt động',
//     value: 'inactive',
//   },
//   {
//     label: 'Tạm dừng vận hành',
//     value: 'suspended',
//   },
// ] as const;

// const addressSchema = z.object({
//   // provinceCode: z.string('Mã tỉnh/thành phố là bắt buộc').min(1, 'Mã tỉnh/thành phố là bắt buộc'),

//   provinceName: z.string('Tên tỉnh/thành phố là bắt buộc').min(1, 'Tên tỉnh/thành phố là bắt buộc'),

//   // districtCode: z.string('Mã quận/huyện là bắt buộc').min(1, 'Mã quận/huyện là bắt buộc'),

//   // districtName: z.string('Tên quận/huyện là bắt buộc').min(1, 'Tên quận/huyện là bắt buộc'),

//   // wardCode: z.string('Mã phường/xã là bắt buộc').min(1, 'Mã phường/xã là bắt buộc'),

//   wardName: z.string('Tên phường/xã là bắt buộc').min(1, 'Tên phường/xã là bắt buộc'),

//   street: z
//     .string('Tên đường/số nhà là bắt buộc')
//     .trim()
//     .min(5, 'Địa chỉ chi tiết (số nhà, tên đường) phải có ít nhất 5 ký tự'),
// });

// const contactSchema = z.object({
//   name: z.string().min(1, 'Tên chủ nhà là bắt buộc.').trim(),
//   phone: z
//     .string('Số điện thoại chủ nhà là bắt buộc.')
//     .regex(/^(0|\+84)[3-9]\d{8}$/, 'Số điện thoại không hợp lệ'),
// });

// const createApartmentFormSchema = z
//   .object({
//     name: z.string().min(1, 'Tên chung cư mini (tòa nhà) là bắt buộc.'),
//     totalRooms: z
//       .number('Tổng số phòng là bắt buộc.')
//       .int('Tổng số phòng phải là số nguyên.')
//       .min(1, 'Tổng số phòng phải lớn hơn hoặc bằng 1.'),
//     availableRooms: z
//       .number('Số phòng trống là bắt buộc.')
//       .int('Số phòng trống phải là số nguyên.')
//       .min(0, 'Số phòng trống phải lớn hơn 0.'),
//     address: addressSchema,
//     contact: contactSchema,
//     description: z.string().max(2000, 'Mô tả không được vượt quá 2000 ký tự.').trim().optional(),
//     amenities: z
//       .array(
//         z.enum(
//           AMENITIES.map((a) => a.value),
//           {
//             error: () => ({
//               message: `Tiện ích không hợp lệ. Chỉ chấp nhận: ${AMENITIES.map((a) => a.value).join(', ')}`,
//             }),
//           }
//         )
//       )
//       .optional()
//       .catch([]),
//     status: z
//       .enum(
//         STATUS.map((s) => s.value),
//         {
//           error: () => ({
//             message: `Trạng thái không hợp lệ. Chỉ chấp nhận: ${STATUS.map((s) => s.value).join(', ')}`,
//           }),
//         }
//       )
//       .catch('active'),
//     images: z
//       .array(z.instanceof(File))
//       .refine(
//         (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
//         'Ảnh phải nhỏ hơn hoặc bằng 5MB.'
//       )
//       .refine((files) =>
//         files.every(
//           (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
//           'Chỉ chấp nhận ảnh .JPG, .PNG, .WEBP'
//         )
//       )
//       .optional()
//       .catch([]),
//   })
//   .refine((data) => data.availableRooms <= data.totalRooms, {
//     message: 'Số phòng trống không được vượt quá tổng số phòng',
//     path: ['availableRooms'],
//   });

type CreateApartmentFormValues = z.infer<typeof createApartmentFormSchema>;

const CreateApartmentForm = ({ className, ...props }: React.ComponentProps<'form'>) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateApartmentFormValues>({
    resolver: zodResolver(createApartmentFormSchema),
    defaultValues: {
      name: '',
      totalRooms: 1,
      availableRooms: 0,
      address: {
        // provinceCode: '',
        provinceName: '',
        // districtCode: '',
        // districtName: '',
        // wardCode: '',
        wardName: '',
        street: '',
      },
      contact: {
        name: '',
        phone: '',
      },
      description: '',
      amenities: [],
      status: 'active',
      images: [],
    },
  });

  const anchor = useComboboxAnchor();
  const navigate = useNavigate();

  const [openProvince, setOpenProvince] = useState<boolean>(false);
  const [openCommune, setOpenCommune] = useState<boolean>(false);

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

  const onSubmit = async (data: CreateApartmentFormValues) => {
    console.log(data);
  };

  const handleCloseForm = () => {
    reset();
    navigate(PATHS.PAGE.APARTMENTS.INDEX);
  };

  return (
    <form
      id="apartmentForm"
      className={cn(className, 'grid grid-cols-1 gap-8')}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card className="w-full max-w-3xl mx-auto @container/card">
        <CardHeader>
          <CardTitle>Chi tiết</CardTitle>

          <CardDescription>Thông tin chi tiết của chung cư mini (tòa nhà)</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6">
          <div className="grid gap-6">
            <Field className="grid gap-3">
              <FieldLabel htmlFor="name">
                Tên chung cư mini (tòa nhà) <span className="text-destructive">*</span>
              </FieldLabel>

              <Controller
                control={control}
                name="name"
                render={({ field }) => {
                  return <Input id="name" value={field.value} onChange={field.onChange} />;
                }}
              />

              {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              <Field className="grid gap-3">
                <FieldLabel htmlFor="totalRooms">
                  Tổng số phòng <span className="text-destructive">*</span>
                </FieldLabel>

                <Controller
                  control={control}
                  name="totalRooms"
                  render={({ field }) => {
                    return (
                      <IntegerInput
                        {...field}
                        value={field.value ?? ''}
                        id="totalRooms"
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === '' ? '' : Number(val));
                        }}
                      />
                    );
                  }}
                />

                {errors.totalRooms && (
                  <p className="text-destructive text-sm">{errors.totalRooms.message}</p>
                )}
              </Field>

              <Field className="grid gap-3">
                <FieldLabel htmlFor="availableRooms">
                  Số phòng trống <span className="text-destructive">*</span>
                </FieldLabel>

                <Controller
                  control={control}
                  name="availableRooms"
                  render={({ field }) => {
                    return (
                      <IntegerInput
                        {...field}
                        value={field.value ?? ''}
                        id="availableRooms"
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === '' ? '' : Number(val));
                        }}
                      />
                    );
                  }}
                />

                {errors.availableRooms && (
                  <p className="text-destructive text-sm">{errors.availableRooms.message}</p>
                )}
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              <Field className="grid gap-3">
                <FieldLabel htmlFor="amenities">Tiện ích</FieldLabel>

                <Controller
                  control={control}
                  name="amenities"
                  render={({ field }) => {
                    return (
                      <Combobox
                        multiple
                        autoHighlight
                        items={AMENITIES}
                        defaultValue={[]}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <ComboboxChips ref={anchor} className="w-full">
                          <ComboboxValue>
                            {(values) => (
                              <React.Fragment>
                                {values.map((value: string) => {
                                  const matchedItem = AMENITIES.find(
                                    (item) => item.value === value
                                  );
                                  return (
                                    <ComboboxChip key={value}>
                                      {matchedItem ? matchedItem.label : value}
                                    </ComboboxChip>
                                  );
                                })}
                                <ComboboxChipsInput id="amenities" />
                              </React.Fragment>
                            )}
                          </ComboboxValue>
                        </ComboboxChips>

                        <ComboboxContent anchor={anchor}>
                          <ComboboxEmpty>Không tìm thấy mục nào.</ComboboxEmpty>
                          <ComboboxList>
                            {(item) => (
                              <ComboboxItem key={item.value} value={item.value}>
                                {item.label}
                              </ComboboxItem>
                            )}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>
                    );
                  }}
                />

                {errors.amenities && (
                  <p className="text-destructive text-sm">{errors.amenities.message}</p>
                )}
              </Field>

              <Field className="grid gap-3">
                <FieldLabel htmlFor="status">
                  Trạng thái <span className="text-destructive">*</span>
                </FieldLabel>

                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => {
                    return (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="status" className={cn('w-full')}>
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            {STATUS.map((status) => (
                              <SelectItem key={status.value} value={status.value}>
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    );
                  }}
                />

                {errors.status && (
                  <p className="text-destructive text-sm">{errors.status.message}</p>
                )}
              </Field>
            </div>

            <Field className="grid gap-3">
              <FieldLabel>Hình ảnh</FieldLabel>

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
                        <div className="flex flex-col items-center gap-4 text-center">
                          <EmptyMedia variant="icon">
                            <CloudUpload />
                          </EmptyMedia>

                          <div className="flex flex-col justify-center gap-3">
                            <p className="font-medium text-sm">Kéo và thả hoặc nhấn Chọn ảnh</p>

                            <p className="text-muted-foreground text-xs">
                              Định dạng: JPG, PNG, JPEG, WEBP (tối đa 5 tệp, tối đa 5MB mỗi tệp)
                            </p>
                          </div>
                        </div>

                        <FileUploadTrigger asChild>
                          <Button variant="outline" size="sm" className="mt-5 w-fit">
                            Chọn ảnh
                          </Button>
                        </FileUploadTrigger>
                      </FileUploadDropzone>

                      <FileUploadList>
                        {field.value?.map((file: File, index: number) => {
                          const preview = URL.createObjectURL(file);

                          return (
                            <FileUploadItem key={index} value={file}>
                              <div
                                className="cursor-pointer"
                                onClick={() => setPreviewUrl(preview)}
                              >
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

              {/* Preview dialog */}
              <Dialog open={!!previewUrl} onOpenChange={() => setPreviewUrl(null)}>
                <DialogContent className="max-w-3xl p-6">
                  <DialogTitle>
                    <span className="sr-only">Xem ảnh chung cư mini</span>
                  </DialogTitle>

                  <DialogDescription>
                    <span className="sr-only">Bản xem trước ảnh chung cư mini phóng to</span>
                  </DialogDescription>

                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Preview apartment"
                      className="w-full h-full object-contain"
                    />
                  )}
                </DialogContent>
              </Dialog>

              {errors.description && (
                <p className="text-destructive text-sm">{errors.description.message}</p>
              )}
            </Field>

            <Field className="grid gap-3">
              <FieldLabel htmlFor="description">Ghi chú</FieldLabel>

              <Textarea
                id="description"
                placeholder="Nhập thông tin mô tả, ghi chú, ..."
                {...register('description')}
              />

              {errors.description && (
                <p className="text-destructive text-sm">{errors.description.message}</p>
              )}
            </Field>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-3xl mx-auto @container/card">
        <CardHeader>
          <CardTitle>Liên hệ</CardTitle>

          <CardDescription>
            Thông tin liên hệ của chủ, quản lý chung cư mini (tòa nhà)
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <Field className="grid gap-3">
              <FieldLabel htmlFor="contactName">
                Họ & Tên chủ nhà <span className="text-destructive">*</span>
              </FieldLabel>

              <Controller
                control={control}
                name="contact.name"
                render={({ field }) => {
                  return <Input id="contactName" value={field.value} onChange={field.onChange} />;
                }}
              />

              {errors.contact?.name && (
                <p className="text-destructive text-sm">{errors.contact.name.message}</p>
              )}
            </Field>

            <Field className="grid gap-3">
              <FieldLabel htmlFor="contactPhone">
                Số điện thoại chủ nhà <span className="text-destructive">*</span>
              </FieldLabel>

              <Controller
                control={control}
                name="contact.phone"
                render={({ field }) => {
                  return <Input id="contactPhone" value={field.value} onChange={field.onChange} />;
                }}
              />

              {errors.contact?.phone && (
                <p className="text-destructive text-sm">{errors.contact.phone.message}</p>
              )}
            </Field>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-3xl mx-auto @container/card">
        <CardHeader>
          <CardTitle>Địa chỉ</CardTitle>

          <CardDescription>Thông tin địa chỉ của chung cư mini (tòa nhà)</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6">
          <Field className="grid gap-3">
            <FieldLabel htmlFor="province">
              Tỉnh/Thành phố <span className="text-destructive">*</span>
            </FieldLabel>

            <Controller
              name="address.provinceName"
              control={control}
              render={({ field }) => {
                const selectedProvince = ([{ label: 'Hà nội', value: 'hn' }] as Item[]).find(
                  (province) => province.value === field.value
                );

                return (
                  <Popover open={openProvince} onOpenChange={setOpenProvince}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openProvince}
                        className={cn(
                          'justify-between font-normal',
                          !selectedProvince && 'text-muted-foreground'
                        )}
                        id="province"
                        name="province"
                      >
                        {selectedProvince?.label ?? 'Chọn tỉnh/thành phố'}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="end">
                      <Command>
                        <CommandInput placeholder="Tìm tỉnh/thành phố..." className="h-9" />

                        <CommandList>
                          <CommandEmpty>Không có dữ liệu.</CommandEmpty>
                          <CommandGroup>
                            {([{ label: 'Hà nội', value: 'hn' }] as Item[]).map((item) => (
                              <CommandItem
                                key={item.value}
                                onSelect={() => {
                                  field.onChange(item.value);
                                  setOpenProvince(false);
                                }}
                              >
                                {item.label || '...'}
                                <Check
                                  className={cn(
                                    'ml-auto',
                                    item.value === field.value ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                );
              }}
            />

            {errors.address?.provinceName && (
              <p className="text-destructive text-sm">{errors.address.provinceName.message}</p>
            )}
          </Field>

          <Field className="grid gap-3">
            <FieldLabel htmlFor="ward">
              Xã/Phường <span className="text-destructive">*</span>
            </FieldLabel>

            <Controller
              control={control}
              name="address.wardName"
              render={({ field }) => {
                const selectedCommune = ([{ label: 'Mỹ Đình', value: '00592' }] as Item[]).find(
                  (commune) => commune.value === field.value
                );

                return (
                  <Popover open={openCommune} onOpenChange={setOpenCommune}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openCommune}
                        className={cn(
                          'justify-between font-normal',
                          !selectedCommune && 'text-muted-foreground'
                        )}
                        id="ward"
                        name="ward"
                      >
                        {selectedCommune?.label ?? 'Chọn xã/phường'}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="end">
                      <Command>
                        <CommandInput placeholder="Tìm xã/phường..." className="h-9" />

                        <CommandList>
                          <CommandEmpty>Không có dữ liệu.</CommandEmpty>

                          <CommandGroup>
                            {([{ label: 'Mỹ Đình', value: '00592' }] as Item[]).map(
                              (item: Item) => (
                                <CommandItem
                                  key={item.value}
                                  onSelect={() => {
                                    field.onChange(item.value);
                                    setOpenCommune(false);
                                  }}
                                >
                                  {item.label ?? '...'}
                                  <Check
                                    className={cn(
                                      'ml-auto',
                                      item.value === field.value ? 'opacity-100' : 'opacity-0'
                                    )}
                                  />
                                </CommandItem>
                              )
                            )}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                );
              }}
            />

            {errors.address?.wardName && (
              <p className="text-destructive text-sm">{errors.address?.wardName.message}</p>
            )}
          </Field>

          <Field className="grid gap-3">
            <FieldLabel htmlFor="street">
              Địa chỉ (số nhà, tên đường...) <span className="text-destructive">*</span>
            </FieldLabel>

            <Input id="street" {...register('address.street')} />

            {errors.address?.street && (
              <p className="text-destructive text-sm">{errors.address.street.message}</p>
            )}
          </Field>
        </CardContent>
      </Card>

      <Field
        orientation={'horizontal'}
        className={cn(
          'w-full max-w-3xl mx-auto @container/card',
          'flex items-center justify-end gap-4 flex-wrap md:flex-row pb-12'
        )}
      >
        <Button variant="outline" size={'lg'} onClick={handleCloseForm}>
          Huỷ
        </Button>

        <Button type="submit" size={'lg'} form="apartmentForm" disabled={isSubmitting}>
          Thêm chung cư
        </Button>
      </Field>
    </form>
  );
};

export default CreateApartmentForm;
