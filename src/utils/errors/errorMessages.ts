import { ERROR_CODES } from './errorCodes';

export const ERROR_MESSAGE_MAP: Record<string, string> = {
  [ERROR_CODES.ROOM_ALREADY_OCCUPIED]: 'Phòng này đã có người ở',
  [ERROR_CODES.INVOICE_LOCKED]: 'Hóa đơn đã bị khóa',
  [ERROR_CODES.STAFF_NO_PERMISSION]: 'Bạn không có quyền thực hiện thao tác này',
};
