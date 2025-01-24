import { Place } from "@shared/types/place"
import { Surcharge } from "@shared/types/surcharge"

export type PostSurchargeUsecaseResponse = {
  place: Place
  surcharge: Surcharge
}