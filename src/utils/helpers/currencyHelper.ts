export const vndFormat = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

// utils/formatVND.ts
const numberFormat = new Intl.NumberFormat('vi-VN', {
  maximumFractionDigits: 1,
});

export const formatNumber = (value: number): string => {
  const abs = Math.abs(value);

  if (abs >= 1e9) return `${numberFormat.format(value / 1e9)} tỷ`;
  if (abs >= 1e6) return `${numberFormat.format(value / 1e6)} triệu`;
  // if (abs >= 1e3) return `${numberFormat.format(value / 1e3)}k`;
  return numberFormat.format(value);
};
