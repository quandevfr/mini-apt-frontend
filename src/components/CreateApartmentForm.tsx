// Libs
import { Check, ChevronsUpDown, CloudUpload, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getProvinces, getWardsByProvinceCode } from '@/features/address/addressThunk';
import { Spinner } from '@/components/ui/spinner';
import { createApartment } from '@/features/apartment/apartmentThunk';
import type { Item } from '@/types/common';
import { useGlobalLoading } from '@/hooks/useGlobalLoading';

type CreateApartmentFormValues = z.infer<typeof createApartmentFormSchema>;

const CreateApartmentForm = ({ className, ...props }: React.ComponentProps<'form'>) => {
  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateApartmentFormValues>({
    resolver: zodResolver(createApartmentFormSchema),
    defaultValues: {
      name: '',
      totalRooms: 1,
      availableRooms: 0,
      address: {
        provinceCode: '',
        provinceName: '',
        // districtCode: '',
        // districtName: '',
        wardCode: '',
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
  const dispatch = useAppDispatch();
  const { isProvincesLoading, isWardsLoading, provinces, wardsByProvinceCode } = useAppSelector(
    (state) => state.address
  );
  const { isLoading: isUploading } = useAppSelector((state) => state.upload);
  const { startLoading, stopLoading, isLoading: isGlobalLoading } = useGlobalLoading();

  const [openProvince, setOpenProvince] = useState<boolean>(false);
  const [openWard, setOpenWard] = useState<boolean>(false);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getProvinces());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleProvinceSelect = (provinceCode: string) => {
    if (!provinceCode) return;

    dispatch(getWardsByProvinceCode(provinceCode));

    const findProvince = (provinces || []).find(
      (province) => province.code.toString() === provinceCode
    );

    if (findProvince) {
      setValue('address.provinceCode', findProvince?.code.toString());
      setValue('address.provinceName', findProvince?.name);
    }
  };

  const handleWardSelect = (wardCode: string) => {
    const findWard = (wardsByProvinceCode?.wards || []).find(
      (ward) => ward.code.toString() === wardCode
    );

    if (findWard) {
      setValue('address.wardCode', findWard?.code.toString());
      setValue('address.wardName', findWard?.name);
    }
  };

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
    try {
      startLoading();
      await dispatch(createApartment(data)).unwrap();

      reset();
      navigate(PATHS.PAGE.APARTMENTS.INDEX);
    } catch (error) {
      console.error(error);
      stopLoading();
    }
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
      <fieldset disabled={isGlobalLoading} className="space-y-4 disabled:opacity-80">
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
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={isGlobalLoading}
                        >
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
                        disabled={isUploading}
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

                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => {
                    return (
                      <Textarea
                        id="description"
                        placeholder="Nhập thông tin mô tả, ghi chú, ..."
                        value={field.value}
                        onChange={field.onChange}
                      />
                    );
                  }}
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

            <CardDescription>Thông tin liên hệ của chủ chung cư mini (tòa nhà)</CardDescription>
          </CardHeader>

          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              <Field className="grid gap-3">
                <FieldLabel htmlFor="contactName">
                  Họ và Tên chủ nhà <span className="text-destructive">*</span>
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
                    return (
                      <Input id="contactPhone" value={field.value} onChange={field.onChange} />
                    );
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
                name="address.provinceCode"
                control={control}
                render={({ field }) => {
                  const provinceFormatted: Item[] = (provinces || []).map((province) => ({
                    label: province.name,
                    value: province.code.toString(),
                  }));

                  const selectedProvince = provinceFormatted.find(
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
                          disabled={isProvincesLoading}
                        >
                          {selectedProvince?.label ?? 'Chọn tỉnh/thành phố'}

                          {isProvincesLoading ? (
                            <Spinner />
                          ) : (
                            <ChevronsUpDown className="opacity-50" />
                          )}
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="end">
                        <Command>
                          <CommandInput placeholder="Tìm tỉnh/thành phố..." className="h-9" />

                          <CommandList>
                            <CommandEmpty>Không có dữ liệu.</CommandEmpty>
                            <CommandGroup>
                              {provinceFormatted.map((item) => (
                                <CommandItem
                                  key={item.value}
                                  onSelect={() => {
                                    field.onChange(item.value);
                                    setOpenProvince(false);
                                    handleProvinceSelect(item.value);
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

              {errors.address?.provinceCode && (
                <p className="text-destructive text-sm">{errors.address.provinceCode.message}</p>
              )}
            </Field>

            <Field className="grid gap-3">
              <FieldLabel htmlFor="ward">
                Xã/Phường <span className="text-destructive">*</span>
              </FieldLabel>

              <Controller
                control={control}
                name="address.wardCode"
                render={({ field }) => {
                  const wardsFormatted: Item[] = (wardsByProvinceCode?.wards || []).map((ward) => ({
                    label: ward.name,
                    value: ward.code.toString(),
                  }));

                  const selectedWard = wardsFormatted.find((ward) => ward.value === field.value);

                  return (
                    <Popover open={openWard} onOpenChange={setOpenWard}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openWard}
                          className={cn(
                            'justify-between font-normal',
                            !selectedWard && 'text-muted-foreground'
                          )}
                          id="ward"
                          name="ward"
                          disabled={isWardsLoading}
                        >
                          {selectedWard?.label ?? 'Chọn xã/phường'}

                          {isWardsLoading ? <Spinner /> : <ChevronsUpDown className="opacity-50" />}
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="end">
                        <Command>
                          <CommandInput placeholder="Tìm xã/phường..." className="h-9" />

                          <CommandList>
                            <CommandEmpty>Không có dữ liệu.</CommandEmpty>

                            <CommandGroup>
                              {wardsFormatted.map((item: Item) => (
                                <CommandItem
                                  key={item.value}
                                  onSelect={() => {
                                    field.onChange(item.value);
                                    setOpenWard(false);
                                    handleWardSelect(item.value);
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
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  );
                }}
              />

              {errors.address?.wardCode && (
                <p className="text-destructive text-sm">{errors.address?.wardCode.message}</p>
              )}
            </Field>

            <Field className="grid gap-3">
              <FieldLabel htmlFor="street">
                Địa chỉ (số nhà, tên đường...) <span className="text-destructive">*</span>
              </FieldLabel>

              <Controller
                control={control}
                name="address.street"
                render={({ field }) => {
                  return <Input id="street" value={field.value} onChange={field.onChange} />;
                }}
              />

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

          <Button type="submit" size={'lg'} form="apartmentForm" disabled={isGlobalLoading}>
            {isGlobalLoading ? (
              <>
                <Spinner />
                Đang thêm mới...
              </>
            ) : (
              'Thêm chung cư'
            )}
          </Button>
        </Field>
      </fieldset>
    </form>
  );
};

export default CreateApartmentForm;
