/**
 * Định nghĩa ảnh đã tồn tại
 */
export interface ExistingImage {
  id: string;
  type: 'existing';
  url: string;
  name?: string;
  size?: number;
}

/**
 * Định nghĩa ảnh mới
 */
export interface NewImage {
  id: string;
  type: 'new';
  file: File;
  previewUrl: string;
  progress?: number;
}

export type ImageItem = ExistingImage | NewImage;

/**
 * Định nghĩa cấu hình validator
 */
export interface UploaderConfig {
  maxFiles: number;
  maxSizeInBytes: number;
  accept: Record<string, string[]>;
}

/**
 * Định nghĩa cấu trúc lỗi trả về từ custom validator
 */
export interface ImageValidationError {
  code: 'file-invalid-type' | 'file-too-large' | 'max-files-exceeded' | 'duplicate-file';
  message: string;
}
