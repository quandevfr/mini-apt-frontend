// Libs
import { useFormContext } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { useMemo } from 'react';

// Components
import type { BulkInvoiceForm } from '../CreateInvoiceForm';
import { TableCell, TableRow } from '../ui/table';
import IntegerInput from '../IntegerInput';

// Others
import { calculateTempTotal, formatPriceVnd } from '@/utils/helpers';
import { cn } from '@/libs/utils';

const InvoiceRow = ({ index }: { index: number }) => {
  const { register, watch } = useFormContext<BulkInvoiceForm>();

  const inv = watch(`invoices.${index}`);

  const [dElectric] = useDebounce(inv.newElectric, 200);
  const [dWater] = useDebounce(inv.newWater, 200);

  const total = useMemo(() => {
    return calculateTempTotal({
      oldElectric: inv.oldElectric,
      newElectric: dElectric,
      oldWater: inv.oldWater,
      newWater: dWater,
      electricPrice: inv.electricPrice,
      waterPrice: inv.waterPrice,
    });
  }, [inv.oldElectric, dElectric, inv.oldWater, dWater, inv.electricPrice, inv.waterPrice]);

  const hasError =
    (inv.newElectric != null && inv.newElectric < inv.oldElectric) ||
    (inv.newWater != null && inv.newWater < inv.oldWater);

  return (
    <TableRow
      className={cn(
        !inv.newElectric || !inv.newWater ? 'bg-muted/50' : 'bg-background',
        hasError && 'bg-destructive/10'
      )}
    >
      <TableCell className="font-medium">{inv.roomName}</TableCell>

      <TableCell>{inv.oldElectric}</TableCell>

      <TableCell>
        <IntegerInput
          data-row={index}
          data-col="electric"
          className={hasError ? 'border-destructive' : ''}
          {...register(`invoices.${index}.newElectric`, {
            setValueAs: (v) => (v === '' ? undefined : Number(v)),
          })}
        />
      </TableCell>

      <TableCell>{inv.oldWater}</TableCell>

      <TableCell>
        <IntegerInput
          data-row={index}
          data-col="water"
          className={hasError ? 'border-destructive' : ''}
          {...register(`invoices.${index}.newWater`, {
            setValueAs: (v) => (v === '' ? undefined : Number(v)),
          })}
        />
      </TableCell>

      <TableCell className="text-right font-semibold">
        {total ? formatPriceVnd(total.toString()) + ' đ' : '—'}
      </TableCell>
    </TableRow>
  );
};

export default InvoiceRow;
