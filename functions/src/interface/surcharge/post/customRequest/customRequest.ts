import { Request } from "express";

interface LatLngDTO {
  latitude: number,
  longitude: number
}

interface LocalizedTextDTO {
  text: string,
  languageCode: string
}

interface AddressComponentsDTO {
  longText: string,
  shortText: string,
  types: string[],
  languageCode: string
}

interface CustomRequestPlace {
  id: string;
  displayName: LocalizedTextDTO,
  addressComponents: AddressComponentsDTO,
  location: LatLngDTO
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