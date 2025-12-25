import type { InvoiceFormItem } from '@/components/CreateInvoiceForm';

// Định dạng giá tiền việt nam (ví dụ: 1.000.000)
const formatPriceVnd = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (!digits) return '';
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

// Bỏ định dạng tiền tệ và convert sang number
const parseVnd = (value?: string): number | undefined => {
  if (!value) return undefined;

  return Number(value.replace(/\./g, ''));
};

// Định dạng số điện thoại việt nam
const formatPhoneVN = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 10);

  if (digits.length <= 4) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;

  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
};

const unFormatPhoneVN = (value: string): string => {
  return value.replace(/\D/g, '').slice(0, 10);
};

const vnDateToISO = (vnDate: string) => {
  if (!vnDate) return '';

  const [day, month, year] = vnDate.split('/');

  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

const formatVNDateOnChange = (value: string): string => {
  const numbers = value.replace(/\D/g, '');

  if (numbers.length <= 2) {
    return numbers;
  }

  if (numbers.length <= 4) {
    return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
  }

  return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
};

const calculateTempTotal = (
  inv: Pick<
    InvoiceFormItem,
    'oldElectric' | 'newElectric' | 'oldWater' | 'newWater' | 'electricPrice' | 'waterPrice'
  >
) => {
  if (
    inv.newElectric == null ||
    inv.newWater == null ||
    inv.newElectric < inv.oldElectric ||
    inv.newWater < inv.oldWater
  ) {
    return null;
  }

  const electric = (inv.newElectric - inv.oldElectric) * inv.electricPrice;
  const water = (inv.newWater - inv.oldWater) * inv.waterPrice;

  return electric + water;
};

function parseMonth(value?: string) {
  if (!value) return null;
  const [y, m] = value.split('-').map(Number);
  if (!y || !m) return null;
  return { year: y, month: m - 1 }; // month UI = 0-based
}

function buildMonthValue(year: number, month: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}`;
}

const formatMonthVN = (value?: string | null): string => {
  if (!value) return '';

  const [year, month] = value.split('-');

  if (!year || !month) return '';

  const monthNumber = Number(month);

  if (Number.isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
    return '';
  }

  return `Tháng ${monthNumber}/${year}`;
};

export {
  formatPriceVnd,
  parseVnd,
  formatPhoneVN,
  unFormatPhoneVN,
  vnDateToISO,
  formatVNDateOnChange,
  calculateTempTotal,
  parseMonth,
  buildMonthValue,
  formatMonthVN,
};
