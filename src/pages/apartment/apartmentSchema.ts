// Libs
import { z } from 'zod';

// Others
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/utils/constants/file';

const AMENITIES = [
  {
    label: 'Mạng wifi',
    value: 'wifi',
  },
  {
    label: 'Chỗ để xe',
    value: 'parking',
  },
  {
    label: 'Camera an ninh',
    value: 'camera',
  },
  {
    label: 'Bảo vệ',
    value: 'security',
  },
  {
    label: 'Máy giặt',
    value: 'elevator',
  },
  {
    label: 'Thang máy',
    value: 'laundry',
  },
  {
    label: 'Khóa cửa vân tay',
    value: 'fingerprintLock',
  },
  {
    label: 'An toàn phòng cháy, chữa cháy',
    value: 'firePrevention',
  },
] as const;

const STATUS = [
  {
    label: 'Hoạt động',
    value: 'active',
  },
  {
    label: 'Ngưng hoạt động',
    value: 'inactive',
  },
  {
    label: 'Tạm dừng vận hành',
    value: 'suspended',
  },
] as const;

const addressSchema = z.object({
  // provinceCode: z.string('Mã tỉnh/thành phố là bắt buộc').min(1, 'Mã tỉnh/thành phố là bắt buộc'),

  provinceName: z.string('Tên tỉnh/thành phố là bắt buộc').min(1, 'Tên tỉnh/thành phố là bắt buộc'),

  // districtCode: z.string('Mã quận/huyện là bắt buộc').min(1, 'Mã quận/huyện là bắt buộc'),

  // districtName: z.string('Tên quận/huyện là bắt buộc').min(1, 'Tên quận/huyện là bắt buộc'),

  // wardCode: z.string('Mã phường/xã là bắt buộc').min(1, 'Mã phường/xã là bắt buộc'),

  wardName: z.string('Tên phường/xã là bắt buộc').min(1, 'Tên phường/xã là bắt buộc'),

  street: z
    .string('Tên đường/số nhà là bắt buộc')
    .trim()
    .min(5, 'Địa chỉ chi tiết (số nhà, tên đường) phải có ít nhất 5 ký tự'),
});

const contactSchema = z.object({
  name: z.string().min(1, 'Tên chủ nhà là bắt buộc.').trim(),
  phone: z
    .string('Số điện thoại chủ nhà là bắt buộc.')
    .regex(/^(0|\+84)[3-9]\d{8}$/, 'Số điện thoại không hợp lệ'),
});

const createApartmentFormSchema = z
  .object({
    name: z.string().min(1, 'Tên chung cư mini (tòa nhà) là bắt buộc.'),
    totalRooms: z
      .number('Tổng số phòng là bắt buộc.')
      .int('Tổng số phòng phải là số nguyên.')
      .min(1, 'Tổng số phòng phải lớn hơn hoặc bằng 1.'),
    availableRooms: z
      .number('Số phòng trống là bắt buộc.')
      .int('Số phòng trống phải là số nguyên.')
      .min(0, 'Số phòng trống phải lớn hơn 0.'),
    address: addressSchema,
    contact: contactSchema,
    description: z.string().max(2000, 'Mô tả không được vượt quá 2000 ký tự.').trim().optional(),
    amenities: z
      .array(
        z.enum(
          AMENITIES.map((a) => a.value),
          {
            error: () => ({
              message: `Tiện ích không hợp lệ. Chỉ chấp nhận: ${AMENITIES.map((a) => a.value).join(', ')}`,
            }),
          }
        )
      )
      .optional()
      .catch([]),
    status: z
      .enum(
        STATUS.map((s) => s.value),
        {
          error: () => ({
            message: `Trạng thái không hợp lệ. Chỉ chấp nhận: ${STATUS.map((s) => s.value).join(', ')}`,
          }),
        }
      )
      .catch('active'),
    images: z
      .array(z.instanceof(File))
      .refine(
        (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
        'Ảnh phải nhỏ hơn hoặc bằng 5MB.'
      )
      .refine((files) =>
        files.every(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          'Chỉ chấp nhận ảnh .JPG, .PNG, .WEBP'
        )
      )
      .optional()
      .catch([]),
  })
  .refine((data) => data.availableRooms <= data.totalRooms, {
    message: 'Số phòng trống không được vượt quá tổng số phòng',
    path: ['availableRooms'],
  });

export { createApartmentFormSchema, AMENITIES, STATUS };
