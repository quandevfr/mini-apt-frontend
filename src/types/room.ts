interface Asset {
  name: string;
  status: string;
}

export interface Image {
  url: string;
  name?: string;
  size?: number;
  mimeType?: string;
}

interface CustomFee {
  name: string;
  price: number;
  type: 'PER_ROOM' | 'PER_PERSON';
}

interface RoomApartmentSelected {
  _id: string;
  name: string;
}

export interface BaseRoom {
  apartmentId: string;
  roomName: string;
  area?: number;
  maxPeople?: number;
  status: string;
  price: number;
  deposit?: number;
  internetFee?: number;
  cleaningFee?: number;
  laundryFee?: number;
  parkingFee?: number;
  electricityPrice: number;
  initialElectricityIndex: number;
  waterCalculationType: string;
  waterPrice: number;
  initialWaterIndex?: number;
  assets?: Asset[];
  images?: Image[];
  customFee?: CustomFee[];
  quantity: number;
}

export type CreateRoomReq = BaseRoom;
export interface CreateRoomRes extends Omit<BaseRoom, 'apartmentId' | 'quantity'> {
  _id: string;
  apartment: RoomApartmentSelected;
  createdAt: string;
  updatedAt: string;
}

export interface UploadSignatureRes {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
}

export interface Room extends Pick<
  BaseRoom,
  'roomName' | 'maxPeople' | 'price' | 'electricityPrice' | 'waterPrice' | 'status'
> {
  _id: string;
  apartment: RoomApartmentSelected;
}
