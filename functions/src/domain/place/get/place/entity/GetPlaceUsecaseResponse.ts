type LocalizedText = {
  text: string,
  languageCode: string
}

type AddressComponents = {
  longText: string,
  shortText: string,
  types: string[],
  languageCode: string
}

type LatLng = {
  latitude: number,
  longitude: number
}

export type GetPlaceUsecaseResponse = {
  id: string,
  displayName: LocalizedText,
  addressComponents: AddressComponents[],
  location?: LatLng
}