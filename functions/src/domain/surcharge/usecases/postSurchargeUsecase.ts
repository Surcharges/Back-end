import { PostSurchargeRepo } from "@data/surcharge"
import { PostSurchargeDTO } from "@data/surcharge/DTO/PostSurchargeDTO"
import { PostSurchargeRequest } from '../entities/PostSurchargeRequest'

export const postSurchargeUsecase = async (request: PostSurchargeRequest): Promise<void> => {
  try {
      const surcharge: PostSurchargeDTO = {
          id: request.id,
          picture: request.picture,
          placeInformation: request.placeInformation,
          rate: request.rate,
          totalAmount: request.totalAmount,
          surchargeAmount: request.surchargeAmount,
          purchaseAmount: request.purchaseAmount,
      };

      // Call the repository function
      await PostSurchargeRepo(surcharge); 
      
  } catch (error) {
      console.error("Error in use case:", error);
      throw error;
  }
};