// Libs
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { Check, ChevronsUpDown } from 'lucide-react';

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
import IntegerInput from './IntegerInput';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from './ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from './ui/input-group';
import { Textarea } from './ui/textarea';

// Others
import { cn } from '@/lib/utils';
import type { ItemSelect } from '@/utils/interface';
import { useIsMobile } from '@/hooks/use-mobile';
import { formatPriceVnd, parseVnd } from '@/utils/helpers';
import { onlyDecimalKey, onlyDecimalPaste } from './DecimalInput';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const createRoomFormSchema = z.object({
  apartmentId: z.string().min(1, 'Vui lòng chọn chung cư mini'),
  roomName: z.string().min(1, 'Vui lòng nhập tên phòng.').trim(),
  price: z.string().min(1, 'Vui lòng nhập giá thuê.'),
  maxPeople: z.string().optional(),
  area: z.string().optional(),
  electricityPrice: z.string().min(1, 'Vui lòng nhập giá điện.'),
  waterPrice: z.string().min(1, 'Vui lòng nhập giá nước.'),
  internetFee: z.string().optional(),
  parkingFee: z.string().optional(),
  serviceFee: z.string().min(1, 'Vui lòng nhập phí dịch vụ'),
  status: z.enum(['0001', '0002', '0003'], {
    error: 'Trạng thái không hợp lệ.',
  }),
  note: z.string().optional(),
});

type CreateRoomFormValues = z.infer<typeof createRoomFormSchema>;

const CreateRoomForm = ({ className, ...props }: React.ComponentProps<'form'>) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateRoomFormValues>({
    resolver: zodResolver(createRoomFormSchema),
    defaultValues: {
      apartmentId: '',
      roomName: '',
      price: '',
      maxPeople: '',
      area: '',
      electricityPrice: '',
      waterPrice: '',
      internetFee: '',
      parkingFee: '',
      serviceFee: '',
      status: '0001',
      note: '',
    },
  });

  const isMobile = useIsMobile();

  const [openApartment, setOpenApartment] = useState<boolean>(false);

  const onSubmit = async (data: CreateRoomFormValues) => {
    const dataFormatted = {
      ...data,
      price: parseVnd(data.price),
      maxPeople: parseVnd(data.maxPeople),
      area: parseVnd(data.area),
      electricityPrice: parseVnd(data.electricityPrice),
      waterPrice: parseVnd(data.waterPrice),
      internetFee: parseVnd(data.internetFee),
      parkingFee: parseVnd(data.parkingFee),
      serviceFee: parseVnd(data.serviceFee),
    };

    console.log(dataFormatted);
  };

  return (
    <form
      id="createRoomForm"
      className={cn(className, 'flex flex-col gap-7')}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card className="w-full max-w-3xl mx-auto @container/card">
        <CardHeader>
          <CardTitle>Tạo phòng mới</CardTitle>

          <CardDescription>
            Thực hiện tạo mới phòng tại đây. Nhấn vào tạo phòng khi bạn nhập đã đầy đủ thông tin.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="w-full max-w-3xl mx-auto @container/card">
        <CardHeader>
          <CardTitle>Thông tin phòng</CardTitle>

          <CardDescription>
            Thông tin về tên phòng, số phòng, số lượng người ở và giá cho thuê.
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

              <Field>
                <FieldLabel>
                  Trạng thái phòng <span className="text-destructive">*</span>
                </FieldLabel>

                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => {
                    return (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger
                          className={cn('w-full', !field.value && 'text-muted-foreground')}
                        >
                          <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Trạng thái</SelectLabel>

                            {(
                              [
                                { label: 'Đang trống', value: '0001' },
                                { label: 'Đang sửa chữa', value: '0002' },
                                { label: 'Đã cho thuê', value: '0003' },
                              ] as ItemSelect[]
                            ).map((item) => (
                              <SelectItem
                                key={item.value}
                                value={item.value}
                                onSelect={() => {
                                  field.onChange(item.value);
                                  setOpenApartment(false);
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

                {errors.status && <FieldError>{errors.status.message}</FieldError>}
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 items-start md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="roomName">
                  Tên phòng <span className="text-destructive">*</span>
                </FieldLabel>

                <Input id="roomName" {...register('roomName')} />

                {errors.roomName && <FieldError>{errors.roomName.message}</FieldError>}
              </Field>

              <Field>
                <FieldLabel htmlFor="price">
                  Giá thuê / tháng <span className="text-destructive">*</span>
                </FieldLabel>

                <Controller
                  control={control}
                  name="price"
                  render={({ field }) => {
                    return (
                      <InputGroup>
                        <InputGroupAddon>
                          <InputGroupText>₫</InputGroupText>
                        </InputGroupAddon>

                        <InputGroupInput
                          type="text"
                          inputMode="numeric"
                          value={field.value}
                          placeholder="0"
                          onChange={(e) => {
                            const formatted = formatPriceVnd(e.target.value);
                            field.onChange(formatted);
                          }}
                        />

                        <InputGroupAddon align={'inline-end'}>
                          <InputGroupText>VND</InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    );
                  }}
                />

                {errors.price && <FieldError>{errors.price.message}</FieldError>}
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 items-start md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="maxPeople">Số người ở tối đa</FieldLabel>

                <IntegerInput id="maxPeople" placeholder="0" {...register('maxPeople')} />

                {errors.maxPeople && <FieldError>{errors.maxPeople.message}</FieldError>}
              </Field>

              <Field>
                <FieldLabel htmlFor="area">Diện tích</FieldLabel>

                <InputGroup>
                  <InputGroupInput
                    id="area"
                    type="text"
                    inputMode="decimal"
                    placeholder="0"
                    onKeyDown={onlyDecimalKey}
                    onPaste={onlyDecimalPaste}
                    {...register('area')}
                  />

                  <InputGroupAddon align={'inline-end'}>
                    <InputGroupText>m²</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>

                {errors.area && <FieldError>{errors.area.message}</FieldError>}
              </Field>
            </div>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card className="w-full max-w-3xl mx-auto @container/card">
        <CardHeader>
          <CardTitle>Thông tin điện nước, dịch vụ</CardTitle>

          <CardDescription>Thông tin về giá cả điện nước và các loại phí dịch vụ.</CardDescription>
        </CardHeader>

        <CardContent>
          <FieldGroup>
            <div className="grid grid-cols-1 gap-4 items-start md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="electricityPrice">
                  Giá điện / số <span className="text-destructive">*</span>
                </FieldLabel>

                <Controller
                  control={control}
                  name="electricityPrice"
                  render={({ field }) => {
                    return (
                      <InputGroup>
                        <InputGroupAddon>
                          <InputGroupText>₫</InputGroupText>
                        </InputGroupAddon>

                        <InputGroupInput
                          type="text"
                          inputMode="numeric"
                          value={field.value}
                          placeholder="0"
                          onChange={(e) => {
                            const formatted = formatPriceVnd(e.target.value);
                            field.onChange(formatted);
                          }}
                        />

                        <InputGroupAddon align={'inline-end'}>
                          <InputGroupText>VND</InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    );
                  }}
                />

                {errors.electricityPrice && (
                  <FieldError>{errors.electricityPrice.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="waterPrice">
                  Giá nước / số <span className="text-destructive">*</span>
                </FieldLabel>

                <Controller
                  control={control}
                  name="waterPrice"
                  render={({ field }) => {
                    return (
                      <InputGroup>
                        <InputGroupAddon>
                          <InputGroupText>₫</InputGroupText>
                        </InputGroupAddon>

                        <InputGroupInput
                          type="text"
                          inputMode="numeric"
                          value={field.value}
                          placeholder="0"
                          onChange={(e) => {
                            const formatted = formatPriceVnd(e.target.value);
                            field.onChange(formatted);
                          }}
                        />

                        <InputGroupAddon align={'inline-end'}>
                          <InputGroupText>VND</InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    );
                  }}
                />

                {errors.waterPrice && <FieldError>{errors.waterPrice.message}</FieldError>}
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="internetFee">Phí internet / phòng (nếu có)</FieldLabel>

                <Controller
                  control={control}
                  name="internetFee"
                  render={({ field }) => {
                    return (
                      <InputGroup>
                        <InputGroupAddon>
                          <InputGroupText>₫</InputGroupText>
                        </InputGroupAddon>

                        <InputGroupInput
                          type="text"
                          inputMode="numeric"
                          value={field.value}
                          placeholder="0"
                          onChange={(e) => {
                            const formatted = formatPriceVnd(e.target.value);
                            field.onChange(formatted);
                          }}
                        />

                        <InputGroupAddon align={'inline-end'}>
                          <InputGroupText>VND</InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    );
                  }}
                />

                {errors.internetFee && <FieldError>{errors.internetFee.message}</FieldError>}
              </Field>

              <Field>
                <FieldLabel htmlFor="parkingFee">Phí gửi xe / người (nếu có)</FieldLabel>

                <Controller
                  control={control}
                  name="parkingFee"
                  render={({ field }) => {
                    return (
                      <InputGroup>
                        <InputGroupAddon>
                          <InputGroupText>₫</InputGroupText>
                        </InputGroupAddon>

                        <InputGroupInput
                          type="text"
                          inputMode="numeric"
                          value={field.value}
                          placeholder="0"
                          onChange={(e) => {
                            const formatted = formatPriceVnd(e.target.value);
                            field.onChange(formatted);
                          }}
                        />

                        <InputGroupAddon align={'inline-end'}>
                          <InputGroupText>VND</InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    );
                  }}
                />

                {errors.parkingFee && <FieldError>{errors.parkingFee.message}</FieldError>}
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="serviceFee">
                Phí dịch vụ chung / người <span className="text-destructive">*</span>
              </FieldLabel>

              <Controller
                control={control}
                name="serviceFee"
                render={({ field }) => {
                  return (
                    <InputGroup>
                      <InputGroupAddon>
                        <InputGroupText>₫</InputGroupText>
                      </InputGroupAddon>

                      <InputGroupInput
                        type="text"
                        inputMode="numeric"
                        value={field.value}
                        placeholder="0"
                        onChange={(e) => {
                          const formatted = formatPriceVnd(e.target.value);
                          field.onChange(formatted);
                        }}
                      />

                      <InputGroupAddon align={'inline-end'}>
                        <InputGroupText>VND</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  );
                }}
              />

              {errors.serviceFee && <FieldError>{errors.serviceFee.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="note">Ghi chú</FieldLabel>

              <Textarea id="note" placeholder="Nội dung ghi chú..." rows={4} />

              {errors.note && <FieldError>{errors.note.message}</FieldError>}
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <FieldGroup className="w-full max-w-3xl mx-auto @container/card">
        <Field orientation={isMobile ? 'responsive' : 'horizontal'} className="justify-end">
          <Button variant="outline">Huỷ</Button>

          <Button type="submit" form="createRoomForm" disabled={isSubmitting}>
            Tạo phòng
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default CreateRoomForm;
