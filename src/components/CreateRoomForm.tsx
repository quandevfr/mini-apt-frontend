// Libs
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { Check, ChevronLeftIcon, ChevronsUpDown, PlusIcon, TrashIcon } from 'lucide-react';
import { NumericFormat } from 'react-number-format';

// Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSet } from './ui/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { ImageUploader } from '@/components/ui/imageUploader/ImageUploader';

// Others
import { cn } from '@/libs/utils';
import type { ItemSelect } from '@/utils/interface';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  createRoomSchema,
  ROOM_BILLING_TYPE,
  ROOM_STATUS,
  type CreateRoomValues,
} from '@/pages/room/roomSchema';
import { useCustomNavigate } from '@/hooks/useCustomNavigate';

const CreateRoomForm = ({ className, ...props }: React.ComponentProps<'form'>) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateRoomValues>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      apartmentId: '',
      roomName: '',
      area: undefined,
      maxPeople: undefined,
      status: 'AVAILABLE',
      price: undefined,
      deposit: undefined,
      internetFee: undefined,
      cleaningFee: undefined,
      laundryFee: undefined,
      parkingFee: undefined,
      electricityPrice: undefined,
      initialElectricityIndex: undefined,
      waterCalculationType: 'PER_CUBIC',
      waterPrice: undefined,
      initialWaterIndex: undefined,
      assets: [{ name: '', status: '' }],
      images: [],
      customFees: [{ name: '', price: undefined, type: 'PER_ROOM' }],
      quantity: 1,
    } as unknown as CreateRoomValues,
  });

  const apartmentId = useWatch({
    control,
    name: 'apartmentId',
    defaultValue: '',
  });
  const waterCalculationType = useWatch({
    control,
    name: 'waterCalculationType',
    defaultValue: 'PER_CUBIC',
  });

  const isMobile = useIsMobile();
  const appNavigate = useCustomNavigate();

  const [openApartment, setOpenApartment] = useState<boolean>(false);

  const { append, fields, remove } = useFieldArray({ control, name: 'customFees' });
  const {
    append: appendAsset,
    fields: fieldsAsset,
    remove: removeAsset,
  } = useFieldArray({ control, name: 'assets' });

  const onSubmit = async (data: CreateRoomValues) => {
    console.log(data);
  };

  return (
    <form
      id="createRoomForm"
      className={cn(className, 'flex flex-col gap-7')}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className={cn('w-full max-w-3xl mx-auto @container/card flex items-center gap-3')}>
        <Button
          variant="outline"
          size="icon"
          className={cn('btn-press-effect')}
          onClick={() => appNavigate(-1)}
        >
          <ChevronLeftIcon />
        </Button>

        <div className={cn('font-semibold line-clamp-1 capitalize')}>Tạo Phòng</div>
      </div>

      <FieldSet disabled={false}>
        <Card className="w-full max-w-3xl mx-auto @container/card">
          <CardHeader>
            <CardTitle>Thông tin phòng</CardTitle>

            <CardDescription>
              Quản lý tên phòng, diện tích, sức chứa và cập nhật trạng thái hiển thị của phòng trên
              hệ thống.
            </CardDescription>
          </CardHeader>

          <CardContent className="pb-7">
            <FieldGroup>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>
                    Chung cư mini <span className="text-destructive">*</span>
                  </FieldLabel>

                  <Controller
                    control={control}
                    name="apartmentId"
                    render={({ field }) => {
                      const selectedApt = (
                        [{ label: 'Green homes mini', value: '0001' }] as ItemSelect[]
                      ).find((apt) => apt.value === field.value);

                      return (
                        <Popover open={openApartment} onOpenChange={setOpenApartment}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openApartment}
                              className={cn(
                                'justify-between font-normal',
                                !selectedApt && 'text-muted-foreground'
                              )}
                              id="commune"
                              name="commune"
                            >
                              {selectedApt?.label ?? 'Chọn chung cư mini'}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </PopoverTrigger>

                          <PopoverContent
                            className="w-(--radix-popover-trigger-width) p-0"
                            align="end"
                          >
                            <Command>
                              <CommandInput placeholder="Tìm chung cư mini..." className="h-9" />

                              <CommandList>
                                <CommandEmpty>Không có dữ liệu.</CommandEmpty>

                                <CommandGroup>
                                  {(
                                    [{ label: 'Green homes mini', value: '0001' }] as ItemSelect[]
                                  ).map((item) => (
                                    <CommandItem
                                      key={item.value}
                                      onSelect={() => {
                                        field.onChange(item.value);
                                        setOpenApartment(false);
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

                  <FieldDescription>Chọn chung cư mini để thêm phòng mới.</FieldDescription>

                  {errors.apartmentId && <FieldError>{errors.apartmentId.message}</FieldError>}
                </Field>

                <FieldSet disabled={!apartmentId}>
                  <Field>
                    <FieldLabel htmlFor="roomName">
                      Tên phòng <span className="text-destructive">*</span>
                    </FieldLabel>

                    <Controller
                      control={control}
                      name="roomName"
                      render={({ field }) => {
                        return (
                          <Input id="roomName" value={field.value} onChange={field.onChange} />
                        );
                      }}
                    />

                    {errors.roomName && <FieldError>{errors.roomName.message}</FieldError>}
                  </Field>
                </FieldSet>
              </div>

              <FieldSet disabled={!apartmentId}>
                <FieldGroup className="grid grid-cols-1 gap-4 items-start md:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="area">Diện tích (m²)</FieldLabel>

                    <Controller
                      control={control}
                      name="area"
                      render={({ field }) => (
                        <NumericFormat
                          value={field.value}
                          decimalScale={2}
                          allowNegative={false}
                          thousandSeparator="."
                          decimalSeparator=","
                          suffix=" m²"
                          customInput={Input}
                          placeholder="Nhập diện tích theo m²"
                          onValueChange={(values) => field.onChange(values.floatValue ?? 0)}
                        />
                      )}
                    />

                    {errors.area && <FieldError>{errors.area.message}</FieldError>}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="maxPeople">Số người ở tối đa</FieldLabel>

                    <Controller
                      control={control}
                      name="maxPeople"
                      render={({ field }) => {
                        return (
                          <NumericFormat
                            value={field.value}
                            decimalScale={0}
                            allowNegative={false}
                            thousandSeparator={false}
                            customInput={Input}
                            onValueChange={(values) => field.onChange(values.floatValue ?? 0)}
                          />
                        );
                      }}
                    />

                    {errors.maxPeople && <FieldError>{errors.maxPeople.message}</FieldError>}
                  </Field>

                  <Field>
                    <FieldLabel>
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
                            disabled={!apartmentId}
                          >
                            <SelectTrigger className={cn('w-full')}>
                              <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectGroup>
                                {ROOM_STATUS.map((item) => (
                                  <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        );
                      }}
                    />

                    {errors.status && <FieldError>{errors.status.message}</FieldError>}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="maxPeople">Số phòng tương tự</FieldLabel>

                    <Controller
                      control={control}
                      name="quantity"
                      render={({ field }) => {
                        return (
                          <NumericFormat
                            value={field.value}
                            decimalScale={0}
                            allowNegative={false}
                            thousandSeparator={false}
                            customInput={Input}
                            onValueChange={(values) => field.onChange(values.floatValue ?? 0)}
                          />
                        );
                      }}
                    />

                    <FieldDescription>
                      Số lượng phòng muốn tạo với cấu hình tương tự. Mặc định sẽ chỉ tạo 1 phòng.
                    </FieldDescription>

                    {errors.quantity && <FieldError>{errors.quantity.message}</FieldError>}
                  </Field>
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </CardContent>
        </Card>

        <Card className="w-full max-w-3xl mx-auto @container/card">
          <CardHeader>
            <CardTitle>Chi phí thuê & Đặt cọc</CardTitle>

            <CardDescription>
              Cấu hình giá thuê cố định định kỳ và số tiền giữ chỗ/đặt cọc khi khách hàng ký hợp
              đồng.
            </CardDescription>
          </CardHeader>

          <CardContent className="pb-7">
            <FieldSet disabled={!apartmentId}>
              <FieldGroup>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="price">
                      Giá thuê phòng / tháng <span className="text-destructive">*</span>
                    </FieldLabel>

                    <Controller
                      control={control}
                      name={`price`}
                      render={({ field }) => {
                        return (
                          <NumericFormat
                            value={field.value}
                            thousandSeparator="."
                            decimalSeparator=","
                            suffix=" đ"
                            customInput={Input}
                            placeholder="Ví dụ: 1.000.000 ₫"
                            onValueChange={(value) => field.onChange(value.floatValue ?? 0)}
                          />
                        );
                      }}
                    />

                    {errors.price && <FieldError>{errors.price.message}</FieldError>}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="deposit">Tiền đặt cọc</FieldLabel>

                    <Controller
                      control={control}
                      name={`deposit`}
                      render={({ field }) => {
                        return (
                          <NumericFormat
                            value={field.value}
                            thousandSeparator="."
                            decimalSeparator=","
                            suffix=" đ"
                            customInput={Input}
                            placeholder="Ví dụ: 1.000.000 ₫"
                            onValueChange={(value) => field.onChange(value.floatValue ?? 0)}
                          />
                        );
                      }}
                    />

                    {errors.deposit && <FieldError>{errors.deposit.message}</FieldError>}
                  </Field>
                </div>
              </FieldGroup>
            </FieldSet>
          </CardContent>
        </Card>

        <Card className="w-full max-w-3xl mx-auto @container/card">
          <CardHeader>
            <CardTitle>Phí dịch vụ hàng tháng</CardTitle>

            <CardDescription>
              Các khoản chi phí tiện ích có mức giá cố định thu kèm mỗi tháng (Internet, vệ sinh,
              quản lý, xe...).
            </CardDescription>
          </CardHeader>

          <CardContent className="pb-7">
            <FieldSet disabled={!apartmentId}>
              <FieldGroup>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="internetFee">Phí mạng / Internet</FieldLabel>

                    <Controller
                      control={control}
                      name={`internetFee`}
                      render={({ field }) => {
                        return (
                          <NumericFormat
                            value={field.value}
                            thousandSeparator="."
                            decimalSeparator=","
                            suffix=" đ"
                            customInput={Input}
                            placeholder="Ví dụ: 100.000 ₫"
                            onValueChange={(value) => field.onChange(value.floatValue ?? 0)}
                          />
                        );
                      }}
                    />

                    {errors.internetFee && <FieldError>{errors.internetFee.message}</FieldError>}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="cleaningFee">Phí vệ sinh + rác thải</FieldLabel>

                    <Controller
                      control={control}
                      name={`cleaningFee`}
                      render={({ field }) => {
                        return (
                          <NumericFormat
                            value={field.value}
                            thousandSeparator="."
                            decimalSeparator=","
                            suffix=" đ"
                            customInput={Input}
                            placeholder="Ví dụ: 100.000 ₫"
                            onValueChange={(value) => field.onChange(value.floatValue ?? 0)}
                          />
                        );
                      }}
                    />

                    {errors.cleaningFee && <FieldError>{errors.cleaningFee.message}</FieldError>}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="laundryFee">Phí máy giặt / máy sấy</FieldLabel>

                    <Controller
                      control={control}
                      name={`laundryFee`}
                      render={({ field }) => {
                        return (
                          <NumericFormat
                            value={field.value}
                            thousandSeparator="."
                            decimalSeparator=","
                            suffix=" đ"
                            customInput={Input}
                            placeholder="Ví dụ: 100.000 ₫"
                            onValueChange={(value) => field.onChange(value.floatValue ?? 0)}
                          />
                        );
                      }}
                    />

                    {errors.laundryFee && <FieldError>{errors.laundryFee.message}</FieldError>}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="parkingFee">Phí gửi xe</FieldLabel>

                    <Controller
                      control={control}
                      name={`parkingFee`}
                      render={({ field }) => {
                        return (
                          <NumericFormat
                            value={field.value}
                            thousandSeparator="."
                            decimalSeparator=","
                            suffix=" đ"
                            customInput={Input}
                            placeholder="Ví dụ: 100.000 ₫"
                            onValueChange={(value) => field.onChange(value.floatValue ?? 0)}
                          />
                        );
                      }}
                    />

                    {errors.parkingFee && <FieldError>{errors.parkingFee.message}</FieldError>}
                  </Field>
                </div>
              </FieldGroup>
            </FieldSet>
          </CardContent>
        </Card>

        <Card className="w-full max-w-3xl mx-auto @container/card">
          <CardHeader>
            <CardTitle>Chi phí khác</CardTitle>

            <CardDescription>
              Cấu hình các khoản phí đặc thù hoặc dịch vụ mở rộng áp dụng riêng cho chung cư này.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldSet disabled={!apartmentId}>
              {fields.map((item, index) => (
                <FieldGroup
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_36px] gap-4"
                >
                  <Field>
                    <FieldLabel>Tên loại phí</FieldLabel>

                    <Controller
                      control={control}
                      name={`customFees.${index}.name`}
                      render={({ field }) => {
                        return <Input value={field.value} onChange={field.onChange} />;
                      }}
                    />

                    {errors.customFees?.[index]?.name && (
                      <FieldError>{errors.customFees[index]?.name?.message}</FieldError>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel>Số tiền</FieldLabel>

                    <Controller
                      control={control}
                      name={`customFees.${index}.price`}
                      render={({ field }) => {
                        return (
                          <NumericFormat
                            value={field.value}
                            thousandSeparator="."
                            decimalSeparator=","
                            suffix=" đ"
                            customInput={Input}
                            placeholder="Ví dụ: 100.000 ₫"
                            onValueChange={(value) => field.onChange(value.floatValue ?? 0)}
                          />
                        );
                      }}
                    />

                    {errors.customFees?.[index]?.price && (
                      <FieldError>{errors.customFees[index]?.price?.message}</FieldError>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel>Hình thức tính</FieldLabel>

                    <Controller
                      control={control}
                      name={`customFees.${index}.type`}
                      render={({ field }) => {
                        return (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            disabled={!apartmentId}
                          >
                            <SelectTrigger className={cn('w-full')}>
                              <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectGroup>
                                {ROOM_BILLING_TYPE.filter((type) => type.value !== 'PER_CUBIC').map(
                                  (item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                      {item.label}
                                    </SelectItem>
                                  )
                                )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        );
                      }}
                    />

                    {errors.customFees?.[index]?.type && (
                      <FieldError>{errors.customFees[index]?.type?.message}</FieldError>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="roomName" className="hidden md:block invisible">
                      Xóa
                    </FieldLabel>

                    <Button
                      variant={'destructive'}
                      className={cn('btn-press-effect')}
                      onClick={() => remove(index)}
                    >
                      <TrashIcon />
                    </Button>
                  </Field>
                </FieldGroup>
              ))}

              <Button
                className={'w-fit btn-press-effect'}
                variant={'secondary'}
                onClick={() => append({ name: '', price: 0, type: 'PER_ROOM' })}
              >
                <PlusIcon />
                Thêm phí
              </Button>
            </FieldSet>
          </CardContent>
        </Card>

        <Card className="w-full max-w-3xl mx-auto @container/card">
          <CardHeader>
            <CardTitle>Quản lý chỉ số Điện</CardTitle>

            <CardDescription>
              Thiết lập đơn giá điện và ghi nhận chỉ số đồng hồ ban đầu để làm căn cứ tính lượng
              tiêu thụ hàng tháng.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldSet disabled={!apartmentId}>
              <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="electricityPrice">
                    Đơn giá điện <span className="text-destructive">*</span>
                  </FieldLabel>

                  <Controller
                    control={control}
                    name={`electricityPrice`}
                    render={({ field }) => {
                      return (
                        <NumericFormat
                          value={field.value}
                          thousandSeparator="."
                          decimalSeparator=","
                          suffix=" đ"
                          customInput={Input}
                          placeholder="Ví dụ: 3.500 ₫"
                          onValueChange={(value) => field.onChange(value.floatValue ?? 0)}
                        />
                      );
                    }}
                  />

                  {errors.electricityPrice && (
                    <FieldError>{errors.electricityPrice.message}</FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="initialElectricityIndex">
                    Chỉ số điện bắt đầu (kWh) <span className="text-destructive">*</span>
                  </FieldLabel>

                  <Controller
                    control={control}
                    name="initialElectricityIndex"
                    render={({ field }) => {
                      return (
                        <NumericFormat
                          value={field.value}
                          thousandSeparator="."
                          decimalSeparator=","
                          decimalScale={0}
                          allowNegative={false}
                          suffix=" kWh"
                          customInput={Input}
                          onValueChange={(values) => field.onChange(values.floatValue ?? 0)}
                        />
                      );
                    }}
                  />

                  {errors.initialElectricityIndex && (
                    <FieldError>{errors.initialElectricityIndex.message}</FieldError>
                  )}
                </Field>
              </FieldGroup>
            </FieldSet>
          </CardContent>
        </Card>

        <Card className="w-full max-w-3xl mx-auto @container/card">
          <CardHeader>
            <CardTitle>Quản lý chỉ số Nước</CardTitle>

            <CardDescription>
              Tùy chọn hình thức tính tiền nước (theo khối hoặc theo đầu người) và cấu hình đơn giá,
              chỉ số bắt đầu tương ứng.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldSet disabled={!apartmentId}>
              <FieldGroup
                className={cn(
                  'grid grid-cols-1 md:grid-cols-2 gap-4',
                  waterCalculationType === 'PER_CUBIC' && 'md:grid-cols-3'
                )}
              >
                <Field>
                  <FieldLabel htmlFor="waterPrice">
                    Đơn giá nước <span className="text-destructive">*</span>
                  </FieldLabel>

                  <Controller
                    control={control}
                    name={`waterPrice`}
                    render={({ field }) => {
                      return (
                        <NumericFormat
                          value={field.value}
                          thousandSeparator="."
                          decimalSeparator=","
                          suffix=" đ"
                          customInput={Input}
                          placeholder="Ví dụ: 30.000 ₫"
                          onValueChange={(value) => field.onChange(value.floatValue ?? 0)}
                        />
                      );
                    }}
                  />

                  {errors.waterPrice && <FieldError>{errors.waterPrice.message}</FieldError>}
                </Field>

                {waterCalculationType === 'PER_CUBIC' && (
                  <Field>
                    <FieldLabel htmlFor="initialWaterIndex">
                      Chỉ số nước bắt đầu (m³) <span className="text-destructive">*</span>
                    </FieldLabel>

                    <Controller
                      control={control}
                      name="initialWaterIndex"
                      render={({ field }) => {
                        return (
                          <NumericFormat
                            value={field.value}
                            thousandSeparator="."
                            decimalSeparator=","
                            decimalScale={0}
                            allowNegative={false}
                            suffix=" m³"
                            customInput={Input}
                            onValueChange={(values) => field.onChange(values.floatValue ?? 0)}
                          />
                        );
                      }}
                    />

                    {errors.initialWaterIndex && (
                      <FieldError>{errors.initialWaterIndex.message}</FieldError>
                    )}
                  </Field>
                )}

                <Field>
                  <FieldLabel>
                    Hình thức tính <span className="text-destructive">*</span>
                  </FieldLabel>

                  <Controller
                    control={control}
                    name={`waterCalculationType`}
                    render={({ field }) => {
                      return (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={!apartmentId}
                        >
                          <SelectTrigger className={cn('w-full')}>
                            <SelectValue />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectGroup>
                              {ROOM_BILLING_TYPE.filter((type) => type.value !== 'PER_ROOM').map(
                                (item) => (
                                  <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                  </SelectItem>
                                )
                              )}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      );
                    }}
                  />

                  {errors.waterCalculationType && (
                    <FieldError>{errors.waterCalculationType.message}</FieldError>
                  )}
                </Field>
              </FieldGroup>
            </FieldSet>
          </CardContent>
        </Card>

        <Card className="w-full max-w-3xl mx-auto @container/card">
          <CardHeader>
            <CardTitle>Cơ sở vật chất</CardTitle>

            <CardDescription>Quản lý danh mục tài sản bàn giao.</CardDescription>
          </CardHeader>

          <CardContent>
            <FieldSet disabled={!apartmentId}>
              {fieldsAsset.map((item, index) => (
                <FieldGroup
                  key={item.id}
                  className={cn('grid grid-cols-1 md:grid-cols-[1fr_1fr_36px] gap-4')}
                >
                  <Field>
                    <FieldLabel>Loại tài sản</FieldLabel>

                    <Controller
                      control={control}
                      name={`assets.${index}.name`}
                      render={({ field }) => {
                        return (
                          <Input
                            value={field.value}
                            placeholder="Giường, tủ, điều hòa, ..."
                            onChange={field.onChange}
                          />
                        );
                      }}
                    />

                    {errors.roomName && <FieldError>{errors.roomName.message}</FieldError>}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="roomName">Trạng thái</FieldLabel>

                    <Controller
                      control={control}
                      name={`assets.${index}.status`}
                      render={({ field }) => {
                        return (
                          <Input
                            value={field.value}
                            placeholder="Hoạt động, tốt, hỏng, ..."
                            onChange={field.onChange}
                          />
                        );
                      }}
                    />

                    {errors.roomName && <FieldError>{errors.roomName.message}</FieldError>}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="roomName" className="hidden md:block invisible">
                      Xóa
                    </FieldLabel>

                    <Button
                      variant={'destructive'}
                      className={cn('btn-press-effect')}
                      onClick={() => removeAsset(index)}
                    >
                      <TrashIcon />
                    </Button>
                  </Field>
                </FieldGroup>
              ))}

              <Button
                className={'w-fit btn-press-effect'}
                variant={'secondary'}
                onClick={() => appendAsset({ name: '', status: '' })}
              >
                <PlusIcon />
                Thêm tài sản
              </Button>
            </FieldSet>
          </CardContent>
        </Card>

        <Card className="w-full max-w-3xl mx-auto @container/card">
          <CardHeader>
            <CardTitle>Hình ảnh</CardTitle>

            <CardDescription>Tải lên hình ảnh thực tế của phòng.</CardDescription>
          </CardHeader>

          <CardContent>
            <FieldSet disabled={!apartmentId}>
              <FieldGroup className={cn('grid grid-cols-1 gap-4')}>
                <Field>
                  <Controller
                    control={control}
                    name="images"
                    render={({ field }) => (
                      <ImageUploader
                        value={field.value}
                        onChange={field.onChange}
                        maxFiles={10}
                        disable={!apartmentId}
                      />
                    )}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
          </CardContent>
        </Card>

        <FieldGroup className="w-full max-w-3xl mx-auto @container/card">
          <Field
            orientation={isMobile ? 'responsive' : 'horizontal'}
            className={cn(
              'w-full max-w-3xl mx-auto @container/card',
              'flex items-center justify-end gap-4 flex-wrap md:flex-row pb-12'
            )}
          >
            <Button variant="outline" size={'lg'} className={cn('btn-press-effect')}>
              Huỷ
            </Button>

            <Button
              type="submit"
              form="createRoomForm"
              size={'lg'}
              className={cn('btn-press-effect')}
              disabled={isSubmitting}
            >
              Tạo phòng
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default CreateRoomForm;
