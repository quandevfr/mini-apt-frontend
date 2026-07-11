export const ERROR_MESSAGES: Record<string, string> = {
  // Module Auth
  AUTH_EMAIL_ALREADY_EXISTS: 'Email này đã được đăng ký bởi một tài khoản khác.',
  AUTH_PASSWORD_TOO_WEAK: 'Mật khẩu quá yếu. Vui lòng bao gồm cả chữ và số.',
  AUTH_INVALID_CREDENTIALS: 'Tài khoản hoặc mật khẩu không chính xác.',
  AUTH_TOKEN_EXPIRED: 'Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.',

  // Lỗi hệ thống chung
  INTERNAL_SERVER_ERROR:
    'Hệ thống đang được bảo trì hoặc gặp gián đoạn tạm thời. Vui lòng thử lại sau!',
  TIMEOUT_ERROR: 'Yêu cầu quá thời gian xử lý. Vui lòng kiểm tra lại đường truyền hoặc thử lại!',
  NETWORK_ERROR:
    'Thiết bị của bạn đã mất kết nối Internet. Vui lòng kiểm tra lại internet và thử lại!',
  UNKNOWN_ERROR: 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
};

export const getErrorMessage = (code: string | undefined): string => {
  if (!code) return ERROR_MESSAGES['UNKNOWN_ERROR'];
  return ERROR_MESSAGES[code] || ERROR_MESSAGES['UNKNOWN_ERROR'];
};
