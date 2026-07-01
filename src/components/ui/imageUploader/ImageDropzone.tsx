import { EmptyMedia } from '@/components/ui/empty';
import {
  ERROR_MESSAGES,
  IMAGE_UPLOADER_CONFIG,
} from '@/components/ui/imageUploader/imageConstants';
import { cn } from '@/libs/utils';
import { CloudUploadIcon } from 'lucide-react';
import React, { useCallback } from 'react';
import { useDropzone, type FileRejection } from 'react-dropzone';

interface ImageDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  onError: (message: string) => void;
  disabled?: boolean;
  currentCount: number;
  maxFiles: number;
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = React.memo(
  ({ onFilesSelected, onError, disabled, currentCount, maxFiles }) => {
    const onDrop = useCallback(
      (acceptedFiles: File[], fileRejections: FileRejection[]) => {
        if (disabled) return;

        // 1. Xử lý lỗi validator của dropzone
        if (fileRejections.length > 0) {
          const firstError = fileRejections[0].errors[0];
          if (firstError.code === 'file-too-large') {
            onError(ERROR_MESSAGES.TOO_LARGE(IMAGE_UPLOADER_CONFIG.MAX_SIZE_MB));
          } else if (firstError.code === 'file-invalid-type') {
            onError(ERROR_MESSAGES.INVALID_TYPE);
          } else {
            onError(firstError.message);
          }

          return;
        }

        //   2. Validate vượt quá số lượng tổng
        if (currentCount + acceptedFiles.length > maxFiles) {
          onError(ERROR_MESSAGES.MAX_FILES_EXCEEDED(maxFiles));
          return;
        }

        onFilesSelected(acceptedFiles);
      },
      [currentCount, maxFiles, disabled, onFilesSelected, onError]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: IMAGE_UPLOADER_CONFIG.ACCEPT_TYPES,
      maxSize: IMAGE_UPLOADER_CONFIG.MAX_SIZE_BYTES,
      disabled: disabled || currentCount >= maxFiles,
    });

    const isReachedMax = currentCount >= maxFiles;

    return (
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-xl p-6 transition-all cursor-pointer flex flex-col gap-4 items-center justify-center text-center dark:bg-input/30 text-foreground',
          isDragActive && 'border-primary bg-primary/5',
          isReachedMax && 'opacity-50 cursor-not-allowed bg-muted border-muted',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input {...getInputProps()} />

        <EmptyMedia variant="icon">
          <CloudUploadIcon />
        </EmptyMedia>

        <div className="flex flex-col justify-center gap-2">
          <p className="text-sm font-medium">
            {isDragActive ? 'Thả ảnh vào đây...' : 'Kéo thả hoặc Click để chọn ảnh'}
          </p>

          <p className="text-xs text-muted-foreground mt-1">
            Định dạng: JPG, PNG, WEBP, GIF tối đa {IMAGE_UPLOADER_CONFIG.MAX_SIZE_MB}MB (
            {currentCount}/{maxFiles} ảnh)
          </p>
        </div>
      </div>
    );
  }
);

ImageDropzone.displayName = 'ImageDropzone';
