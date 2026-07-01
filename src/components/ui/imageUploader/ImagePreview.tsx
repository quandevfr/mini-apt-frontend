import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from '@/components/ui/attachment';
import type { ImageItem } from '@/components/ui/imageUploader/imageTypes';
import { formatFileSize } from '@/components/ui/imageUploader/imageUtils';
import { Progress } from '@/components/ui/progress';
import { XIcon } from 'lucide-react';
import React from 'react';

interface ImagePreviewProps {
  image: ImageItem;
  onRemove: (id: string) => void;
  disabled?: boolean;
}

export const ImagePreview: React.FC<ImagePreviewProps> = React.memo(
  ({ image, onRemove, disabled }) => {
    const isNew = image.type === 'new';
    const url = isNew ? image.previewUrl : image.url;
    const name = isNew ? image.file.name : image.name || 'Ảnh đã lưu';
    const size = isNew ? formatFileSize(image.file.size) : null;
    const progress = isNew ? image.progress : null;

    return (
      <Attachment orientation="vertical" state="uploading">
        <AttachmentMedia variant="image">
          <img src={url} alt={name} loading="lazy" />
        </AttachmentMedia>

        <AttachmentContent>
          <AttachmentTitle>{name}</AttachmentTitle>
          {size && <AttachmentDescription>{size}</AttachmentDescription>}

          <Progress value={progress} className="mt-2 h-1" />
        </AttachmentContent>

        <AttachmentActions>
          <AttachmentAction
            aria-label={`Xóa ảnh ${name}`}
            disabled={disabled}
            onClick={() => onRemove(image.id)}
          >
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    );
  }
);
