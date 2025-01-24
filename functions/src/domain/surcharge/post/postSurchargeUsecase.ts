import { PostSurchargeRepo } from "@data/surcharge"
import { PostSurchargeUsecaseRequest } from "./entity/PostSurchargeUsecaseRequest"
import { PostSurchargeRepositoryRequest } from "@data/surcharge"
import { GetPlaceRepository } from "@data/place"
import { PostSurchargeUsecaseResponse } from "./entity/PostSurchargeUsecaseResponse"
import { RateCalculator } from "./RateCalculator"
import { SurchargeStatus } from "@shared/types/surcharge"

export const postSurchargeUsecase = async (request: PostSurchargeUsecaseRequest): Promise<PostSurchargeUsecaseResponse> => {
  try {
  
    // Map the Request object to PostSurchargeRepositoryRequest
    const rate = RateCalculator(
      request.totalAmount, // Default to 0 if undefined
      request.surchargeAmount // Default to 0 if undefined
    )

    // Get the place data
    const place = await GetPlaceRepository(request.placeId)
    
    const surcharge: PostSurchargeRepositoryRequest = {
        placeId: place.id,
        image: request.image,
        rate: rate,
        totalAmount: request.totalAmount,
        surchargeAmount: request.surchargeAmount,
        surchargeStatus: SurchargeStatus.REPORTED 
    }

    // Call the repository function
    const timestamp = await PostSurchargeRepo(surcharge)
    
    return {
      place: place,
      surcharge: {
        rate: rate,
        reportedDate: timestamp,
        status: SurchargeStatus.REPORTED
      }
    }
  } catch (error) {
      throw error
  }
}