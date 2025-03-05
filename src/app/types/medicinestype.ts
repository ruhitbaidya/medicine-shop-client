// src/types/MedicineFormData.ts
export interface ManufacturerDetails {
  name: string;
  address: string;
  contact: string;
}

export interface MedicineFormData {
  id: string;
  _id?: string;
  name: string;
  description: string;
  price: number;
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
  name: string;
  price: string | number;
  stock_availability: string | number;
};

export type TCardFor = {
  _id?: string;
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
