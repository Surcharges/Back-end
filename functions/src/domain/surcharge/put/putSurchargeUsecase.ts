import { PutSurchargeUsecaseRequest } from "@domain/surcharge"
import { GetSurchargesRepository } from "@data/surcharge"
import { PutSurchargeRepository } from "@data/surcharge"
import { SurchargeStatus } from "./entity/SurchargeStatus"

export const putSurchargeUsecase = async(request: PutSurchargeUsecaseRequest): Promise<any> => {
    const surchargeToUpdate = await GetSurchargesRepository(request.id)
    const updatedSurcharge ={
        id: request.id,
        surchargeAmount: request.surchargeAmount ?? surchargeToUpdate.surchargeAmount,
        totalAmount: request.totalAmount ?? surchargeToUpdate.totalAmount,
        surcahrgeStatus: SurchargeStatus.CONFIRMED
    }
    await PutSurchargeRepository(updatedSurcharge)
    return updatedSurcharge

}