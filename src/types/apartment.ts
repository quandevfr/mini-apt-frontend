interface Address {
  provinceCode: string;
  provinceName: string;
  wardCode: string;
  wardName: string;
  street: string;
}

interface Contact {
  name: string;
  phone: string;
}

export interface CreateApartmentReq {
  name: string;
  totalRooms: number;
  availableRooms: number;
  address: Address;
  contact: Contact;
  description?: string;
  amenities?: string[];
  images?: string[];
  status: string;
}

export interface CreateApartmentData extends Omit<CreateApartmentReq, 'images'> {
  images?: File[];
}

export type UpdateApartmentData = Partial<CreateApartmentData> & {
  existingImages?: string[];
};

export interface GetApartmentsResponse {
  _id: string;
  name: string;
  totalRooms: number;
  availableRooms: number;
  address: Address;
  description: string;
  amenities: string[];
  contact: Contact;
  status: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}
