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

export { formatPriceVnd, parseVnd };
