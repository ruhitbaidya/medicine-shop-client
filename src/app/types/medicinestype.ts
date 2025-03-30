// src/types/MedicineFormData.ts
export interface ManufacturerDetails {
  name: string;
  address: string;
  contact: string;
}

export interface MedicineFormData {
  _id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  discountPercentage: number | undefined;
  stock_availability: number;
  required_prescription: boolean;
  manufacturer_details: ManufacturerDetails;
  expiry_date?: string; // Optional field
  updated_at?: string; // Optional field
  quantity?: number;
}

export type TUserIn = {
  email: string;
  role: string;
};

export type TCard = {
  _id?: string;
  id: string;
  discount : boolean;
  name: string;
  price: string | number;
  stock_availability: string | number;
};

export type TCardFor = {
  _id?: string;
  discountPercentage: number;
  name: string;
  price: string | number;
  stock_availability: string | number;
  quantity?: number;
  required_prescription: boolean;
};

export type TshippingInfo = {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
};

export type Tuser = {
  phone?: string;
  name: string;
  email: string;
  role: string;
  _id: string;
};
type ShippingAddrse = {
  address: string;
  city: string;
  name: string;
  phone: string;
  postalCode: string;
};

export type TOrder = {
  medicine: TCardFor[];
  orderId: string;
  shippingAddress: ShippingAddrse | null;
  user: string | undefined;
};
