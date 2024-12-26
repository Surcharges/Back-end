import { GetSurchargeRepo } from "@data/surcharge"
import { GetSurchargeRequest } from "../entities/GetSurchargeRequest"
import { GetSurchargeResponse } from "../entities/GetSurchargeResponse"

export const getSurchargeUsecase = async (request: GetSurchargeRequest): Promise<GetSurchargeResponse> => {

  var result = await GetSurchargeRepo(request.placeId)
  return{
    id: result.id,
    picture: result.picture,
    placeInformation: result.placeInformation,
    reportedDate: result.reportedDate.toMillis(),
    purchaseAmount: result.purchaseAmount,
    rate: result.rate,
    surchargeAmount: result.surchargeAmount,
    totalAmount: result.totalAmount
  }
}