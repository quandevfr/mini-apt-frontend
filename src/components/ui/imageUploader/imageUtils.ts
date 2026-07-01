import type { ExistingImage, ImageItem, NewImage } from '@/components/ui/imageUploader/imageTypes';

/**
 * Tạo đối tượng NewImage từ File của trình duyệt
 */
export const createNewImage = (file: File): NewImage => {
  const id = crypto.randomUUID();
  return {
    id,
    type: 'new',
    file,
    previewUrl: URL.createObjectURL(file),
  };
};

/**
 * Chuyển đổi một URL từ API thành cấu trúc ExistingImage
 */
export const createExistingImage = (url: string, id?: string): ExistingImage => {
  return {
    id: id || crypto.randomUUID(),
    type: 'existing',
    url,
  };
};

/**
 * Giải phóng bộ nhớ RAM cho một ImageItem nếu là ảnh mới
 */
export const revokeImage = (image: ImageItem): void => {
  if (image.type === 'new' && image.previewUrl.startsWith('blob:')) {
    URL.revokeObjectURL(image.previewUrl);
  }
};

/**
 * Kiểm tra một file chuẩn bị add vào có bị trùng lặp dung lượng và tên không
 */
export const isDUplicateImage = (file: File, currentImages: ImageItem[]): boolean => {
  return currentImages.some((img) => {
    if (img.type === 'new') {
      return img.file.name === file.name && img.file.size === file.size;
    }

    return false;
  });
};

/**
 * Format dung lượng file từ Bytes sang định dạng dễ đọc (KB, MB)
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};
