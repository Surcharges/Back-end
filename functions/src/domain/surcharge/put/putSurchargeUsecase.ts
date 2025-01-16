import { PutSurchargeUsecaseRequest } from "@domain/surcharge"
// import { GetSurchargesRepository } from "@data/surcharge"
import { PutSurchargeRepository } from "@data/surcharge"
import { SurchargeStatus } from "./entity/SurchargeStatus"
import { rateCalculatorHelper } from "../helpers/rateCalculatorHelper";

export const putSurchargeUsecase = async(request: PutSurchargeUsecaseRequest): Promise<any> => {
    // const surchargeToUpdate = await GetSurchargesRepository(request.id)
    let newRate = undefined
    if (request.totalAmount && request.surchargeAmount){
        newRate = rateCalculatorHelper(
            undefined,
            request.totalAmount ?? 0, // Default to 0 if undefined
            request.surchargeAmount ?? 0 // Default to 0 if undefined
          )
    } else { newRate = undefined }
    
    const updatedSurcharge = {
        id: request.id,
        surchargeAmount: request.surchargeAmount ?? undefined,
        totalAmount: request.totalAmount ?? undefined,
        rate: newRate,
        surchargeStatus: SurchargeStatus.CONFIRMED
    }
    console.log("putSurchargeUsecase surchargeAmount and totalAmount : " 
        + updatedSurcharge.surchargeAmount, updatedSurcharge.totalAmount)
    await PutSurchargeRepository(updatedSurcharge)
    return updatedSurcharge

}