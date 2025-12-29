// Libs
import { useFieldArray, useFormContext } from 'react-hook-form';

// Components
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table';
import InvoiceRow from './InvoiceRow';
import type { BulkInvoiceForm } from '../CreateInvoiceForm';

const InvoiceBulkTable = () => {
  const { control } = useFormContext<BulkInvoiceForm>();

  const { fields } = useFieldArray({
    control,
    name: 'invoices',
  });

  return (
    <div className="border rounded-md overflow-auto">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead className="w-[180px]">Tên phòng</TableHead>
            <TableHead className="w-[180px]">Chỉ số điện cũ (kWh)</TableHead>
            <TableHead className="w-[180px]">Chỉ số điện mới (kWh)</TableHead>
            <TableHead className="w-[180px]">Chỉ số nước cũ (m³)</TableHead>
            <TableHead className="w-[180px]">Chỉ số nước mới (m³)</TableHead>
            <TableHead className="text-right">Tạm tính (₫)</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {fields.map((field, index) => (
            <InvoiceRow key={field.id} index={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvoiceBulkTable;
