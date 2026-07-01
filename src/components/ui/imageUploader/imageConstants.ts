export const IMAGE_UPLOADER_CONFIG = {
  MAX_FILES: 5,
  MAX_SIZE_MB: 5,
  get MAX_SIZE_BYTES() {
    return this.MAX_SIZE_MB * 1024 * 1024;
  },
  ACCEPT_TYPES: {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'image/webp': ['.webp'],
    'image/gif': ['.gif'],
  },
} as const;

export const ERROR_MESSAGES = {
  INVALID_TYPE: 'Định dạng file không hợp lệ. Chỉ chấp nhận JPG, PNG, WEBP, GIF.',
  TOO_LARGE: (maxSizeMb: number) => `Dung lượng file không được vượt quá ${maxSizeMb}MB.`,
  MAX_FILES_EXCEEDED: (maxFiles: number) => `Bạn chỉ được phép upload tối đa ${maxFiles} ảnh.`,
  DUPLICATE_FILE: 'File này đã được chọn trước đó.',
} as const;
