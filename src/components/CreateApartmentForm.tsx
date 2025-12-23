// Libs
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { useState } from 'react';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Components
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '@/libs/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import IntegerInput from './IntegerInput';

type Item = {
  label: string;
  value: string;
};

const createApartmentFormSchema = z
  .object({
    name: z.string().min(1, 'Vui lòng nhập tên chung cư mini.'),
    numberOfRooms: z.string().min(1, 'Vui lòng nhập số lượng phòng.'),
    numberOfAvailableRooms: z.string().min(1, 'Vui lòng nhập số lượng phòng trống.'),
    province: z.string().min(1, 'Vui lòng chọn Tỉnh/Thành phố.'),
    commune: z.string().min(1, 'Vui lòng chọn Xã/Phường.'),
    address: z.string().min(1, 'Vui lòng nhập địa chỉ (số nhà, tên đường...).'),
  })
  .refine(
    (data) => {
      const rooms = Number(data.numberOfRooms);
      const available = Number(data.numberOfAvailableRooms);
      return !isNaN(rooms) && !isNaN(available) && available <= rooms;
    },
    {
      path: ['numberOfAvailableRooms'],
      error: 'Số lượng phòng trống không được lớn hơn số lượng phòng.',
    }
  );

type CreateApartmentFormValues = z.infer<typeof createApartmentFormSchema>;

const CreateApartmentForm = ({ className, ...props }: React.ComponentProps<'form'>) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateApartmentFormValues>({
    resolver: zodResolver(createApartmentFormSchema),
    defaultValues: {
      name: '',
      numberOfRooms: '',
      numberOfAvailableRooms: '',
      province: '',
      commune: '',
      address: '',
    },
  });

  const [openProvince, setOpenProvince] = useState<boolean>(false);
  const [openCommune, setOpenCommune] = useState<boolean>(false);

  const onSubmit = async (data: CreateApartmentFormValues) => {
    const dataConverted = {
      ...data,
      numberOfRooms: Number(data.numberOfRooms),
      numberOfAvailableRooms: Number(data.numberOfAvailableRooms),
    };

    console.log(dataConverted);
  };

  return (
    <form id="apartmentForm" className={cn(className)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <Card className="w-full max-w-3xl mx-auto @container/card">
        <CardHeader>
          <CardTitle>Tạo chung cư mini mới</CardTitle>

          <CardDescription>
            Thực hiện tạo mới chung cư mini tại đây. Nhấn vào thêm chung cư khi bạn đã nhập đầy đủ
            thông tin.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6">
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">
                Tên chung cư mini <span className="text-destructive">*</span>
              </Label>
              <Input id="name" {...register('name')} />

              {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              <div className="grid gap-3">
                <Label htmlFor="numberOfRooms">
                  Số lượng phòng <span className="text-destructive">*</span>
                </Label>
                <IntegerInput {...register('numberOfRooms')} id="numberOfRooms" />

                {errors.numberOfRooms && (
                  <p className="text-destructive text-sm">{errors.numberOfRooms.message}</p>
                )}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="numberOfAvailableRooms">
                  Số lượng phòng trống <span className="text-destructive">*</span>
                </Label>
                <IntegerInput {...register('numberOfAvailableRooms')} id="numberOfAvailableRooms" />

                {errors.numberOfAvailableRooms && (
                  <p className="text-destructive text-sm">
                    {errors.numberOfAvailableRooms.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-3">
              <Label>
                Tỉnh/Thành phố <span className="text-destructive">*</span>
              </Label>

              <Controller
                name="province"
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

              {errors.province && (
                <p className="text-destructive text-sm">{errors.province.message}</p>
              )}
            </div>

            <div className="grid gap-3">
              <Label>
                Xã/Phường <span className="text-destructive">*</span>
              </Label>

              <Controller
                control={control}
                name="commune"
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
                          id="commune"
                          name="commune"
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

              {errors.commune && (
                <p className="text-destructive text-sm">{errors.commune.message}</p>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="address">
                Địa chỉ (số nhà, tên đường...) <span className="text-destructive">*</span>
              </Label>
              <Input id="address" {...register('address')} />

              {errors.address && (
                <p className="text-destructive text-sm">{errors.address.message}</p>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-end gap-4">
          <Button variant="outline">Huỷ</Button>

          <Button type="submit" form="apartmentForm" disabled={isSubmitting}>
            Thêm chung cư
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default CreateApartmentForm;
