import { GetSurchargesRepository } from "@data/surcharge"
import { GetSurchargeUsecaseResponse } from "./entity/GetSurchargeUsecaseResponse"

export const getSurchargesUsecase = async (): Promise<GetSurchargeUsecaseResponse[]> => {
  try {
    const allSurcharges = await GetSurchargesRepository({})
    const result = allSurcharges.map((surcharge) => {
      return {
        image: surcharge.image,
        placeInformation: surcharge.placeInformation,
        rate: surcharge.rate,
        reportedDate: surcharge.reportedDate.toMillis(),
        totalAmount: surcharge.totalAmount,
        surchargeAmount: surcharge.surchargeAmount,
        surchargeStatus: surcharge.surchargeStatus
      }
    })
    return result
  } catch (error) {
    console.error("Error at getSurchargesUsecase:", error);
    throw error; 
  }
  
}