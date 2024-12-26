import { SurchargeDTO } from "./GetSurchargeDTO";

export type ResponseDTO = {
  places: SurchargeDTO[],
  nextPageToken?: string
}