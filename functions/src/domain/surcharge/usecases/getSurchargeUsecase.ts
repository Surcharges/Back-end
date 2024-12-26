import { GetSurchargeRepo, SurchargeDTO } from "@data/surcharge"
import { GetSurchargeRequest } from "../entities/GetSurchargeRequest"

export const getSurchargeUsecase = async (request: GetSurchargeRequest): Promise<SurchargeDTO> => {

  return await GetSurchargeRepo(request.placeId)
  
}