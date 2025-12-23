export const FileRejectReason = {
  MAX_SIZE: 'MAX_SIZE',
  MAX_FILES: 'MAX_FILES',
  INVALID_TYPE: 'INVALID_TYPE',
};

export type FileRejectReason = (typeof FileRejectReason)[keyof typeof FileRejectReason];
