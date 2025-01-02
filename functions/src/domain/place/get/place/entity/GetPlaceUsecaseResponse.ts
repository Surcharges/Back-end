import { Timestamp } from "firebase-admin/firestore"

type LatLng = {
  latitude: number,
  longitude: number
}

type displayName = {
  text: string,
  languageCode: string
}

type addressComponents = {
  longText: string,
  shortText: string,
  types: string[],
  languageCode: string
}

export type GetPlaceUsecaseResponse = {
  id: string,
  displayName: displayName,
  addressComponents: addressComponents[],
  location?: LatLng,
  rate?: number,
  reportedDate?: Timestamp
}