import { Field } from '@/components/ui/field';
import {
  ERROR_MESSAGES,
  IMAGE_UPLOADER_CONFIG,
} from '@/components/ui/imageUploader/imageConstants';
import { ImageDropzone } from '@/components/ui/imageUploader/ImageDropzone';
import { ImageGrid } from '@/components/ui/imageUploader/ImageGrid';
import type { ImageItem } from '@/components/ui/imageUploader/imageTypes';
import {
  createNewImage,
  isDUplicateImage,
  revokeImage,
} from '@/components/ui/imageUploader/imageUtils';
import type React from 'react';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';

interface ImageUploaderProps {
  value?: ImageItem[];
  onChange?: (value: ImageItem[]) => void;
  disable?: boolean;
  maxFiles?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value = [],
  onChange,
  disable = false,
  maxFiles = IMAGE_UPLOADER_CONFIG.MAX_FILES,
}) => {
  useEffect(() => {
    return () => {
      value.forEach((img) => revokeImage(img));
    };
  }, []);

  const handleFilesSelected = useCallback(
    (files: File[]) => {
      const newImageItems: ImageItem[] = [];
      let hasDuplicate = false;

      files.forEach((file) => {
        if (isDUplicateImage(file, value)) {
          hasDuplicate = true;
          return;
        }
        newImageItems.push(createNewImage(file));
      });

      if (hasDuplicate) {
        toast.error('Trùng lặp file', { description: ERROR_MESSAGES.DUPLICATE_FILE });
      }

      if (newImageItems.length > 0 && onChange) {
        onChange([...value, ...newImageItems]);
      }
    },
    [value, onChange]
  );

  const handleRemove = useCallback(
    (id: string) => {
      const targetImage = value.find((img) => img.id === id);

      if (targetImage) {
        revokeImage(targetImage);
      }

      if (onChange) {
        onChange(value.filter((img) => img.id !== id));
      }
    },
    [value, onChange]
  );

  return (
    <Field>
      <ImageDropzone
        onFilesSelected={handleFilesSelected}
        onError={(msg) => toast.error(msg)}
        disabled={disable}
        currentCount={value.length}
        maxFiles={maxFiles}
      />

      <ImageGrid images={value} onRemove={handleRemove} disabled={disable} />
    </Field>
  );
};
