export const ERROR_MESSAGES: Record<string, string> = {
  // Module Auth
  AUTH_EMAIL_ALREADY_EXISTS: 'Email này đã được đăng ký bởi một tài khoản khác.',
  AUTH_PASSWORD_TOO_WEAK: 'Mật khẩu quá yếu. Vui lòng bao gồm cả chữ và số.',
  AUTH_INVALID_CREDENTIALS: 'Tài khoản hoặc mật khẩu không chính xác.',
  AUTH_TOKEN_EXPIRED: 'Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.',

  // Lỗi hệ thống chung
  INTERNAL_SERVER_ERROR: 'Hệ thống đang bận. Vui lòng thử lại sau ít phút.',
  NETWORK_ERROR: 'Kết nối mạng không ổn định. Vui lòng kiểm tra lại.',
  UNKNOWN_ERROR: 'Đã có lỗi xảy ra. Vui lòng liên hệ hỗ trợ.',
};

export const getErrorMessage = (code: string | undefined): string => {
  if (!code) return ERROR_MESSAGES['UNKNOWN_ERROR'];
  return ERROR_MESSAGES[code] || ERROR_MESSAGES['UNKNOWN_ERROR'];
};
