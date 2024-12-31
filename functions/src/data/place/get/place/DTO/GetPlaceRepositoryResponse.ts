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

export interface CustomRequestPlace {
  id: string;
  displayName: LocalizedTextDTO,
  addressComponents: AddressComponentsDTO,
  location: LatLngDTO
}