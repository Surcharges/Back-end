import { SurchargeDTO } from "./SurchargeDTO";

export type ResponseDTO = {
  places: SurchargeDTO[],
  nextPageToken?: string
}