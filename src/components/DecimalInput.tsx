import React from 'react';
import { Input } from './ui/input';

export const onlyDecimalKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];

  if (allowedKeys.includes(e.key)) return;

  if (/^\d$/.test(e.key)) return;

  if (e.key === '.' && !e.currentTarget.value.includes('.')) {
    return;
  }

  e.preventDefault();
};

export const onlyDecimalPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
  const value = e.clipboardData.getData('text');
  if (!/^\d+(\.\d+)?$/.test(value)) {
    e.preventDefault();
  }
};

const DecimalInput = ({ ...props }: React.ComponentProps<typeof Input>) => {
  return (
    <Input
      {...props}
      type="text"
      inputMode="decimal"
      placeholder={props.placeholder ?? '0.0'}
      onKeyDown={onlyDecimalKey}
      onPaste={onlyDecimalPaste}
    />
  );
};

export default DecimalInput;
