interface LatLngDTO {
  latitude: number,
  longitude: number
}

interface displayName {
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
  displayName: displayName,
  addressComponents: AddressComponentsDTO[],
  location: LatLngDTO
}