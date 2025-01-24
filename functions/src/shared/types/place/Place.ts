import { LocalizedText } from "./LocalizedText"
import { AddressComponents } from "./AddressComponents"
import { LatLng } from "./LatLng"

export type Place = {
  id: string,
  displayName: LocalizedText,
  addressComponents: AddressComponents[],
  location?: LatLng
}