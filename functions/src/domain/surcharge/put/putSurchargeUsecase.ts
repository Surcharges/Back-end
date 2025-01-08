import { PutSurchargeUsecaseRequest } from "@domain/surcharge"
import { GetSurchargesRepository } from "@data/surcharge"
import { GetPlaceRepository } from "@data/place"
// import { PostSurchargeRepo } from "@data/surcharge"
import { SurhcargeStatus } from "./entity/SurhcargeStatus"

export const putSurchargeUsecase = async(request: PutSurchargeUsecaseRequest): Promise<any> => {
    const surchargeToUpdate = await GetSurchargesRepository(request.id)
    const place = await GetPlaceRepository(request.id)
    const updatedSurcharge ={
        place: place,
        placeInformation: surchargeToUpdate.placeInformation,
        image: surchargeToUpdate.id,
        rate: request.rate ?? surchargeToUpdate.rate,
        surchargeAmount: surchargeToUpdate.surchargeAmount,
        totalAmount: surchargeToUpdate.totalAmount,
        reportedDate: surchargeToUpdate.reportedDate,
        surcahrgeStatus: SurhcargeStatus.CONFIRMED
    }
    return updatedSurcharge
    // await PostSurchargeRepo(updatedSurcharge)

}