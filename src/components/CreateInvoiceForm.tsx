// Libs
import z from 'zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';

// Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from './ui/field';
import InvoiceBulkTable from './invoice/InvoiceBulkTable';
import { MonthPicker } from './ui/month-picker';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

// Others
import { useIsMobile } from '@/hooks/useMobile';
import { cn } from '@/libs/utils';
import { formatMonthVN } from '@/utils/helpers';

export interface Room {
  id: string;
  name: string;
}

export interface InvoiceFormItem {
  roomId: string;
  roomName: string;

  oldElectric: number;
  newElectric?: number;

  oldWater: number;
  newWater?: number;

  electricPrice: number;
  waterPrice: number;
}

export const invoiceItemSchema = z.object({
  roomId: z.string(),
  roomName: z.string(),

  oldElectric: z.number(),
  newElectric: z.number().optional(),

  oldWater: z.number(),
  newWater: z.number().optional(),

  electricPrice: z.number(),
  waterPrice: z.number(),
});

const MOCK_DATA: BulkInvoiceForm = {
  apartmentId: '1',
  month: '2025-10',
  invoices: Array.from({ length: 10 }).map((_, i) => ({
    roomId: `room-${i + 1}`,
    roomName: `Phòng ${i + 1}`,

    oldElectric: 120,
    oldWater: 30,

    electricPrice: 3500,
    waterPrice: 15000,
  })),
};

export const bulkInvoiceSchema = z.object({
  apartmentId: z.string(),
  month: z.string(),
  invoices: z.array(invoiceItemSchema),
});

export type BulkInvoiceForm = z.infer<typeof bulkInvoiceSchema>;

const CreateInvoiceForm = ({ toggleCreateForm }: { toggleCreateForm: () => void }) => {
  const form = useForm<BulkInvoiceForm>({
    resolver: zodResolver(bulkInvoiceSchema),
    defaultValues: MOCK_DATA,
    mode: 'onChange',
  });

  const isMobile = useIsMobile();

  const [openSelectMonth, setOpenSelectMonth] = useState<boolean>(false);

  const onSubmit = (data: BulkInvoiceForm) => {
    console.log('SUBMIT BULK INVOICE', data);
  };

  return (
    <FormProvider {...form}>
      <form
        id="createInvoiceForm"
        className="flex flex-col gap-7"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card>
          <CardHeader>
            <CardTitle>Tạo hóa đơn cho tất cả phòng</CardTitle>
            <CardDescription>
              Tạo bản nháp theo mẫu hóa đơn cho tất cả các phòng. Sau khi tạo bản nháp xong hãy vào
              hóa đơn từng phòng để kiểm tra, chỉnh sửa lại sau đó xác nhận hóa đơn một lần nữa để
              hoàn tất tạo hóa đơn.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldGroup>
              <div className={cn('grid grid-cols-1 gap-4 md:grid-cols-[280px_1fr_1fr_1fr]')}>
                <Field>
                  <FieldLabel>
                    Hóa đơn tháng <span className="text-destructive">*</span>
                  </FieldLabel>

                  <Controller
                    control={form.control}
                    name="month"
                    render={({ field }) => {
                      return (
                        <Popover open={openSelectMonth} onOpenChange={setOpenSelectMonth}>
                          <PopoverTrigger asChild>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'justify-start text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />

                              {field.value ? formatMonthVN(field.value) : <span>Chọn tháng</span>}
                            </Button>
                          </PopoverTrigger>

                          <PopoverContent className="w-auto p-0" align="start">
                            <MonthPicker
                              selectedMonth={field.value}
                              onMonthSelect={(value) => {
                                field.onChange(value);
                                setOpenSelectMonth(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      );
                    }}
                  />

                  <FieldDescription>Mặc định lấy tháng hiện tại để tạo hóa đơn.</FieldDescription>

                  {form.formState.errors.month && (
                    <FieldError>{form.formState.errors.month.message}</FieldError>
                  )}
                </Field>
              </div>

              <Field>
                <InvoiceBulkTable />
              </Field>
            </FieldGroup>
          </CardContent>

          <CardFooter>
            <FieldGroup className="w-full mx-auto @container/card">
              <Field orientation={isMobile ? 'responsive' : 'horizontal'} className="justify-end">
                <Button variant="outline" type="button" onClick={toggleCreateForm}>
                  Hủy
                </Button>

                <Button type="submit" form="createInvoiceForm">
                  Tạo bản nháp
                </Button>
              </Field>
            </FieldGroup>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
};

export default CreateInvoiceForm;
