import { Request } from "express";

interface location {
  latitude: number,
  longitude: number
}

interface CustomRequestPlace {
  id: string;
  name: string,
  address: string,
  location: location
}

export interface customRequest extends Request {
  body: {
      place: CustomRequestPlace,
      image: string,
      rate?: number;
      totalAmount?: number;
      surchargeAmount?: number;
    };
}