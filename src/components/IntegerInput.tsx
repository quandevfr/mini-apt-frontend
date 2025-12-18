import React from 'react';
import { Input } from './ui/input';

const IntegerInput = ({ onKeyDown, onPaste, ...props }: React.ComponentProps<typeof Input>) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];

    if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) {
      return;
    }

    if (allowedKeys.includes(e.key)) return;
    if (/^\d$/.test(e.key)) return;

    e.preventDefault();

    if (onKeyDown) onKeyDown(e);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData('text');
    if (!/^\d+$/.test(pasteData)) e.preventDefault();

    if (onPaste) onPaste(e);
  };

  return (
    <Input
      {...props}
      type="text"
      inputMode="numeric"
      placeholder={props.placeholder ?? '0'}
      pattern="[0-9]*\.?[0-9]*"
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
    />
  );
};

export default IntegerInput;
