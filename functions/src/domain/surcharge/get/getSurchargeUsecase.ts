import { GetSurchargeRepo } from "@data/surcharge"
import { GetSurchargeUsecaseRequest } from "./entity/GetSurchargeUsecaseRequest"
import { GetSurchargeUsecaseResponse } from "./entity/GetSurchargeUsecaseResponse"

export const getSurchargeUsecase = async (request: GetSurchargeUsecaseRequest): Promise<GetSurchargeUsecaseResponse> => {

  const result = await GetSurchargeRepo(request.placeId)

  return {
    placeInformation: result.placeInformation,
    rate: result.rate,
    reportedDate: result.reportedDate.toMillis(),
    totalAmount: result.totalAmount,
    surchargeAmount: result.surchargeAmount
  }
  
}