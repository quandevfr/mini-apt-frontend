import React from 'react';
import { AttachmentGroup } from '@/components/ui/attachment';
import { ImagePreview } from '@/components/ui/imageUploader/ImagePreview';
import type { ImageItem } from '@/components/ui/imageUploader/imageTypes';
import { cn } from '@/libs/utils';

interface ImageGridProps {
  images: ImageItem[];
  onRemove: (id: string) => void;
  disabled?: boolean;
}

export const ImageGrid: React.FC<ImageGridProps> = React.memo(({ images, onRemove, disabled }) => {
  if (images.length === 0) return null;

  return (
    <AttachmentGroup className={cn('w-full grid grid-cols-[repeat(auto-fit,120px)]')}>
      {images.map((image) => (
        <ImagePreview key={image.id} image={image} onRemove={onRemove} disabled={disabled} />
      ))}
    </AttachmentGroup>
  );
});

ImageGrid.displayName = 'ImageGrid';
