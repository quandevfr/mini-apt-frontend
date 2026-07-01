import type { Item } from '@/types/common';
import { z } from 'zod';

export const ROOM_STATUS: Item[] = [
  {
    label: 'Phòng trống',
    value: 'AVAILABLE',
  },
  {
    label: 'Đang ở',
    value: 'OCCUPIED',
  },
  {
    label: 'Bảo trì',
    value: 'MAINTENANCE',
  },
];

export const ROOM_BILLING_TYPE: Item[] = [
  {
    label: 'Theo phòng',
    value: 'PER_ROOM',
  },
  {
    label: 'Theo đầu người',
    value: 'PER_PERSON',
  },
  {
    label: 'Theo khối',
    value: 'PER_CUBIC',
  },
];

const assetSchema = z.object({
  name: z.string().min(1, 'Vui lòng nhập tên tài sản.').trim(),
  status: z.string().min(1, 'Vui lòng nhập trạng thái.').trim(),
});

const customFeeSchema = z.object({
  name: z.string().min(1, 'Vui lòng nhập tên loại phí.').trim(),
  price: z.number({ error: 'Vui lòng nhập số tiền' }).positive('Số tiền phải lớn hơn 0'),
  type: z.enum(
    ROOM_BILLING_TYPE.filter((type) => type.value !== 'PER_CUBIC').map((item) => item.value),
    {
      message: 'Vui lòng chọn hình thức tính.',
    }
  ),
});

const baseRoomSchema = z.object({
  // --- THÔNG TIN CƠ BẢN ---
  apartmentId: z.string().min(1, 'Vui lòng chọn tòa nhà.'),
  roomName: z.string().min(1, 'Vui lòng nhập tên phòng.').trim(),
  area: z.number().optional(),
  maxPeople: z
    .number()
    .int('Số người phải là số nguyên')
    .min(1, { error: 'Tối thiểu 1 người' })
    .max(20, { error: 'Tối đa 20 người' })
    .optional(),
  status: z.enum(
    ROOM_STATUS.map((status) => status.value),
    {
      message: 'Trạng thái phòng không hợp lệ.',
    }
  ),

  // --- GIÁ THUÊ & ĐẶC CỌC ---
  price: z.number({ error: 'Vui lòng nhập giá thuê phòng.' }),
  deposit: z.number().optional(),

  // --- CÁC PHÍ CỐ ĐỊNH ---
  internetFee: z.number().optional(),
  cleaningFee: z.number().optional(),
  laundryFee: z.number().optional(),
  parkingFee: z.number().optional(),

  // --- ĐIỆN (Tính theo số) ---
  electricityPrice: z.number({ error: 'Vui lòng nhập đơn giá điện.' }),
  initialElectricityIndex: z.number({ error: 'Vui lòng nhập chỉ số điện bắt đầu.' }),

  // --- NƯỚC (Logic điều kiện) ---
  waterCalculationType: z.enum(
    ROOM_BILLING_TYPE.filter((type) => type.value !== 'PER_ROOM').map((item) => item.value),
    {
      message: 'Vui lòng chọn cách tính tiền nước.',
    }
  ),
  waterPrice: z.number({ error: 'Vui lòng nhập đơn giá nước.' }),
  initialWaterIndex: z.number().optional(),

  assets: z.array(assetSchema).catch([]),
  images: z.array(z.any()).max(5, { error: 'Tối đa chỉ được chọn 5 hình ảnh' }).catch([]),
  customFees: z.array(customFeeSchema).catch([]),
  quantity: z
    .number()
    .int('Số lượng phòng phải là số nguyên')
    .min(1, { error: 'Tối thiểu 1 phòng' })
    .max(20, { error: 'Tối đa 20 phòng' }),
});

export const createRoomSchema = baseRoomSchema.superRefine((data, ctx) => {
  if (data.waterCalculationType === 'PER_CUBIC' && data.initialWaterIndex === undefined) {
    ctx.addIssue({
      code: 'custom',
      message: 'Vui lòng nhập chỉ số nước bắt đầu.',
      path: ['initialWaterIndex'],
    });
  }
});

export const updateRoomSchema = createRoomSchema
  .omit({ quantity: true })
  .partial()
  .extend({
    assets: z.array(assetSchema.extend({ id: z.string().optional() })).default([]),
    customFees: z.array(customFeeSchema.extend({ id: z.string().optional() })).default([]),
    images: z.array(z.url({ error: 'URL ảnh không hợp lệ' })).default([]),
  });

export type CreateRoomValues = z.infer<typeof createRoomSchema>;
export type UpdateRoomValues = z.infer<typeof updateRoomSchema>;
