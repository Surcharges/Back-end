import { Request } from "../entities/Request"
import { GetSurchargeRepo, SurchargeDTO } from "@data/surcharge"
// import { ResponseDTO } from "@data/surcharge"

export const getSurchargeUsecase = async (request: Request): Promise<SurchargeDTO> => {

  return await GetSurchargeRepo(request.id)
  
}